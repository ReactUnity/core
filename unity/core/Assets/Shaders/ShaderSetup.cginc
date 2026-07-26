struct appdata {
  float4 vertex : POSITION;
  float2 uv : TEXCOORD0;
  // float2 uv1 : TEXCOORD1;
  // float2 uv2 : TEXCOORD2;
  float4 color : COLOR;  // set from Image component property
  UNITY_VERTEX_INPUT_INSTANCE_ID
};

struct v2f {
  float2 uv : TEXCOORD0;
  // float2 uv1 : TEXCOORD1;
  // float2 uv2 : TEXCOORD2;
  float4 vertex : SV_POSITION;
  float4 color : COLOR;
  float4 worldPosition : TEXCOORD1;
  #ifdef GRAB_POS
  float2 uvgrab : TEXCOORD2;
  #endif
  UNITY_VERTEX_INPUT_INSTANCE_ID
  UNITY_VERTEX_OUTPUT_STEREO
};

v2f vert (appdata v) {
  v2f o;
  UNITY_SETUP_INSTANCE_ID(v);
  UNITY_INITIALIZE_OUTPUT(v2f, o);
  UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
  UNITY_TRANSFER_INSTANCE_ID(v, o);
  o.worldPosition = v.vertex;
  o.vertex = UnityObjectToClipPos(v.vertex);
  // o.uv = TRANSFORM_TEX(v.uv, _MainTex);
  o.uv = v.uv;
  #ifdef GRAB_POS
  o.uvgrab = ComputeGrabScreenPos(o.vertex);
  #endif

  // o.uv1 = v.uv1;
  // o.uv2 = v.uv2;
  o.color = v.color;
  return o;
}

inline fixed4 mixAlpha(fixed4 mainTexColor, fixed4 color, float sdfAlpha){
  fixed4 col = mainTexColor * color;
  col.a = min(col.a, sdfAlpha);
  return col;
}
