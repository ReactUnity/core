#if UNITY_2021_2_OR_NEWER
using ReactUnity.Scheduling;
using ReactUnity.Styling.Rules;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    [RequireComponent(typeof(UIDocument))]
    [RequireComponent(typeof(AudioSource))]
    public class ReactUnityUIDocument : ReactUnityBase
    {
        public VisualElement Root => GetComponent<UIDocument>()?.rootVisualElement;

        protected override void ClearRoot()
        {
            Root?.Clear();
        }

        protected override ReactContext CreateContext(ScriptSource script)
        {
            var ctx = new UIToolkitContext(new UIToolkitContext.Options
            {
                HostElement = Root,
                Globals = Globals,
                Source = script,
                Timer = timer ?? UnityTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = () => Render(),
                OnAudioPlayback = PlayAudio,
                EngineType = EngineType,
                Debug = AdvancedOptions.DebugMode != DebugMode.None,
                AwaitDebugger = AdvancedOptions.DebugMode == DebugMode.DebugAndAwait,
                BeforeStart = AdvancedOptions.BeforeStart.Invoke,
                AfterStart = AdvancedOptions.AfterStart.Invoke,
                Pooling = AdvancedOptions.Pooling,
                UnknownPropertyHandling = AdvancedOptions.UnknownPropertyHandling,
            });
            ctx.Initialize();
            return ctx;
        }

        public void PlayAudio(AudioClip clip)
        {
            var source = GetComponent<AudioSource>();
            source.PlayOneShot(clip);
        }

        protected override IMediaProvider CreateMediaProvider()
        {
            return DefaultMediaProvider.CreateMediaProvider("runtime", "uitoolkit", false);
        }
    }
}
#endif
