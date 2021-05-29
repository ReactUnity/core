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

  if(dx >= rx || dy >= ry) {
    return;
  }

  float drx = rx - dx;
  float dry = ry - dy;

  visible = (drx * drx / (rx * rx) + dry * dry / (ry * ry)) <= 1;
}

  
void CalculateBorder_float(float4 br, float2 uv, float2 size, float4 border, out bool isBorder)
{
  isBorder = false;
  
  float r = uv.x > 0.5 ? (uv.y > 0.5 ? br.y : br.z) : (uv.y > 0.5 ? br.x : br.w);
  
  float rx = r < 1 ? r : r / size.x;
  float ry = r < 1 ? r : r / size.y;

  rx = rx > 0.5 ? 0.5 : rx;
  ry = ry > 0.5 ? 0.5 : ry;
  
  float dx = uv.x > 0.5 ? 1 - uv.x : uv.x;
  float dy = uv.y > 0.5 ? 1 - uv.y : uv.y;

  float borderSize = 0;
  float borderScale = 1;
  
  float lx = 0.5 - uv.x;
  float ly = 0.5 - uv.y;

  float main = 0;
  
  
  float drx = abs(rx - dx);
  float dry = abs(ry - dy);

  if(lx < ly && lx < -ly) {
    borderSize = border.y;
    borderScale = size.x;
    main = dx;
    drx += borderSize / borderScale;
  }

  if(lx < ly && lx >= -ly) {
    borderSize = border.z;
    borderScale = size.y;
    main = dy;
    dry += borderSize / borderScale;
  }
  
  if(lx >= ly && lx < -ly) {
    borderSize = border.x;
    borderScale = size.y;
    main = dy;
    dry += borderSize / borderScale;
  }

  if(lx >= ly && lx >= -ly) {
    borderSize = border.w;
    borderScale = size.x;
    main = dx;
    drx += borderSize / borderScale;
  }


  float scaled = borderSize / borderScale;

  if(rx <= 0 || ry <= 0) {
    isBorder = main < scaled;

    return;
  }

  //drx += borderSize / borderScale;
  //dry += borderSize / borderScale;

  isBorder = (drx * drx / (rx * rx) + dry * dry / (ry * ry)) > 1;
}

void PickBorderColor_float(float2 uv, float4 top, float4 right, float4 bottom, float4 left, out float4 color)
{
  color = 0;

  float dx = 0.5 - uv.x;
  float dy = 0.5 - uv.y;

  if(dx < dy && dx < -dy) {
    color = right;
  }

  if(dx < dy && dx >= -dy) {
    color = bottom;
  }
  
  if(dx >= dy && dx < -dy) {
    color = top;
  }

  if(dx >= dy && dx >= -dy) {
    color = left;
  }
}

#endif // CUSTOM_FUNCTIONS_INCLUDED
