// Unity's default UI shader with `background-clip: text` compiled in. A background layer whose image
// brings no material of its own -- a plain sprite, or the background colour -- draws with this one
// while it is clipped, because the clip has to live in whatever shader paints the layer and there is
// no reaching into `UI/Default`. Everything else about it is the stock shader, so a layer that moves
// on and off a text clip looks the same either way.
Shader "ReactUnity/ClippedImage"
{
  Properties
  {
    [PerRendererData] _MainTex ("Sprite Texture", 2D) = "white" {}
    _Color ("Tint", Color) = (1,1,1,1)

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
    Blend SrcAlpha OneMinusSrcAlpha, One OneMinusSrcAlpha

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
      #include "TextClip.cginc"

      struct appdata_t
      {
        float4 vertex : POSITION;
        float4 color : COLOR;
        float2 texcoord : TEXCOORD0;
        UNITY_VERTEX_INPUT_INSTANCE_ID
      };

      struct v2f
      {
        float4 vertex : SV_POSITION;
        fixed4 color : COLOR;
        float2 texcoord : TEXCOORD0;
        float4 worldPosition : TEXCOORD1;
        UNITY_VERTEX_OUTPUT_STEREO
      };

      sampler2D _MainTex;
      float4 _MainTex_ST;
      fixed4 _Color;
      fixed4 _TextureSampleAdd;
      float4 _ClipRect;

      v2f vert(appdata_t v)
      {
        v2f o;
        UNITY_SETUP_INSTANCE_ID(v);
        UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
        o.worldPosition = v.vertex;
        o.vertex = UnityObjectToClipPos(o.worldPosition);
        o.texcoord = TRANSFORM_TEX(v.texcoord, _MainTex);
        o.color = v.color * _Color;
        return o;
      }

      fixed4 frag(v2f i) : SV_Target
      {
        half4 color = i.color * (tex2D(_MainTex, i.texcoord) + _TextureSampleAdd);

        color.a *= RuTextClip(i.worldPosition);

        #ifdef UNITY_UI_CLIP_RECT
          color.a *= UnityGet2DClipping(i.worldPosition.xy, _ClipRect);
        #endif

        #ifdef UNITY_UI_ALPHACLIP
          clip(color.a - 0.001);
        #endif

        return color;
      }
      ENDCG
    }
  }
}
