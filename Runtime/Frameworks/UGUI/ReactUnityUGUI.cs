using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Timers;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class ReactUnityUGUI : ReactUnityBase
    {
        public RectTransform Root => transform as RectTransform;
        public List<IconSet> IconSets;
        public CursorSet CursorSet;

        protected override void ClearRoot()
        {
            if (!Root) return;
            for (int i = Root.childCount - 1; i >= 0; i--)
                GameObject.DestroyImmediate(Root.GetChild(i).gameObject);
        }

        protected override ReactContext CreateContext(ScriptSource script, bool isDevServer)
        {
            var globals = GlobalRecord.BindSerializableDictionary(Globals, dispatcher, false);
            return new UGUIContext(Root, globals, script, dispatcher, scheduler, timer ?? UnityTimer.Instance, MediaProvider, isDevServer, Render, IconSets, CursorSet);
        }

        protected override IMediaProvider CreateMediaProvider()
        {
            return DefaultMediaProvider.CreateMediaProvider("runtime", "ugui", false);
        }
    }
}
