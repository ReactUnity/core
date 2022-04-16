#ifndef CUSTOM_FUNCTIONS_INCLUDED
#define CUSTOM_FUNCTIONS_INCLUDED

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

void CalculateBorderRadius_float(float4 brx, float4 bry, float4 cuts, float2 uv, float2 size, out bool visible, out bool err)
{
  visible = true;
  err = false;

  bool topright = uv.y > cuts.y && uv.x > cuts.x && orient2dfast(uv, float2(1, cuts.y), float2(cuts.x, 1)) >= 0;
  bool topleft = uv.y > cuts.w && uv.x < cuts.x && orient2dfast(uv, float2(0, cuts.w), float2(cuts.x, 1)) <= 0;
  bool bottomright = uv.y < cuts.y && uv.x > cuts.z && orient2dfast(uv, float2(1, cuts.y), float2(cuts.z, 0)) <= 0;
  bool bottomleft = uv.y < cuts.w && uv.x < cuts.z && orient2dfast(uv, float2(0, cuts.w), float2(cuts.z, 0)) >= 0;

  bool top = topright || topleft;
  bool right = topright || bottomright;
  bool bottom = bottomright || bottomleft;
  bool left = topleft || bottomleft;

  // if(bottomleft) {
  //   visible = false;
  //   err = true;
  //   return;
  // }

  if(!((right || left) && (top || bottom))) return;

  // TODO: remove error checking
  if((right && left) || (top && bottom)) {
    visible = false;
    err = true;
    return;
  }

  float rx = right ? (top ? brx.y : brx.z) : (top ? brx.x : brx.w);
  float ry = right ? (top ? bry.y : bry.z) : (top ? bry.x : bry.w);

  float dx = right ? 1 - uv.x : uv.x;
  float dy = top ? 1 - uv.y : uv.y;

  if (dx >= rx || dy >= ry) return;

  float drx = rx - dx;
  float dry = ry - dy;

  visible = (drx * drx / (rx * rx) + dry * dry / (ry * ry)) <= 1;
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


float DistanceToBox(float4 brx, float4 bry, float2 uv, float2 size)
{
  float rx = uv.x > 0.5 ? (uv.y > 0.5 ? brx.y : brx.z) : (uv.y > 0.5 ? brx.x : brx.w);
  float ry = uv.x > 0.5 ? (uv.y > 0.5 ? bry.y : bry.z) : (uv.y > 0.5 ? bry.x : bry.w);

  rx = min(0.5, rx);
  ry = min(0.5, ry);

  float dx = abs(uv.x - 0.5);
  float dy = abs(uv.y - 0.5);

  float cx = abs(0.5 - rx);
  float cy = abs(0.5 - ry);

  if (dy < cy) {
    float fx = dx - 0.5;
    if (dx < cx) {
      float fy = dy - 0.5;

      float kx = fx * size.x;
      float ky = fy * size.y;

      return kx < 0 ? max(kx, ky) : min(kx, ky);
    }
    else return fx * size.x;
  }
  else if (dx < cx) {
    return (dy - 0.5) * size.y;
  }

  float ox = (dx - cx) * size.x;
  float oy = (dy - cy) * size.y;
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

float ConvertRadiusToSigma(float radius) {
  return radius * 0.57735 + 0.5;
}


float gaussian(float x, float mu, float sigma) {
  float a = (x - mu) / sigma;
  return exp(-0.5 * a * a);
}

static const float pi = 3.14159265;
static const float hpi = pi / 2;
static const float pi2 = 2 * pi;
static const float e = 2.71828183;

#endif // CUSTOM_FUNCTIONS_INCLUDED
