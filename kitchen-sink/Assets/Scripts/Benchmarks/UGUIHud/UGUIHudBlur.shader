// The glass panels' backdrop-filter: blur(7px) saturate(1.25), driven by Graphics.Blit once per frame
// for every panel at once. Pass 0 box-downsamples 4x, pass 1 blurs horizontally, pass 2 vertically
// and saturates. The weights are a Gaussian of sigma 1.75 texels, which is 7px at quarter resolution.
Shader "Hidden/UGUIHud/Blur"
{
    Properties
    {
        _MainTex ("Source", 2D) = "white" {}
        _Spread ("Spread", Float) = 1
        _Saturation ("Saturation", Float) = 1.25
    }

    SubShader
    {
        Cull Off
        ZWrite Off
        ZTest Always
        Blend Off

        CGINCLUDE
        #include "UnityCG.cginc"

        sampler2D _MainTex;
        float4 _MainTex_TexelSize;
        float _Spread;
        float _Saturation;

        struct v2f
        {
            float4 pos : SV_POSITION;
            float2 uv : TEXCOORD0;
        };

        v2f vert(appdata_img v)
        {
            v2f o;
            o.pos = UnityObjectToClipPos(v.vertex);
            o.uv = v.texcoord;
            return o;
        }

        // Four bilinear taps on texel corners average a 4x4 block.
        half4 fragDown(v2f i) : SV_Target
        {
            float2 t = _MainTex_TexelSize.xy;
            half4 c = tex2D(_MainTex, i.uv + t * float2(-1, -1));
            c += tex2D(_MainTex, i.uv + t * float2(1, -1));
            c += tex2D(_MainTex, i.uv + t * float2(-1, 1));
            c += tex2D(_MainTex, i.uv + t * float2(1, 1));
            return c * 0.25;
        }

        half4 gauss(float2 uv, float2 s)
        {
            half4 c = tex2D(_MainTex, uv) * 0.2302;
            c += (tex2D(_MainTex, uv - s) + tex2D(_MainTex, uv + s)) * 0.1950;
            c += (tex2D(_MainTex, uv - s * 2) + tex2D(_MainTex, uv + s * 2)) * 0.1197;
            c += (tex2D(_MainTex, uv - s * 3) + tex2D(_MainTex, uv + s * 3)) * 0.0526;
            c += (tex2D(_MainTex, uv - s * 4) + tex2D(_MainTex, uv + s * 4)) * 0.0166;
            return c;
        }

        half4 fragH(v2f i) : SV_Target
        {
            return gauss(i.uv, float2(_MainTex_TexelSize.x * _Spread, 0));
        }

        half4 fragV(v2f i) : SV_Target
        {
            half4 c = gauss(i.uv, float2(0, _MainTex_TexelSize.y * _Spread));
            half l = dot(c.rgb, half3(0.2126, 0.7152, 0.0722));
            c.rgb = lerp(half3(l, l, l), c.rgb, _Saturation);
            c.a = 1;
            return c;
        }
        ENDCG

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment fragDown
            ENDCG
        }

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment fragH
            ENDCG
        }

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment fragV
            ENDCG
        }
    }
}
