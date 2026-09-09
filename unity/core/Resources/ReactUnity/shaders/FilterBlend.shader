// Filter.shader plus `mix-blend-mode`: the same offscreen composite, blended into the backdrop
// with one of the CSS Compositing blend functions instead of drawn straight over it.
//
// Reading the backdrop is what splits this into two subshaders, the way BackdropFilter.shader is
// split -- URP has no GrabPass and offers _CameraOpaqueTexture, built-in has no opaque texture and
// grabs. Only elements that actually blend get this shader, so a plain `filter` never pays for the
// grab; ElementFilter picks between the two.
Shader "ReactUnity/FilterBlend"
{
  Properties
  {
    _MainTex ("Element (RGB)", 2D) = "white" {}
    _Color ("Tint", Color) = (1,1,1,1)

    _BlendMode ("Blend Mode", Int) = 0

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
    _ClipMaskTex ("Clip Coverage Mask", 2D) = "white" {}

    [Enum(UnityEngine.Rendering.CompareFunction)] _StencilComp("Stencil Comparison", Float) = 8
    _Stencil("Stencil ID", Float) = 0
    [Enum(UnityEngine.Rendering.StencilOp)] _StencilOp("Stencil Operation", Float) = 0
    _StencilWriteMask("Stencil Write Mask", Float) = 255
    _StencilReadMask("Stencil Read Mask", Float) = 255
    _ColorMask("Color Mask", Float) = 15
    [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip("Use Alpha Clip", Float) = 0
    [Toggle(UNITY_UI_CLIP_RECT)] _UseUIClipRect("Use Clip Rect", Float) = 1
  }

  Category
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

    // The shader returns the blended colour premultiplied by the element's own coverage, so this
    // one blend state serves every mode: dst = B(Cb, Cs) * a + (1 - a) * Cb, which is what CSS
    // composites a blended source over an opaque backdrop to.
    Blend One OneMinusSrcAlpha

    SubShader
    {
      Tags { "RenderPipeline" = "UniversalPipeline" }

      Pass
      {
        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        // The non-separable modes need more instructions and a dependent sqrt than 2.0 allows.
        #pragma target 3.0
        #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
        #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

        #define RU_HAS_BACKDROP
        sampler2D _CameraOpaqueTexture;
        #define RU_BACKDROP_TEX _CameraOpaqueTexture

        #include "FilterCore.cginc"
        ENDCG
      }
    }

    SubShader
    {
      GrabPass { }

      Pass
      {
        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma target 3.0
        #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
        #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

        #define RU_HAS_BACKDROP
        sampler2D _GrabTexture;
        #define RU_BACKDROP_TEX _GrabTexture

        #include "FilterCore.cginc"
        ENDCG
      }
    }
  }
}
