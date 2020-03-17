using System;
using UnityEngine;
#if UNITY_STANDALONE_WIN || UNITY_EDITOR_WIN
using System.Runtime.InteropServices;

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
public class FileOpenDialog
{
    public int structSize = 0;
    public IntPtr dlgOwner = IntPtr.Zero;
    public IntPtr instance = IntPtr.Zero;
    public String filter = null;
    public String customFilter = null;
    public int maxCustFilter = 0;
    public int filterIndex = 0;
    public String file = null;
    public int maxFile = 0;
    public String fileTitle = null;
    public int maxFileTitle = 0;
    public String initialDir = null;
    public String title = null;
    public int flags = 0;
    public short fileOffset = 0;
    public short fileExtension = 0;
    public String defExt = null;
    public IntPtr custData = IntPtr.Zero;
    public IntPtr hook = IntPtr.Zero;
    public String templateName = null;
    public IntPtr reservedPtr = IntPtr.Zero;
    public int reservedInt = 0;
    public int flagsEx = 0;

    public FileOpenDialog()
    {
        dlgOwner = GetForegroundWindow();
    }

    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();
}
#endif

public class SelectFileDialog
{
#if UNITY_STANDALONE_WIN || UNITY_EDITOR_WIN
    [DllImport("Comdlg32.dll", SetLastError = true, ThrowOnUnmappableChar = true, CharSet = CharSet.Auto)]
    private static extern bool GetOpenFileName([In, Out] FileOpenDialog ofn);
    private static bool SelectFile([In, Out] FileOpenDialog ofn)
    {
        return GetOpenFileName(ofn);
    }
#endif

    static public string Open()
    {
#if UNITY_STANDALONE_WIN || UNITY_EDITOR_WIN
        FileOpenDialog ofn = new FileOpenDialog();
        ofn.structSize = Marshal.SizeOf(ofn);
        ofn.filter = "Javascript Files\0*.js\0\0";
        ofn.file = new string(new char[256]);
        ofn.maxFile = ofn.file.Length;
        ofn.fileTitle = new string(new char[64]);
        ofn.maxFileTitle = ofn.fileTitle.Length;
        ofn.initialDir = Application.dataPath;
        ofn.title = "Select Script";
        ofn.defExt = "JS";
        ofn.flags = 0x00080000 | 0x00001000 | 0x00000800 | 0x00000200 | 0x00000008;
        //OFN_EXPLORER|OFN_FILEMUSTEXIST|OFN_PATHMUSTEXIST| OFN_ALLOWMULTISELECT|OFN_NOCHANGEDIR

        if (SelectFile(ofn)) return ofn.file;
#endif
        return null;
    }
}
