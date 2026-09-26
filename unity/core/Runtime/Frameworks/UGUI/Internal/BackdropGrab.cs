using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Copies the frame into each reader's surface from inside the camera's own render, as a GrabPass
    /// does, instead of rendering the camera again per reader.
    /// </summary>
    /// <remarks>
    /// The canvas is drawn in slices by render queue: <see cref="BackdropSlice"/> gives everything
    /// painted from reader <c>i</c> onwards queue <see cref="BackdropSlice.BaseQueue"/> + i + 1, and the
    /// grabber copies the target into surface <c>i</c> once slice <c>i</c> is drawn. A pipeline package
    /// registers the one it can offer; with none, every reader costs a render.
    /// </remarks>
    public interface IBackdropGrabber
    {
        /// <summary>Whether <paramref name="owner"/> can grab for <paramref name="cam"/> now.</summary>
        bool CanGrab(object owner, Camera cam);

        /// <summary>
        /// Draws <paramref name="layer"/> for <paramref name="cam"/> in <paramref name="count"/> + 1
        /// slices from now on, copying the target into <c>surfaces[i]</c> after slice <c>i</c>. The camera
        /// stops drawing the layer itself until <see cref="Cancel"/>.
        /// </summary>
        void Schedule(object owner, Camera cam, int layer, IReadOnlyList<RenderTexture> surfaces, int count);

        /// <summary>Hands the layer back to the camera.</summary>
        void Cancel(object owner, Camera cam);
    }

    public static class BackdropGrab
    {
        /// <summary>The pipeline's grabber, or null where only rendering per reader works.</summary>
        public static IBackdropGrabber Grabber { get; set; }

        /// <summary>Off renders every reader, as without a grabber. For tests and benchmarks.</summary>
        public static bool Enabled { get; set; } = true;
    }

    /// <summary>
    /// Puts a graphic's material on the render queue of the slice it is painted in, which is all a
    /// renderer list can tell apart inside one canvas.
    /// </summary>
    /// <remarks>
    /// Added last, so it modifies whatever the graphic and its masks settled on. Graphics that push
    /// uniforms onto <c>materialForRendering</c> reach the variant, as they already do the stencil copy
    /// UGUI substitutes under a mask.
    /// </remarks>
    [DisallowMultipleComponent]
    public class BackdropSlice : MonoBehaviour, IMaterialModifier
    {
        public const int BaseQueue = 3000;

        /// <summary>Set when a mask turned up on a sliced graphic, which the walk has to put after it.</summary>
        internal static bool Stale;

        private Graphic graphic;
        private int slice = -1;
        private int popSlice = -1;
        private bool afterMask;

        /// <summary>
        /// Whether this runs after the object's <see cref="Mask"/>, which sets its pop material from
        /// its own modifier -- so a mask added later has the last word unless this is added again.
        /// </summary>
        internal bool AfterMask => afterMask;

        void Awake() => afterMask = TryGetComponent<Mask>(out _);

        /// <summary>The slice this graphic is drawn in, or -1 to leave its material alone.</summary>
        public int Slice
        {
            get => slice;
            set
            {
                if (slice == value) return;
                slice = value;
                SetDirty();
            }
        }

        /// <summary>
        /// The slice a mask's pop material is drawn in: that of its last descendant, since UGUI draws it
        /// after the children and never passes it through a modifier.
        /// </summary>
        public int PopSlice
        {
            get => popSlice;
            set
            {
                if (popSlice == value) return;
                popSlice = value;
                SetDirty();
            }
        }

        void SetDirty()
        {
            if (graphic || TryGetComponent(out graphic)) graphic.SetMaterialDirty();
        }

        public Material GetModifiedMaterial(Material baseMaterial)
        {
            if (slice < 0 || !baseMaterial) return baseMaterial;

            // Mask sets its pop material from its own GetModifiedMaterial, which has run by now.
            if (graphic || TryGetComponent(out graphic))
            {
                var cr = graphic.canvasRenderer;
                if (!afterMask && TryGetComponent<Mask>(out _)) Stale = true;
                for (int i = 0; i < cr.popMaterialCount; i++)
                {
                    var pop = cr.GetPopMaterial(i);
                    if (pop && popSlice >= 0) cr.SetPopMaterial(QueueVariants.Get(pop, BaseQueue + popSlice), i);
                }
            }

            return QueueVariants.Get(baseMaterial, BaseQueue + slice);
        }
    }

    /// <summary>Copies of materials that differ only in render queue, shared like the source.</summary>
    internal static class QueueVariants
    {
        static readonly Dictionary<(Material, int), Material> variants = new Dictionary<(Material, int), Material>();
        static readonly List<(Material, int)> dead = new List<(Material, int)>();

        public static Material Get(Material source, int queue)
        {
            if (source.renderQueue == queue) return source;

            var key = (source, queue);
            if (variants.TryGetValue(key, out var variant) && variant && variant.shader == source.shader) return variant;
            if (variant) Object.Destroy(variant);

            variant = new Material(source) { name = source.name + " [queue " + queue + "]", renderQueue = queue, hideFlags = HideFlags.HideAndDontSave };
            variants[key] = variant;
            return variant;
        }

        /// <summary>Drops the copies of materials that have been destroyed.</summary>
        public static void Purge()
        {
            foreach (var pair in variants)
                if (!pair.Key.Item1) dead.Add(pair.Key);

            for (int i = 0; i < dead.Count; i++)
            {
                if (variants.TryGetValue(dead[i], out var variant) && variant) Object.Destroy(variant);
                variants.Remove(dead[i]);
            }
            dead.Clear();
        }
    }
}
