using System.Collections.Generic;
using UnityEngine;
using Jint;
using ReactUnity.Components;
using ReactUnity.Types;
using Facebook.Yoga;
using ReactUnity.Interop;

namespace ReactUnity
{
    public class UnityUGUIContext
    {
        public Engine Engine { get; }
        public HostComponent Host { get; }
        public StringObjectDictionary NamedAssets { get; private set; }
        public YogaNode RootLayoutNode { get; }

        private bool Scheduled = false;
        private List<System.Action> ScheduledCallbacks = new List<System.Action>();

        public UnityUGUIContext(RectTransform hostElement, Engine engine, StringObjectDictionary assets)
        {
            Engine = engine;
            NamedAssets = assets;
            Host = new HostComponent(hostElement, this);
            RootLayoutNode = Host.Layout;

            MainThreadDispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    RootLayoutNode.CalculateLayout();
                    Scheduled = false;

                    for (int i = 0; i < ScheduledCallbacks.Count; i++)
                        ScheduledCallbacks[i]?.Invoke();

                    Canvas.ForceUpdateCanvases();
                }
            });
        }


        public void scheduleLayout(System.Action callback = null)
        {
            Scheduled = true;
            ScheduledCallbacks.Add(callback);
        }
    }
}
