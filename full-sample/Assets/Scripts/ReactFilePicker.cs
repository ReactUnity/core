using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class ReactFilePicker : MonoBehaviour
{
    public ReactUnity.ReactUnity React;

    private void Start()
    {
        if (React.Script.ScriptSource == ReactUnity.ScriptSource.File
            && !File.Exists(React.Script.SourcePath))
        {
            var newPath = SelectFileDialog.Open();

            if (newPath == null) return;

            React.Script.SourcePath = newPath;
        }

        React.enabled = true;
    }
}
