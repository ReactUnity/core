using System;

namespace ReactUnity
{
    public class MetaComponent : BaseReactComponent<ReactContext>
    {
        public override string Name { get; set; }
        public override float ClientWidth => 0;
        public override float ClientHeight => 0;

        public MetaComponent(ReactContext ctx, string tag, bool isContainer = false) : base(ctx, tag, isContainer)
        {
            Name = DefaultName;
        }

        #region BaseReactComponent Implementation

        public override void Update() { }

        public override object AddComponent(Type type) { return null; }

        public override object GetComponent(Type type) { return null; }

        protected override void ApplyLayoutStylesSelf() { }

        protected override void ApplyStylesSelf() { }

        protected override bool DeleteChild(IReactComponent child) => false;

        protected override bool InsertChild(IReactComponent child, int index) => false;

        public override bool UpdateOrder(int prev, int current) => false;

        #endregion
    }
}
