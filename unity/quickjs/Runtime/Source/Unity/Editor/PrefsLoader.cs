#if !JSB_UNITYLESS
using System;
using System.IO;

namespace QuickJS.Unity
{
    using UnityEngine;
    using UnityEditor;
    using QuickJS.Binding;

    public class PrefsLoader
    {
        private static PrefsLoader _loader;

        public static Action<Prefs> prefsChanged;

        private FileSystemWatcher _prefsWatcher;
        private float _changedFileInterval;
        private int _changedEvent;

        private Prefs _prefs;

        public static Prefs CurrentPrefs { get { return GetInstance()._prefs; } }

        public static PrefsLoader GetInstance()
        {
            if (_loader == null)
            {
                _loader = new PrefsLoader();
                _loader.Initialize();
            }
            return _loader;
        }

        private PrefsLoader()
        {
        }

        private static Prefs LoadPrefs()
        {
            string filePath;
            return LoadPrefs(out filePath);
        }

        private static Prefs LoadPrefs(out string filePath)
        {
            if (File.Exists(Prefs.PATH))
            {
                try
                {
                    var json = Utils.TextUtils.NormalizeJson(File.ReadAllText(Prefs.PATH));
                    Debug.Log($"load prefs({Prefs.PATH}): {json}");
                    var prefs = JsonUtility.FromJson<Prefs>(json);
                    filePath = Prefs.PATH;
                    prefs.filePath = filePath;
                    if (string.IsNullOrEmpty(prefs.typescriptDir))
                    {
                        prefs.typescriptDir = prefs.outDir;
                    }
                    return prefs;
                }
                catch (Exception exception)
                {
                    Debug.LogWarning(exception);
                }
            }
            Debug.Log($"load prefs in memory");
            var defaultPrefs = new Prefs();
            filePath = Prefs.PATH;
            return defaultPrefs;
        }

        private void Initialize()
        {
            _prefs = LoadPrefs();
            _prefsWatcher = new FileSystemWatcher(".", Prefs.PATH);
            _prefsWatcher.Changed += OnFileChanged;
            _prefsWatcher.Created += OnFileChanged;
            _prefsWatcher.Deleted += OnFileChanged;
            _prefsWatcher.EnableRaisingEvents = true;
            EditorApplication.update += OnPrefsSync;
        }

        private void OnPrefsSync()
        {
            if (!UnityHelper.IsApplicationActive())
            {
                return;
            }

            _changedFileInterval += Time.realtimeSinceStartup;
            if (_changedFileInterval < 3f)
            {
                return;
            }

            _changedFileInterval = 0f;
            if (System.Threading.Interlocked.Exchange(ref _changedEvent, 0) > 0)
            {
                _prefs = LoadPrefs();
                try
                {
                    prefsChanged?.Invoke(_prefs);
                }
                catch (Exception exception)
                {
                    Debug.LogErrorFormat("OnPrefsChanged: {0}\n{1}", exception.Message, exception.StackTrace);
                }
            }
        }

        private void OnFileChanged(object sender, FileSystemEventArgs e)
        {
            var changedFile = e.FullPath;
            var fullPath1 = Path.GetFullPath(changedFile);
            var fullPath2 = Path.GetFullPath(Prefs.PATH);

            if (string.Compare(fullPath1, fullPath2, true) == 0)
            {
                System.Threading.Interlocked.Exchange(ref _changedEvent, 1);
            }
        }
    }
}
#endif // !JSB_UNITYLESS