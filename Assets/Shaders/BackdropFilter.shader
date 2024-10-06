Shader "ReactUnity/BackdropFilter"
{
  Properties {
    _MainTex ("Tint Color (RGB)", 2D) = "white" {}
    _Color ("Main Color", Color) = (1,1,1,1)

    _Blur ("Blur Size", Range(0.0, 10.0)) = 0.0
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


    [Enum(UnityEngine.Rendering.CompareFunction)] _StencilComp("Stencil Comparison", Float) = 8
    _Stencil("Stencil ID", Float) = 0
    [Enum(UnityEngine.Rendering.StencilOp)] _StencilOp("Stencil Operation", Float) = 0
    _StencilWriteMask("Stencil Write Mask", Float) = 255
    _StencilReadMask("Stencil Read Mask", Float) = 255
    _ColorMask("Color Mask", Float) = 15
    [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip("Use Alpha Clip", Float) = 0
    [Toggle(UNITY_UI_CLIP_RECT)] _UseUIClipRect("Use Clip Rect", Float) = 1
  }

	Category {
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

    SubShader {
      GrabPass { }

      Pass {
        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma target 2.0
        #pragma shader_feature_local _SPECULARHIGHLIGHTS_OFF
        #pragma shader_feature_local _GLOSSYREFLECTIONS_OFF
        #pragma fragmentoption ARB_precision_hint_fastest
        #include "UnityCG.cginc"
        #include "ShaderSetup.cginc"

        float _Blur;
        sampler2D _GrabTexture;
        float4 _GrabTexture_TexelSize;

        float4 frag( v2f i ) : COLOR {
          if(_Blur == 0) return tex2D(_GrabTexture, i.uv);

          float3 sum = float3(0,0,0);

          #define GRABPIXEL(weight,kernelx) tex2D( _GrabTexture, UNITY_PROJ_COORD(float2(i.uv.x + _GrabTexture_TexelSize.x * kernelx*_Blur, i.uv.y))) * weight

          sum += GRABPIXEL(0.05, -4.0);
          sum += GRABPIXEL(0.09, -3.0);
          sum += GRABPIXEL(0.12, -2.0);
          sum += GRABPIXEL(0.15, -1.0);
          sum += GRABPIXEL(0.18,  0.0);
          sum += GRABPIXEL(0.15, +1.0);
          sum += GRABPIXEL(0.12, +2.0);
          sum += GRABPIXEL(0.09, +3.0);
          sum += GRABPIXEL(0.05, +4.0);

          return float4(sum, 1);
        }
        ENDCG
      }

      GrabPass { }

      Pass {
        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma target 2.0
        #pragma shader_feature_local _SPECULARHIGHLIGHTS_OFF
        #pragma shader_feature_local _GLOSSYREFLECTIONS_OFF
        #pragma fragmentoption ARB_precision_hint_fastest
        #include "UnityCG.cginc"
        #include "ShaderSetup.cginc"

        float _Blur;
        sampler2D _GrabTexture;
        float4 _GrabTexture_TexelSize;

        float4 frag( v2f i ) : COLOR {
          if(_Blur == 0) return tex2D(_GrabTexture, i.uv);

          float3 sum = float3(0,0,0);

          #define GRABPIXEL(weight,kernely) tex2D( _GrabTexture, UNITY_PROJ_COORD(float2(i.uv.x, i.uv.y + _GrabTexture_TexelSize.y * kernely*_Blur))) * weight

          sum += GRABPIXEL(0.05, -4.0);
          sum += GRABPIXEL(0.09, -3.0);
          sum += GRABPIXEL(0.12, -2.0);
          sum += GRABPIXEL(0.15, -1.0);
          sum += GRABPIXEL(0.18,  0.0);
          sum += GRABPIXEL(0.15, +1.0);
          sum += GRABPIXEL(0.12, +2.0);
          sum += GRABPIXEL(0.09, +3.0);
          sum += GRABPIXEL(0.05, +4.0);

          return float4(sum, 1);
        }
        ENDCG
      }

      GrabPass { }

      Pass {

        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma target 2.0
        #pragma shader_feature_local _SPECULARHIGHLIGHTS_OFF
        #pragma shader_feature_local _GLOSSYREFLECTIONS_OFF
        #pragma fragmentoption ARB_precision_hint_fastest
        #include "UnityCG.cginc"
        #include "UnityUI.cginc"
        #include "ShaderSetup.cginc"

        #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
        #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

        float _Blur;
        float _Brightness;
        float _Contrast;
        float _Grayscale;
        float _HueRotate;
        float _Invert;
        float _Opacity;
        float _Saturate;
        float _Sepia;
        float _Pixelate;
        float _Grain;

        float4 _ClipRect;
        sampler2D _GrabTexture;
        float4 _GrabTexture_TexelSize;

        // Convert RGB to Grayscale
        float3 rgb2gray(float3 color)
        {
          return dot(color, float3(0.299, 0.587, 0.114));
        }

        // Convert RGB to HSV for Hue and Saturation adjustments
        float3 rgb2hsv(float3 c)
        {
          float4 K = float4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
          float4 p = lerp(float4(c.bg, K.wz), float4(c.gb, K.xy), step(c.b, c.g));
          float4 q = lerp(float4(p.xyw, c.r), float4(c.r, p.yzx), step(p.x, c.r));

          float d = q.x - min(q.w, q.y);
          float e = 1.0e-10;
          return float3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }

        // Convert HSV to RGB
        float3 hsv2rgb(float3 c)
        {
          float4 K = float4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          float3 p = abs(frac(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * lerp(K.xxx, saturate(p - K.xxx), c.y);
        }

        float rand(float2 co)
        {
          return frac(sin(dot(co.xy, float2(12.9898, 78.233))) * 43758.5453);
        }

        float4 frag(v2f i) : SV_Target
        {
          // Grab the texture from behind the current object
          float3 color = tex2D(_GrabTexture, i.uv).rgb;

          // Apply pixelate effect
          if (_Pixelate > 0)
          {
            float4 ts = _GrabTexture_TexelSize * _Pixelate;
            float2 uv = round(i.uv / ts.xy) * ts.xy;
            color = tex2D(_GrabTexture, uv).rgb;
          }

          // Convert to grayscale if needed
          if (_Grayscale > 0)
          {
            float gray = rgb2gray(color);
            color = lerp(color, float3(gray, gray, gray), _Grayscale);
          }

          // Adjust brightness and contrast
          color = color * _Brightness;
          color = (color - 0.5) * _Contrast + 0.5;

          // Adjust hue and saturation
          float3 hsv = rgb2hsv(color);
          hsv.x += _HueRotate / 360.0;
          hsv.y *= _Saturate;
          color = hsv2rgb(hsv);

          // Apply sepia effect
          if (_Sepia > 0)
            color = lerp(color, float3(dot(color, float3(0.393, 0.769, 0.189)), dot(color, float3(0.349, 0.686, 0.168)), dot(color, float3(0.272, 0.534, 0.131))), _Sepia);

          // Invert
          if (_Invert > 0)
            color = lerp(color, 1 - color, _Invert);

          // Apply grain
          if (_Grain > 0)
            color += (0.5 - rand(i.uv)) * _Grain;

          float4 res = float4(color, _Opacity);


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
}
