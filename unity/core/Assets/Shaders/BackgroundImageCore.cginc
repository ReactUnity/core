#ifndef REACTUNITY_BACKGROUNDIMAGECORE_INCLUDED
#define REACTUNITY_BACKGROUNDIMAGECORE_INCLUDED

// One background layer: the gradient/tiling sampling every layer shares, plus the
// `background-blend-mode` step. Included by BackgroundImage.shader as it always was, and by the
// two blending variants, which differ only in where they read the backdrop from:
//
//   RU_BG_BLEND           -- compile the blend step in, and return premultiplied colour for
//                            `Blend One OneMinusSrcAlpha`.
//   RU_BG_READ_BACKDROP   -- reads what is already drawn (the layers below this one), however
//                            the pipeline gets at it. Without it the backdrop is the flat
//                            `background-color`, carried in the vertex colour, which is exactly
//                            the backdrop of the bottom layer.

#include "UnityCG.cginc"
#include "UnityUI.cginc"
#include "CustomFunctions.hlsl"
#include "ShaderSetup.cginc"

#ifdef RU_BG_BLEND
#include "../../Resources/ReactUnity/shaders/BlendModes.cginc"
int _BlendMode;
#endif

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
float2 _at;
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

#ifdef RU_BG_BLEND
  // The layer's own colour. The vertex colour is not a tint here -- a blending layer carries the
  // backdrop in it instead, so the layer goes into the blend exactly as the image gives it.
  fixed4 res = tex2D(_MainTex, txPos);

  #ifdef RU_BG_READ_BACKDROP
    // Premultiplied, because that is what the render target holds.
    float4 back = RU_BG_READ_BACKDROP(i.uvgrab);
    float ab = saturate(back.a);
    float3 Cb = ab > 0.0001 ? saturate(back.rgb / ab) : 0;
  #else
    float ab = i.color.a;
    float3 Cb = i.color.rgb;
  #endif

  float as = saturate(res.a);
  float3 Cs = saturate(res.rgb);

  if (_BlendMode == RU_BLEND_PLUSLIGHTER)
  {
    // Added rather than covered, so what leaves this pass has to cancel the (1 - as) * ab * Cb the
    // fixed-function blend is about to add back. Alpha stays the ordinary `over` value: CSS asks
    // for min(1, as + ab), but that would have to travel through the same OneMinusSrcAlpha factor
    // the colour does, and an inflated coverage there is far more visible than the alpha is.
    res.rgb = min(1.0, as * Cs + ab * Cb) - (1.0 - as) * ab * Cb;
  }
  else
  {
    // The CSS formula, weighted by the backdrop's own coverage: with nothing behind it a layer
    // blends with nothing and comes through as it is.
    res.rgb = as * ((1.0 - ab) * Cs + ab * RuBlend(_BlendMode, Cb, Cs));
  }

  res.a = as;

  #ifdef UNITY_UI_CLIP_RECT
    float clip2d = UnityGet2DClipping(i.worldPosition.xy, _ClipRect);
    res *= clip2d;
  #endif
#else
  fixed4 res = mixAlpha(tex2D(_MainTex, txPos), i.color, 1);

  #ifdef UNITY_UI_CLIP_RECT
    res.a *= UnityGet2DClipping(i.worldPosition.xy, _ClipRect);
  #endif
#endif

  #ifdef UNITY_UI_ALPHACLIP
    clip(res.a - 0.001);
  #endif

  return res;
}

#endif
