using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ResourcesHelper
    {
        private static Sprite checkBoxSprite;
        public static Sprite CheckBoxSprite => checkBoxSprite ??= Resources.Load<Sprite>("ReactUnity/sprites/checkbox");

        private static Sprite checkSprite;
        public static Sprite CheckSprite => checkSprite ??= Resources.Load<Sprite>("ReactUnity/sprites/check");

        private static TextAsset useragentStylesheet;
        public static TextAsset UseragentStylesheet => useragentStylesheet ??= Resources.Load<TextAsset>("ReactUnity/styles/ugui/useragent");

        private static Material borderRadiusMaterial;
        public static Material BorderRadiusMaterial => borderRadiusMaterial ??= Resources.Load<Material>("ReactUnity/materials/RoundedBorder");

        private static Material coloredBorderMaterial;
        public static Material ColoredBorderMaterial => coloredBorderMaterial ??= Resources.Load<Material>("ReactUnity/materials/RoundedColoredBorder");

        private static Material boxShadowMaterial;
        public static Material BoxShadowMaterial => boxShadowMaterial ??= Resources.Load<Material>("ReactUnity/materials/RoundedBoxShadow");


        private static Dictionary<string, TextAsset> Polyfills = new Dictionary<string, TextAsset>();

        public static string GetPolyfill(string name)
        {
            if (Polyfills.TryGetValue(name, out var asset)) return asset.text;
            var loaded = Resources.Load<TextAsset>("ReactUnity/polyfills/" + name);

            if (loaded == null) throw new System.Exception($"Polyfill {name} does not exist");
            Polyfills[name] = loaded;
            return loaded.text;
        }


        [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public static string GetVersion()
        {
#if UNITY_EDITOR
            try
            {
                var packageInfo = UnityEditor.PackageManager.PackageInfo.FindForAssembly(typeof(ReactUnityBridge).Assembly);
                if (packageInfo != null) return packageInfo.version;
            }
            catch (System.Exception ex)
            {
                Debug.LogException(ex);
            }
#endif
            return null;
        }
    }
}
