using ReactUnity.Scheduling;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity.Noop
{
    [AddComponentMenu("")]
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
                EngineType = EngineType,
                Debug = AdvancedOptions.DebugMode != DebugMode.None,
                AwaitDebugger = AdvancedOptions.DebugMode == DebugMode.DebugAndAwait,
                BeforeStart = AdvancedOptions.BeforeStart.Invoke,
                AfterStart = AdvancedOptions.AfterStart.Invoke,
                Pooling = AdvancedOptions.Pooling,
            });
        }

        protected override IMediaProvider CreateMediaProvider() => DefaultMediaProvider.CreateMediaProvider("runtime", "noop", false);
    }
}
