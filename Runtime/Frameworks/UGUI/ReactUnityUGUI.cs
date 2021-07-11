using ReactUnity.Helpers;
using ReactUnity.StyleEngine;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class ReactUnityUGUI : ReactUnityBase
    {
        public RectTransform Root => transform as RectTransform;

        protected override void ClearRoot()
        {
            if (!Root) return;
            for (int i = Root.childCount - 1; i >= 0; i--)
                GameObject.DestroyImmediate(Root.GetChild(i).gameObject);
        }

        protected override ReactContext CreateContext(ScriptSource script, bool isDevServer)
        {
            var globals = GlobalRecord.BindSerializableDictionary(Globals, dispatcher, false);
            return new UGUIContext(Root, globals, script, dispatcher, scheduler, MediaProvider, isDevServer, Render);
        }

        protected override IMediaProvider CreateMediaProvider()
        {
            return DefaultMediaProvider.CreateMediaProvider("runtime", "ugui", false);
        }
    }
}
