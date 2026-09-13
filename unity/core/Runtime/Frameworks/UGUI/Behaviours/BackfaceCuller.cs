using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    /// <summary>
    /// Hides an element while a rotation has turned its back to the viewer, which is what
    /// <c>backface-visibility: hidden</c> asks for.
    /// </summary>
    /// <remarks>
    /// Polled rather than pushed. The facing follows every ancestor's rotation as well as the
    /// element's own, and an animation moves those without this element's style being resolved
    /// again -- so nothing pushes. Only an element that asked for it carries one of these, which is
    /// what keeps the cost off everything else.
    /// </remarks>
    [AddComponentMenu("")]
    [DefaultExecutionOrder(-9)]
    public class BackfaceCuller : MonoBehaviour
    {
        public UGUIComponent Component { get; internal set; }

        /// <summary>Whether the element is currently turned away from the viewer.</summary>
        public bool IsBackFacing { get; private set; }

        private RectTransform rt;

        void OnEnable()
        {
            rt = transform as RectTransform;
            Recheck();
        }

        void LateUpdate()
        {
            if (Recheck()) Component?.ResolveBackface();
        }

        /// <summary>Re-reads the facing, and says whether it turned over since the last look.</summary>
        /// <remarks>
        /// Separate from the notification so the element can attach one of these and read the answer
        /// in the same breath, without being called back into the resolve it is already inside.
        /// </remarks>
        internal bool Recheck()
        {
            var facing = Resolve();
            if (facing == IsBackFacing) return false;

            IsBackFacing = facing;
            return true;
        }

        /// <summary>
        /// Whether the element's front face points away from us, which is the sign of the winding its
        /// two in-plane axes come out with.
        /// </summary>
        /// <remarks>
        /// Measured against the canvas rather than against world space: the canvas plane is what CSS
        /// calls the viewer, and an element on a rotated world-space canvas is still facing whoever
        /// is looking at that canvas. A mirror -- an odd number of negative scales -- reads as a back
        /// face too, which is what CSS says as well, and a determinant catches it for free.
        /// </remarks>
        bool Resolve()
        {
            if (!rt || Component == null) return false;

            var canvas = Component.Context?.RootCanvas;
            var local = canvas ? canvas.transform.worldToLocalMatrix * rt.localToWorldMatrix : rt.localToWorldMatrix;

            // A canvas has y up and z away from the viewer, so an untransformed element winds to +z.
            var normal = Vector3.Cross((Vector3) local.GetColumn(0), (Vector3) local.GetColumn(1));
            return normal.z < 0;
        }
    }
}
