// Separable Gaussian for `filter: blur()`, driven by Graphics.Blit -- pass 0 horizontal, pass 1
// vertical. Kept out of Filter.shader because a UI material draws every pass its shader declares.
Shader "ReactUnity/FilterBlur"
{
  Properties
  {
    _MainTex ("Source", 2D) = "white" {}
    _Blur ("Blur Size", Float) = 0.0
  }

  SubShader
  {
    Cull Off
    Lighting Off
    ZWrite Off
    ZTest Always
    Blend Off

    CGINCLUDE
    #include "UnityCG.cginc"

    sampler2D _MainTex;
    float4 _MainTex_TexelSize;
    float _Blur;

    struct v2f
    {
      float4 vertex : SV_POSITION;
      float2 uv : TEXCOORD0;
    };

    v2f vert(appdata_img v)
    {
      v2f o;
      o.vertex = UnityObjectToClipPos(v.vertex);
      o.uv = v.texcoord;
      return o;
    }

    // 9 taps at unit spacing scaled by _Blur. Weights are a normalised Gaussian.
    float4 blur(float2 uv, float2 step)
    {
      float4 sum = tex2D(_MainTex, uv) * 0.18;
      sum += tex2D(_MainTex, uv - step * 4.0) * 0.05;
      sum += tex2D(_MainTex, uv - step * 3.0) * 0.09;
      sum += tex2D(_MainTex, uv - step * 2.0) * 0.12;
      sum += tex2D(_MainTex, uv - step * 1.0) * 0.15;
      sum += tex2D(_MainTex, uv + step * 1.0) * 0.15;
      sum += tex2D(_MainTex, uv + step * 2.0) * 0.12;
      sum += tex2D(_MainTex, uv + step * 3.0) * 0.09;
      sum += tex2D(_MainTex, uv + step * 4.0) * 0.05;
      return sum;
    }
    ENDCG

    Pass
    {
      CGPROGRAM
      #pragma vertex vert
      #pragma fragment frag
      #pragma target 2.0
      float4 frag(v2f i) : SV_Target
      {
        if (_Blur <= 0) return tex2D(_MainTex, i.uv);
        return blur(i.uv, float2(_MainTex_TexelSize.x * _Blur * 0.25, 0));
      }
      ENDCG
    }

    Pass
    {
      CGPROGRAM
      #pragma vertex vert
      #pragma fragment frag
      #pragma target 2.0
      float4 frag(v2f i) : SV_Target
      {
        if (_Blur <= 0) return tex2D(_MainTex, i.uv);
        return blur(i.uv, float2(0, _MainTex_TexelSize.y * _Blur * 0.25));
      }
      ENDCG
    }
  }
}
