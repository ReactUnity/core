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
    _variant("variant", Float) = 3

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
        int _variant;
        sampler2D _MainTex;
        float4 _MainTex_ST;

        fixed4 frag(v2f i) : SV_Target
        {
          float2 blur = float2(_blurRadius.x / _size.x, _blurRadius.y / _size.y);
          float2 spread = float2(_spread.x / _size.x, _spread.y / _size.y);
          float2 offset = float2(_offset.x / _size.x, _offset.y / _size.y);
          float2 innerSize = float2((1 - blur.x * 2 - spread.x * 2), (1 - blur.y * 2 - spread.y * 2));
          float2 uv = float2((i.uv.x - blur.x - spread.x - offset.x) / innerSize.x, (i.uv.y - blur.y - spread.y + offset.y) / innerSize.y);

          if(_variant == 0) {
            const int KERNEL_SIZE = 13;
            const float KERNEL_[13] = { 0.0438, 0.1138, 0.2486, 0.4566, 0.7046, 0.9141, 1.0, 0.9141, 0.7046, 0.4566, 0.2486, 0.1138, 0.0438};
            const float step = float(KERNEL_SIZE) / 2;

            float4 o = 0;
            float sum = 0;
            float2 shift = 0;
            for (int x = 0; x < KERNEL_SIZE; x++)
            {
              shift.x = blur.x * (float(x) - step) / step / innerSize.x;
              for (int y = 0; y < KERNEL_SIZE; y++)
              {
                shift.y = blur.y * (float(y) - step) / step / innerSize.y;

                float weight = KERNEL_[x] * KERNEL_[y];
                sum += weight;
                float alpha = CalculateBorderRadius(_borderRadius, uv + shift, _size);
                if (_inset) alpha = 1 - alpha;
                fixed4 col = tex2D(_MainTex, uv + shift) * weight;
                col.a = col.a * alpha;
                o += col;
              }
            }

            return mixAlpha(o / sum, i.color, 1);
          }
          else if(_variant == 1) {
            // TODO: Attempt 1 -  more efficient box shadow - work faster but poor quality
            float d = DistanceToBox(_borderRadius, uv, _size);

            const int KERNEL_SIZE = 13;
            const float KERNEL_[13] = { 0.0438, 0.1138, 0.2486, 0.4566, 0.7046, 0.9141, 1.0, 0.9141, 0.7046, 0.4566, 0.2486, 0.1138, 0.0438};
            const float step = float(KERNEL_SIZE) / 2;

            float4 o = 0;
            float sum = 0;
            float2 shift = 0;
            for (int x = 0; x < KERNEL_SIZE; x++)
            {
              shift.x = blur.x * (float(x) - step) / step / innerSize.x;
              for (int y = 0; y < KERNEL_SIZE; y++)
              {
                shift.y = blur.y * (float(y) - step) / step / innerSize.y;

                float weight = KERNEL_[x] * KERNEL_[y];
                sum += weight;
                float alpha = shift.x < d ? 0 : 1;
                if (_inset) alpha = 1 - alpha;
                fixed4 col = tex2D(_MainTex, uv + shift) * weight;
                col.a = col.a * alpha;
                o += col;
              }
            }

            return mixAlpha(o / sum, i.color, 1);
          }
          else if(_variant == 2) {
            // TODO: Attempt 2 -  more efficient box shadow - does not work well
            float d = DistanceToBox(_borderRadius, uv, _size);

            float end;
            if (d >= 1) return 0;
            if (_inset != d <= 0) end = i.color;
            else {
              d = abs(d);
              // float b = ConvertRadiusToSigma(blur.x) / 4;
              // float deno = e / (b * sqrt(2 * pi));
              // float ex = -(d * d) / (2 * b * b);
              // end = pow(deno, ex);
              end = max(0, (blur.x - d) / blur.x);
            }
            fixed4 col = tex2D(_MainTex, uv);
            col.a *= end;
            return mixAlpha(col, i.color, 1);
          }
          else if (_variant == 3) {
            // TODO: Attempt 3 - Kernel based on blur radius, alpha based on distance
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

          return 0;
        }

        ENDCG
      }
    }
}
