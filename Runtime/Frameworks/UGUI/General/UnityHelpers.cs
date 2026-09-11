using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.UGUI
{
    internal static class UnityHelpers
    {
        public static T ConvertToComponent<T>(object value, bool searchParent = false, bool searchChildren = false) where T : Component
        {
            if (value is T c) return c;

            if (searchParent)
            {
                if (value is GameObject g) return g.GetComponentInParent<T>();
                if (value is Component p) return p.GetComponentInParent<T>();
                if (value is UGUIComponent u) return u.GameObject.GetComponentInParent<T>();
            }
            else if (searchChildren)
            {
                if (value is GameObject g) return g.GetComponentInChildren<T>();
                if (value is Component p) return p.GetComponentInChildren<T>();
                if (value is UGUIComponent u) return u.GameObject.GetComponentInChildren<T>();
            }
            else
            {
                if (value is GameObject g) return g.GetComponent<T>();
                if (value is Component p) return p.GetComponent<T>();
                if (value is UGUIComponent u) return u.GameObject.GetComponent<T>();
            }

            return null;
        }


        public static void SetLayersRecursively(Transform transform, int layer)
        {
            transform.gameObject.layer = layer;

            if (transform.childCount > 0)
            {
                foreach (Transform child in transform)
                {
                    child.gameObject.layer = layer;
                    SetLayersRecursively(child.transform, layer);
                }
            }
        }

        /// <summary>
        /// How many wheel ticks a scroll delta is. Only the input module knows, and they disagree: the
        /// legacy one reports one per tick and the input system's six, either being configurable.
        /// </summary>
        public static Vector2 WheelTicks(Vector2 delta)
        {
#if UNITY_2023_2_OR_NEWER
            var module = EventSystem.current?.currentInputModule;
            if (module != null) return module.ConvertPointerEventScrollDeltaToTicks(delta);
#endif
            // Without a module to ask, a delta is one per tick -- what the legacy one reports, and what
            // every module reported before the conversion above existed.
            return delta;
        }
    }
}
