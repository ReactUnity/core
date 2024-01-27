using System;
using ReactUnity.Helpers;
using ReactUnity.UGUI.Behaviours;
using ReactUnity.UGUI.Measurers;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class PrefabComponent : UGUIComponent
    {
        GameObject currentTarget;
        public GameObject Instance { get; private set; }
        private RectTransform instanceTransform;
        public RectTransform InstanceTransform
        {
            get => instanceTransform;
            private set
            {
                if (value != instanceTransform)
                {
                    instanceTransform = value;
                    if (value)
                    {
                        Measurer = value.gameObject.AddComponent<IntrinsicMeasurer>();
                        Measurer.Layout = Layout;
                        Layout.SetMeasureFunction(Measurer.Measure);
                    }
                    else
                    {
                        GameObject.Destroy(Measurer);
                        Measurer = null;
                        Layout.SetMeasureFunction(IntrinsicMeasurer.NoopMeasure);
                    }
                }
            }
        }
        private Transform InstanceParent;
        private bool InstanceWasPrefab;
        IPrefabTarget TargetHandler;

        public IntrinsicMeasurer Measurer { get; private set; }

        public PrefabComponent(UGUIContext context, string tag = "prefab") : base(context, tag, false)
        {
        }

        void SetTarget(GameObject target)
        {
            if (currentTarget == target) return;

            DetachInstance();

            currentTarget = target;

            if (currentTarget)
            {
                ResolveInstance();

                Instance.transform.SetParent(Container, false);
                TargetHandler?.Mount(this);
                FireEvent("onMount", currentTarget);
            }

            Layout?.MarkDirty();
        }

        void ResolveInstance()
        {
            if (!currentTarget) return;

            var isPrefab = currentTarget.scene.rootCount == 0;

            if (isPrefab)
            {
                Instance = null;
#if UNITY_EDITOR
                Instance = UnityEditor.PrefabUtility.InstantiatePrefab(currentTarget, Container) as GameObject;
#endif
                if (!Instance) Instance = GameObject.Instantiate(currentTarget);
                InstanceParent = null;
                InstanceWasPrefab = true;
            }
            else
            {
                Instance = currentTarget;
                InstanceParent = currentTarget.transform.parent;
                InstanceWasPrefab = false;
            }
            InstanceTransform = Instance.transform as RectTransform;

            var prevHandler = TargetHandler;
            TargetHandler = Instance.GetComponent<IPrefabTarget>();

            if (prevHandler != TargetHandler && TargetHandler != null && CustomProperties != null)
            {
                foreach (var kv in CustomProperties)
                {
                    TargetHandler.SetProperty(kv.Key, kv.Value);
                }
            }
        }

        void DetachInstance()
        {
            if (currentTarget)
            {
                TargetHandler?.Unmount(this);
                FireEvent("onUnmount", currentTarget);
                currentTarget = null;
                TargetHandler = null;

                if (Instance)
                {
                    if (InstanceWasPrefab) GameObject.Destroy(Instance);
                    else Instance.transform.SetParent(InstanceParent, false);
                }
                Instance = null;
                InstanceTransform = null;
                InstanceParent = null;
            }
        }

        GameObject FindTarget(object value)
        {
            if (value == null) return null;
            if (value is GameObject g && g) return g;
            if (value is Component c && c) return c.gameObject;
            return null;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "target":
                    SetTarget(FindTarget(value));
                    break;
                default:
                    var handled = false;

                    if (!propertyName.FastStartsWith("custom-"))
                    {
                        handled = TargetHandler != null ? TargetHandler.SetProperty(propertyName, value) : false;

                        // TODO: Remove warning when deprecated
                        if (handled)
                            Debug.LogWarning("This way of assigning properties to prefab handler is deprecated and will be removed in future versions. " +
                                "Custom prefab properties must now have 'custom-' prefix. " +
                                $"Instead of '{propertyName}', use custom-'{propertyName}'");
                    }

                    if (!handled) base.SetProperty(propertyName, value);

                    break;
            }
        }

        public override void SetCustomProperty(string propertyName, object value)
        {
            base.SetCustomProperty(propertyName, value);

            if (TargetHandler != null) TargetHandler.SetProperty(propertyName, value);
        }

        public override Action AddEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                default:
                    var handled = TargetHandler != null ? TargetHandler.AddEventListener(eventName, callback) : null;
                    if (handled == null) return base.AddEventListener(eventName, callback);
                    return handled;
            }
        }

        protected override void DestroySelf()
        {
            DetachInstance();
            base.DestroySelf();
        }
    }
}
