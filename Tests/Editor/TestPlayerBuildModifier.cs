using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.TestTools;

[assembly: TestPlayerBuildModifier(typeof(ReactUnity.Editor.Tests.TestPlayerBuildModifier))]
namespace ReactUnity.Editor.Tests
{
    public class TestPlayerBuildModifier : ITestPlayerBuildModifier
    {
        public BuildPlayerOptions ModifyOptions(BuildPlayerOptions playerOptions)
        {
            playerOptions.scenes = new HashSet<string>(playerOptions.scenes) {
                "Packages/com.reactunity.core/Tests/Runtime/TestScene.unity",
                "Packages/com.reactunity.core/Tests/Runtime/TestScene_World.unity",
            }.ToArray();
            return playerOptions;
        }
    }
}
