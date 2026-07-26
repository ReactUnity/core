#ifndef CUSTOM_FUNCTIONS_INCLUDED
#define CUSTOM_FUNCTIONS_INCLUDED

static const float pi = 3.14159265;
static const float hpi = pi / 2;
static const float pi2 = 2 * pi;
static const float e = 2.71828183;

float ConvertRadiusToSigma(float radius) {
  return radius * 0.57735 + 0.5;
}

float gaussian(float x, float mu, float sigma) {
  float a = (x - mu) / sigma;
  return exp(-0.5 * a * a);
}

// Returns a positive value if the points a, b, and c occur in counterclockwise order (c lies to the left of the directed line defined by points a and b).
// Returns a negative value if they occur in clockwise order (c lies to the right of the directed line ab).
// Returns zero if they are collinear.
// The result is also an approximation of twice the signed area of the triangle defined by the three points.
// See also: https://github.com/mourner/robust-predicates
float orient2dfast(float2 p, float2 a, float2 b) {
    return (a.y - p.y) * (b.x - p.x) - (a.x - p.x) * (b.y - p.y);
}

bool ptInTriangle(float2 p, float2 p0, float2 p1, float2 p2) {
  float dX = p.x - p2.x;
  float dY = p.y - p2.y;
  float dX21 = p2.x - p1.x;
  float dY12 = p1.y - p2.y;
  float D = dY12 * (p0.x - p2.x) + dX21 * (p0.y - p2.y);
  float s = dY12 * dX + dX21 * dY;
  float t = (p2.y - p0.y) * dX + (p0.x - p2.x) * dY;
  if (D < 0) return s <= 0 && t <= 0 && s + t >= D;
  return s >= 0 && t >= 0 && s + t <= D;
}

float CalculateBorderRadius_float(float4 brx, float4 bry, float4 cuts, float2 uv, float2 size)
{
  bool topright = uv.y > cuts.y && uv.x > cuts.x && orient2dfast(uv, float2(1, cuts.y), float2(cuts.x, 1)) >= 0;
  bool topleft = uv.y > cuts.w && uv.x < cuts.x && orient2dfast(uv, float2(0, cuts.w), float2(cuts.x, 1)) <= 0;
  bool bottomright = uv.y < cuts.y && uv.x > cuts.z && orient2dfast(uv, float2(1, cuts.y), float2(cuts.z, 0)) <= 0;
  bool bottomleft = uv.y < cuts.w && uv.x < cuts.z && orient2dfast(uv, float2(0, cuts.w), float2(cuts.z, 0)) >= 0;

  bool top = topright || topleft;
  bool right = topright || bottomright;
  bool bottom = bottomright || bottomleft;
  bool left = topleft || bottomleft;

  if(!((right || left) && (top || bottom))) return 0;

  float rx = right ? (top ? brx.y : brx.z) : (top ? brx.x : brx.w);
  float ry = right ? (top ? bry.y : bry.z) : (top ? bry.x : bry.w);

  float dx = right ? 1 - uv.x : uv.x;
  float dy = top ? 1 - uv.y : uv.y;

  if (dx >= rx || dy >= ry) return 0;

  float drx = rx - dx;
  float dry = ry - dy;

  return (drx * drx / (rx * rx) + dry * dry / (ry * ry));
}

void PickBorderColorTrapezoidal_float(float2 uv, float4 sizes, float4 top, float4 right, float4 bottom, float4 left, out float4 color)
{
  color = 0;

  // UV position (vertically inverted)
  float2 pos = float2(uv.x, 1 - uv.y);

  // Border sizes - Top, right, bottom, left
  float t = sizes.x;
  float r = sizes.y;
  float b = sizes.z;
  float l = sizes.w;

  // Does not work well with rounded borders
  // if((x > l) && (x < (1 - r)) && (y > t) && (y < (1 - b))) return;

  // Total border sizes in height and width
  float hs = t + b;
  float ws = l + r;

  // Total available space - Height, width
  float h = 1;
  float w = 1;

  // Remaining content space - Height, width
  float hc = h - hs;
  float wc = w - ws;

  // Ratio of border to content
  float hr = hs == 0 ? 0 : hc / hs;
  float wr = ws == 0 ? 0 : wc / ws;

  float ld = l + (l * hr);
  float rd = r + (r * hr);
  float td = t + (t * wr);
  float bd = b + (b * wr);

  if (hs <= 0 || ld + rd > 1) {
    if (ws <= 0 || td + bd > 1.05) return;
    // Vertical trapezoid

    float m = (ld / (ld + rd));

    if (td > 0 && ptInTriangle(pos, float2(0, 0), float2(1, 0), float2(m, td))) color = top;
    else if (bd > 0 && ptInTriangle(pos, float2(0, 1), float2(1, 1), float2(m, 1 - bd))) color = bottom;
    else if (pos.x > m) color = right;
    else color = left;
  }
  else {
    if (hs <= 0 || ld + rd > 1.05) return;
    // Horizontal trapezoid

    float m = (td / (td + bd));

    if (ld > 0 && ptInTriangle(pos, float2(0, 0), float2(0, 1), float2(ld, m))) color = left;
    else if (rd > 0 && ptInTriangle(pos, float2(1, 1), float2(1, 0), float2(1 - rd, m))) color = right;
    else if (pos.y > m) color = bottom;
    else color = top;
  }
}


float DistanceToBox(float4 brx, float4 bry, float4 cuts, float2 uv, float2 size)
{
  // TODO: hanlde improved border radius logic
  // bool topright = uv.y > cuts.y && uv.x > cuts.x && orient2dfast(uv, float2(1, cuts.y), float2(cuts.x, 1)) >= 0;
  // bool topleft = uv.y > cuts.w && uv.x < cuts.x && orient2dfast(uv, float2(0, cuts.w), float2(cuts.x, 1)) <= 0;
  // bool bottomright = uv.y < cuts.y && uv.x > cuts.z && orient2dfast(uv, float2(1, cuts.y), float2(cuts.z, 0)) <= 0;
  // bool bottomleft = uv.y < cuts.w && uv.x < cuts.z && orient2dfast(uv, float2(0, cuts.w), float2(cuts.z, 0)) >= 0;

  // bool top = topright || topleft;
  // bool right = topright || bottomright;
  // bool bottom = bottomright || bottomleft;
  // bool left = topleft || bottomleft;

  // bool sq = !((right || left) && (top || bottom));

  // if(sq) {
  //   float xx = size.x * (uv.x > 0.5 ? 1 - uv.x : uv.x);
  //   float yy = size.y * (uv.y > 0.5 ? 1 - uv.y : uv.y);

  //   return -min(xx, yy);
  // }

  bool top = uv.y > 0.5;
  bool right = uv.x > 0.5;

  // Distance of ellipse center to edge
  float rx = right ? (top ? brx.y : brx.z) : (top ? brx.x : brx.w);
  float ry = right ? (top ? bry.y : bry.z) : (top ? bry.x : bry.w);

  // Distance of point to edge
  float dx = (right ? 1 - uv.x : uv.x);
  float dy = (top ? 1 - uv.y : uv.y);

  // Absolute position of ellipse center
  float cx = right ? 1 - rx : rx;
  float cy = top ? 1 - ry : ry;

  if (dy >= ry) {
    float fx = dx;
    if (dx >= rx) {
      float fy = dy;

      float kx = fx * size.x;
      float ky = fy * size.y;

      return kx < 0 ? -max(kx, ky) : -min(kx, ky);
    }
    else return -fx * size.x;
  }
  else if (dx >= rx) {
    return -dy * size.y;
  }

  float ox = (uv.x - cx) * size.x;
  float oy = (uv.y - cy) * size.y;
  float oc = sqrt(ox * ox + oy * oy);

  float st = ox / oc;
  float ct = oy / oc;

  if (rx == 0 && ry == 0) return oc;
  rx = rx * size.x;
  ry = ry * size.y;
  // r = a*b / sqrt( a^2 cos^2(t) + b^2 sin^2(t) )
  float rr = rx * ry / sqrt(ry * ry * st * st + rx * rx * ct * ct);
  return oc - rr;
}

#endif // CUSTOM_FUNCTIONS_INCLUDED
