using System;
using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.Events;

namespace ReactUnity.UGUI.Behaviours
{
    public class PrefabTarget : MonoBehaviour, IPrefabTarget
    {
        public PrefabComponent MountedTo;
        public PrefabEvent OnMount;
        public PrefabEvent OnUnmount;
        public SetPropertyEvent OnSetProperty;
        public SetEventListenerEvent OnSetEventListener;

        public virtual void Mount(PrefabComponent cmp)
        {
            MountedTo = cmp;
            OnMount?.Invoke(cmp, this);
        }

        public virtual void Unmount(PrefabComponent cmp)
        {
            OnUnmount?.Invoke(cmp, this);
            MountedTo = null;
        }

        public virtual Action AddEventListener(string eventName, Callback callback)
        {
            if (OnSetEventListener == null) return null;
            OnSetEventListener.Invoke(eventName, callback);
            return () => OnSetEventListener.Invoke(eventName, null);
        }

        public virtual bool SetProperty(string propertyName, object value)
        {
            OnSetProperty?.Invoke(propertyName, value);
            return OnSetProperty != null;
        }

        [Serializable]
        public class PrefabEvent : UnityEvent<PrefabComponent, PrefabTarget> { }
    }

    public interface IPrefabTarget
    {
        /// <summary>Called when a custom property of the component is added/changed</summary>
        /// <returns>True if property is handled by this handler</returns>
        bool SetProperty(string propertyName, object value);


        /// <summary>Called when an event of the component is added/changed</summary>
        /// <returns>True if event is handled by this handler</returns>
        Action AddEventListener(string eventName, Callback callback);

        /// <summary>Called when the target is mounted on the component</summary>
        void Mount(PrefabComponent cmp);

        /// <summary>Called when the target is unmounted off the component</summary>
        void Unmount(PrefabComponent cmp);
    }
}
