using System;
using ReactUnity.Helpers;
using UnityEngine.Events;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI.Behaviours
{
    public class PrefabTarget : UIBehaviour, IPrefabTarget
    {
        public PrefabComponent MountedTo;
        public PrefabEvent OnMount;
        public PrefabEvent OnUnmount;
        public SetPropertyEvent OnSetProperty;
        public SetEventListenerEvent OnSetEventListener;

        protected override void OnRectTransformDimensionsChange()
        {
            MountedTo?.Layout?.MarkDirty();
        }

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
        /* Return true to notify that this property is handled */
        bool SetProperty(string propertyName, object value);

        /* Return true to notify that this event is handled */
        Action AddEventListener(string eventName, Callback callback);

        /* Callback called when the target is mounted on the component */
        void Mount(PrefabComponent cmp);

        /* Callback called when the target is unmounted off the component */
        void Unmount(PrefabComponent cmp);
    }
}
