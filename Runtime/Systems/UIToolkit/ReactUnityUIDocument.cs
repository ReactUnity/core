using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    [RequireComponent(typeof(UIDocument))]
    [RequireComponent(typeof(AudioSource))]
    public class ReactUnityUIDocument : ReactUnityBase
    {
        public VisualElement Root => GetComponent<UIDocument>()?.rootVisualElement;

        protected override void CleanRoot()
        {
            Root?.Clear();
        }

        protected override ReactContext CreateContext(ReactScript script, bool isDevServer)
        {
            return new UIToolkitContext(Root, Globals, script, dispatcher, scheduler, MediaProvider, isDevServer, Render, PlayAudio);
        }

        public void PlayAudio(AudioClip clip)
        {
            var source = GetComponent<AudioSource>();
            source.PlayOneShot(clip);
        }
    }
}
