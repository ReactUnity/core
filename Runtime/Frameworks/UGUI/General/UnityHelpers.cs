using System.Collections;
using System.Collections.Generic;
using UnityEngine;

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
    }
}
