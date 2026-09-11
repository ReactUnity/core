Shader "ReactUnity/BackgroundImageBlendStack"
{
  // A background layer above the bottom one, whose backdrop is the accumulation of the layers
  // below it. That is read back out of the render target, which only holds this element's own
  // background because the element is captured offscreen for it -- see ElementFilter, and
  // UGUIComponent.SetFilter for what asks for the capture.
  //
  // Which is why the two subshaders differ: built-in's GrabPass copies whatever target is current,
  // and inside the capture that is already the right thing. A scriptable pipeline has no GrabPass,
  // so ElementFilter renders the capture-so-far into a surface and binds it here.
  Properties{
    _MainTex("Texture", 2D) = "white" {}

    // Bound per material by BackdropSurface. Declared here because Material.SetTexture is silently
    // a no-op for a property the shader never declared.
    [HideInInspector] _ReactUnityBackdrop ("Backdrop", 2D) = "black" {}
    [HideInInspector] _ReactUnityBackdropBound ("Backdrop Bound", Float) = 0.0

    _angle("Angle", Float) = 0
    _from("From", Float) = 0
    _offset("Offset", Float) = 0
    _length("Length", Float) = 1
    _distance("Distance", Float) = 0
    _aspect("Aspect Ratio", Float) = 1
    _at("At", Vector) = (0.5, 0.5, 1, 1)
    _radius("Radius", Float) = 1
    [Toggle()] _repeating("Gradient Repeating", Int) = 0
    [Enum(ReactUnity.Types.GradientType)] _gradientType("Gradient Type", Int) = 0
    [Enum(ReactUnity.Types.RadialGradientShape)] _shape("Gradient Shape", Int) = 0
    _BlendMode("Blend Mode", Int) = 0

    [Enum(UnityEngine.Rendering.CompareFunction)] _StencilComp("Stencil Comparison", Float) = 8
    _Stencil("Stencil ID", Float) = 0
    [Enum(UnityEngine.Rendering.StencilOp)] _StencilOp("Stencil Operation", Float) = 0
    _StencilWriteMask("Stencil Write Mask", Float) = 255
    _StencilReadMask("Stencil Read Mask", Float) = 255
    _ColorMask("Color Mask", Float) = 15
    [Toggle(UNITY_UI_ALPHACLIP)] _UseUIAlphaClip("Use Alpha Clip", Float) = 0
    [Toggle(UNITY_UI_CLIP_RECT)] _UseUIClipRect("Use Clip Rect", Float) = 1
  }

  Category {
    Tags {
      "Queue" = "Transparent"
      "IgnoreProjector" = "True"
      "RenderType" = "Transparent"
      "PreviewType" = "Plane"
      "CanUseSpriteAtlas" = "True"
    }

    Stencil {
      Ref[_Stencil]
      Comp[_StencilComp]
      Pass[_StencilOp]
      ReadMask[_StencilReadMask]
      WriteMask[_StencilWriteMask]
    }
    Cull Off
    Lighting Off
    ZTest[unity_GUIZTestMode]
    ColorMask[_ColorMask]

    Blend One OneMinusSrcAlpha
    ZWrite Off

    SubShader {
      Tags { "RenderPipeline" = "UniversalPipeline" }

      Pass {
        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma target 3.0

        #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
        #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

        #define GRAB_POS
        #define RU_BG_BLEND

        // No fallback to _CameraOpaqueTexture, unlike the other two backdrop readers: that texture
        // is the scene behind the page, and this layer's backdrop is the element's own background.
        // With nothing bound the layer comes through as though it did not blend, which is the only
        // honest answer -- and it only happens for the frame before the surface exists.
        sampler2D _ReactUnityBackdrop;
        float _ReactUnityBackdropBound;
        #define RU_BG_READ_BACKDROP(uv) (_ReactUnityBackdropBound > 0 ? tex2D(_ReactUnityBackdrop, uv) : float4(0, 0, 0, 0))

        #include "../../../Assets/Shaders/BackgroundImageCore.cginc"
        ENDCG
      }
    }

    SubShader {
      GrabPass { }

      Pass {
        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma target 3.0

        #pragma multi_compile_local _ UNITY_UI_CLIP_RECT
        #pragma multi_compile_local _ UNITY_UI_ALPHACLIP

        #define GRAB_POS
        #define RU_BG_BLEND
        sampler2D _GrabTexture;
        #define RU_BG_READ_BACKDROP(uv) tex2D(_GrabTexture, uv)
        #include "../../../Assets/Shaders/BackgroundImageCore.cginc"
        ENDCG
      }
    }
  }
}
