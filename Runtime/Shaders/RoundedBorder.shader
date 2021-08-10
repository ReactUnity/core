Shader "ReactUnity/RoundedBorder"
{
  Properties{
    _MainTex("Texture", 2D) = "white" {}
    _borderRadius("borderRadius", Vector) = (0,0,0,0)
    _size("size", Vector) = (1,1,1,1)

    [Enum(UnityEngine.Rendering.CompareFunction)] _StencilComp("Stencil Comparison", Float) = 8
    _Stencil("Stencil ID", Float) = 0
    [Enum(UnityEngine.Rendering.StencilOp)] _StencilOp("Stencil Operation", Float) = 0
    _StencilWriteMask("Stencil Write Mask", Float) = 255
    _StencilReadMask("Stencil Read Mask", Float) = 255
    _ColorMask("Color Mask", Float) = 15
    [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip("Use Alpha Clip", Float) = 0
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

        #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
        #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

        float4 _borderRadius;
        float2 _size;
        sampler2D _MainTex;
        float4 _MainTex_ST;

        fixed4 frag(v2f i) : SV_Target
        {
          bool visible;
          CalculateBorderRadius_float(_borderRadius, i.uv, _size, visible);
          float alpha = visible ? 1 : 0;

          fixed4 res = mixAlpha(tex2D(_MainTex, i.uv), i.color, alpha);

          clip(res.a - 0.001);

          return res;
        }

        ENDCG
      }
    }
}
