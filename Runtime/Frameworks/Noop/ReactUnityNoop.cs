using ReactUnity.Scheduling;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity.Noop
{
    internal class ReactUnityNoop : ReactUnityBase
    {
        public RectTransform Root => transform as RectTransform;

        protected override void ClearRoot()
        {
            if (!Root) return;
            for (int i = Root.childCount - 1; i >= 0; i--)
                DestroyImmediate(Root.GetChild(i).gameObject);
        }

        protected override ReactContext CreateContext(ScriptSource script)
        {
            return new NoopContext(new NoopContext.Options
            {
                HostElement = Root,
                Globals = Globals,
                Source = script,
                Timer = timer ?? UnityTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = () => Render(),
                Debug = Debug,
                AwaitDebugger = AwaitDebugger,
                EngineType = EngineType,
                BeforeStart = BeforeStart.Invoke,
                AfterStart = AfterStart.Invoke,
            });
        }

        protected override IMediaProvider CreateMediaProvider() => DefaultMediaProvider.CreateMediaProvider("runtime", "noop", false);
    }
}
