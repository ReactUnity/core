using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class ReactUnityUGUI : ReactUnityBase
    {
        public RectTransform Root => transform as RectTransform;
        public CursorSet CursorSet;
        public IconSet DefaultIconSet;
        public List<IconSet> IconSets;

        protected override void ClearRoot()
        {
            if (!Root) return;
            for (int i = Root.childCount - 1; i >= 0; i--)
                GameObject.DestroyImmediate(Root.GetChild(i).gameObject);
        }

        protected override ReactContext CreateContext(ScriptSource script)
        {
            var globals = GlobalRecord.BindSerializableDictionary(Globals, dispatcher, false);
            return new UGUIContext(new UGUIContext.Options
            {
                HostElement = Root,
                Globals = globals,
                Source = script,
                Dispatcher = dispatcher,
                Timer = timer ?? UnityTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = Render,
                IconSets = IconSets,
                DefaultIconSet = DefaultIconSet,
                CursorSet = CursorSet,
                Debug = Debug,
                AwaitDebugger = AwaitDebugger,
                EngineType = Scripting.JavascriptEngineType.Auto,
            });
        }

        protected override IMediaProvider CreateMediaProvider()
        {
            return DefaultMediaProvider.CreateMediaProvider("runtime", "ugui", false);
        }
    }
}
