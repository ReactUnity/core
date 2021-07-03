using UnityEngine;

namespace ReactUnity.UGUI
{
    public class ReactUnityUGUI : ReactUnityBase
    {
        public RectTransform Root => transform as RectTransform;

        protected override void CleanRoot()
        {
            foreach (Transform children in Root)
            {
                DestroyImmediate(children.gameObject);
            }
        }

        protected override ReactContext CreateContext(ReactScript script, bool isDevServer)
        {
            return new UGUIContext(Root, Globals, script, dispatcher, scheduler, MediaProvider, isDevServer, Render);
        }
    }
}
