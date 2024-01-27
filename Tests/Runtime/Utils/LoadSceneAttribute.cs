using System.Collections;
using NUnit.Framework.Interfaces;
using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    public class LoadSceneAttribute : UnityTestAttribute, IOuterUnityTestAction
    {
        public virtual string DefaultSceneName => null;

        public string SceneName;

        public LoadSceneAttribute()
        {
            SceneName = DefaultSceneName;
        }

        public virtual IEnumerator BeforeTest(ITest test)
        {
            yield return Initialize(SceneName);
        }

        public static IEnumerator Initialize(string scene)
        {
            Debug.Assert(scene.FastEndsWith(".unity"), "The scene file must be an absolue path ending with .unity");
#if UNITY_EDITOR
            yield return UnityEditor.SceneManagement.EditorSceneManager.LoadSceneAsyncInPlayMode(scene, new LoadSceneParameters(LoadSceneMode.Single));
#else
            yield return SceneManager.LoadSceneAsync(scene);
#endif
        }

        public static IEnumerator TearDown(string scene)
        {
            Debug.Assert(scene.FastEndsWith(".unity"), "The scene file must be an absolue path ending with .unity");
#if UNITY_EDITOR
            yield return UnityEditor.SceneManagement.EditorSceneManager.UnloadSceneAsync(scene);
#else
            yield return SceneManager.UnloadSceneAsync(scene);
#endif
        }

        public virtual IEnumerator AfterTest(ITest test)
        {
            yield return null;
        }
    }
}
