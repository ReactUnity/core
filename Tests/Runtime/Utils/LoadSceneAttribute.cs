using System.Collections;
using System.Collections.Generic;
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

        /// <summary>Reloads the scene for this test instead of resetting the one already open.</summary>
        ///
        /// A single-mode load is ~0.5 s of Unity machinery -- the asset unload sweep it forces is
        /// charged against every loaded object, so it got slower the longer the suite ran, and 1330
        /// of them were four fifths of the whole PlayMode run. Resetting is a handful of destroys and
        /// assignments. Set this on a test whose leftovers <see cref="ResetLoadedScene"/> cannot
        /// undo; the ones it does handle are an object destroyed, added, moved or resized.
        public bool ReloadScene;

        public LoadSceneAttribute()
        {
            SceneName = DefaultSceneName;
        }

        public virtual IEnumerator BeforeTest(ITest test)
        {
            yield return Initialize(SceneName, ReloadScene);
        }

        /// <summary>Everything a fresh load leaves behind, recorded so it can be put back.</summary>
        private struct ObjectState
        {
            public GameObject Go;
            public Transform Transform;
            public RectTransform Rect;
            public bool Active;
            public Vector3 Position;
            public Quaternion Rotation;
            public Vector3 Scale;
            public Vector2 AnchorMin;
            public Vector2 AnchorMax;
            public Vector2 AnchoredPosition;
            public Vector2 SizeDelta;
            public Vector2 Pivot;
        }

        private static string loadedScene;
        private static readonly List<ObjectState> pristine = new List<ObjectState>();
        private static readonly List<Object> pristineObjects = new List<Object>();

        public static IEnumerator Initialize(string scene) => Initialize(scene, false);

        public static IEnumerator Initialize(string scene, bool forceReload)
        {
            Debug.Assert(scene.FastEndsWith(".unity"), "The scene file must be an absolue path ending with .unity");

            if (!forceReload && ResetLoadedScene(scene)) yield break;

            loadedScene = null;
#if UNITY_EDITOR
            yield return UnityEditor.SceneManagement.EditorSceneManager.LoadSceneAsyncInPlayMode(scene, new LoadSceneParameters(LoadSceneMode.Single));
#else
            yield return SceneManager.LoadSceneAsync(scene);
#endif
            RecordPristineState(scene);
        }

        /// <summary>Puts the open scene back the way a fresh load would leave it, or gives up.</summary>
        ///
        /// Only what the scene itself shipped is tracked. Everything a test builds hangs off
        /// REACT_ROOT, which the renderer clears on the next Render(); what is left is an object the
        /// test added at the root (a portal target, a filter's offscreen surface) or a property it
        /// wrote on one the scene owns -- LayoutTests resizes REACT_ROOT to drive `vw`. Anything the
        /// scene shipped and the test destroyed, such as the renderer FilterTests deletes, can only
        /// come back from a load, so a dead reference falls back to one.
        private static bool ResetLoadedScene(string scene)
        {
            if (loadedScene != scene) return false;

            var active = SceneManager.GetActiveScene();
            if (!active.isLoaded) return false;

            foreach (var obj in pristineObjects)
                if (!obj) return false;

            foreach (var go in active.GetRootGameObjects())
            {
                var known = false;
                foreach (var state in pristine)
                    if (state.Go == go) { known = true; break; }
                if (!known) Object.DestroyImmediate(go);
            }

            foreach (var state in pristine)
            {
                var tr = state.Transform;
                tr.localPosition = state.Position;
                tr.localRotation = state.Rotation;
                tr.localScale = state.Scale;

                if (state.Rect)
                {
                    state.Rect.anchorMin = state.AnchorMin;
                    state.Rect.anchorMax = state.AnchorMax;
                    state.Rect.pivot = state.Pivot;
                    state.Rect.anchoredPosition = state.AnchoredPosition;
                    state.Rect.sizeDelta = state.SizeDelta;
                }

                if (state.Go.activeSelf != state.Active) state.Go.SetActive(state.Active);
            }

            return true;
        }

        private static void RecordPristineState(string scene)
        {
            pristine.Clear();
            pristineObjects.Clear();
            var active = SceneManager.GetActiveScene();
            if (!active.isLoaded) return;

            foreach (var root in active.GetRootGameObjects())
            {
                foreach (var tr in root.GetComponentsInChildren<Transform>(true))
                {
                    var rect = tr as RectTransform;
                    pristine.Add(new ObjectState
                    {
                        Go = tr.gameObject,
                        Transform = tr,
                        Rect = rect,
                        Active = tr.gameObject.activeSelf,
                        Position = tr.localPosition,
                        Rotation = tr.localRotation,
                        Scale = tr.localScale,
                        AnchorMin = rect ? rect.anchorMin : default,
                        AnchorMax = rect ? rect.anchorMax : default,
                        AnchoredPosition = rect ? rect.anchoredPosition : default,
                        SizeDelta = rect ? rect.sizeDelta : default,
                        Pivot = rect ? rect.pivot : default,
                    });
                    pristineObjects.Add(tr.gameObject);
                }

                foreach (var cmp in root.GetComponentsInChildren<Component>(true)) pristineObjects.Add(cmp);
            }
            loadedScene = scene;
        }

        public static IEnumerator TearDown(string scene)
        {
            Debug.Assert(scene.FastEndsWith(".unity"), "The scene file must be an absolue path ending with .unity");
            loadedScene = null;
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
