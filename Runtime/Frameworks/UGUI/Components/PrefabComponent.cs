using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public class PrefabComponent : UGUIComponent
    {
        GameObject currentTarget;
        public GameObject Instance { get; private set; }
        private RectTransform InstanceTransform;
        private Transform InstanceParent;
        private bool InstanceWasPrefab;
        IPrefabTarget TargetHandler;

        Callback onMount;
        Callback onUnmount;

        public PrefabComponent(UGUIContext context, string tag = "prefab") : base(context, tag)
        {
            Layout.SetMeasureFunction(Measure);
        }

        private YogaSize Measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
        {
            if (!InstanceTransform) return new YogaSize { width = 0, height = 0 };

            return new YogaSize
            {
                width = InstanceTransform.rect.width,
                height = InstanceTransform.rect.height,
            };
        }

        void SetTarget(GameObject target)
        {
            if (currentTarget == target) return;

            if (currentTarget)
            {
                TargetHandler?.Unmount(this);
                onUnmount?.Call(currentTarget, this);
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

            currentTarget = target;

            if (currentTarget)
            {
                ResolveInstance();

                Instance.transform.SetParent(Container, false);
                TargetHandler?.Mount(this);
                onMount?.Call(currentTarget, this);
            }

            Relayout();
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

            TargetHandler = currentTarget.GetComponent<IPrefabTarget>();
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
                    var handled = TargetHandler != null ? TargetHandler.SetProperty(propertyName, value) : false;
                    if (!handled) base.SetProperty(propertyName, value);
                    break;
            }
        }

        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onMount":
                    onMount = callback;
                    return;
                case "onUnmount":
                    onUnmount = callback;
                    return;
                default:
                    var handled = TargetHandler != null ? TargetHandler.SetEventListener(eventName, callback) : false;
                    if (!handled) base.SetEventListener(eventName, callback);
                    return;
            }
        }
    }
}
