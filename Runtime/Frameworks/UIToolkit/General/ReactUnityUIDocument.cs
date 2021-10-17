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
            return new UIToolkitContext(new UIToolkitContext.Options
            {
                HostElement = Root,
                Globals = Globals,
                Source = script,
                Timer = timer ?? UnityTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = Render,
                OnAudioPlayback = PlayAudio,
                Debug = Debug,
                AwaitDebugger = AwaitDebugger,
                EngineType = EngineType,
                BeforeStart = BeforeStart.Invoke,
                AfterStart = AfterStart.Invoke,
            });
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
