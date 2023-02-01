using System;

namespace ReactUnity.Helpers
{
    internal interface IClassChangeHandler
    {
        void OnClassChange();
    }

    public class ClassList : WatchableSet<string>
    {
        private readonly IClassChangeHandler Component;

        private string name;
        public string Name
        {
            get => name ?? (name = string.Join(" ", this));
            set
            {
                OnBeforeChange();
                ClearWithoutNotify();

                if (!string.IsNullOrWhiteSpace(value))
                {
                    var classes = value.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                    for (int i = 0; i < classes.Length; i++)
                        AddWithoutNotify(classes[i]);
                }
                OnAfterChange();
            }
        }

        internal ClassList(IClassChangeHandler component)
        {
            Component = component;
        }

        internal override void OnAdd(string item)
        {
            base.OnAdd(item);
            name = null;
            Component.OnClassChange();
        }

        internal override void OnRemove(string item)
        {
            base.OnRemove(item);
            name = null;
            Component.OnClassChange();
        }

        internal override void OnBeforeChange()
        {
            base.OnBeforeChange();
            name = null;
        }

        internal override void OnAfterChange()
        {
            base.OnAfterChange();
            Component.OnClassChange();
        }

        public override string ToString()
        {
            if (Count > 0) return "." + string.Join(".", this);
            return "";
        }
    }
}
