#if UNITY_2021_2_OR_NEWER
using System.Collections.Generic;
using ReactUnity.Scheduling;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    [RequireComponent(typeof(UIDocument))]
    [RequireComponent(typeof(AudioSource))]
    public class ReactRendererUIToolkit : ReactRendererBase
    {
        public VisualElement Root => GetComponent<UIDocument>()?.rootVisualElement;
        public IconSet DefaultIconSet;
        public List<IconSet> IconSets;

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
                Timer = Timer ?? UnscaledTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = () => Render(),
                IconSets = IconSets,
                DefaultIconSet = DefaultIconSet,
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

        public void PlayAudio(AudioClip clip, float volume, float pitch)
        {
            var source = GetComponent<AudioSource>();
            source.pitch = pitch;
            source.PlayOneShot(clip, volume);
        }

        protected override IMediaProvider CreateMediaProvider()
        {
            return DefaultMediaProvider.CreateMediaProvider("runtime", "uitoolkit", false);
        }
    }
}
#endif
