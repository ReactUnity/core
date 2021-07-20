using System.Collections;
using UnityEditor;
using UnityEngine.TestTools;

namespace ReactUnity.Editor.Tests
{
    public class EditModeWaitForSeconds : IEditModeTestYieldInstruction
    {
        public bool ExpectDomainReload => false;

        public bool ExpectedPlaymodeState => false;

        float Time;

        public EditModeWaitForSeconds(float time)
        {
            Time = time;
        }

        public IEnumerator Perform()
        {
            var timeNow = EditorApplication.timeSinceStartup;

            while (true)
            {
                var diff = EditorApplication.timeSinceStartup - timeNow;
                if (diff < Time) yield return null;
                else yield break;
            }
        }
    }
}
