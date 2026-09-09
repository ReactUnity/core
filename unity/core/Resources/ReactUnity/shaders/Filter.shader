// Composites an element that was rendered offscreen, applying the CSS `filter` chain.
// This one never reads the backdrop, so a single subshader serves every pipeline. The variant that
// does -- for `mix-blend-mode` -- is FilterBlend.shader; the chain itself lives in FilterCore.cginc.
Shader "ReactUnity/Filter"
{
  Properties
  {
    _MainTex ("Element (RGB)", 2D) = "white" {}
    _Color ("Tint", Color) = (1,1,1,1)

    _Brightness ("Brightness", Range(0.0, 2.0)) = 1.0
    _Contrast ("Contrast", Range(0.0, 2.0)) = 1.0
    _Grayscale ("Grayscale", Range(0.0, 1.0)) = 0.0
    _HueRotate ("Hue Rotate", Range(-180, 180)) = 0.0
    _Invert ("Invert", Range(0.0, 1.0)) = 0.0
    _Opacity ("Opacity", Range(0.0, 1.0)) = 1.0
    _Saturate ("Saturate", Range(0.0, 2.0)) = 1.0
    _Grain ("Grain", Range(0.0, 1.0)) = 0.0
    _Pixelate ("Pixelate", Range(0.0, 100.0)) = 0.0
    _Sepia ("Sepia", Range(0.0, 1.0)) = 0.0
    _GrainPhase ("Grain Phase", Float) = 0.0
    _Posterize ("Posterize Levels", Float) = 0.0
    _ScanlineIntensity ("Scanline Intensity", Range(0.0, 1.0)) = 0.0
    _ScanlinePeriod ("Scanline Period (texels)", Float) = 4.0
    _ScanlinePhase ("Scanline Phase (texels)", Float) = 0.0
    _Tint ("Tint", Color) = (1,1,1,1)
    _Aberration ("Chromatic Aberration (UV)", Float) = 0.0
    _ShadowTex ("Drop Shadow Silhouette", 2D) = "black" {}
    _ShadowColor ("Drop Shadow Color", Color) = (0,0,0,0)
    _ShadowOffset ("Drop Shadow Offset (UV)", Vector) = (0,0,0,0)

    _MaskTex ("Mask Layers", 2D) = "white" {}
    _MaskEnabled ("Mask Enabled", Float) = 0.0
    _MaskLuminance ("Mask Reads Luminance", Int) = 0

    _ClipKind ("Clip Path Kind", Int) = 0
    _ClipRegion ("Clip Region (w, h, left, bottom)", Vector) = (0,0,0,0)
    _ClipBox ("Clip Inset Box (minX, minY, maxX, maxY)", Vector) = (0,0,0,0)
    _ClipRadiiX ("Clip Corner Radii X", Vector) = (0,0,0,0)
    _ClipRadiiY ("Clip Corner Radii Y", Vector) = (0,0,0,0)
    _ClipCircle ("Clip Circle (cx, cy, rx, ry)", Vector) = (0,0,0,0)
    _ClipPolyCount ("Clip Polygon Ring Length", Int) = 0
    _ClipEvenOdd ("Clip Uses Even-Odd", Int) = 0

    [Enum(UnityEngine.Rendering.CompareFunction)] _StencilComp("Stencil Comparison", Float) = 8
    _Stencil("Stencil ID", Float) = 0
    [Enum(UnityEngine.Rendering.StencilOp)] _StencilOp("Stencil Operation", Float) = 0
    _StencilWriteMask("Stencil Write Mask", Float) = 255
    _StencilReadMask("Stencil Read Mask", Float) = 255
    _ColorMask("Color Mask", Float) = 15
    [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip("Use Alpha Clip", Float) = 0
    [Toggle(UNITY_UI_CLIP_RECT)] _UseUIClipRect("Use Clip Rect", Float) = 1
  }

  SubShader
  {
    Tags
    {
      "Queue" = "Transparent"
      "IgnoreProjector" = "True"
      "RenderType" = "Transparent"
      "PreviewType" = "Plane"
      "CanUseSpriteAtlas" = "True"
    }

    Stencil
    {
      Ref[_Stencil]
      Comp[_StencilComp]
      Pass[_StencilOp]
      ReadMask[_StencilReadMask]
      WriteMask[_StencilWriteMask]
    }

    Cull Off
    Lighting Off
    ZWrite Off
    ZTest[unity_GUIZTestMode]
    ColorMask[_ColorMask]

    // The offscreen pass drew into a transparent-black target with SrcAlpha OneMinusSrcAlpha, so
    // the texture's RGB is already multiplied by coverage. Blending it again with SrcAlpha would
    // multiply twice and leave dark fringes -- hence premultiplied blending here.
    Blend One OneMinusSrcAlpha

    Pass
    {
      CGPROGRAM
      #pragma vertex vert
      #pragma fragment frag
      // `clip-path`'s polygon walks a uniform array in an unrolled loop, which needs more constant
      // registers and integer maths than 2.0 has. FilterBlend has always asked for 3.0, so nothing
      // Unity 6 still builds for loses the composite over it.
      #pragma target 3.0
      #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
      #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

      #include "FilterCore.cginc"
      ENDCG
    }
  }
}
