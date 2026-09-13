using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Draws every glyph under an element into a coverage texture, which its background layers
    /// multiply into their alpha -- <c>background-clip: text</c>.
    /// </summary>
    /// <remarks>
    /// The glyphs are drawn with TextMeshPro's own material, so the coverage is the same
    /// rasterization the text itself gets: the same atlas, dilate and softness, antialiased edges
    /// included. Only two things are taken off it -- the vertex colours, which carry
    /// <c>color</c> and would empty the mask for the `transparent` this property is nearly always
    /// paired with, and the underlay, since a <c>text-shadow</c> is not part of the glyph.
    ///
    /// A stencil cannot do this. UGUI's <see cref="UnityEngine.UI.Mask"/> writes one bit per pixel,
    /// which turns every antialiased glyph edge into a staircase -- the same reason
    /// <see cref="ElementFilter"/> renders <c>mask-image</c> to a texture rather than clipping with
    /// one. It is a command buffer rather than a camera here because there is nothing to frame: the
    /// meshes and their materials are already in hand, so a camera would only cost its own ~1.4 ms.
    /// </remarks>
    public class BackgroundTextClip : MonoBehaviour
    {
        static readonly int TexId = Shader.PropertyToID("_ReactUnityTextClip");
        static readonly int MatrixId = Shader.PropertyToID("_ReactUnityTextClipMatrix");
        static readonly int BoundId = Shader.PropertyToID("_ReactUnityTextClipBound");
        static readonly int ScreenParamsId = Shader.PropertyToID("_ScreenParams");

        // Coverage only has to carry the softness of a glyph edge, so past this the texture is
        // stretched -- which costs a wall of text a little sharpness rather than 16 MB of upload.
        const int MaxDimension = 2048;

        // One per text material rather than per element: nothing about the element reaches it.
        static readonly Dictionary<Material, Material> coverageMaterials = new Dictionary<Material, Material>();

        static readonly List<Vector3> vertexBuffer = new List<Vector3>();
        static readonly List<Vector3> normalBuffer = new List<Vector3>();
        static readonly List<Vector4> tangentBuffer = new List<Vector4>();
        static readonly List<Vector2> uv0Buffer = new List<Vector2>();
        static readonly List<Vector2> uv1Buffer = new List<Vector2>();
        static readonly List<Color32> colorBuffer = new List<Color32>();
        static readonly List<int> triangleBuffer = new List<int>();

        private UGUIComponent component;
        private BorderAndBackground owner;
        private RectTransform reference;

        private RenderTexture target;
        private CommandBuffer buffer;

        // The glyph sources, their materials, and the white copy of each one's mesh. Parallel lists
        // rebuilt together, so an index means the same renderer in all three.
        private readonly List<Graphic> sources = new List<Graphic>();
        private readonly List<Material> materials = new List<Material>();
        private readonly List<Mesh> copies = new List<Mesh>();

        private readonly List<Graphic> registered = new List<Graphic>();
        private readonly List<TMP_Text> texts = new List<TMP_Text>();
        private readonly List<TMP_SubMeshUI> subMeshes = new List<TMP_SubMeshUI>();
        private UnityEngine.Events.UnityAction markDirty;

        private Rect lastRect;
        private bool dirty = true;
        private Matrix4x4 uvMatrix = Matrix4x4.identity;

        /// <summary>The coverage, or null until something has been drawn into it.</summary>
        public Texture Coverage => target;

        /// <summary>How many coverage renders this clip has done. For tests.</summary>
        public int RenderCount { get; private set; }

        public static BackgroundTextClip Create(UGUIComponent cmp, RectTransform paintingArea, BorderAndBackground owner)
        {
            var clip = cmp.GameObject.GetComponent<BackgroundTextClip>();
            if (!clip) clip = cmp.GameObject.AddComponent<BackgroundTextClip>();
            clip.component = cmp;
            clip.owner = owner;
            clip.reference = paintingArea;
            clip.markDirty = clip.Invalidate;
            return clip;
        }

        public void Invalidate() => dirty = true;

        /// <summary>Points a background layer's material at the coverage, or takes it off one that
        /// has stopped clipping.</summary>
        public static void Bind(Material mat, BackgroundTextClip clip)
        {
            if (!mat) return;

            var coverage = clip ? clip.Coverage : null;
            mat.SetTexture(TexId, coverage);
            mat.SetFloat(BoundId, coverage ? 1 : 0);
            if (coverage) mat.SetMatrix(MatrixId, clip.uvMatrix);
        }

        void LateUpdate()
        {
            if (!reference) return;

            if (PollDirty())
            {
                dirty = false;
                RenderCount++;
                Render();
            }

            uvMatrix = ComputeUvMatrix();
            if (owner) owner.PushTextClip(this);
        }

        /// <summary>
        /// True when the coverage would come out different. Missing a change here paints the
        /// background through last frame's glyphs, so this errs towards redrawing: a rebuild of any
        /// text under the element, one of them moving, or the painting area resizing.
        /// </summary>
        bool PollDirty()
        {
            var rect = reference.rect;
            if (rect != lastRect)
            {
                lastRect = rect;
                dirty = true;
            }

            Collect();

            if (sources.Count != registered.Count) Reregister();
            else
            {
                for (int i = 0; i < sources.Count; i++)
                {
                    if (sources[i] == registered[i]) continue;
                    Reregister();
                    break;
                }
            }

            // A rebuild raises the callback above, but text that only moved -- a scrolled line, a
            // reflowed sibling -- leaves its geometry alone and sets nothing dirty.
            for (int i = 0; i < sources.Count; i++)
            {
                var t = sources[i].transform;
                if (!t.hasChanged) continue;
                t.hasChanged = false;
                dirty = true;
            }

            return dirty;
        }

        void Collect()
        {
            sources.Clear();
            materials.Clear();

            var root = component.RectTransform;
            if (!root) return;

            root.GetComponentsInChildren(false, texts);
            for (int i = 0; i < texts.Count; i++)
            {
                var t = texts[i];
                if (!t.isActiveAndEnabled) continue;
                // TextMeshPro rebuilds during the canvas update, which is after this -- so a text
                // whose properties moved this frame is brought forward rather than drawn a frame late.
                if (t.havePropertiesChanged) t.ForceMeshUpdate();
                sources.Add(t);
                materials.Add(t.fontSharedMaterial);
            }

            root.GetComponentsInChildren(false, subMeshes);
            for (int i = 0; i < subMeshes.Count; i++)
            {
                var s = subMeshes[i];
                if (!s.isActiveAndEnabled) continue;
                sources.Add(s);
                materials.Add(s.sharedMaterial);
            }
        }

        void Reregister()
        {
            for (int i = 0; i < registered.Count; i++)
            {
                if (!registered[i]) continue;
                registered[i].UnregisterDirtyVerticesCallback(markDirty);
                registered[i].UnregisterDirtyMaterialCallback(markDirty);
            }

            registered.Clear();
            registered.AddRange(sources);
            dirty = true;

            for (int i = 0; i < registered.Count; i++)
            {
                registered[i].RegisterDirtyVerticesCallback(markDirty);
                registered[i].RegisterDirtyMaterialCallback(markDirty);
            }
        }

        void Render()
        {
            var rect = reference.rect;
            if (rect.width <= 0 || rect.height <= 0) return;

            var canvas = component.Context.RootCanvas;
            var scale = canvas ? Mathf.Max(canvas.scaleFactor, 0.01f) : 1f;

            var pxWidth = Mathf.Clamp(Mathf.CeilToInt(rect.width * scale), 1, MaxDimension);
            var pxHeight = Mathf.Clamp(Mathf.CeilToInt(rect.height * scale), 1, MaxDimension);
            EnsureTarget(pxWidth, pxHeight);

            if (buffer == null) buffer = new CommandBuffer { name = "ReactUnity.BackgroundTextClip" };
            buffer.Clear();
            buffer.SetRenderTarget(target);
            buffer.ClearRenderTarget(true, true, Color.clear);

            // The painting area, seen square on. API-neutral matrices: the command buffer is the one
            // that knows which way up the target it is about to write is.
            buffer.SetViewProjectionMatrices(
                Matrix4x4.Scale(new Vector3(1, 1, -1)),
                Matrix4x4.Ortho(rect.xMin, rect.xMax, rect.yMin, rect.yMax, -1000f, 1000f));

            // TextMeshPro reads the projection against `_ScreenParams` to work out how wide a glyph's
            // antialiased edge should be, and a command buffer inherits whatever the last camera left
            // there -- which drove the ramp so hard that every glyph came out as its own solid quad.
            // The area's own units, not the target's pixels: the scale packed into the mesh already
            // carries the canvas scale (TMP_Text.UpdateSDFScale), so counting it again would sharpen
            // the coverage away from the text it is meant to match. Set globally because that is the
            // only place it exists, and only ever between LateUpdate and the first camera of the
            // frame, which sets its own on the way in.
            buffer.SetGlobalVector(ScreenParamsId,
                new Vector4(rect.width, rect.height, 1f + 1f / rect.width, 1f + 1f / rect.height));

            var toArea = reference.worldToLocalMatrix;

            for (int i = 0; i < sources.Count; i++)
            {
                var mesh = CopyWhite(i);
                var mat = CoverageMaterial(materials[i]);
                if (!mesh || !mat) continue;

                buffer.DrawMesh(mesh, toArea * sources[i].transform.localToWorldMatrix, mat, 0, 0);
            }

            Graphics.ExecuteCommandBuffer(buffer);
        }

        /// <summary>
        /// The glyph geometry with its colours replaced by white. The colours are the only thing in
        /// the way: TextMeshPro bakes <c>color</c> into them, so drawing the mesh as it stands would
        /// give a mask as transparent as the text -- which is nothing at all for the
        /// <c>color: transparent</c> this property is nearly always written with.
        /// </summary>
        Mesh CopyWhite(int index)
        {
            var src = sources[index] is TMP_Text text ? text.mesh
                : sources[index] is TMP_SubMeshUI sub ? sub.mesh
                : null;

            if (!src || src.vertexCount == 0) return null;

            while (copies.Count <= index) copies.Add(null);

            var dst = copies[index];
            if (!dst)
            {
                dst = new Mesh { name = "[TextClip]", hideFlags = HideFlags.HideAndDontSave };
                dst.MarkDynamic();
                copies[index] = dst;
            }

            src.GetVertices(vertexBuffer);
            src.GetUVs(0, uv0Buffer);
            src.GetUVs(1, uv1Buffer);
            src.GetNormals(normalBuffer);
            src.GetTangents(tangentBuffer);
            src.GetTriangles(triangleBuffer, 0);

            colorBuffer.Clear();
            for (int i = 0; i < vertexBuffer.Count; i++) colorBuffer.Add(Color.white);

            dst.Clear();
            dst.SetVertices(vertexBuffer);
            dst.SetColors(colorBuffer);
            dst.SetUVs(0, uv0Buffer);
            if (uv1Buffer.Count == vertexBuffer.Count) dst.SetUVs(1, uv1Buffer);
            if (normalBuffer.Count == vertexBuffer.Count) dst.SetNormals(normalBuffer);
            if (tangentBuffer.Count == vertexBuffer.Count) dst.SetTangents(tangentBuffer);
            dst.SetTriangles(triangleBuffer, 0);

            return dst;
        }

        /// <summary>
        /// The text's own material with everything that is not glyph shape taken out of it: the face
        /// and the stroke go to white so the coverage is the alpha, and the underlay goes off so a
        /// <c>text-shadow</c> does not widen what the background is clipped to.
        /// </summary>
        static Material CoverageMaterial(Material source)
        {
            if (!source) return null;
            if (coverageMaterials.TryGetValue(source, out var found) && found) return found;

            var mat = new Material(source) { hideFlags = HideFlags.HideAndDontSave };
            if (mat.HasProperty(ShaderUtilities.ID_FaceColor)) mat.SetColor(ShaderUtilities.ID_FaceColor, Color.white);
            if (mat.HasProperty(ShaderUtilities.ID_OutlineColor)) mat.SetColor(ShaderUtilities.ID_OutlineColor, Color.white);
            mat.DisableKeyword(ShaderUtilities.Keyword_Underlay);
            mat.DisableKeyword(ShaderUtilities.Keyword_Glow);

            coverageMaterials[source] = mat;
            return mat;
        }

        /// <summary>Canvas space, which is what UGUI hands every background shader as its vertex
        /// position, to a uv over the painting area.</summary>
        Matrix4x4 ComputeUvMatrix()
        {
            var rect = reference.rect;
            if (rect.width <= 0 || rect.height <= 0) return Matrix4x4.identity;

            var canvas = component.Context.RootCanvas;
            var space = canvas ? canvas.transform : component.RectTransform.parent;
            if (!space) return Matrix4x4.identity;

            var toUv = Matrix4x4.TRS(
                new Vector3(-rect.xMin / rect.width, -rect.yMin / rect.height, 0),
                Quaternion.identity,
                new Vector3(1f / rect.width, 1f / rect.height, 1));

            return toUv * reference.worldToLocalMatrix * space.localToWorldMatrix;
        }

        void EnsureTarget(int w, int h)
        {
            if (target && target.width == w && target.height == h) return;

            Release();
            target = new RenderTexture(w, h, 0, RenderTextureFormat.ARGB32)
            {
                name = "[TextClip]",
                filterMode = FilterMode.Bilinear,
                wrapMode = TextureWrapMode.Clamp,
            };
            target.Create();
        }

        void Release()
        {
            if (!target) return;
            target.Release();
            Destroy(target);
            target = null;
        }

        void OnDestroy()
        {
            sources.Clear();
            Reregister();
            Release();

            for (int i = 0; i < copies.Count; i++) if (copies[i]) Destroy(copies[i]);
            copies.Clear();

            buffer?.Release();
            buffer = null;
        }
    }
}
