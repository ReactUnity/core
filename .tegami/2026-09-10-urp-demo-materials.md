---
packages:
  "upm:com.reactunity.core": patch
---

### The sample's 3D props are not magenta any more

Moving both Unity projects to the Universal Render Pipeline left every mesh in them on Unity's
built-in `Default-Material`, whose shader is `Standard`. URP cannot draw it, so it draws magenta
instead -- and because the shader still compiles, `Material.shader.isSupported` keeps saying `true`
and nothing logs a word about it. The render texture demo on the sample's Images page was a solid
magenta square with the portal's UI stuck to its face.

Nine renderers across five scenes were on it, plus a `Default-Diffuse` cube and the two XR ray
`LineRenderer`s in the VR scene, which had somehow ended up on `Default-Terrain-Standard`. All of
them are pipeline-sensitive in the same way.

Kitchen sink gets `Assets/Settings/DemoSurface.mat`, a `Universal Render Pipeline/Lit` material in
the sample's own indigo -- the demo's stage already has a directional light culled to its layer, so
the cube reads as a lit solid and its faces separate as you drag it round. The XR rays get
`DemoLine.mat` on `Sprites/Default`. Flipping kitchen sink back to the built-in pipeline to compare
the two will now show the URP material as magenta instead, which is the same trade the other way
and the reason the second material is not URP's.

`Tests/Scenes/TestScene_World.unity` ships inside the package, where pinning a pipeline is not an
option, so its backdrop cube is on `Unlit/Color` -- a built-in shader both pipelines draw. It is
scenery behind a world-space canvas and no test reads a pixel of it, but it was magenta in the
Editor for anyone who opened the scene.
