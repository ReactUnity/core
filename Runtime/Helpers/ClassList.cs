using System;

namespace ReactUnity.Helpers
{
    public class ClassList : WatchableSet<string>
    {
        private readonly IReactComponent Component;

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

        public ClassList(IReactComponent component)
        {
            Component = component;
        }

        internal override void OnAdd(string item)
        {
            name = null;
            Component.MarkStyleUpdateWithSiblings(true);
        }

        internal override void OnRemove(string item)
        {
            name = null;
            Component.MarkStyleUpdateWithSiblings(true);
        }

        internal override void OnBeforeChange()
        {
            name = null;
        }

        internal override void OnAfterChange()
        {
            Component.MarkStyleUpdateWithSiblings(true);
        }
    }
}
