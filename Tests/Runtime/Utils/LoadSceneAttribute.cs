using NUnit.Framework;
using NUnit.Framework.Interfaces;
using System.Collections;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;

namespace ReactUnity.Tests.Utils
{
    public class LoadSceneAttribute : NUnitAttribute, IOuterUnityTestAction
    {
        protected string scene;

        public LoadSceneAttribute(string scene) => this.scene = scene;

        public virtual IEnumerator BeforeTest(ITest test)
        {
            Debug.Assert(scene.EndsWith(".unity"), "The scene file must be an absolue path ending with .unity");
            yield return EditorSceneManager.LoadSceneAsyncInPlayMode(scene, new LoadSceneParameters(LoadSceneMode.Single));
        }

        public virtual IEnumerator AfterTest(ITest test)
        {
            yield return null;
        }
    }
}
