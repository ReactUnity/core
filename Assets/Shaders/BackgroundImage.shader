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
    _aspect("Aspect Ratio", Float) = 1
    _at("At", Vector) = (0.5, 0.5, 1, 1)
    _radius("Radius", Float) = 1
    [Toggle()] _repeating("Gradient Repeating", Int) = 0
    [Enum(ReactUnity.Types.GradientType)] _gradientType("Gradient Type", Int) = 0
    [Enum(ReactUnity.Types.RadialGradientShape)] _shape("Gradient Shape", Int) = 0
    [Enum(ReactUnity.Types.BackgroundRepeat)] _repeatX("Repeat X", Int) = 0
    [Enum(ReactUnity.Types.BackgroundRepeat)] _repeatY("Repeat Y", Int) = 0

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
      int _repeatX;
      int _repeatY;
      float2 _at;
      float2 _pos;
      float2 _size;
      sampler2D _MainTex;
      float4 _MainTex_ST;
      float4 _ClipRect;

      float calculateRepeat(float uv, float size, float pos, int repeat, out bool visible)
      {
        visible = true;
        float countd = 1 / size;

        if(repeat == 0 || repeat == 3 || size >= 1 || (repeat == 1 && countd < 2)) {
          float d = (uv - pos);
          float dr = d / size;
          if(repeat != 0 && (dr > 1 || dr < 0)) visible = false;
          return dr - floor(dr);
        }
        else if (repeat == 1) {
          // space

          float count = floor(countd);
          float cx = count - 1;
          float totalSpace = (1 - count * size);
          float spacing = cx == 0 ? totalSpace : totalSpace / cx;
          float per = (1 - totalSpace) / count;
          float persz = per + spacing;

          float cp = uv / persz;
          float cpd = floor(cp);

          float dr = (cp - cpd) / per * persz;

          if(dr > 1 || dr < 0) visible = false;
          return dr;
        }
        else if(repeat == 2) {
          // round

          float countd = 1 / size;
          float count = round(countd);
          float cx = count - 1;
          float totalSpace = (repeat == 2) ? 0 : (1 - count * size);
          float per = (1 - totalSpace) / count;

          float cp = uv / per;
          float cpd = floor(cp);

          float dr = cp - cpd;

          if(dr > 1 || dr < 0) visible = false;
          return dr;
        }
        else return 0;
      }

      fixed4 frag(v2f i) : SV_Target
      {
        bool visibleX, visibleY;
        float tx = calculateRepeat(i.uv.x, _size.x, _pos.x, _repeatX, visibleX);
        float ty = calculateRepeat(1 - i.uv.y, _size.y, _pos.y, _repeatY, visibleY);

        fixed4 res;

        if(!(visibleX && visibleY)) {
          res = fixed4(0,0,0,0);
        }
        else {
          float2 uv = i.uv;
          float2 txPos = uv;

          if (_gradientType == 1) {
            float maxY = 1 / _aspect;
            float y = uv.y;
            float x = uv.x;

            float sa = sin(_angle);
            float ca = cos(_angle);

            float ratioX = 0;
            if (ca == 0) {
              ratioX = sa < 0 ? 1 - x : x;
            }
            else if (sa == 0) {
              ratioX = ca < 0 ? 1 - y : y;
            }
            else {
              float zx = sa < 0 ? 1 : 0;
              float zy = ca < 0 ? maxY : 0;

              float2 A = float2(x, y / _aspect);
              float2 B = A + float2(ca, -sa);

              float2 C = float2(zx, zy);
              float2 D = float2(1 - zx, maxY - zy);

              ratioX = ((B.x*A.y - A.x*B.y) * (D.x - C.x) - (B.x - A.x) * (D.x * C.y - D.y * C.x))
              / ((B.x-A.x)*(D.y-C.y)-(B.y-A.y)*(D.x-C.x));

              ratioX = (sa < 0) ? 1 - ratioX : ratioX;
            }

            txPos = float2(ratioX, 0);
          }
          else if (_gradientType == 2) {
            float2 r2 = uv - _at;

            if (_shape == 1) {
              r2 = float2(r2.x, r2.y / _aspect);
            }

            txPos = float2(length(r2) / _radius, 0);
          }
          else if (_gradientType == 3) {
            float2 r2 = uv - _at;
            float angle = (atan2(r2.x, r2.y) - _from) / pi2;
            txPos = float2(angle - floor(angle), 0);
          }

          if (_gradientType != 0 && _repeating) {
            float x = (txPos.x - _offset) / _length;
            txPos = float2(x, txPos.y);
          }

          res = mixAlpha(tex2D(_MainTex, txPos), i.color, 1);
        }

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
