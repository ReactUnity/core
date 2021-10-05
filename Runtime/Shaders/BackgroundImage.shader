Shader "ReactUnity/BackgroundImage"
{
  Properties{
    _MainTex("Texture", 2D) = "white" {}
    _pos("background Position", Vector) = (1,1,1,1)
    _size("Background Size", Vector) = (1,1,1,1)
    _angle("Angle", Float) = 0
    _from("From", Float) = 0
    _offset("Offset", Float) = 0
    _length("Length", Float) = 1
    _distance("Distance", Float) = 0
    _at("At", Vector) = (0.5, 0.5, 1, 1)
    _radius("Radius", Float) = 1
    _aspect("Aspect", Float) = 1
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
        float _offset;
        float _length;
        float _distance;
        float _radius;
        float _aspect;
        int _shape;
        float2 _at;
        float2 _pos;
        float2 _size;
        sampler2D _MainTex;
        float4 _MainTex_ST;
        float4 _ClipRect;

        fixed4 frag(v2f i) : SV_Target
        {
          float2 txPos;

          float uvx = i.uv.x - _pos.x;
          float uvy = (1 - i.uv.y) - _pos.y;

          float uvxd = uvx / _size.x;
          float uvyd = uvy / _size.y;

          float2 uv = float2(uvxd - floor(uvxd), ceil(uvyd) - uvyd);

          if (_gradientType == 0) {
            txPos = uv;
          }
          else if (_gradientType == 1) {
            float y = uv.y;
            float x = uv.x;

            float sa = sin(_angle);
            float ca = cos(_angle);

            y = (ca < 0 ? 1 - y : y);
            x = (sa < 0 ? 1 - x : x);

            float ratioX = y * ca * ca + x * sa * sa;

            txPos = float2(ratioX, 0);
          }
          else if (_gradientType == 2) {
            float2 r2 = uv - _at;

            if (_shape == 1) {
              r2 = float2(r2.x, r2.y / _aspect);
            }

            float r = sqrt(r2.x * r2.x + r2.y * r2.y);

            txPos = float2(r / _radius, 0);
          }
          else if (_gradientType == 3) {
            float2 r2 = uv - _at;

            float angle = (atan2(r2.x, r2.y) - _from) % pi2;
            angle = angle < 0 ? (pi2 + angle) : angle;

            txPos = float2(angle / pi2, 0);
          }

          if (_gradientType != 0 && _repeating) {
            float x = (txPos.x - _offset) / _length;
            txPos = float2(x, txPos.y);
          }

          fixed4 res = mixAlpha(tex2D(_MainTex, txPos), i.color, 1);

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
