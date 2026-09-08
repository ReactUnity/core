#ifndef REACTUNITY_BLENDMODES_INCLUDED
#define REACTUNITY_BLENDMODES_INCLUDED

// The CSS Compositing separable and non-separable blend functions, on straight-alpha colours.
// Indices match ReactUnity.Types.BackgroundBlendMode, which is why Color sits at 1.

#define RU_BLEND_NORMAL 0
#define RU_BLEND_COLOR 1
#define RU_BLEND_MULTIPLY 2
#define RU_BLEND_SCREEN 3
#define RU_BLEND_OVERLAY 4
#define RU_BLEND_DARKEN 5
#define RU_BLEND_LIGHTEN 6
#define RU_BLEND_COLORDODGE 7
#define RU_BLEND_COLORBURN 8
#define RU_BLEND_HARDLIGHT 9
#define RU_BLEND_SOFTLIGHT 10
#define RU_BLEND_DIFFERENCE 11
#define RU_BLEND_EXCLUSION 12
#define RU_BLEND_HUE 13
#define RU_BLEND_SATURATION 14
#define RU_BLEND_LUMINOSITY 15
// Not a blend function -- the source is added to the backdrop instead of covering it by its alpha,
// so it is composited separately and never reaches RuBlend.
#define RU_BLEND_PLUSLIGHTER 16

float3 RuScreen(float3 b, float3 s) { return b + s - b * s; }

// Cb/(1-Cs), with the two ends the spec pins by hand: a black backdrop stays black however bright
// the source, and a white source blows out. Both are 0/0 in the division.
float3 RuColorDodge(float3 b, float3 s)
{
  return b <= 0 ? 0 : (s >= 1 ? 1 : min(1.0, b / max(1.0 - s, 1e-6)));
}

float3 RuColorBurn(float3 b, float3 s)
{
  return b >= 1 ? 1 : (s <= 0 ? 0 : 1.0 - min(1.0, (1.0 - b) / max(s, 1e-6)));
}

// Multiply under a dark source, screen under a light one, at twice the rate either side.
float3 RuHardLight(float3 b, float3 s)
{
  return s <= 0.5 ? b * (2.0 * s) : RuScreen(b, 2.0 * s - 1.0);
}

float3 RuSoftLight(float3 b, float3 s)
{
  // The spec's D(Cb): sqrt above a quarter, and a cubic below it that meets sqrt smoothly rather
  // than running away to an infinite slope at zero.
  float3 d = b <= 0.25 ? ((16.0 * b - 12.0) * b + 4.0) * b : sqrt(max(b, 0));
  return s <= 0.5 ? b - (1.0 - 2.0 * s) * b * (1.0 - b) : b + (2.0 * s - 1.0) * (d - b);
}

float RuLum(float3 c) { return dot(c, float3(0.3, 0.59, 0.11)); }

// A luminosity shift can push channels out of gamut; the spec scales the whole colour back about
// its own luminosity rather than clamping, so hue survives.
float3 RuClipColor(float3 c)
{
  float l = RuLum(c);
  float n = min(c.r, min(c.g, c.b));
  float x = max(c.r, max(c.g, c.b));
  if (n < 0.0) c = l + (c - l) * l / max(l - n, 1e-6);
  if (x > 1.0) c = l + (c - l) * (1.0 - l) / max(x - l, 1e-6);
  return c;
}

float3 RuSetLum(float3 c, float l) { return RuClipColor(c + (l - RuLum(c))); }

// Rescales the span between the darkest and lightest channel to `s`, which lands the minimum on 0
// and the maximum on s exactly as the spec's explicit min/mid/max assignment does.
float3 RuSetSat(float3 c, float s)
{
  float n = min(c.r, min(c.g, c.b));
  float x = max(c.r, max(c.g, c.b));
  return x > n ? (c - n) * s / (x - n) : (float3) 0;
}

float RuSat(float3 c) { return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b)); }

/// Blends straight-alpha source `s` over straight-alpha backdrop `b`. Returns the blended colour
/// only -- the caller still has to composite it against the backdrop by the source's alpha.
float3 RuBlend(int mode, float3 b, float3 s)
{
  if (mode == RU_BLEND_MULTIPLY) return b * s;
  if (mode == RU_BLEND_SCREEN) return RuScreen(b, s);
  if (mode == RU_BLEND_OVERLAY) return RuHardLight(s, b);
  if (mode == RU_BLEND_DARKEN) return min(b, s);
  if (mode == RU_BLEND_LIGHTEN) return max(b, s);
  if (mode == RU_BLEND_COLORDODGE) return RuColorDodge(b, s);
  if (mode == RU_BLEND_COLORBURN) return RuColorBurn(b, s);
  if (mode == RU_BLEND_HARDLIGHT) return RuHardLight(b, s);
  if (mode == RU_BLEND_SOFTLIGHT) return RuSoftLight(b, s);
  if (mode == RU_BLEND_DIFFERENCE) return abs(b - s);
  if (mode == RU_BLEND_EXCLUSION) return b + s - 2.0 * b * s;
  if (mode == RU_BLEND_HUE) return RuSetLum(RuSetSat(s, RuSat(b)), RuLum(b));
  if (mode == RU_BLEND_SATURATION) return RuSetLum(RuSetSat(b, RuSat(s)), RuLum(b));
  if (mode == RU_BLEND_COLOR) return RuSetLum(s, RuLum(b));
  if (mode == RU_BLEND_LUMINOSITY) return RuSetLum(b, RuLum(s));
  return s;
}

#endif
