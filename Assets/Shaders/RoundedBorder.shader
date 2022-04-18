Shader "ReactUnity/RoundedBorder"
{
  Properties{
    _MainTex("Texture", 2D) = "white" {}
    _borderRadiusX("borderRadiusX", Vector) = (0,0,0,0)
    _borderRadiusY("borderRadiusY", Vector) = (0,0,0,0)
    _borderRadiusCuts("borderRadiusCuts", Vector) = (0.5,0.5,0.5,0.5)
    _size("size", Vector) = (1,1,1,1)

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

        float4 _borderRadiusX;
        float4 _borderRadiusY;
        float4 _borderRadiusCuts;
        float2 _size;
        sampler2D _MainTex;
        float4 _MainTex_ST;
        float4 _ClipRect;

        fixed4 frag(v2f i) : SV_Target
        {
          float dist = CalculateBorderRadius_float(_borderRadiusX, _borderRadiusY, _borderRadiusCuts, i.uv, _size);
          float alpha = dist <= 1 ? 1 : 0;

          fixed4 res = mixAlpha(tex2D(_MainTex, i.uv), i.color, alpha);

#ifdef UNITY_UI_CLIP_RECT
          res.a *= UnityGet2DClipping(i.worldPosition.xy, _ClipRect);
#endif

#ifdef UNITY_UI_ALPHACLIP
          clip(res.a - 0.001);
#endif

          return res;
        }

        ENDCG
      }
    }
}
