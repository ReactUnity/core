#ifndef REACTUNITY_TEXTCLIP_INCLUDED
#define REACTUNITY_TEXTCLIP_INCLUDED

// `background-clip: text`. The element's glyphs are drawn once into a coverage texture and every
// background layer multiplies its alpha by them, so the background survives only where the text is.
//
// The uv comes from the canvas-space vertex position UGUI already hands `_ClipRect`, through a
// matrix rather than a rect, so a rotated or scaled element still lines up -- the coverage is drawn
// in the element's own space and has no idea where on the canvas the element ended up.
//
// Nothing sets these on a material that is not clipping, and an unbound `_ReactUnityTextClipBound`
// reads 0, so the whole thing costs one compare on every other background in the scene.

sampler2D _ReactUnityTextClip;
float4x4 _ReactUnityTextClipMatrix;
float _ReactUnityTextClipBound;

float RuTextClip(float4 canvasPosition)
{
  if (_ReactUnityTextClipBound < 0.5) return 1;

  float2 uv = mul(_ReactUnityTextClipMatrix, float4(canvasPosition.xy, 0, 1)).xy;

  // Outside the painting area there is no glyph, and the sampler clamps rather than returning
  // nothing -- so an edge row of coverage would smear across everything beyond it.
  float2 inside = step(0, uv) * step(uv, 1);
  return tex2D(_ReactUnityTextClip, uv).a * inside.x * inside.y;
}

#endif
