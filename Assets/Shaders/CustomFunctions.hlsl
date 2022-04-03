#ifndef CUSTOM_FUNCTIONS_INCLUDED
#define CUSTOM_FUNCTIONS_INCLUDED

void CalculateBorderRadius_float(float4 br, float2 uv, float2 size, out bool visible)
{
  visible = true;

  float r = uv.x > 0.5 ? (uv.y > 0.5 ? br.y : br.z) : (uv.y > 0.5 ? br.x : br.w);

  float rx = r < 1 ? r : r / size.x;
  float ry = r < 1 ? r : r / size.y;

  rx = rx > 0.5 ? 0.5 : rx;
  ry = ry > 0.5 ? 0.5 : ry;

  float dx = uv.x > 0.5 ? 1 - uv.x : uv.x;
  float dy = uv.y > 0.5 ? 1 - uv.y : uv.y;

  if (dx >= rx || dy >= ry) return;

  float drx = rx - dx;
  float dry = ry - dy;

  visible = (drx * drx / (rx * rx) + dry * dry / (ry * ry)) <= 1;
}

float CalculateBorderRadius(float4 br, float2 uv, float2 size)
{
  if (uv.x < 0 || uv.x > 1 || uv.y < 0 || uv.y > 1) return 0;

  bool visible;
  CalculateBorderRadius_float(br, uv, size, visible);
  return visible ? 1 : 0;
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


float DistanceToBox(float4 br, float2 uv, float2 size)
{
  float r = uv.x > 0.5 ? (uv.y > 0.5 ? br.y : br.z) : (uv.y > 0.5 ? br.x : br.w);

  float rx = r < 1 ? r : r / size.x;
  float ry = r < 1 ? r : r / size.y;

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
