using ReactUnity.Editor.Renderer.Components;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public class EditorContext : ReactContext
    {
        public EditorContext(VisualElement hostElement, StringObjectDictionary globals, ReactScript script, IUnityScheduler scheduler, bool isDevServer)
            : base(globals, script, scheduler, isDevServer)
        {
            Host = new EditorReactComponent(hostElement, this, "_root");
            Host.ResolveStyle(true);

            EditorDispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    Scheduled = false;

                    for (int i = 0; i < ScheduledCallbacks.Count; i++)
                        ScheduledCallbacks[i]?.Invoke();
                }
            });
        }
    }
}
