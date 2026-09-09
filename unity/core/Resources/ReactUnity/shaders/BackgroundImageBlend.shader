Shader "ReactUnity/BackgroundImageBlend"
{
  // A background layer whose backdrop is the flat `background-color`, carried in the vertex colour.
  // That is exactly the backdrop CSS gives the bottom layer of the stack, so the common
  // one-image-over-a-colour case is exact here -- with no backdrop read, and on every pipeline.
  // Layers above the bottom need BackgroundImageBlendStack.shader instead.
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
    _BlendMode("Blend Mode", Int) = 0

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

    // Premultiplied: the blend already weighted the layer by its own coverage, so the pass only
    // has to uncover what it replaced.
    Blend One OneMinusSrcAlpha
    ZWrite Off

    Pass
    {
      CGPROGRAM

      #pragma vertex vert
      #pragma fragment frag
      #pragma target 3.0

      #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
      #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

      #define RU_BG_BLEND
      #include "../../../Assets/Shaders/BackgroundImageCore.cginc"

      ENDCG
    }
  }
}
