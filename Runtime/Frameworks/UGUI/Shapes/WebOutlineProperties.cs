using System;
using System.Runtime.InteropServices;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Shapes
{
    [Serializable]
    [StructLayout(LayoutKind.Sequential)]
    public struct WebOutlineColors
    {
        public Color Top;
        public Color Right;
        public Color Bottom;
        public Color Left;

        public WebOutlineColors(
            Color top,
            Color right,
            Color bottom,
            Color left
        )
        {
            Top = top;
            Right = right;
            Bottom = bottom;
            Left = left;
        }
    }

    [Serializable]
    [StructLayout(LayoutKind.Sequential)]
    public struct WebOutlineStyles
    {
        public BorderStyle Top;
        public BorderStyle Right;
        public BorderStyle Bottom;
        public BorderStyle Left;

        public WebOutlineStyles(
            BorderStyle top,
            BorderStyle right,
            BorderStyle bottom,
            BorderStyle left
        )
        {
            Top = top;
            Right = right;
            Bottom = bottom;
            Left = left;
        }
    }

    [Serializable]
    [StructLayout(LayoutKind.Explicit)]
    public struct WebOutlineSizes
    {
        [NonSerialized]
        [FieldOffset(0)]
        public Vector4 Vector;

        [FieldOffset(0)]
        [Min(0)] public float Top;
        [FieldOffset(4)]
        [Min(0)] public float Right;
        [FieldOffset(8)]
        [Min(0)] public float Bottom;
        [FieldOffset(12)]
        [Min(0)] public float Left;
    }

    [Serializable]
    public class WebOutlineProperties
    {
        public WebOutlineColors Colors;
        public WebOutlineSizes Sizes;
        public WebOutlineStyles Styles;
    }
}
