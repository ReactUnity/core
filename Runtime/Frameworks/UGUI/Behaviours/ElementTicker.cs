using System;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    internal interface ITicked
    {
        /// <summary>Where it sits in its <see cref="TickGroup"/>, or -1. Owned by the group.</summary>
        int TickIndex { get; set; }

        void Tick();
    }

    /// <summary>
    /// Calls a per-element callback for every enabled element from one MonoBehaviour.
    /// </summary>
    /// <remarks>
    /// Unity's own dispatch of an Update costs more than an idle element spends in it, and a page has
    /// hundreds of them -- 584 ReactElements and 286 TextMeasurers on a settled kitchen-sink page. Each
    /// group has a driver of its own, so a callback keeps the execution order it was declared with.
    /// </remarks>
    internal class TickGroup
    {
        private readonly List<ITicked> items = new List<ITicked>();
        private readonly Type driverType;
        private MonoBehaviour driver;

        public TickGroup(Type driverType) => this.driverType = driverType;

        public int Count => items.Count;

        public void Add(ITicked item)
        {
            if (item.TickIndex >= 0) return;
            item.TickIndex = items.Count;
            items.Add(item);
            if (!driver) CreateDriver();
        }

        public void Remove(ITicked item)
        {
            var index = item.TickIndex;
            if (index < 0) return;
            item.TickIndex = -1;

            var last = items.Count - 1;
            if (index != last)
            {
                items[index] = items[last];
                items[index].TickIndex = index;
            }
            items.RemoveAt(last);
        }

        public void Run()
        {
            // Backwards, so an element leaving mid-run only moves one that has already run.
            for (int i = items.Count - 1; i >= 0; i--)
            {
                if (i >= items.Count) continue;
                try { items[i].Tick(); }
                catch (Exception e) { Debug.LogException(e); }
            }
        }

        void CreateDriver()
        {
            if (!Application.isPlaying) return;
            var go = new GameObject("[ReactUnity " + driverType.Name + "]");
            go.hideFlags = HideFlags.HideInHierarchy | HideFlags.NotEditable;
            UnityEngine.Object.DontDestroyOnLoad(go);
            driver = (MonoBehaviour) go.AddComponent(driverType);
        }
    }

    [AddComponentMenu("")]
    [DefaultExecutionOrder(-10)]
    internal class ReactElementTicker : MonoBehaviour
    {
        public static readonly TickGroup Group = new TickGroup(typeof(ReactElementTicker));

        void LateUpdate() => Group.Run();
    }

    [AddComponentMenu("")]
    [DefaultExecutionOrder(-8)]
    internal class TextMeasurerTicker : MonoBehaviour
    {
        public static readonly TickGroup Group = new TickGroup(typeof(TextMeasurerTicker));

        void Update() => Group.Run();
    }
}
