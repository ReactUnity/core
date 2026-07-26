using System;
using System.Collections.Generic;
using UnityEngine;
using ReactUnity.Helpers;

namespace ReactUnity.Styling
{
    public interface IAssetPool
    {
        public SerializableDictionary Assets { get; }
    }

    [CreateAssetMenu(fileName = "AssetPool", menuName = "React Unity/Asset Pool", order = 1)]
    public class AssetPool : ScriptableObject, IAssetPool
    {
        [SerializeField]
        private SerializableDictionary assets = new SerializableDictionary();
        public SerializableDictionary Assets => assets;
    }
}
