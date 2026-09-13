#ifndef REACTUNITY_BACKGROUNDCLIP_INCLUDED
#define REACTUNITY_BACKGROUNDCLIP_INCLUDED

#include "RoundedBox.cginc"

// `background-clip`, per layer. A layer is cut either to a rounded box -- the padding or the
// content box, since the border box is the one the mask on `[GraphicRoot]` already gives every
// layer -- or to the element's glyphs, drawn once into a coverage texture.
//
// Both read the canvas-space vertex position UGUI already hands `_ClipRect`, through a matrix
// rather than a rect, so a rotated or scaled element still lines up: the clip is described in the
// element's own space and has no idea where on the canvas the element ended up.
//
// Nothing sets these on a material that is not clipping, and an unbound flag reads 0, so the whole
// thing costs two compares on every other background in the scene.

sampler2D _ReactUnityTextClip;
float4x4 _ReactUnityTextClipMatrix;
float _ReactUnityTextClipBound;

float4x4 _ReactUnityBoxClipMatrix;
// Half width, half height, the box-local length of one screen pixel, and whether any of it is set.
float4 _ReactUnityBoxClipSize;
float4 _ReactUnityBoxClipRadiusX;
float4 _ReactUnityBoxClipRadiusY;

float RuTextClip(float4 canvasPosition)
{
  if (_ReactUnityTextClipBound < 0.5) return 1;

  float2 uv = mul(_ReactUnityTextClipMatrix, float4(canvasPosition.xy, 0, 1)).xy;

  // Outside the painting area there is no glyph, and the sampler clamps rather than returning
  // nothing -- so an edge row of coverage would smear across everything beyond it.
  float2 inside = step(0, uv) * step(uv, 1);
  return tex2D(_ReactUnityTextClip, uv).a * inside.x * inside.y;
}

float RuBoxClip(float4 canvasPosition)
{
  if (_ReactUnityBoxClipSize.w < 0.5) return 1;

  float2 p = mul(_ReactUnityBoxClipMatrix, float4(canvasPosition.xy, 0, 1)).xy;
  float2 halfSize = _ReactUnityBoxClipSize.xy;
  float2 r = RuBoxCornerRadius(p, _ReactUnityBoxClipRadiusX, _ReactUnityBoxClipRadiusY);

  float d = RuSdRoundBox(p, halfSize, min(r, halfSize));

  // A screen pixel of ramp, measured on the CPU rather than from the derivatives: a background has
  // to come out the same on every run for the rendering snapshots to mean anything.
  return saturate(0.5 - d / max(_ReactUnityBoxClipSize.z, 1e-5));
}

float RuBackgroundClip(float4 canvasPosition)
{
  return RuTextClip(canvasPosition) * RuBoxClip(canvasPosition);
}

#endif
