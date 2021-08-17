Shader "ReactUnity/RoundedBoxShadow"
{
  Properties{
    _MainTex("Texture", 2D) = "white" {}
    _borderRadius("borderRadius", Vector) = (0,0,0,0)
    _size("size", Vector) = (1,1,1,1)
    _blurRadius("blurRadius", Vector) = (0,0,0,0)
    _spread("spread", Vector) = (0,0,0,0)
    _offset("offset", Vector) = (0,0,0,0)
    [Toggle] _inset("inset", Float) = 0

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
        float2 _blurRadius;
        float2 _spread;
        float2 _offset;
        bool _inset;
        sampler2D _MainTex;
        float4 _MainTex_ST;

        fixed4 frag(v2f i) : SV_Target
        {
          float2 blur = float2(_blurRadius.x / _size.x, _blurRadius.y / _size.y);
          float2 spread = float2(_spread.x / _size.x, _spread.y / _size.y);
          float2 offset = float2(_offset.x / _size.x, _offset.y / _size.y);
          float2 innerSize = float2((1 - blur.x * 2 - spread.x * 2), (1 - blur.y * 2 - spread.y * 2));
          float2 uv = float2((i.uv.x - blur.x - spread.x - offset.x) / innerSize.x, (i.uv.y - blur.y - spread.y + offset.y) / innerSize.y);


          float d = DistanceToBox(_borderRadius, uv, _size);
          float rad = min(100, max(3, round(blur.x * _size.x)));
          float sigma = ConvertRadiusToSigma(rad);

          int KERNEL_SIZE = rad * 2 + 1;
          const float step = float(KERNEL_SIZE) / 2;

          float o = 0;
          float sum = 0;
          for (int x = 0; x < KERNEL_SIZE; x++)
          {
            float shiftX = blur.x * (float(x) - step) / step / innerSize.x;
            float weight = gaussian(x, rad, sigma);
            float alpha = shiftX < d ? 0 : 1;
            if (_inset) alpha = 1 - alpha;
            o += alpha * weight;
            sum += weight;
          }
          fixed4 col = tex2D(_MainTex, uv);
          col.a = o / sum;

          return mixAlpha(col, i.color, 1);
        }
        ENDCG
      }
    }
}
