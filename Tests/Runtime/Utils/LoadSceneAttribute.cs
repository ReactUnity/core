using NUnit.Framework;
using NUnit.Framework.Interfaces;
using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    public class LoadSceneAttribute : NUnitAttribute, IOuterUnityTestAction
    {
        protected string scene;

        public LoadSceneAttribute(string scene) => this.scene = scene;

        public virtual IEnumerator BeforeTest(ITest test)
        {
            Debug.Assert(scene.EndsWith(".unity"), "The scene file must be an absolue path ending with .unity");
#if UNITY_EDITOR
            yield return UnityEditor.SceneManagement.EditorSceneManager.LoadSceneAsyncInPlayMode(scene, new LoadSceneParameters(LoadSceneMode.Single));
#else
            yield return SceneManager.LoadSceneAsync(scene);
#endif
        }

        public virtual IEnumerator AfterTest(ITest test)
        {
            yield return null;
        }
    }
}
