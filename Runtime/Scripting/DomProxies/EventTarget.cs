using System;
using System.Collections.Generic;
using ReactUnity.Helpers;

namespace ReactUnity.Scripting.DomProxies
{
    public class EventTarget
    {
        static private List<object> Empty = new List<object>();

        protected Dictionary<string, List<object>> HandlerLists = new Dictionary<string, List<object>>();
        protected Dictionary<string, object> SingleHandlers = new Dictionary<string, object>();

        public void SetEventListener(string eventName, object fun)
        {
            if (SingleHandlers.TryGetValue(eventName, out var remover))
            {
                RemoveEventListener(eventName, remover);
            }

            if (fun != null)
            {
                AddEventListener(eventName, fun);
                SingleHandlers[eventName] = fun;
            }
            else
            {
                SingleHandlers.Remove(eventName);
            }
        }

        public object GetEventListener(string eventName)
        {
            if (SingleHandlers.TryGetValue(eventName, out var remover)) return remover;
            return null;
        }

        public virtual List<object> GetAllEventListeners(string eventName)
        {
            if (HandlerLists.TryGetValue(eventName, out var existingHandlers))
            {
                return existingHandlers;
            }

            return Empty;
        }

        public virtual Action AddEventListener(string eventName, object fun)
        {
            if (!HandlerLists.TryGetValue(eventName, out var list))
                HandlerLists[eventName] = list = new List<object>();
            list.Add(fun);

            return () => list.Remove(fun);
        }

        public virtual void RemoveEventListener(string eventName, object fun)
        {
            if (HandlerLists.TryGetValue(eventName, out var list))
                list.Remove(fun);
        }

        public void DispatchEvent(string eventName, ReactContext context, params object[] arguments)
        {
            var handlers = GetAllEventListeners(eventName);
            foreach (var loadHandler in handlers)
                Callback.From(loadHandler, context).Call(arguments);
        }
    }
}
