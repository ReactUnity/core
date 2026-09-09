Shader "ReactUnity/BackgroundImage"
{
  Properties{
    _MainTex("Texture", 2D) = "white" {}

    _angle("Angle", Float) = 0
    _from("From", Float) = 0
    _offset("Offset", Float) = 0
    _length("Length", Float) = 1
    _distance("Distance", Float) = 0
    _aspect("Aspect Ratio", Float) = 1
    _at("At", Vector) = (0.5, 0.5, 1, 1)
    _radius("Radius", Float) = 1
    [Toggle()] _repeating("Gradient Repeating", Int) = 0
    [Enum(ReactUnity.Types.GradientType)] _gradientType("Gradient Type", Int) = 0
    [Enum(ReactUnity.Types.RadialGradientShape)] _shape("Gradient Shape", Int) = 0

    [Enum(UnityEngine.Rendering.CompareFunction)] _StencilComp("Stencil Comparison", Float) = 8
    _Stencil("Stencil ID", Float) = 0
    [Enum(UnityEngine.Rendering.StencilOp)] _StencilOp("Stencil Operation", Float) = 0
    _StencilWriteMask("Stencil Write Mask", Float) = 255
    _StencilReadMask("Stencil Read Mask", Float) = 255
    _ColorMask("Color Mask", Float) = 15
    [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip("Use Alpha Clip", Float) = 0
    [Toggle(UNITY_UI_CLIP_RECT)] _UseUIClipRect("Use Clip Rect", Float) = 1
  }

  SubShader{
    Tags {
      "Queue" = "Transparent"
      "IgnoreProjector" = "True"
      "RenderType" = "Transparent"
      "PreviewType" = "Plane"
      "CanUseSpriteAtlas" = "True"
    }

    Stencil {
      Ref[_Stencil]
      Comp[_StencilComp]
      Pass[_StencilOp]
      ReadMask[_StencilReadMask]
      WriteMask[_StencilWriteMask]
    }
    Cull Off
    Lighting Off
    ZTest[unity_GUIZTestMode]
    ColorMask[_ColorMask]

    // Separate alpha blending, the way UGUI's own default UI shader does it: `SrcAlpha` on the
    // alpha channel would square a translucent draw's coverage in a render target that started
    // transparent, which is what a mask layer and the filter capture both are. Nothing on screen
    // changes -- the back buffer's alpha is never read.
    Blend SrcAlpha OneMinusSrcAlpha, One OneMinusSrcAlpha
    ZWrite Off

    Pass
    {
      CGPROGRAM

      #pragma vertex vert
      #pragma fragment frag
      #pragma target 2.0
      #pragma shader_feature_local _SPECULARHIGHLIGHTS_OFF
      #pragma shader_feature_local _GLOSSYREFLECTIONS_OFF

      #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
      #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

      // The layer as it has always been drawn: no blending, vertex colour as a tint.
      // BackgroundImageBlend.shader and BackgroundImageBlendStack.shader are the same body with
      // `background-blend-mode` compiled in.
      #include "BackgroundImageCore.cginc"

      ENDCG
    }
  }
}
