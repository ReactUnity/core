using UnityEngine;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>
    /// Every sprite the HUD draws, baked once at startup into one atlas -- the stand-in for an artist's
    /// sprite sheet, so the chrome batches. The full-screen gradients are separate, small textures that
    /// are stretched; they only ever draw into the scene render texture.
    /// </summary>
    public static class HudArt
    {
        /// <summary>The box-shadow blur <see cref="Glow"/> is baked at; scale with pixelsPerUnitMultiplier.</summary>
        public const float GlowBlur = 16f;

        const int AtlasSize = 1024, Pad = 2;

        public static Texture2D Atlas, Sky, Vignette, Hurt, Scan;

        public static Sprite White, Rr4, Rr4Ring, Rr6, Rr6Ring, Rr8Ring2, Rr10Ring, Rr20, SquareRing, Pill, Bracket, Dot, StarDot, Circle, Glow,
            Hex, XpTrack, XpFill, Sheen, Slot, SlotUlt, SlotMask, Buff, Item, Corner, Well10, Well16, Well4, Ticks, BossFill, Sweep, TabInk,
            OrbBase, OrbGlass, Wave, Minimap, Radar;

        delegate Color PixelFn(float x, float y);

        struct Entry
        {
            public int X, Y, W, H;
            public Vector4 Border;
        }

        static Color32[] pixels;
        static int penX, penY, rowH;

        public static void Ensure()
        {
            if (Atlas) return;
            BuildAtlas();
            BuildBackdrops();
        }

        static void BuildAtlas()
        {
            pixels = new Color32[AtlasSize * AtlasSize];
            penX = penY = rowH = 0;

            // Largest first, so the shelves pack tightly.
            var eMinimap = Bake(148, 148, MinimapPixel);
            var eRadar = Bake(148, 148, RadarPixel);
            var eSheen = Bake(177, 94, SheenPixel);
            var eOrbBase = Bake(132, 132, OrbBasePixel);
            var eWave = Bake(128, 128, (x, y) => Alpha(Cov(SdBox(x, y, 64, 64, 64, 64, 38.4f))));
            var eBoss = Bake(128, 16, BossPixel, new Vector4(5, 0, 0, 0));
            var eSweep = Bake(128, 4, SweepPixel);
            var eGlow = Bake(82, 82, (x, y) => Alpha(1f - Phi(SdBox(x, y, 41, 41, 9, 9, 8) / (GlowBlur * 0.5f))), new Vector4(40, 40, 40, 40));
            var eCircle = Bake(80, 80, (x, y) => Alpha(Cov(Dist(x, y, 40, 40) - 40)));
            var eOrbGlass = Bake(76, 76, OrbGlassPixel);
            var eXpTrack = Bake(68, 68, (x, y) => Alpha(XpRingAlpha(x, y)));
            var eXpFill = Bake(68, 68, XpFillPixel);
            var eTabInk = Bake(64, 2, (x, y) => Tw.A(Tw.Cyan400, 1f - Mathf.Abs(x / 32f - 1f)));
            var eSlot = Bake(56, 56, (x, y) => Gradient160(x, y, 56, 56, new Color(30 / 255f, 41 / 255f, 59 / 255f, 0.95f), new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.95f), 10));
            var eSlotUlt = Bake(56, 56, UltPixel);
            var eSlotMask = Bake(56, 56, (x, y) => Alpha(Cov(SdBox(x, y, 28, 28, 28, 28, 10))));
            var eHex = Bake(52, 52, HexPixel);
            var eItem = Bake(46, 46, (x, y) => Gradient160(x, y, 46, 46, new Color(30 / 255f, 41 / 255f, 59 / 255f, 0.9f), new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.92f), 6));
            var eRr20 = RoundFill(20);
            var eBuff = Bake(36, 36, (x, y) => Alpha(Cov(SdBox(x, y, 18, 18, 18, 18, 6))));
            var eStar = Bake(32, 32, (x, y) => Alpha(Mathf.Max(0f, 1f - Dist(x, y, 16, 16) / 16f)));
            var eBracket = Bake(18, 18, (x, y) => Alpha(x < 2f || y < 2f ? 1f : 0f));
            var ePill = Bake(16, 16, (x, y) => Alpha(Cov(Dist(x, y, 8, 8) - 8)), new Vector4(8, 8, 8, 8));
            var eWell16 = Well(16, 4);
            var eWell10 = Well(10, 5);
            var eWell4 = Well(4, 2);
            var eTicks = Bake(10, 16, (x, y) => new Color(2 / 255f, 6 / 255f, 23 / 255f, x > 9f ? 0.55f : 0f));
            var eDot = Bake(12, 12, (x, y) => Alpha(Cov(Dist(x, y, 6, 6) - 6)));
            var eCorner = Bake(12, 12, (x, y) => Alpha(Cov(SdConvex(x, y, CornerPoly))));
            var eRr10Ring = RoundRing(10, 1);
            var eRr8Ring2 = RoundRing(8, 2);
            var eRr6 = RoundFill(6);
            var eRr6Ring = RoundRing(6, 1);
            var eRr4 = RoundFill(4);
            var eRr4Ring = RoundRing(4, 1);
            var eSquareRing = RoundRing(0, 1);
            var eWhite = Bake(4, 4, (x, y) => Color.white);

            Atlas = new Texture2D(AtlasSize, AtlasSize, TextureFormat.RGBA32, false)
            {
                name = "UGUIHud Atlas",
                filterMode = FilterMode.Bilinear,
                wrapMode = TextureWrapMode.Clamp,
                hideFlags = HideFlags.DontSave,
            };
            Atlas.SetPixels32(pixels);
            Atlas.Apply(false, true);
            pixels = null;

            Minimap = Make(eMinimap); Radar = Make(eRadar); Sheen = Make(eSheen); OrbBase = Make(eOrbBase); Wave = Make(eWave);
            BossFill = Make(eBoss); Sweep = Make(eSweep); Glow = Make(eGlow); Circle = Make(eCircle); OrbGlass = Make(eOrbGlass);
            XpTrack = Make(eXpTrack); XpFill = Make(eXpFill); TabInk = Make(eTabInk); Slot = Make(eSlot); SlotUlt = Make(eSlotUlt);
            SlotMask = Make(eSlotMask); Hex = Make(eHex); Item = Make(eItem); Rr20 = Make(eRr20); Buff = Make(eBuff); StarDot = Make(eStar);
            Bracket = Make(eBracket); Pill = Make(ePill); Well16 = Make(eWell16); Well10 = Make(eWell10); Well4 = Make(eWell4);
            Ticks = Make(eTicks); Dot = Make(eDot); Corner = Make(eCorner); Rr10Ring = Make(eRr10Ring); Rr8Ring2 = Make(eRr8Ring2);
            Rr6 = Make(eRr6); Rr6Ring = Make(eRr6Ring); Rr4 = Make(eRr4); Rr4Ring = Make(eRr4Ring); SquareRing = Make(eSquareRing);
            White = Make(eWhite);
        }

        static Sprite Make(Entry e)
        {
            var s = Sprite.Create(Atlas, new Rect(e.X, e.Y, e.W, e.H), new Vector2(0.5f, 0.5f), 100f, 0, SpriteMeshType.FullRect, e.Border);
            s.hideFlags = HideFlags.DontSave;
            return s;
        }

        /// <summary>Shelf-packs one sprite, sampling <paramref name="fn"/> at pixel centres with y down, and extrudes its edges.</summary>
        static Entry Bake(int w, int h, PixelFn fn, Vector4 border = default)
        {
            if (penX + w + Pad * 2 > AtlasSize)
            {
                penX = 0;
                penY += rowH;
                rowH = 0;
            }

            var e = new Entry { X = penX + Pad, Y = penY + Pad, W = w, H = h, Border = border };
            penX += w + Pad * 2;
            rowH = Mathf.Max(rowH, h + Pad * 2);
            if (penY + rowH > AtlasSize)
            {
                Debug.LogError("UGUIHud atlas is full");
                return e;
            }

            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
                pixels[(e.Y + h - 1 - y) * AtlasSize + e.X + x] = fn(x + 0.5f, y + 0.5f);

            for (int y = -Pad; y < h + Pad; y++)
            for (int x = -Pad; x < w + Pad; x++)
            {
                if (x >= 0 && x < w && y >= 0 && y < h) continue;
                int sx = Mathf.Clamp(x, 0, w - 1), sy = Mathf.Clamp(y, 0, h - 1);
                pixels[(e.Y + y) * AtlasSize + e.X + x] = pixels[(e.Y + sy) * AtlasSize + e.X + sx];
            }

            return e;
        }

        static Entry RoundFill(int r)
        {
            int b = r + 1, s = b * 2 + 2;
            return Bake(s, s, (x, y) => Alpha(Cov(SdBox(x, y, s * 0.5f, s * 0.5f, s * 0.5f, s * 0.5f, r))), new Vector4(b, b, b, b));
        }

        /// <summary>A box-shadow inset ring of <paramref name="t"/> px, as a sliced sprite.</summary>
        static Entry RoundRing(int r, int t)
        {
            int b = Mathf.Max(r, t) + 1, s = b * 2 + 2;
            return Bake(s, s, (x, y) =>
            {
                float sd = SdBox(x, y, s * 0.5f, s * 0.5f, s * 0.5f, s * 0.5f, r);
                return Alpha(Mathf.Clamp01(Cov(sd) - Cov(sd + t)));
            }, new Vector4(b, b, b, b));
        }

        /// <summary>
        /// A bar well: background, the `0 2px 6px` inset shadow and the 1px inset ring, at the exact
        /// height it is drawn at. Sliced horizontally only.
        /// </summary>
        static Entry Well(int h, int r)
        {
            int b = r + 1, w = b * 2 + 2;
            var bg = new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.85f);
            var ringColor = new Color(148 / 255f, 163 / 255f, 184 / 255f, 1f);
            return Bake(w, h, (x, y) =>
            {
                float sd = SdBox(x, y, w * 0.5f, h * 0.5f, w * 0.5f, h * 0.5f, r);
                const float sigma = 3f;
                float lit = Phi(x / sigma) * Phi((w - x) / sigma) * Phi((y - 2f) / sigma) * Phi((h + 2f - y) / sigma);
                var c = Over(new Color(0, 0, 0, 0.6f * (1f - lit)), bg);
                c = Over(Tw.A(ringColor, 0.22f * Mathf.Clamp01(Cov(sd) - Cov(sd + 1f))), c);
                c.a *= Cov(sd);
                return c;
            }, new Vector4(b, 0, b, 0));
        }

        static void BuildBackdrops()
        {
            Sky = Fill(512, 220, SkyPixel, TextureWrapMode.Clamp, "UGUIHud Sky");
            Vignette = Fill(256, 110, (u, v) =>
            {
                float r = Ellipse(u, v, 0.5f, 0.46f, 0.78f, 0.74f);
                return new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.88f * Mathf.Clamp01((r - 0.42f) / 0.58f));
            }, TextureWrapMode.Clamp, "UGUIHud Vignette");
            Hurt = Fill(256, 110, (u, v) =>
            {
                float r = Ellipse(u, v, 0.5f, 0.5f, 0.9f, 0.85f);
                return new Color(190 / 255f, 18 / 255f, 60 / 255f, 0.75f * Mathf.Clamp01((r - 0.38f) / 0.62f));
            }, TextureWrapMode.Clamp, "UGUIHud Hurt");

            // One scanline period: a 1px line then 2px of nothing. Only alpha is read by the overlay shader.
            Scan = new Texture2D(1, 3, TextureFormat.RGBA32, false)
            {
                name = "UGUIHud Scanlines",
                filterMode = FilterMode.Bilinear,
                wrapMode = TextureWrapMode.Repeat,
                hideFlags = HideFlags.DontSave,
            };
            var white = new Color32(255, 255, 255, 0);
            Scan.SetPixels32(new[] { white, white, new Color32(255, 255, 255, 41) });
            Scan.Apply(false, true);
        }

        /// <summary>A standalone texture sampled in normalised box coordinates, v down.</summary>
        static Texture2D Fill(int w, int h, PixelFn fn, TextureWrapMode wrap, string name)
        {
            var px = new Color32[w * h];
            for (int y = 0; y < h; y++)
            for (int x = 0; x < w; x++)
                px[(h - 1 - y) * w + x] = fn((x + 0.5f) / w, (y + 0.5f) / h);

            var tex = new Texture2D(w, h, TextureFormat.RGBA32, false)
            {
                name = name,
                filterMode = FilterMode.Bilinear,
                wrapMode = wrap,
                hideFlags = HideFlags.DontSave,
            };
            tex.SetPixels32(px);
            tex.Apply(false, true);
            return tex;
        }

        // --- Pixel functions ---------------------------------------------------------------------

        /// <summary>The sky's four layers, flattened: base ramp, ground glow, and the two nebulae on top.</summary>
        static Color SkyPixel(float u, float v)
        {
            Color c = v < 0.55f
                ? Color.Lerp(Tw.Hex(0x0a1024), Tw.Hex(0x05070f), v / 0.55f)
                : Color.Lerp(Tw.Hex(0x05070f), Tw.Hex(0x04060e), (v - 0.55f) / 0.45f);

            c = Over(new Color(13 / 255f, 148 / 255f, 136 / 255f, 0.48f * (1f - Mathf.Clamp01(Ellipse(u, v, 0.5f, 1.08f, 1.2f, 0.55f) / 0.7f))), c);
            c = Over(new Color(232 / 255f, 121 / 255f, 249 / 255f, 0.34f * (1f - Mathf.Clamp01(Ellipse(u, v, 0.84f, 0.02f, 0.55f, 0.45f) / 0.64f))), c);
            c = Over(new Color(56 / 255f, 189 / 255f, 248 / 255f, 0.4f * (1f - Mathf.Clamp01(Ellipse(u, v, 0.2f, 0.06f, 0.7f, 0.6f) / 0.62f))), c);

            // Half a step of dither: an 8-bit ramp this dark bands visibly.
            float n = (Hash(u * 7919f, v * 104729f) - 0.5f) / 255f;
            return new Color(c.r + n, c.g + n, c.b + n, 1f);
        }

        static Color MinimapPixel(float x, float y)
        {
            const float c = 74f;
            float d = Dist(x, y, c, c);
            var baseColor = Gradient(x, y, 148, 148, 150f, new Color(15 / 255f, 23 / 255f, 42 / 255f, 0.95f), new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.95f));
            var glow = new Color(34 / 255f, 197 / 255f, 94 / 255f, 0.2f * (1f - Mathf.Clamp01(Dist(x, y, 91.76f, 50.32f) / 60.3f)));
            float ringT = d - 22f * Mathf.Floor(d / 22f);
            var rings = Tw.A(Tw.Cyan400, ringT >= 21f ? 0.22f : 0f);

            // The dial's own ring-1 sits under the map, which is opaque enough to nearly hide it.
            var col = Tw.A(Tw.Cyan400, 0.4f * Mathf.Clamp01(Cov(d - 74f) - Cov(d - 73f)));
            col = Over(Over(rings, Over(glow, baseColor)), col);
            col.a *= Cov(d - 74f);
            return col;
        }

        static Color RadarPixel(float x, float y)
        {
            float deg = Angle(x, y, 74f, 74f);
            float a = deg < 55f ? 0.55f * (1f - deg / 55f) : 0f;
            return Tw.A(Tw.Cyan400, a * Cov(Dist(x, y, 74f, 74f) - 74f));
        }

        /// <summary>linear-gradient(72deg, transparent 42%, white/.42 50%, transparent 58%) over the 177x94 sheen box.</summary>
        static Color SheenPixel(float x, float y)
        {
            const float w = 177f, h = 94f;
            float s = Mathf.Sin(72f * Mathf.Deg2Rad), c = Mathf.Cos(72f * Mathf.Deg2Rad);
            float len = w * s + h * c;
            float t = ((x - w * 0.5f) * s - (y - h * 0.5f) * c) / len + 0.5f;
            float a = t < 0.42f || t > 0.58f ? 0f : (t < 0.5f ? (t - 0.42f) / 0.08f : (0.58f - t) / 0.08f);
            return Alpha(0.42f * a);
        }

        /// <summary>
        /// The orb's slab with every box-shadow flattened in: drop shadow and the two outer rings outside
        /// the disc, the dark fill and the bottom inset highlight inside it.
        /// </summary>
        static Color OrbBasePixel(float x, float y)
        {
            const float c = 66f, r = 38f;
            float d = Dist(x, y, c, c);

            var outside = new Color(0, 0, 0, 0.9f * (1f - Phi((Dist(x, y, c, c + 6f) - 32f) / 9f)));
            outside = Over(Tw.A(Tw.Cyan300, 0.35f * Cov(d - 41f)), outside);
            outside = Over(new Color(15 / 255f, 23 / 255f, 42 / 255f, 0.9f * Cov(d - 40f)), outside);

            var inside = new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.9f);
            inside = Over(new Color(1, 1, 1, 0.5f * (1f - Phi((50f - Dist(x, y, c, c - 10f)) / 11f))), inside);

            float k = Cov(d - r);
            return Mix(outside, inside, k);
        }

        static Color OrbGlassPixel(float x, float y)
        {
            var low = new Color(1, 1, 1, 0.18f * (1f - Mathf.Clamp01(Ellipse(x, y, 38f, 91.2f, 83.6f, 60.8f) / 0.55f)));
            var high = new Color(1, 1, 1, 0.4f * (1f - Mathf.Clamp01(Ellipse(x, y, 24.32f, 18.24f, 45.6f, 30.4f) / 0.6f)));
            var col = Over(high, low);
            col.a *= Cov(Dist(x, y, 38f, 38f) - 38f);
            return col;
        }

        /// <summary>The XP ring's annulus: the radial mask's 78%-80% edge, then the rounded box.</summary>
        static float XpRingAlpha(float x, float y)
        {
            float d = Dist(x, y, 34f, 34f);
            return Mathf.Clamp01(d - 26.4f) * Cov(d - 34f);
        }

        /// <summary>Colour runs cyan-400 to cyan-200 around the full turn; see the report for why it is not per-sweep.</summary>
        static Color XpFillPixel(float x, float y)
        {
            var c = Color.Lerp(Tw.Cyan400, Tw.Cyan200, Angle(x, y, 34f, 34f) / 360f);
            c.a = XpRingAlpha(x, y);
            return c;
        }

        /// <summary>repeating-linear-gradient(135deg, amber/.22 0 8px, slate-950/.95 8px 16px), supersampled for the band edges.</summary>
        static Color UltPixel(float x, float y)
        {
            var amber = new Color(251 / 255f, 191 / 255f, 36 / 255f, 0.22f);
            var dark = new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.95f);
            var acc = new Color(0, 0, 0, 0);
            for (int i = 0; i < 4; i++)
            {
                float sx = x - 0.375f + (i & 1) * 0.5f + 0.125f, sy = y - 0.375f + (i >> 1) * 0.5f + 0.125f;
                float d = (sx + sy) * 0.70710678f;
                var c = d - 16f * Mathf.Floor(d / 16f) < 8f ? amber : dark;
                acc.r += c.r * c.a; acc.g += c.g * c.a; acc.b += c.b * c.a; acc.a += c.a;
            }

            var col = acc.a > 0f ? new Color(acc.r / acc.a, acc.g / acc.a, acc.b / acc.a, acc.a * 0.25f) : acc;
            col.a *= Cov(SdBox(x, y, 28, 28, 28, 28, 10));
            return col;
        }

        static readonly Vector2[] HexPoly = { new Vector2(26, 0), new Vector2(52, 13), new Vector2(52, 39), new Vector2(26, 52), new Vector2(0, 39), new Vector2(0, 13) };
        static readonly Vector2[] CornerPoly = { new Vector2(12, 0), new Vector2(12, 12), new Vector2(0, 12) };

        static Color HexPixel(float x, float y) => Alpha(Cov(SdConvex(x, y, HexPoly)));

        /// <summary>
        /// The boss fill: the rose-orange-amber ramp lit through the white-to-black sheet with
        /// background-blend-mode: overlay, flattened. Rounded on the left only; the right end is cut.
        /// </summary>
        static Color BossPixel(float x, float y)
        {
            float t = x / 128f, v = y / 16f;
            Color ramp = t < 0.55f ? Color.Lerp(Tw.Hex(0xf43f5e), Tw.Hex(0xfb923c), t / 0.55f) : Color.Lerp(Tw.Hex(0xfb923c), Tw.Hex(0xfbbf24), (t - 0.55f) / 0.45f);

            float ab = Mathf.Lerp(0.55f, 0.45f, v);
            float cb = Mathf.Lerp(0.55f, 0f, v) / ab;
            var col = new Color(Blend(cb, ramp.r, ab), Blend(cb, ramp.g, ab), Blend(cb, ramp.b, ab), 1f);
            col.a = Cov(SdBox(x, y, 114f, 8f, 114f, 8f, 4f));
            return col;
        }

        static float Blend(float cb, float cs, float ab)
        {
            float overlay = cb <= 0.5f ? 2f * cb * cs : cs + (2f * cb - 1f) - cs * (2f * cb - 1f);
            return (1f - ab) * cs + ab * overlay;
        }

        /// <summary>The sweep's highlight multiplied by its own mask-image.</summary>
        static Color SweepPixel(float x, float y)
        {
            float t = x / 128f;
            float g = t < 0.2f || t > 0.8f ? 0f : (t < 0.5f ? (t - 0.2f) / 0.3f : (0.8f - t) / 0.3f);
            float m = t < 0.4f ? t / 0.4f : (t < 0.6f ? 1f : (1f - t) / 0.4f);
            return Alpha(0.45f * g * m);
        }

        // --- Helpers ---------------------------------------------------------------------------

        static Color Alpha(float a) => new Color(1f, 1f, 1f, a);

        static float Cov(float sd) => Mathf.Clamp01(0.5f - sd);

        static float Dist(float x, float y, float cx, float cy)
        {
            float dx = x - cx, dy = y - cy;
            return Mathf.Sqrt(dx * dx + dy * dy);
        }

        /// <summary>Degrees clockwise from 12 o'clock, 0..360, the way conic-gradient measures.</summary>
        static float Angle(float x, float y, float cx, float cy)
        {
            float a = Mathf.Atan2(x - cx, -(y - cy)) * Mathf.Rad2Deg;
            return a < 0f ? a + 360f : a;
        }

        /// <summary>Distance in units of an ellipse's radii, i.e. a radial-gradient's ray position.</summary>
        static float Ellipse(float x, float y, float cx, float cy, float rx, float ry)
        {
            float dx = (x - cx) / rx, dy = (y - cy) / ry;
            return Mathf.Sqrt(dx * dx + dy * dy);
        }

        static float SdBox(float px, float py, float cx, float cy, float hx, float hy, float r)
        {
            float qx = Mathf.Abs(px - cx) - hx + r, qy = Mathf.Abs(py - cy) - hy + r;
            float ox = Mathf.Max(qx, 0f), oy = Mathf.Max(qy, 0f);
            return Mathf.Sqrt(ox * ox + oy * oy) + Mathf.Min(Mathf.Max(qx, qy), 0f) - r;
        }

        /// <summary>Signed distance to a convex polygon wound clockwise with y down (max of edge planes).</summary>
        static float SdConvex(float x, float y, Vector2[] poly)
        {
            float sd = float.MinValue;
            for (int i = 0; i < poly.Length; i++)
            {
                var a = poly[i];
                var b = poly[(i + 1) % poly.Length];
                var n = new Vector2(b.y - a.y, a.x - b.x).normalized;
                sd = Mathf.Max(sd, (x - a.x) * n.x + (y - a.y) * n.y);
            }
            return sd;
        }

        static Color Gradient160(float x, float y, float w, float h, Color from, Color to, float radius)
        {
            var c = Gradient(x, y, w, h, 160f, from, to);
            c.a *= Cov(SdBox(x, y, w * 0.5f, h * 0.5f, w * 0.5f, h * 0.5f, radius));
            return c;
        }

        /// <summary>A two-stop CSS linear-gradient at <paramref name="deg"/>, interpolated premultiplied.</summary>
        static Color Gradient(float x, float y, float w, float h, float deg, Color from, Color to)
        {
            float s = Mathf.Sin(deg * Mathf.Deg2Rad), c = Mathf.Cos(deg * Mathf.Deg2Rad);
            float len = Mathf.Abs(w * s) + Mathf.Abs(h * c);
            float t = Mathf.Clamp01(((x - w * 0.5f) * s - (y - h * 0.5f) * c) / len + 0.5f);
            return Mix(from, to, t);
        }

        /// <summary>Premultiplied lerp, returned straight.</summary>
        static Color Mix(Color a, Color b, float t)
        {
            float al = Mathf.Lerp(a.a, b.a, t);
            if (al <= 1e-6f) return new Color(b.r, b.g, b.b, 0f);
            return new Color(
                Mathf.Lerp(a.r * a.a, b.r * b.a, t) / al,
                Mathf.Lerp(a.g * a.a, b.g * b.a, t) / al,
                Mathf.Lerp(a.b * a.a, b.b * b.a, t) / al,
                al);
        }

        /// <summary>Source-over with straight alpha.</summary>
        static Color Over(Color top, Color bottom)
        {
            float a = top.a + bottom.a * (1f - top.a);
            if (a <= 1e-6f) return new Color(top.r, top.g, top.b, 0f);
            float k = bottom.a * (1f - top.a);
            return new Color((top.r * top.a + bottom.r * k) / a, (top.g * top.a + bottom.g * k) / a, (top.b * top.a + bottom.b * k) / a, a);
        }

        static float Phi(float x) => 0.5f * (1f + Erf(x * 0.70710678f));

        /// <summary>Abramowitz and Stegun 7.1.26.</summary>
        static float Erf(float x)
        {
            float sign = x < 0f ? -1f : 1f;
            x = Mathf.Abs(x);
            float t = 1f / (1f + 0.3275911f * x);
            float y = 1f - ((((1.061405429f * t - 1.453152027f) * t + 1.421413741f) * t - 0.284496736f) * t + 0.254829592f) * t * Mathf.Exp(-x * x);
            return sign * y;
        }

        static float Hash(float x, float y)
        {
            float h = Mathf.Sin(x * 12.9898f + y * 78.233f) * 43758.5453f;
            return h - Mathf.Floor(h);
        }
    }
}
