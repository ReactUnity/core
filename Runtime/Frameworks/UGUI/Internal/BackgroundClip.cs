using System.Collections.Generic;
using ReactUnity.Types;
using TMPro;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>A rounded box a background layer can be cut to, in the element's own space.</summary>
    public struct BackgroundClipBox
    {
        public bool Clips;
        public Vector2 Center;
        public Vector2 HalfSize;
        public Vector4 RadiusX;
        public Vector4 RadiusY;
    }

    /// <summary>
    /// Whatever the element's background layers are cut to that the mask cannot give them --
    /// <c>background-clip</c>. The padding and content boxes are rounded boxes evaluated per
    /// fragment; <c>text</c> is a coverage texture of the element's glyphs.
    /// </summary>
    /// <remarks>
    /// The border box is not here: the mask on <c>[GraphicRoot]</c> is the border box, so a layer
    /// taking CSS's default needs neither this component nor a shader that knows about it. That is
    /// what keeps the common case free.
    ///
    /// The glyphs are drawn with TextMeshPro's own material, so the coverage is the same
    /// rasterization the text itself gets: the same atlas, dilate and softness, antialiased edges
    /// included. Only two things are taken off it -- the vertex colours, which carry <c>color</c>
    /// and would empty the mask for the `transparent` this property is nearly always paired with,
    /// and the underlay, since a <c>text-shadow</c> is not part of the glyph.
    ///
    /// A stencil cannot do either job. UGUI's <see cref="UnityEngine.UI.Mask"/> writes one bit per
    /// pixel, which turns every antialiased glyph edge into a staircase -- the same reason
    /// <see cref="ElementFilter"/> renders <c>mask-image</c> to a texture rather than clipping with
    /// one. The coverage is a command buffer rather than a camera because there is nothing to frame:
    /// the meshes and their materials are already in hand, so a camera would only cost its own
    /// ~1.4 ms.
    /// </remarks>
    public class BackgroundClip : MonoBehaviour
    {
        static readonly int TexId = Shader.PropertyToID("_ReactUnityTextClip");
        static readonly int TextMatrixId = Shader.PropertyToID("_ReactUnityTextClipMatrix");
        static readonly int TextBoundId = Shader.PropertyToID("_ReactUnityTextClipBound");
        static readonly int BoxMatrixId = Shader.PropertyToID("_ReactUnityBoxClipMatrix");
        static readonly int BoxSizeId = Shader.PropertyToID("_ReactUnityBoxClipSize");
        static readonly int BoxRadiusXId = Shader.PropertyToID("_ReactUnityBoxClipRadiusX");
        static readonly int BoxRadiusYId = Shader.PropertyToID("_ReactUnityBoxClipRadiusY");
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
        private static readonly List<Canvas> canvasBuffer = new List<Canvas>();
        private UnityEngine.Events.UnityAction markDirty;

        private Rect lastRect;
        private bool dirty = true;
        private Matrix4x4 uvMatrix = Matrix4x4.identity;
        private Matrix4x4 canvasToLocal = Matrix4x4.identity;
        private float pixel = 1f;

        private bool needsCoverage;

        /// <summary>Whether any layer clips to the glyphs, which is what the coverage costs anything for.</summary>
        public bool NeedsCoverage
        {
            get => needsCoverage;
            set
            {
                if (needsCoverage == value) return;
                needsCoverage = value;
                // The target is the element's own and as big as it is, so a clip that has gone back
                // to a box does not go on holding one.
                if (value) dirty = true;
                else Release();
            }
        }

        /// <summary>The coverage, or null until something has been drawn into it.</summary>
        public Texture Coverage => target;

        /// <summary>How many coverage renders this clip has done. For tests.</summary>
        public int RenderCount { get; private set; }

        public static BackgroundClip Create(UGUIComponent cmp, RectTransform paintingArea, BorderAndBackground owner)
        {
            var clip = cmp.GameObject.GetComponent<BackgroundClip>();
            if (!clip) clip = cmp.GameObject.AddComponent<BackgroundClip>();
            clip.component = cmp;
            clip.owner = owner;
            clip.reference = paintingArea;
            clip.markDirty = clip.Invalidate;
            return clip;
        }

        public void Invalidate() => dirty = true;

        /// <summary>Points a background layer's material at the clip its box asks for, or takes the
        /// last one off a layer that has gone back to the border box.</summary>
        public static void Bind(Material mat, BackgroundClip clip, BackgroundBox box)
        {
            if (!mat) return;
            if (!clip) box = BackgroundBox.BorderBox;

            var coverage = box == BackgroundBox.Text ? clip.Coverage : null;
            mat.SetTexture(TexId, coverage);
            mat.SetFloat(TextBoundId, coverage ? 1 : 0);
            if (coverage) mat.SetMatrix(TextMatrixId, clip.uvMatrix);

            var geo = default(BackgroundClipBox);
            var boxed = clip && clip.owner && clip.owner.TryGetClipBox(box, out geo);
            if (!boxed)
            {
                mat.SetVector(BoxSizeId, Vector4.zero);
                return;
            }

            mat.SetMatrix(BoxMatrixId, Matrix4x4.Translate(new Vector3(-geo.Center.x, -geo.Center.y, 0)) * clip.canvasToLocal);
            mat.SetVector(BoxSizeId, new Vector4(geo.HalfSize.x, geo.HalfSize.y, clip.pixel, 1));
            mat.SetVector(BoxRadiusXId, geo.RadiusX);
            mat.SetVector(BoxRadiusYId, geo.RadiusY);
        }

        void LateUpdate()
        {
            if (!reference) return;

            if (NeedsCoverage && PollDirty())
            {
                dirty = false;
                RenderCount++;
                Render();
            }

            canvasToLocal = ComputeCanvasToLocal();
            uvMatrix = ComputeUvMatrix();
            if (owner) owner.PushClips(this);
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

            if (buffer == null) buffer = new CommandBuffer { name = "ReactUnity.BackgroundClip" };
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

            var toUv = Matrix4x4.TRS(
                new Vector3(-rect.xMin / rect.width, -rect.yMin / rect.height, 0),
                Quaternion.identity,
                new Vector3(1f / rect.width, 1f / rect.height, 1));

            return toUv * canvasToLocal;
        }

        /// <summary>The same canvas space, to the painting area's own -- which is the border box,
        /// and so the space every clip box is measured in.</summary>
        Matrix4x4 ComputeCanvasToLocal()
        {
            var canvas = ShaderSpace();
            var space = canvas ? canvas.transform : component.RectTransform.parent;
            if (!space) return Matrix4x4.identity;

            var matrix = reference.worldToLocalMatrix * space.localToWorldMatrix;

            // How far a screen pixel reaches in that space, which is the width of every clip edge.
            // The density is still the context's -- an offscreen surface is rendered for the screen
            // it composites onto, so its own `scaleFactor` of 1 says nothing about how big a pixel is.
            var root = component.Context.RootCanvas;
            var scale = root ? Mathf.Max(root.scaleFactor, 0.01f) : 1f;
            pixel = matrix.MultiplyVector(Vector3.right).magnitude / scale;

            return matrix;
        }

        /// <summary>
        /// The canvas whose local space UGUI hands a background shader as its vertex position: the
        /// outermost one over the element, which is how UGUI's own <see cref="UnityEngine.UI.RectMask2D"/>
        /// reads that space too. Not the context's root canvas -- an element under an
        /// <c>isolation: isolate</c> or <c>filter</c> ancestor renders on the <c>[FilterSurface]</c>
        /// canvas that <see cref="ElementFilter"/> parks at the scene root, and measuring against the
        /// context's put the uv matrix out by the ratio of the two canvases' scales.
        /// </summary>
        Canvas ShaderSpace()
        {
            var t = component?.RectTransform;
            if (!t) return component?.Context?.RootCanvas;

            t.GetComponentsInParent(false, canvasBuffer);
            for (int i = canvasBuffer.Count - 1; i >= 0; i--)
                if (canvasBuffer[i].isActiveAndEnabled) return canvasBuffer[i];

            return component.Context?.RootCanvas;
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
