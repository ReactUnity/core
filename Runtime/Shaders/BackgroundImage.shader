Shader "ReactUnity/BackgroundImage"
{
  Properties{
    _MainTex("Texture", 2D) = "white" {}
    _size("size", Vector) = (1,1,1,1)
    _angle("Angle", Float) = 0
    _from("From", Float) = 0
    _at("At", Vector) = (0.5, 0.5, 1, 1)
    [Enum(ReactUnity.Types.GradientType)] _gradientType("Gradient Type", Float) = 0
    [Toggle()] _repeating("Repeating", Float) = 0

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

        bool _repeating;
        float _gradientType;
        float _angle;
        float _from;
        float2 _at;
        float2 _size;
        sampler2D _MainTex;
        float4 _MainTex_ST;
        float4 _ClipRect;

        fixed4 frag(v2f i) : SV_Target
        {
          float2 pos;

          if (_gradientType == 0) {
            pos = i.uv;
          }
          else if (_gradientType == 1) {
            float y = 1 - i.uv.y;
            float x = i.uv.x;

            float sa = sin(_angle);
            float ca = cos(_angle);

            ca = ca < 0 ? 1 - ca : ca;
            sa = sa < 0 ? 1 - sa : sa;

            float ratioX = y * ca + x * sa;
            float ratioY = x * ca + y * sa;

            pos = float2(ratioX, ratioY);
          }
          else if (_gradientType == 2) {
            float2 r2 = i.uv - _at;

            float r = sqrt(r2.x * r2.x + r2.y * r2.y) * 2;

            pos = float2(r, 0);
          }
          else if (_gradientType == 3) {
            float2 r2 = i.uv - _at;

            float angle = (atan2(r2.x, r2.y) - _from) % pi2;
            angle = angle < 0 ? pi2 + angle : angle;

            pos = float2(angle / pi2, 0);
          }

          fixed4 res = mixAlpha(tex2D(_MainTex, pos), i.color, 1);

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
