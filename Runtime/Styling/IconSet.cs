using System;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Styling
{
    [CreateAssetMenu(fileName = "IconSet", menuName = "React Unity/Icon Set", order = 1)]
    public class IconSet : ScriptableObject
    {
        public string Name;
        [Tooltip("For UGUI Use")]
        public TMPro.TMP_FontAsset FontAsset;
        [Tooltip("For UIToolkit Use")]
        public UnityEngine.TextCore.Text.FontAsset ToolkitFontAsset;
        public TextAsset Codepoints;

        [NonSerialized]
        public Dictionary<string, string> CharacterMap;

        public string ConvertTextContent(string text)
        {
            if (CharacterMap == null) GenerateCharacterMap();

            if (text != null && CharacterMap.TryGetValue(text, out var mapped)) return mapped;
            return "";
        }

        private void GenerateCharacterMap()
        {
            CharacterMap = new Dictionary<string, string>();
            if (Codepoints == null) return;

            var lines = Codepoints.text.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

            var lineSplit = new[] { ' ' };

            foreach (var line in lines)
            {
                var split = line.Split(lineSplit, StringSplitOptions.RemoveEmptyEntries);

                if (split.Length != 2) continue;

                var name = split[0];
                var cp = split[1];

                var parsed = Convert.ToInt32(cp, 16);

                CharacterMap[name] = char.ConvertFromUtf32(parsed);
            }
        }

#if UNITY_EDITOR
        [ContextMenu("Generate Characters")]
        public void GenerateCharactersFromCharacterMap() {
            GenerateCharacterMap();

            var chars = new System.Text.StringBuilder();
            foreach (var pair in CharacterMap) {
                chars.Append(pair.Value);
            }

            var path = System.IO.Path.GetDirectoryName(UnityEditor.AssetDatabase.GetAssetPath(this));
            System.IO.File.WriteAllText(System.IO.Path.Combine(path, "characters.txt"), chars.ToString());

            //var range = string.Join(",", CharacterMap.Select(x => x.Value[0]).Distinct().OrderBy(x => x).Select(x => ((int) x).ToString("X")).ToArray());
            //System.IO.File.WriteAllText(System.IO.Path.Combine(path, "characters-range.txt"), range.ToString());
        }
#endif
    }
}
