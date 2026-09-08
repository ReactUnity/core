#if REACT_UNITY_DEVELOPER && REACT_UNITY_PIPELINE
using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using Unity.Pipeline.Commands;

namespace ReactUnity.Editor.Developer
{
    /// <summary>
    /// The Typescript model presets as CLI commands, so a regeneration is one call against an open
    /// Editor rather than a menu item somebody has to remember. The generated models are only ever
    /// as current as the last run, and a run that needs a human does not happen.
    /// </summary>
    [ExcludeFromCodeCoverage]
    public static class TypescriptModelsCommands
    {
        [CliCommand("generate_models", "Regenerate the Typescript models: one preset, or all of them")]
        public static string GenerateModels(
            [CliArg("directory", "Directory to write into, absolute or relative to the project")] string directory,
            [CliArg("preset", "react, unity, editor, yoga, system, tests, or all")] string preset = "react")
        {
            if (string.IsNullOrWhiteSpace(directory)) throw new ArgumentException("A directory is required", nameof(directory));

            directory = Path.GetFullPath(directory);
            Directory.CreateDirectory(directory);

            string File(string name) => Path.Combine(directory, name);

            switch ((preset ?? "react").Trim().ToLowerInvariant())
            {
                case "react": return TypescriptModelsGeneratorPresets.GenerateReactUnity(File("react.ts"));
                case "unity": return TypescriptModelsGeneratorPresets.GenerateUnity(File("unity.ts"));
                case "editor": return TypescriptModelsGeneratorPresets.GenerateEditor(File("editor.ts"));
                case "yoga": return TypescriptModelsGeneratorPresets.GenerateYoga(File("yoga.ts"));
                case "system": return TypescriptModelsGeneratorPresets.GenerateSystem(File("system.ts"));
                case "tests": return TypescriptModelsGeneratorPresets.GenerateNUnit(File("tests.ts"));
                case "all": return TypescriptModelsGeneratorPresets.GenerateAll(directory);
                default: throw new ArgumentException($"Unknown preset '{preset}'", nameof(preset));
            }
        }
    }
}
#endif
