using System.IO;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace ReactUnity.Editor
{
    public static class PackageManagerHelpers
    {
        public static string ManifestPath = Path.Combine(Application.dataPath, "..", "Packages", "manifest.json");

        public static void AddScopedRegistry(string name, string url, params string[] scopesToAdd)
        {
            var manifest = JObject.Parse(File.ReadAllText(ManifestPath));
            var registries = manifest["scopedRegistries"] as JArray;

            if (registries == null)
            {
                registries = new JArray();
                manifest["scopedRegistries"] = registries;
            }

            JObject foundReg = null;

            foreach (var regt in registries)
            {
                if (regt is JObject reg)
                {
                    if (reg["name"]?.ToString() == name && reg["url"]?.ToString() == url)
                    {
                        foundReg = reg;
                        break;
                    }
                }
            }

            if (foundReg == null)
            {
                foundReg = new JObject();
                foundReg["name"] = name;
                foundReg["url"] = url;
                foundReg["scopes"] = new JArray();
                registries.Add(foundReg);
            }

            var scopes = foundReg["scopes"] as JArray;

            if (scopes == null)
            {
                scopes = new JArray();
                foundReg["scopes"] = scopes;
            }

            foreach (var scope in scopesToAdd)
            {
                var exists = false;

                foreach (var item in scopes)
                {
                    if (item.ToString() == scope)
                    {
                        exists = true;
                        break;
                    }
                }

                if (!exists) scopes.Add(scope);
            }

            SaveManifest(manifest);
        }

        private static void SaveManifest(JObject manifest)
        {
            var utf8WithoutBom = new UTF8Encoding(false);

            using (var fileStream = new FileStream(ManifestPath, FileMode.Create, FileAccess.ReadWrite))
            {
                using (var streamWriter = new StreamWriter(fileStream, utf8WithoutBom)
                {
                    NewLine = "\n",
                })
                {
                    using (var jsonWriter = new JsonTextWriter(streamWriter)
                    {
                        CloseOutput = true,
                        Indentation = 2,
                        Formatting = Formatting.Indented,
                    })
                    {
                        manifest.WriteTo(jsonWriter);
                        streamWriter.WriteLine();
                    }
                }
            }
        }
    }
}
