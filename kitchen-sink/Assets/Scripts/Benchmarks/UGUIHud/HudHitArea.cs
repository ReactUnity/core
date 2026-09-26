using UnityEngine.UI;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>A raycast target that emits no geometry, for hit boxes over things that draw nothing.</summary>
    public class HudHitArea : Graphic
    {
        public override void SetMaterialDirty() { }

        public override void SetVerticesDirty() { }

        protected override void OnPopulateMesh(VertexHelper vh) => vh.Clear();
    }
}
