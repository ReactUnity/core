using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using UnityEngine;

namespace ReactUnity.Interop
{
    public class AdaptiveDispatcher : MonoBehaviour
    {
        private static bool Playing;

        public static void Initialize()
        {
            Playing = Application.isPlaying;
            if (Playing) MainThreadDispatcher.Initialize();
            else EditorDispatcher.Initialize();
        }

        static public void AddCallOnLateUpdate(Action call)
        {
            if (Playing) MainThreadDispatcher.AddCallOnLateUpdate(call);
            else EditorDispatcher.AddCallOnLateUpdate(call);
        }

        static public int OnUpdate(Action callback)
        {
            if (Playing) return MainThreadDispatcher.OnUpdate(callback);
            else return EditorDispatcher.OnUpdate(callback);
        }

        static public int Timeout(Action callback, float timeSeconds)
        {
            if (Playing) return MainThreadDispatcher.Timeout(callback, timeSeconds);
            else return EditorDispatcher.Timeout(callback, timeSeconds);
        }

        static public int AnimationFrame(Action callback)
        {
            if (Playing) return MainThreadDispatcher.AnimationFrame(callback);
            else return EditorDispatcher.AnimationFrame(callback);
        }

        static public int Interval(Action callback, float intervalSeconds)
        {
            if (Playing) return MainThreadDispatcher.Interval(callback, intervalSeconds);
            else return EditorDispatcher.Interval(callback, intervalSeconds);
        }

        static public int Immediate(Action callback)
        {
            if (Playing) return MainThreadDispatcher.Immediate(callback);
            else return EditorDispatcher.Immediate(callback);
        }

        static public int StartDeferred(IEnumerator cr)
        {
            if (Playing) return MainThreadDispatcher.StartDeferred(cr);
            else return EditorDispatcher.StartDeferred(cr);
        }

        static public int StartDeferred(IEnumerator cr, int handle)
        {
            if (Playing) return MainThreadDispatcher.StartDeferred(cr, handle);
            else return EditorDispatcher.StartDeferred(cr, handle);
        }

        static public void StopDeferred(int cr)
        {
            if (Playing) MainThreadDispatcher.StopDeferred(cr);
            else EditorDispatcher.StopDeferred(cr);
        }
    }
}
