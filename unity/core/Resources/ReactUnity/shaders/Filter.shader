// Composites an element that was rendered offscreen, applying the CSS `filter` chain.
// Unlike BackdropFilter this never reads the backdrop, so one subshader serves every pipeline.
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
      #pragma target 2.0
      #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
      #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

      #include "UnityCG.cginc"
      #include "UnityUI.cginc"

      struct appdata
      {
        float4 vertex : POSITION;
        float2 uv : TEXCOORD0;
        float4 color : COLOR;
        UNITY_VERTEX_INPUT_INSTANCE_ID
      };

      struct v2f
      {
        float4 vertex : SV_POSITION;
        float2 uv : TEXCOORD0;
        float4 color : COLOR;
        float4 worldPosition : TEXCOORD1;
        UNITY_VERTEX_OUTPUT_STEREO
      };

      sampler2D _MainTex;
      float4 _MainTex_TexelSize;
      fixed4 _Color;
      float4 _ClipRect;

      float _Brightness;
      float _Contrast;
      float _Grayscale;
      float _HueRotate;
      float _Invert;
      float _Opacity;
      float _Saturate;
      float _Grain;
      float _Pixelate;
      float _Sepia;

      v2f vert(appdata v)
      {
        v2f o;
        UNITY_SETUP_INSTANCE_ID(v);
        UNITY_INITIALIZE_OUTPUT(v2f, o);
        UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
        o.worldPosition = v.vertex;
        o.vertex = UnityObjectToClipPos(v.vertex);
        o.uv = v.uv;
        o.color = v.color * _Color;
        return o;
      }

      float3 rgb2hsv(float3 c)
      {
        float4 K = float4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
        float4 p = lerp(float4(c.bg, K.wz), float4(c.gb, K.xy), step(c.b, c.g));
        float4 q = lerp(float4(p.xyw, c.r), float4(c.r, p.yzx), step(p.x, c.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        return float3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
      }

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
        float2 uv = i.uv;

        if (_Pixelate > 0)
        {
          float2 ts = _MainTex_TexelSize.xy * _Pixelate;
          uv = (floor(uv / ts) + 0.5) * ts;
        }

        float4 src = tex2D(_MainTex, uv);

        // Every op below is defined on straight alpha, so undo the premultiply first.
        float a = src.a;
        float3 color = a > 0.0001 ? src.rgb / a : src.rgb;

        if (_Grayscale > 0)
        {
          float gray = dot(color, float3(0.299, 0.587, 0.114));
          color = lerp(color, float3(gray, gray, gray), _Grayscale);
        }

        color = color * _Brightness;
        color = (color - 0.5) * _Contrast + 0.5;

        float3 hsv = rgb2hsv(saturate(color));
        hsv.x += _HueRotate / 360.0;
        hsv.y *= _Saturate;
        color = hsv2rgb(hsv);

        if (_Sepia > 0)
          color = lerp(color, float3(
            dot(color, float3(0.393, 0.769, 0.189)),
            dot(color, float3(0.349, 0.686, 0.168)),
            dot(color, float3(0.272, 0.534, 0.131))), _Sepia);

        if (_Invert > 0)
          color = lerp(color, 1 - color, _Invert);

        if (_Grain > 0)
          color += (0.5 - rand(i.uv)) * _Grain;

        a *= _Opacity * i.color.a;
        color = saturate(color) * i.color.rgb;

        #ifdef UNITY_UI_CLIP_RECT
          a *= UnityGet2DClipping(i.worldPosition.xy, _ClipRect);
        #endif

        #ifdef UNITY_UI_ALPHACLIP
          clip(a - 0.001);
        #endif

        return float4(color * a, a);
      }
      ENDCG
    }
  }
}
