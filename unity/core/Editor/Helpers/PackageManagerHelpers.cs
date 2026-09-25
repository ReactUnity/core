using System.Collections.Generic;
using System.IO;
using System.Text;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Editor
{
    public static class PackageManagerHelpers
    {
        public static string ManifestPath = Path.Combine(Application.dataPath, "..", "Packages", "manifest.json");

        public static void AddScopedRegistry(string name, string url, params string[] scopesToAdd)
        {
            var manifest = JsonReader.Parse(File.ReadAllText(ManifestPath)) as JsonObject;
            if (manifest == null) throw new InvalidDataException($"{ManifestPath} does not contain a JSON object");

            SaveManifest(AddScopedRegistry(manifest, name, url, scopesToAdd));
        }

        private static JsonObject AddScopedRegistry(JsonObject manifest, string name, string url, params string[] scopesToAdd)
        {
            var registries = manifest["scopedRegistries"] as List<object>;

            if (registries == null)
            {
                registries = new List<object>();
                manifest["scopedRegistries"] = registries;
            }

            JsonObject foundReg = null;

            foreach (var regt in registries)
            {
                if (regt is JsonObject reg && reg["name"] as string == name && reg["url"] as string == url)
                {
                    foundReg = reg;
                    break;
                }
            }

            if (foundReg == null)
            {
                foundReg = new JsonObject();
                foundReg["name"] = name;
                foundReg["url"] = url;
                foundReg["scopes"] = new List<object>();
                registries.Add(foundReg);
            }

            var scopes = foundReg["scopes"] as List<object>;

            if (scopes == null)
            {
                scopes = new List<object>();
                foundReg["scopes"] = scopes;
            }

            foreach (var scope in scopesToAdd)
            {
                if (!scopes.Contains(scope)) scopes.Add(scope);
            }

            return manifest;
        }

        private static void SaveManifest(JsonObject manifest)
        {
            File.WriteAllText(ManifestPath, JsonWriter.Write(manifest) + "\n", new UTF8Encoding(false));
        }
    }
}
