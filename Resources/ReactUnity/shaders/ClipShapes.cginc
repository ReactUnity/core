#ifndef REACTUNITY_CLIPSHAPES_INCLUDED
#define REACTUNITY_CLIPSHAPES_INCLUDED

// `clip-path`, evaluated per fragment against the element's own box. Every shape is a signed
// distance -- negative inside -- so one antialiased edge serves all of them, softened over exactly
// one device pixel.
//
// The shapes were resolved to points by ClipPath.Resolve on the C# side, in the box's coordinates
// with y growing up from its bottom edge. Nothing here is in uv, which is what lets a circle stay
// round in a capture whose texture is not square.

// What _ClipKind selects, which is a resolved form rather than a CSS shape: inset(), rect() and
// xywh() are all a rounded box, circle() and ellipse() one ellipse, and polygon(), path() and
// shape() arrive as either a ring of points or a rasterized mask -- see ElementFilter.PrepareClip.
#define RU_CLIP_NONE 0
#define RU_CLIP_BOX 1
#define RU_CLIP_ELLIPSE 2
#define RU_CLIP_RING 3
#define RU_CLIP_MASK 4

// Distinct ring vertices, which ClipPath.MaxUniformPoints matches. The ring repeats the first
// point, so the walk below covers this many edges. Two points ride in each float4.
#define RU_CLIP_MAX_POINTS 16
#define RU_CLIP_POLY_SLOTS 9

int _ClipKind;
float4 _ClipRegion;
float4 _ClipBox;
float4 _ClipRadiiX;
float4 _ClipRadiiY;
float4 _ClipCircle;
float4 _ClipPoly[RU_CLIP_POLY_SLOTS];
int _ClipPolyCount;
int _ClipEvenOdd;
sampler2D _ClipMaskTex;

// Constant-folds wherever the index is a constant, which is why the walk below is a fixed-bound
// loop: a dynamically indexed uniform array is what would cost this shader its instruction budget.
#define RU_CLIP_POINT(i) (((i) % 2 == 0) ? _ClipPoly[(i) / 2].xy : _ClipPoly[(i) / 2].zw)

/// A box with elliptical corners. `p` is relative to the centre, `r` the radii of the corner it
/// falls nearest -- picked by the caller, since which corner that is depends on CSS's order.
float RuSdRoundBox(float2 p, float2 halfSize, float2 r)
{
  float2 a = abs(p);
  float2 corner = halfSize - r;
  float2 q = a - corner;

  if (q.x > 0.0 && q.y > 0.0 && r.x > 0.0 && r.y > 0.0)
  {
    // f(q) = length(q / r) - 1 is zero on the ellipse; dividing by its gradient turns that into a
    // distance, and reduces to |q| - R exactly when the radii are equal.
    float2 u = q / r;
    float k = length(u);
    float g = length(u / r);
    return g > 1e-9 ? (k - 1.0) * k / g : k - 1.0;
  }

  float2 d = a - halfSize;
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

/// An ellipse centred on the origin. Same first-order approximation as the corners above -- exact
/// for a circle, and inside a pixel of exact for anything an antialiased edge is drawn from.
float RuSdEllipse(float2 p, float2 r)
{
  if (r.x <= 0.0 || r.y <= 0.0) return 1.0;

  float2 u = p / r;
  float k = length(u);
  if (k < 1e-6) return -min(r.x, r.y);

  float g = length(u / r);
  return g > 1e-9 ? (k - 1.0) * k / g : k - 1.0;
}

/// The closed ring's distance, signed by whichever fill rule was asked for.
float RuSdPolygon(float2 p)
{
  float dsq = 1e20;
  int wind = 0;
  int crossings = 0;

  [unroll]
  for (int i = 0; i < RU_CLIP_MAX_POINTS; i++)
  {
    // A guard rather than a break: the bound stays constant, so every index above is one too.
    if (i + 1 < _ClipPolyCount)
    {
      float2 a = RU_CLIP_POINT(i);
      float2 b = RU_CLIP_POINT(i + 1);
      float2 e = b - a;
      float2 w = p - a;

      float2 q = w - e * clamp(dot(w, e) / max(dot(e, e), 1e-12), 0.0, 1.0);
      dsq = min(dsq, dot(q, q));

      // Crossings of the ray running +x from p. Counted plainly for `evenodd` and with the edge's
      // direction for `nonzero`; the two only part company where the ring crosses itself.
      if ((a.y <= p.y && b.y > p.y) || (b.y <= p.y && a.y > p.y))
      {
        float t = (p.y - a.y) / e.y;
        if (a.x + t * e.x > p.x)
        {
          crossings += 1;
          wind += (b.y > a.y) ? 1 : -1;
        }
      }
    }
  }

  bool inside = (_ClipEvenOdd != 0) ? ((crossings % 2) != 0) : (wind != 0);
  float d = sqrt(dsq);
  return inside ? -d : d;
}

/// How much of this fragment the shape keeps. Exactly 1 when there is no shape, which matters:
/// `isolation` and a stacked background blend run this whole composite with nothing else to do.
float RuClipCoverage(float2 uv, float2 texel)
{
  if (_ClipKind == RU_CLIP_NONE) return 1.0;

  // A shape too complex for the ring above was rasterized over the capture's own region, so its
  // coverage is already in this uv and already antialiased -- one read, whatever the shape.
  if (_ClipKind == RU_CLIP_MASK) return tex2D(_ClipMaskTex, uv).r;

  // Out of the capture's uv and into the element's box: the capture reaches _ClipRegion.zw past
  // its left and bottom edges, which is the filter region a blur or a shadow asked for.
  float2 p = float2(uv.x * _ClipRegion.x - _ClipRegion.z, uv.y * _ClipRegion.y - _ClipRegion.w);
  float aa = max(max(_ClipRegion.x * texel.x, _ClipRegion.y * texel.y), 1e-5);

  float d;

  if (_ClipKind == RU_CLIP_BOX)
  {
    float2 halfSize = (_ClipBox.zw - _ClipBox.xy) * 0.5;
    float2 centre = (_ClipBox.zw + _ClipBox.xy) * 0.5;
    float2 rel = p - centre;

    // CSS names the corners top-left first and clockwise, and `top` is +y here.
    float2 r = rel.x < 0.0
      ? (rel.y > 0.0 ? float2(_ClipRadiiX.x, _ClipRadiiY.x) : float2(_ClipRadiiX.w, _ClipRadiiY.w))
      : (rel.y > 0.0 ? float2(_ClipRadiiX.y, _ClipRadiiY.y) : float2(_ClipRadiiX.z, _ClipRadiiY.z));

    d = RuSdRoundBox(rel, halfSize, min(r, halfSize));
  }
  else if (_ClipKind == RU_CLIP_RING) d = RuSdPolygon(p);
  else d = RuSdEllipse(p - _ClipCircle.xy, _ClipCircle.zw);

  return saturate(0.5 - d / aa);
}

#endif
