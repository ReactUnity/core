// `image-rendering: pixelated`. Unity's default UI shader with one change: the sample is snapped to
// the nearest texel centre, so an upscaled image shows its own pixels instead of a bilinear smear.
//
// Doing it here rather than by setting FilterMode on the texture is what keeps it a per-element
// property: a Texture2D's filter mode belongs to the imported asset, so one element asking for
// crisp edges would change every other element drawing the same image -- and, in the editor, keep
// it changed. The snap also works on a sprite inside an atlas, since the uv it snaps is already
// the atlas'.
Shader "ReactUnity/PixelatedImage"
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
    // Separate alpha blending, the way UGUI's own default UI shader does it: `SrcAlpha` on the
    // alpha channel would square a translucent draw's coverage in a render target that started
    // transparent, which is what a mask layer and the filter capture both are. Nothing on screen
    // changes -- the back buffer's alpha is never read.
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
      float4 _MainTex_TexelSize;
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
        // Nearest neighbour: land on the centre of the texel the uv falls in, which is the one a
        // point-filtered sampler would have returned.
        float2 texel = _MainTex_TexelSize.xy;
        float2 uv = (floor(i.texcoord / texel) + 0.5) * texel;

        half4 color = i.color * (tex2D(_MainTex, uv) + _TextureSampleAdd);

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
