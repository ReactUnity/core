using System.Collections.Generic;
using UnityEngine;
using Jint;
using ReactUnity.Components;
using ReactUnity.Types;
using Facebook.Yoga;
using ReactUnity.Interop;
using ExCSS;
using System.Linq;
using ReactUnity.StyleEngine;
using System.IO;
using ReactUnity.Styling;
using System.Text.RegularExpressions;
using ReactUnity.Helpers;
using ReactUnity.Schedulers;

namespace ReactUnity
{
    public class UGUIContext : ReactContext
    {
        public YogaNode RootLayoutNode { get; }

        public UGUIContext(RectTransform hostElement, StringObjectDictionary globals, ReactScript script, IUnityScheduler scheduler, bool isDevServer)
            : base(globals, script, scheduler, isDevServer)
        {
            Host = new HostComponent(hostElement, this);
            RootLayoutNode = Host.Layout;

            InsertStyle(ResourcesHelper.UseragentStylesheet?.text, -1);
            Host.ResolveStyle(true);

            MainThreadDispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    RootLayoutNode.CalculateLayout();
                    Scheduled = false;

                    for (int i = 0; i < ScheduledCallbacks.Count; i++)
                        ScheduledCallbacks[i]?.Invoke();
                }
            });
        }
    }
}
