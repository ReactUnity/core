#ifndef REACTUNITY_ROUNDEDBOX_INCLUDED
#define REACTUNITY_ROUNDEDBOX_INCLUDED

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

/// The radii of the corner `p` falls in, out of the four CSS names top-left first and clockwise.
/// `top` is +y here, as everywhere in a canvas.
float2 RuBoxCornerRadius(float2 p, float4 radiiX, float4 radiiY)
{
  return p.x < 0.0
    ? (p.y > 0.0 ? float2(radiiX.x, radiiY.x) : float2(radiiX.w, radiiY.w))
    : (p.y > 0.0 ? float2(radiiX.y, radiiY.y) : float2(radiiX.z, radiiY.z));
}

#endif
