Shader "ReactUnity/RoundedColoredBorder"
{
  Properties{
    _MainTex("Texture", 2D) = "white" {}
    _borderRadiusX("borderRadiusX", Vector) = (0,0,0,0)
    _borderRadiusY("borderRadiusY", Vector) = (0,0,0,0)
    _borderRadiusCuts("borderRadiusCuts", Vector) = (0.5,0.5,0.5,0.5)
    _size("size", Vector) = (1,1,1,1)
    _borderSize("borderSize", Vector) = (0,0,0,0)

    _topColor("topColor", Color) = (1,1,1,1)
    _rightColor("rightColor", Color) = (1,1,1,1)
    _bottomColor("bottomColor", Color) = (1,1,1,1)
    _leftColor("leftColor", Color) = (1,1,1,1)

    [Enum(UnityEngine.Rendering.CompareFunction)] _StencilComp("Stencil Comparison", Float) = 8
    _Stencil("Stencil ID", Float) = 0
    [Enum(UnityEngine.Rendering.StencilOp)] _StencilOp("Stencil Operation", Float) = 0
    _StencilWriteMask("Stencil Write Mask", Float) = 255
    _StencilReadMask("Stencil Read Mask", Float) = 255
    _ColorMask("Color Mask", Float) = 15
    [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip("Use Alpha Clip", Float) = 0
    [Toggle(UNITY_UI_CLIP_RECT)] _UseUIClipRect("Use Clip Rect", Float) = 1
    [KeywordEnum(Low, Medium)] _Quality ("Quality", Float) = 0
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

      Blend SrcAlpha OneMinusSrcAlpha
      ZWrite Off

      Pass
      {
        CGPROGRAM

        #include "UnityCG.cginc"
        #include "UnityUI.cginc"
        #include "CustomFunctions.hlsl"
        #include "ShaderSetup.cginc"

        #pragma vertex vert
        #pragma fragment frag
        #pragma target 2.0
        #pragma shader_feature_local _SPECULARHIGHLIGHTS_OFF
        #pragma shader_feature_local _GLOSSYREFLECTIONS_OFF

        #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
        #pragma multi_compile_local _ UNITY_UI_ALPHACLIP
        #pragma multi_compile_local_fragment _QUALITY_LOW _QUALITY_MEDIUM _QUALITY_HIGH _QUALITY_ULTRA


        float4 _borderRadiusX;
        float4 _borderRadiusY;
        float4 _borderRadiusCuts;
        float2 _size;
        float4 _borderSize;

        float4 _topColor;
        float4 _rightColor;
        float4 _bottomColor;
        float4 _leftColor;

        sampler2D _MainTex;
        float4 _MainTex_ST;
        float4 _ClipRect;

        fixed4 frag(v2f i) : SV_Target
        {
#ifdef UNITY_UI_CLIP_RECT
          float alpha = UnityGet2DClipping(i.worldPosition.xy, _ClipRect);
#else
          float alpha = 1;
#endif

          if(alpha > 0.001) {
            #if _QUALITY_LOW
              float dist = CalculateBorderRadius_float(_borderRadiusX, _borderRadiusY, _borderRadiusCuts, i.uv, _size);
            #else
              float dist = DistanceToBox(_borderRadiusX, _borderRadiusY, _borderRadiusCuts, i.uv, _size);
            #endif

            #if _QUALITY_MEDIUM
              // fwidth, 1 pixel linear edge
              float pwidth = fwidth(dist);
              alpha *= saturate(-dist / pwidth);
            #else // _QUALITY_LOW
              alpha *= step(dist, 1);
            #endif
          }

          float4 borderSizeScaled = float4(_borderSize.x / _size.y, _borderSize.y / _size.x, _borderSize.z / _size.y, _borderSize.w / _size.x);

          float4 borderColor = 0;

#ifdef UNITY_UI_ALPHACLIP
          clip(alpha - 0.001);
#endif

          if (alpha > 0.001) PickBorderColorTrapezoidal_float(i.uv, borderSizeScaled, _topColor, _rightColor, _bottomColor, _leftColor, borderColor);

          return mixAlpha(borderColor, i.color, alpha);
        }

        ENDCG
      }
    }
}
