using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.TestTools;

[assembly: TestPlayerBuildModifier(typeof(ReactUnity.Tests.Editor.TestPlayerBuildModifier))]
namespace ReactUnity.Tests.Editor
{
    public class TestPlayerBuildModifier : ITestPlayerBuildModifier
    {
        public BuildPlayerOptions ModifyOptions(BuildPlayerOptions playerOptions)
        {
            playerOptions.scenes = new HashSet<string>(playerOptions.scenes) {
                "Packages/com.reactunity.core/Tests/Scenes/TestScene_UGUI.unity",
                "Packages/com.reactunity.core/Tests/Scenes/TestScene_Noop.unity",
                "Packages/com.reactunity.core/Tests/Scenes/TestScene_UIToolkit.unity",
                "Packages/com.reactunity.core/Tests/Scenes/TestScene_World.unity",
            }.ToArray();
            return playerOptions;
        }
    }
}
