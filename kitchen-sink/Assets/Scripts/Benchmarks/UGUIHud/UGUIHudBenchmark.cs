using System.Collections.Generic;
using System.Globalization;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using static ReactUnityKitchenSink.Benchmarks.Tw;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>
    /// The kitchen-sink Game HUD page rebuilt in plain UGUI, as the baseline for benchmarking the
    /// ReactUnity version: baked atlas sprites, a handful of stencil masks, custom meshes for the floor
    /// and the armed rims, one Update driving every animation, and the whole backdrop rendered once per
    /// frame into a texture that the glass panels read a blurred copy of.
    /// </summary>
    public class UGUIHudBenchmark : MonoBehaviour
    {
        public static readonly Vector2 DefaultSize = new Vector2(1915, 820);

        public Vector2 size = DefaultSize;

        [Tooltip("Used when the editor-only lookup of the core package's icon set is unavailable (player builds).")]
        public ReactUnity.Styling.IconSet iconSet;

        [Tooltip("Hidden/UGUIHud/Blur; Shader.Find only sees it in a build if something references it.")]
        public Shader blurShader;

        [Tooltip("Hidden/UGUIHud/Overlay")]
        public Shader overlayShader;

        const int SceneLayer = 31, UILayer = 5, LogLines = 7, FloaterPool = 16;
        const string IconSetPath = "Packages/com.reactunity.core/Assets/Material Icons/Material Icons Set.asset";
        const float LogWidth = 254f;

        static readonly List<UGUIHudBenchmark> live = new List<UGUIHudBenchmark>();
        static int spawnCount;
        static GameObject ownedEventSystem;

        static readonly Color PanelBg = new Color(8 / 255f, 13 / 255f, 27 / 255f, 0.62f);
        static readonly Color PanelBorder = new Color(103 / 255f, 232 / 255f, 249 / 255f, 0.26f);
        static readonly Color BracketTint = new Color(103 / 255f, 232 / 255f, 249 / 255f, 0.9f);

        static readonly string[] TabIcons = { "backpack", "auto_awesome", "auto_stories" };
        static readonly string[] TabLabels = { "GEAR", "SKILLS", "CODEX" };

        /// <summary>Stars: centre in percent, peak alpha, and the percent at which the gradient ends.</summary>
        static readonly Vector4[] Stars =
        {
            new Vector4(8, 14, 0.9f, 0.45f), new Vector4(17, 31, 0.8f, 0.3f), new Vector4(26, 9, 0.7f, 0.35f), new Vector4(34, 22, 0.8f, 0.3f),
            new Vector4(43, 6, 0.85f, 0.4f), new Vector4(52, 27, 0.7f, 0.28f), new Vector4(61, 12, 0.9f, 0.42f), new Vector4(69, 33, 0.6f, 0.3f),
            new Vector4(77, 18, 0.75f, 0.35f), new Vector4(85, 8, 0.8f, 0.4f), new Vector4(92, 26, 0.85f, 0.32f), new Vector4(12, 41, 0.55f, 0.26f),
            new Vector4(47, 44, 0.5f, 0.24f), new Vector4(73, 47, 0.6f, 0.28f),
        };

        static readonly uint[] StarRgb =
        {
            0xe2e8f0, 0xa5f3fc, 0xe2e8f0, 0xf0abfc, 0xe2e8f0, 0xa5f3fc, 0xe2e8f0, 0xe2e8f0, 0xf0abfc, 0xe2e8f0, 0xa5f3fc, 0xe2e8f0, 0xe2e8f0, 0xe2e8f0,
        };

        sealed class Meter
        {
            public HudFillBar Ghost, Fill;
            public RectTransform Well, Ticks;
            public HudTween GhostT, FillT;

            public void Set(float v, float now)
            {
                FillT.Retarget(v, now);
                GhostT.Retarget(v, now);
            }

            public void Tick(float now)
            {
                if (FillT.Running(now)) Fill.Fill = FillT.Value(now);
                if (GhostT.Running(now)) Ghost.Fill = GhostT.Value(now);
            }

            public void Resize(float x, float y, float w)
            {
                var pos = new Vector2(x, -y);
                var size = new Vector2(Mathf.Max(0f, w), Well.sizeDelta.y);
                Well.anchoredPosition = Ticks.anchoredPosition = Ghost.rectTransform.anchoredPosition = Fill.rectTransform.anchoredPosition = pos;
                Well.sizeDelta = Ticks.sizeDelta = Ghost.rectTransform.sizeDelta = Fill.rectTransform.sizeDelta = size;
            }
        }

        sealed class Orb
        {
            public RectTransform Liquid, WaveFast, WaveSlow;
            public TextMeshProUGUI Label;
            public HudTween Height;
            public int Shown = int.MinValue;
        }

        sealed class SkillSlot
        {
            public HudSkill Skill;
            public RectTransform Button, Fx;
            public Image Shadow, Ring, Cooldown, Flash;
            public HudArmedRim Rim;
            public Vector2 Pos;
            public bool Hover, Pressed, Cooling;
            public float CooldownStart, FlashStart;
            public HudTween ShadowT, LiftT;
        }

        sealed class BagSlot
        {
            public HudItem Item;
            public HudRarityStyle Style;
            public RectTransform Root;
            public Image Glow, Ring, Selected;
            public HudTween HoverT, ScaleT;
        }

        sealed class Floater
        {
            public TextMeshProUGUI Text;
            public RectTransform Rt;
            public float Start, Duration, Cx, Cy;
            public bool Active;
        }

        sealed class LogLine
        {
            public TextMeshProUGUI Text;
            public RectTransform Rt;
            public float Start = -100f, Y, Height;
        }

        struct ColorTween
        {
            public Color From, To;
            public float Start, Duration;

            public Color Value(float now)
            {
                float t = (now - Start) / Duration;
                if (t >= 1f) return To;
                if (t <= 0f) return From;
                return Color.Lerp(From, To, HudEase.Colors.Evaluate(t));
            }

            public bool Running(float now) => now - Start <= Duration + 0.1f;

            public void Retarget(Color to, float now)
            {
                if (to == To) return;
                From = Value(now);
                To = to;
                Start = now;
            }
        }

        // --- State (index.tsx) ---

        float hp = 0.82f, mp = 0.64f, ward = 0.35f, xp = 0.62f, bossHp = 0.74f;
        int tab, selected, hovered = -1, shownTip = -1;
        float now, ambientTimer, autoCastTimer, autoHitTimer, hurtStart, toastStart, tipStart;
        bool autoPlay, built;
        int spawnSlot, lastScreenW = -1, lastScreenH = -1, shownWard = int.MinValue, shownXp = int.MinValue, shownBoss = int.MinValue;
        readonly int[] readyBuffer = new int[8];

        // --- Resources ---

        float W, H;
        TMP_FontAsset sans, mono, icons;
        RenderTexture sceneRT, blurA, blurB;
        Material blurMat, overlayMat, underlay, underlayCrit;
        Camera sceneCam;
        readonly List<Camera> stripped = new List<Camera>();

        // --- Views ---

        Canvas overlay;
        RectTransform hud, skyRt, xpRing, sheen, radar, bossSweep, tabInk, gearRoot, skillsRoot, codexRoot, tooltip, logMask, toast;
        CanvasGroup starsGroup, tooltipGroup, toastGroup;
        HudFloorPulse pulse;
        RawImage scanlines, hurt;
        Image xpFill, bossFill, cardBg, cardRing;
        HudFillBar bossGhost;
        Meter hpMeter, mpMeter, wardMeter, xpMeter;
        Orb hpOrb, mpOrb;
        TextMeshProUGUI wardText, xpText, bossPct, bossPool, toastText, title;
        TextMeshProUGUI cardName, cardLevel, cardSlot, cardFlavor, tipName, tipRarity, tipSlot, tipFlavor;
        readonly TextMeshProUGUI[] cardStats = new TextMeshProUGUI[3], tipStats = new TextMeshProUGUI[3];
        readonly Image[] buffDrains = new Image[5], blips = new Image[5];
        readonly SkillSlot[] slots = new SkillSlot[8];
        readonly BagSlot[] bag = new BagSlot[24];
        readonly TextMeshProUGUI[] tabIcon = new TextMeshProUGUI[3], tabLabel = new TextMeshProUGUI[3];
        readonly ColorTween[] tabColor = new ColorTween[3];
        readonly bool[] tabHover = new bool[3];
        readonly Floater[] floaters = new Floater[FloaterPool];
        readonly LogLine[] logs = new LogLine[LogLines];
        readonly int[] logOrder = { 0, 1, 2, 3, 4, 5, 6 };
        int logCount;
        Canvas tooltipCanvas, toastCanvas, floaterCanvas;
        HudTween bossFillT, bossGhostT, inkT;
        float bossFillWidth, tabW, inkY, tipX, tipY, logFade, cardX, cardBottom, xpRowLeft, xpRowRight, xpRowY, xpRowH;

        // --- Lifetime ---------------------------------------------------------------------------

        public static UGUIHudBenchmark Spawn() => Spawn(DefaultSize);

        /// <summary>Creates a HUD of <paramref name="size"/> pixels centred on screen.</summary>
        public static UGUIHudBenchmark Spawn(Vector2 size)
        {
            var go = new GameObject("UGUIHudBenchmark");
            var hudComponent = go.AddComponent<UGUIHudBenchmark>();
            hudComponent.size = size;
            hudComponent.Build();
            return hudComponent;
        }

        public static void DespawnAll()
        {
            for (int i = live.Count - 1; i >= 0; i--)
                if (live[i]) Kill(live[i].gameObject);
            live.Clear();
        }

        void Awake() => live.Add(this);

        void Start()
        {
            if (!built) Build();
        }

        void OnDestroy()
        {
            live.Remove(this);
            if (!built) return;

            TMPro_EventManager.TEXT_CHANGED_EVENT.Remove(OnTextChanged);

            int bit = 1 << SceneLayer;
            for (int i = 0; i < stripped.Count; i++)
                if (stripped[i]) stripped[i].cullingMask |= bit;
            stripped.Clear();

            if (sceneCam) sceneCam.targetTexture = null;
            Release(sceneRT);
            Release(blurA);
            Release(blurB);
            Kill(blurMat);
            Kill(overlayMat);
            Kill(underlay);
            Kill(underlayCrit);

            if (live.Count == 0 && ownedEventSystem)
            {
                Kill(ownedEventSystem);
                ownedEventSystem = null;
            }
        }

        static void Release(RenderTexture rt)
        {
            if (!rt) return;
            rt.Release();
            Kill(rt);
        }

        static void Kill(Object o)
        {
            if (!o) return;
            if (Application.isPlaying) Destroy(o);
            else DestroyImmediate(o);
        }

        void Build()
        {
            if (built) return;
            built = true;

            W = Mathf.Round(Mathf.Max(320f, size.x));
            H = Mathf.Round(Mathf.Max(320f, size.y));
            spawnSlot = spawnCount++;

            HudArt.Ensure();
            LoadAssets();
            BuildScene();
            BuildOverlay();
            SyncStats();
        }

        void LoadAssets()
        {
            sans = Resources.Load<TMP_FontAsset>("ReactUnity/fonts/sans-serif");
            mono = Resources.Load<TMP_FontAsset>("ReactUnity/fonts/monospace");
            if (!mono) mono = sans;

#if UNITY_EDITOR
            if (!iconSet) iconSet = UnityEditor.AssetDatabase.LoadAssetAtPath<ReactUnity.Styling.IconSet>(IconSetPath);
#endif
            icons = iconSet && iconSet.FontAsset ? iconSet.FontAsset : sans;

            if (!blurShader) blurShader = Shader.Find("Hidden/UGUIHud/Blur");
            if (!overlayShader) overlayShader = Shader.Find("Hidden/UGUIHud/Overlay");

            // drop-shadow on the floaters as a TMP underlay: one shared material per look, no per-text instances.
            underlay = MakeUnderlay("UGUIHud Floater", new Color(0f, 0f, 0f, 0.9f), 0.55f);
            underlayCrit = MakeUnderlay("UGUIHud Floater Crit", new Color(251 / 255f, 191 / 255f, 36 / 255f, 0.9f), 0.85f);
        }

        Material MakeUnderlay(string name, Color color, float softness)
        {
            if (!mono || !mono.material) return null;
            var m = new Material(mono.material) { name = name };
            m.EnableKeyword("UNDERLAY_ON");
            m.SetColor("_UnderlayColor", color);
            m.SetFloat("_UnderlayOffsetX", 0f);
            m.SetFloat("_UnderlayOffsetY", 0f);
            m.SetFloat("_UnderlayDilate", 0.25f);
            m.SetFloat("_UnderlaySoftness", softness);
            return m;
        }

        // --- The scene: everything behind the HUD, rendered once per frame ------------------------

        void BuildScene()
        {
            int w = (int)W, h = (int)H;
            sceneRT = NewTarget(w, h, 24, "UGUIHud Scene");
            if (blurShader)
            {
                blurMat = new Material(blurShader) { name = "UGUIHud Blur" };
                blurA = NewTarget(w / 4, h / 4, 0, "UGUIHud Blur A");
                blurB = NewTarget(w / 4, h / 4, 0, "UGUIHud Blur B");
            }

            // Each instance parks its scene somewhere of its own, far from anything else.
            var origin = new Vector3(0f, -20000f - 2000f * spawnSlot, 0f);

            var canvasGo = new GameObject("UGUIHud Scene", typeof(RectTransform));
            canvasGo.layer = SceneLayer;
            var root = (RectTransform)canvasGo.transform;
            root.SetParent(transform, false);
            var canvas = canvasGo.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.WorldSpace;
            root.pivot = new Vector2(0.5f, 0.5f);
            root.sizeDelta = new Vector2(W, H);
            root.SetPositionAndRotation(origin, Quaternion.identity);
            root.localScale = Vector3.one;

            var camGo = new GameObject("UGUIHud Scene Camera");
            camGo.transform.SetParent(transform, false);
            camGo.transform.SetPositionAndRotation(origin + Vector3.back * 10f, Quaternion.identity);
            sceneCam = camGo.AddComponent<Camera>();
            sceneCam.enabled = false;
            sceneCam.orthographic = true;
            sceneCam.orthographicSize = H * 0.5f;
            sceneCam.nearClipPlane = 1f;
            sceneCam.farClipPlane = 20f;
            sceneCam.clearFlags = CameraClearFlags.SolidColor;
            sceneCam.backgroundColor = Hex(0x04060e);
            sceneCam.cullingMask = 1 << SceneLayer;
            sceneCam.allowHDR = false;
            sceneCam.allowMSAA = false;
            sceneCam.useOcclusionCulling = false;
            sceneCam.targetTexture = sceneRT;
            sceneCam.aspect = W / H;
            canvas.worldCamera = sceneCam;

            StripSceneLayer();

            var sky = RawImg(root, "Sky", HudArt.Sky, Color.white);
            skyRt = sky.rectTransform;
            PlaceC(skyRt, W * 0.5f, H * 0.5f, W, H);

            var stars = NewRect("Stars", root);
            Stretch(stars);
            starsGroup = stars.gameObject.AddComponent<CanvasGroup>();
            starsGroup.blocksRaycasts = false;
            for (int i = 0; i < Stars.Length; i++)
            {
                var s = Stars[i];
                float px = s.x / 100f * W, py = s.y / 100f * H;
                float far = Mathf.Sqrt(Mathf.Pow(Mathf.Max(px, W - px), 2f) + Mathf.Pow(Mathf.Max(py, H - py), 2f));
                float d = Mathf.Max(2f, 2f * s.w / 100f * far);
                PlaceC(Img(stars, "Star", HudArt.StarDot, Hex(StarRgb[i], s.z)).rectTransform, px, py, d, d);
            }

            // The grid never changes, so it sits on a canvas of its own and never re-batches.
            float horizon = H * 0.54f;
            var gridCanvas = SubCanvas(root, "Floor", false);
            Place(Add<HudFloorGrid>(gridCanvas, "Grid").rectTransform, 0f, H - horizon, W, horizon);

            pulse = Add<HudFloorPulse>(root, "Pulse");
            Place(pulse.rectTransform, 0f, H - horizon, W, horizon);

            Stretch(RawImg(root, "Vignette", HudArt.Vignette, Color.white).rectTransform);

            scanlines = RawImg(root, "Scanlines", HudArt.Scan, new Color(148 / 255f, 163 / 255f, 184 / 255f, 0.55f));
            Stretch(scanlines.rectTransform);
            if (overlayShader)
            {
                overlayMat = new Material(overlayShader) { name = "UGUIHud Overlay" };
                scanlines.material = overlayMat;
            }

            hurt = RawImg(root, "Hurt", HudArt.Hurt, Color.white);
            Stretch(hurt.rectTransform);
            hurt.enabled = false;
        }

        static RenderTexture NewTarget(int w, int h, int depth, string name)
        {
            var rt = new RenderTexture(Mathf.Max(1, w), Mathf.Max(1, h), depth, RenderTextureFormat.ARGB32)
            {
                name = name,
                antiAliasing = 1,
                filterMode = FilterMode.Bilinear,
                wrapMode = TextureWrapMode.Clamp,
            };
            rt.Create();
            return rt;
        }

        /// <summary>No other camera may draw the scene layer; the bit is handed back on destroy.</summary>
        void StripSceneLayer()
        {
            int bit = 1 << SceneLayer;
            var cams = Camera.allCameras;
            for (int i = 0; i < cams.Length; i++)
            {
                var c = cams[i];
                if (c == sceneCam || (c.cullingMask & bit) == 0) continue;
                c.cullingMask &= ~bit;
                stripped.Add(c);
            }
        }

        // --- The HUD ------------------------------------------------------------------------------

        void BuildOverlay()
        {
            var go = new GameObject("UGUIHud Overlay", typeof(RectTransform));
            go.layer = UILayer;
            go.transform.SetParent(transform, false);
            overlay = go.AddComponent<Canvas>();
            overlay.renderMode = RenderMode.ScreenSpaceOverlay;
            overlay.sortingOrder = 1000;
            overlay.additionalShaderChannels = TmpChannels;
            var scaler = go.AddComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ConstantPixelSize;
            scaler.scaleFactor = 1f;
            go.AddComponent<GraphicRaycaster>();

            hud = NewRect("Hud", go.transform);
            hud.anchorMin = hud.anchorMax = Vector2.zero;
            hud.pivot = Vector2.zero;
            hud.sizeDelta = new Vector2(W, H);
            PositionHud(true);

            EnsureEventSystem();

            // Back to front, in the page's order.
            BuildScreen();
            BuildPortrait();
            BuildBuffs();
            BuildBoss();
            BuildMinimap();
            BuildPanel();
            BuildTooltip();
            BuildFloaters();
            BuildLog();
            BuildToast();
            BuildBottom();
            BuildTitle();
        }

        const AdditionalCanvasShaderChannels TmpChannels =
            AdditionalCanvasShaderChannels.TexCoord1 | AdditionalCanvasShaderChannels.Normal | AdditionalCanvasShaderChannels.Tangent;

        /// <summary>Whole pixels, so the scene texture lands 1:1 and the scanlines stay sharp.</summary>
        void PositionHud(bool force)
        {
            int sw = Screen.width, sh = Screen.height;
            if (!force && sw == lastScreenW && sh == lastScreenH) return;
            lastScreenW = sw;
            lastScreenH = sh;
            hud.anchoredPosition = new Vector2(Mathf.Floor((sw - W) * 0.5f), Mathf.Floor((sh - H) * 0.5f));
        }

        void EnsureEventSystem()
        {
            if (EventSystem.current || FindAnyObjectByType<EventSystem>()) return;
            var go = new GameObject("EventSystem", typeof(EventSystem));
#if ENABLE_INPUT_SYSTEM && !ENABLE_LEGACY_INPUT_MANAGER
            go.AddComponent<UnityEngine.InputSystem.UI.InputSystemUIInputModule>();
#else
            go.AddComponent<StandaloneInputModule>();
#endif
            ownedEventSystem = go;
        }

        void BuildScreen()
        {
            var shadow = Sliced(hud, "Shadow", HudArt.Glow, new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.95f));
            SetGlow(shadow, 0f, 0f, W, H, 80f, -32f, 0f, 40f);

            // The screen's 20px corners: the only mask in the scene path, around one quad.
            var mask = Sliced(hud, "Screen", HudArt.Rr20, Color.white);
            Place(mask.rectTransform, 0f, 0f, W, H);
            mask.gameObject.AddComponent<Mask>().showMaskGraphic = false;
            Stretch(RawImg(mask.rectTransform, "Scene", sceneRT, Color.white).rectTransform);
        }

        void BuildPortrait()
        {
            const float x0 = 16f, y0 = 16f, fw = 272f;
            float r1 = LH(14), r2 = Mathf.Max(LH(11), 12f), r5 = Mathf.Max(14f, LH(10));
            float column = r1 + 6f + r2 + 6f + 10f + 6f + 10f + 6f + r5;
            Frame(hud, "Portrait", x0, y0, fw, 26f + Mathf.Max(68f, column), true, PanelBg);

            float bx = x0 + 13f, by = y0 + 13f, cx = bx + 34f, cy = by + 34f;

            var ringCanvas = SubCanvas(hud, "XpRing", false);
            xpRing = NewRect("Ring", ringCanvas);
            PlaceC(xpRing, cx, cy, 68f, 68f);
            Stretch(Img(xpRing, "Track", HudArt.XpTrack, new Color(148 / 255f, 163 / 255f, 184 / 255f, 0.22f)).rectTransform);
            xpFill = Img(xpRing, "Sweep", HudArt.XpFill, Color.white, Image.Type.Filled);
            xpFill.fillMethod = Image.FillMethod.Radial360;
            xpFill.fillOrigin = (int)Image.Origin360.Top;
            xpFill.fillClockwise = true;
            xpFill.fillAmount = xp;
            Stretch(xpFill.rectTransform);

            var hex = Img(hud, "Avatar", HudArt.Hex, Slate800);
            PlaceC(hex.rectTransform, cx, cy, 52f, 52f);
            hex.gameObject.AddComponent<Mask>().showMaskGraphic = true;
            PlaceC(Icon(hex.rectTransform, "person", 36f, Cyan200).rectTransform, 26f, 26f, 36f, 36f);
            var sheenCanvas = SubCanvas(hex.rectTransform, "Sheen", false);
            sheen = Img(sheenCanvas, "Band", HudArt.Sheen, Color.white).rectTransform;
            PlaceC(sheen, 26f, 26f, 177f, 94f);

            var badgeBg = Sliced(hud, "Badge", HudArt.Rr4, Slate950);
            var badgeRing = Sliced(hud, "BadgeRing", HudArt.Rr4Ring, A(Cyan400, 0.6f));
            var level = Txt(hud, HudData.PlayerLevel.ToString(), mono, 11f, Cyan200, TextAlignmentOptions.Center, 0f, FontStyles.Bold);
            float lw = Width(level) + 12f, lh = LH(11);
            Place(badgeBg.rectTransform, cx - lw * 0.5f, by + 72f - lh, lw, lh);
            Place(badgeRing.rectTransform, cx - lw * 0.5f, by + 72f - lh, lw, lh);
            Place(level.rectTransform, cx - lw * 0.5f, by + 72f - lh, lw, lh);

            float colX = bx + 80f, colW = x0 + fw - 13f - colX;
            var name = Txt(hud, HudData.PlayerName, sans, 14f, Slate100, TextAlignmentOptions.BottomLeft, 0.025f, FontStyles.Bold);
            float x = Run(name, colX, by, r1) + 8f;
            Run(Txt(hud, HudData.PlayerGuild, mono, 10f, A(Cyan400, 0.8f), TextAlignmentOptions.BottomLeft), x, by, r1);

            float y2 = by + r1 + 6f;
            x = Run(Txt(hud, HudData.PlayerTitle, sans, 11f, Slate400, TextAlignmentOptions.Left), colX, y2, r2) + 4f;
            x = Run(Txt(hud, "•", sans, 11f, Slate600, TextAlignmentOptions.Left), x, y2, r2) + 4f;
            PlaceC(Icon(hud, "military_tech", 12f, Amber400).rectTransform, x + 6f, y2 + r2 * 0.5f, 12f, 12f);
            Run(Txt(hud, HudData.GearScore.ToString(), mono, 11f, Amber300, TextAlignmentOptions.Left), x + 16f, y2, r2);

            // Meters move after every event, so they stay off the static canvas.
            var meters = SubCanvas(hud, "PortraitMeters", false);
            float y3 = y2 + r2 + 6f;
            hpMeter = MakeMeter(meters, colX, y3, colW, Rose500, A(Rose200, 0.7f), hp);
            mpMeter = MakeMeter(meters, colX, y3 + 16f, colW, Sky400, A(Sky200, 0.6f), mp);

            float y5 = y3 + 32f;
            PlaceC(Icon(hud, "security", 14f, Cyan300).rectTransform, colX + 7f, y5 + r5 * 0.5f, 14f, 14f);
            wardMeter = MakeMeter(meters, colX + 20f, y5 + (r5 - 10f) * 0.5f, colW - 20f - 38f, Cyan300, A(Cyan100, 0.5f), ward);
            wardText = Txt(meters, "", mono, 10f, Cyan200, TextAlignmentOptions.Right);
            Place(wardText.rectTransform, colX + colW - 32f, y5, 32f, r5);
        }

        void BuildBuffs()
        {
            var buffs = HudData.Buffs;
            for (int i = 0; i < buffs.Length; i++)
            {
                var b = buffs[i];
                float x = 16f + i * 42f, y = 124f;
                Place(Sliced(hud, "Buff", HudArt.Rr6, A(Slate950, 0.8f)).rectTransform, x, y, 36f, 36f);
                Place(Sliced(hud, "Ring", HudArt.Rr6Ring, b.Debuff ? A(Rose500, 0.7f) : A(Cyan400, 0.5f)).rectTransform, x, y, 36f, 36f);
                PlaceC(Icon(hud, b.Icon, 18f, b.Tint).rectTransform, x + 18f, y + 18f, 18f, 18f);
                var label = Txt(hud, b.Duration + "s", mono, 9f, Slate400, TextAlignmentOptions.Center);
                Place(label.rectTransform, x, y + 50f - LH(9), 36f, LH(9));
            }

            // Every drain runs forever, so all five share one canvas that re-batches on its own.
            var drains = SubCanvas(hud, "BuffDrains", false);
            for (int i = 0; i < buffs.Length; i++)
            {
                var d = Img(drains, "Drain", HudArt.Buff, new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.7f), Image.Type.Filled);
                d.fillMethod = Image.FillMethod.Vertical;
                d.fillOrigin = (int)Image.OriginVertical.Bottom;
                d.fillAmount = 0f;
                Place(d.rectTransform, 16f + i * 42f, 124f, 36f, 36f);
                buffDrains[i] = d;
            }
        }

        void BuildBoss()
        {
            float x0 = Mathf.Round(W * 0.5f - 180f), y0 = 16f, rowH = LH(16);
            var name = Txt(hud, HudData.BossName, sans, 16f, Rose200, TextAlignmentOptions.Left, 3f / 16f, FontStyles.Bold);
            var epithet = Txt(hud, HudData.BossEpithet, mono, 10f, A(Rose400, 0.8f), TextAlignmentOptions.Left, 0.1f);
            float total = HudData.BossTier * 14f + Width(name) + Width(epithet) + (HudData.BossTier + 1) * 8f;
            float x = W * 0.5f - total * 0.5f;
            for (int i = 0; i < HudData.BossTier; i++, x += 22f)
                PlaceC(Icon(hud, "star", 14f, Amber400).rectTransform, x + 7f, y0 + rowH * 0.5f, 14f, 14f);
            x = Run(name, x, y0, rowH) + 8f;
            Run(epithet, x, y0, rowH);

            float wy = y0 + rowH + 4f;
            var canvas = SubCanvas(hud, "BossBar", false);
            Place(Sliced(canvas, "Well", HudArt.Well16, Color.white).rectTransform, x0, wy, 360f, 16f);
            bossGhost = Bar(canvas, HudArt.Rr4, A(Rose100, 0.5f), x0, wy, 360f, 16f, bossHp);
            bossFill = Sliced(canvas, "Fill", HudArt.BossFill, Color.white);
            bossFillWidth = 360f * bossHp;
            Place(bossFill.rectTransform, x0, wy, bossFillWidth, 16f);

            // The sweep belongs to the fill but is clipped by the well, so it runs past the fill's end.
            var clip = NewRect("SweepClip", canvas);
            Place(clip, x0, wy, 360f, 16f);
            clip.gameObject.AddComponent<RectMask2D>();
            bossSweep = Img(clip, "Sweep", HudArt.Sweep, Color.white).rectTransform;
            Place(bossSweep, -bossFillWidth, 0f, bossFillWidth, 16f);

            Place(Img(canvas, "Ticks", HudArt.Ticks, Color.white, Image.Type.Tiled).rectTransform, x0, wy, 360f, 16f);

            bossPct = Txt(canvas, "", mono, 10f, Slate400, TextAlignmentOptions.Left);
            Place(bossPct.rectTransform, x0, wy + 20f, 180f, LH(10));
            bossPool = Txt(canvas, "", mono, 10f, Slate400, TextAlignmentOptions.Right);
            Place(bossPool.rectTransform, x0 + 180f, wy + 20f, 180f, LH(10));

            bossFillT = new HudTween(bossHp, 0.42f, 0f, HudEase.Snappy);
            bossGhostT = new HudTween(bossHp, 0.9f, 0.32f, HudEase.EaseOut);
        }

        void BuildMinimap()
        {
            float x0 = W - 164f, y0 = 16f, cx = x0 + 74f, cy = y0 + 74f;

            // Nothing inside the dial ever reaches its edge -- the radar is baked round and the blips sit
            // well inside -- so the page's circular clip costs no mask here.
            Place(Img(hud, "Dial", HudArt.Minimap, Color.white).rectTransform, x0, y0, 148f, 148f);

            var canvas = SubCanvas(hud, "Radar", false);
            radar = Img(canvas, "Sweep", HudArt.Radar, Color.white).rectTransform;
            PlaceC(radar, cx, cy, 148f, 148f);
            for (int i = 0; i < blips.Length; i++)
            {
                var b = HudData.Blips[i];
                blips[i] = Img(canvas, "Blip", HudArt.Dot, HudData.BlipTints[i]);
                PlaceC(blips[i].rectTransform, x0 + b.x * 1.48f, y0 + b.y * 1.48f, 7f, 7f);
            }

            PlaceC(Icon(hud, "navigation", 16f, Cyan100).rectTransform, cx, cy, 16f, 16f);
            Place(Txt(hud, "N", mono, 9f, A(Cyan300, 0.7f), TextAlignmentOptions.Center).rectTransform, x0, y0 + 4f, 148f, LH(9));

            var pill = Sliced(hud, "Zone", HudArt.Pill, A(Slate950, 0.85f));
            var zone = Txt(hud, HudData.PlayerZone, mono, 9f, A(Cyan200, 0.9f), TextAlignmentOptions.Center, 0.1f);
            float zw = Width(zone) + 16f, zh = LH(9) + 4f;
            pill.pixelsPerUnitMultiplier = 16f / zh;
            Place(pill.rectTransform, cx - zw * 0.5f, y0 + 140f - zh, zw, zh);
            Place(zone.rectTransform, cx - zw * 0.5f, y0 + 140f - zh, zw, zh);
        }

        void BuildPanel()
        {
            float x0 = W - 316f, y0 = 172f, ph = H - 298f;
            Frame(hud, "Panel", x0, y0, 300f, ph, true, PanelBg);

            var canvas = SubCanvas(hud, "PanelContent", true);
            tabW = 298f / 3f;
            float tabH = 34f;
            for (int i = 0; i < 3; i++)
            {
                float tx = x0 + 1f + i * tabW, ty = y0 + 1f;
                var hit = Add<HudHitArea>(canvas, "Tab");
                hit.raycastTarget = true;
                Place(hit.rectTransform, tx, ty, tabW, tabH);
                AddPointer(hit.gameObject, HudPointerKind.Tab, i);

                var label = Txt(canvas, TabLabels[i], mono, 10f, Color.white, TextAlignmentOptions.Left, 0.1f);
                float lw = Width(label), sx = tx + tabW * 0.5f - (20f + lw) * 0.5f;
                var ic = Icon(canvas, TabIcons[i], 14f, Color.white);
                PlaceC(ic.rectTransform, sx + 7f, ty + tabH * 0.5f, 14f, 14f);
                Place(label.rectTransform, sx + 20f, ty, lw + 2f, tabH);

                // Tinted through the CanvasRenderer, so a colour transition never regenerates the text.
                var c = i == tab ? Cyan200 : Slate500;
                tabColor[i] = new ColorTween { From = c, To = c, Start = -100f, Duration = 0.15f };
                ic.canvasRenderer.SetColor(c);
                label.canvasRenderer.SetColor(c);
                tabIcon[i] = ic;
                tabLabel[i] = label;
            }

            inkY = -(y0 + 1f + tabH - 2f);
            tabInk = Img(canvas, "Ink", HudArt.TabInk, Color.white).rectTransform;
            Place(tabInk, x0 + 1f, y0 + 1f + tabH - 2f, tabW, 2f);
            inkT = new HudTween(0f, 0.24f, 0f, HudEase.Snappy);

            float cax = x0 + 1f, cay = y0 + 1f + tabH, cah = ph - 2f - tabH;
            gearRoot = NewRect("Gear", canvas);
            Stretch(gearRoot);
            BuildGear(gearRoot, cax, cay, cah);

            skillsRoot = NewRect("Skills", canvas);
            Stretch(skillsRoot);
            BuildSkills(skillsRoot, cax, cay);

            codexRoot = NewRect("Codex", canvas);
            Stretch(codexRoot);
            BuildCodex(codexRoot, cax, cay);

            // Only after everything measured itself: an inactive TMP has not woken up yet.
            skillsRoot.gameObject.SetActive(false);
            codexRoot.gameObject.SetActive(false);
        }

        void BuildGear(RectTransform root, float cax, float cay, float cah)
        {
            var inv = HudData.Inventory;
            for (int i = 0; i < inv.Length; i++)
            {
                float sx = cax + 10f + (i % 5) * 52f, sy = cay + 10f + (i / 5) * 52f;
                var item = inv[i];
                if (item == null)
                {
                    Place(Sliced(root, "Empty", HudArt.Rr6, new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.5f)).rectTransform, sx, sy, 46f, 46f);
                    Place(Sliced(root, "Ring", HudArt.Rr6Ring, new Color(148 / 255f, 163 / 255f, 184 / 255f, 0.14f)).rectTransform, sx, sy, 46f, 46f);
                    continue;
                }

                var style = HudData.Rarities[(int)item.Rarity];
                var slotRoot = NewRect(item.Id, root);
                PlaceC(slotRoot, sx + 23f, sy + 23f, 46f, 46f);

                // The mythic slot pulses forever; its own canvas keeps that off the rest of the bag.
                if (item.Rarity == HudRarity.Mythic)
                {
                    slotRoot.gameObject.AddComponent<Canvas>().additionalShaderChannels = TmpChannels;
                    slotRoot.gameObject.AddComponent<GraphicRaycaster>();
                }

                var b = new BagSlot
                {
                    Item = item,
                    Style = style,
                    Root = slotRoot,
                    HoverT = new HudTween(0f, 0.16f, 0f, HudEase.EaseOut),
                    ScaleT = new HudTween(1f, 0.14f, 0f, HudEase.EaseOut),
                };
                b.Glow = Sliced(slotRoot, "Glow", HudArt.Glow, style.Tier);
                var bg = Img(slotRoot, "Bg", HudArt.Item, Color.white);
                Place(bg.rectTransform, 0f, 0f, 46f, 46f);
                bg.raycastTarget = true;
                AddPointer(bg.gameObject, HudPointerKind.Item, i);
                b.Ring = Sliced(slotRoot, "Ring", HudArt.Rr6Ring, A(style.Tier, style.Ring));
                Place(b.Ring.rectTransform, 0f, 0f, 46f, 46f);
                b.Selected = Sliced(slotRoot, "Selected", HudArt.Rr8Ring2, Cyan300);
                Place(b.Selected.rectTransform, -2f, -2f, 50f, 50f);
                b.Selected.enabled = i == selected;
                PlaceC(Icon(slotRoot, item.Icon, 20f, style.Text).rectTransform, 23f, 23f, 20f, 20f);
                Place(Img(slotRoot, "Corner", HudArt.Corner, style.Corner).rectTransform, 34f, 34f, 12f, 12f);
                if (item.Count > 0)
                {
                    var count = Txt(slotRoot, item.Count.ToString(), mono, 9f, Slate200, TextAlignmentOptions.Left, 0f, FontStyles.Bold);
                    Place(count.rectTransform, 4f, 44f - LH(9), 30f, LH(9));
                }

                bag[i] = b;
                ApplyBagGlow(b, 0f);
            }

            cardX = cax + 10f;
            cardBottom = cay + cah - 10f;
            cardBg = Sliced(root, "Card", HudArt.Rr6, A(Slate950, 0.55f));
            cardRing = Sliced(root, "CardRing", HudArt.Rr6Ring, A(Slate700, 0.7f));
            cardName = Txt(root, "", sans, 13f, Color.white, TextAlignmentOptions.Left, 0f, FontStyles.Bold);
            cardLevel = Txt(root, "", mono, 10f, Amber300, TextAlignmentOptions.Right);
            cardSlot = Txt(root, "", mono, 9f, Slate500, TextAlignmentOptions.Left, 0.1f);
            for (int i = 0; i < cardStats.Length; i++) cardStats[i] = Txt(root, "", sans, 11f, Emerald300, TextAlignmentOptions.Left);
            cardFlavor = Txt(root, "", sans, 10f, Slate500, TextAlignmentOptions.TopLeft, 0f, FontStyles.Italic);
            cardFlavor.textWrappingMode = TextWrappingModes.Normal;
            LayoutCard();
        }

        void LayoutCard()
        {
            var item = HudData.Inventory[selected];
            var style = HudData.Rarities[(int)item.Rarity];
            const float w = 278f, iw = 258f;
            float ix = cardX + 10f;

            cardName.text = item.Name;
            cardName.color = style.Text;
            cardLevel.text = item.Level > 0 ? item.Level.ToString() : "";
            cardSlot.text = item.SlotUpper;
            float flavorH = Mathf.Max(LH(10), Mathf.Ceil(cardFlavor.GetPreferredValues(item.Flavor, iw, 0f).y));
            cardFlavor.text = item.Flavor;

            int n = item.Stats.Length;
            float h = 20f + LH(13) + 4f + LH(9) + n * (4f + LH(11)) + 8f + flavorH;
            float y = cardBottom - h;
            Place(cardBg.rectTransform, cardX, y, w, h);
            Place(cardRing.rectTransform, cardX, y, w, h);

            y += 10f;
            Place(cardName.rectTransform, ix, y, iw, LH(13));
            Place(cardLevel.rectTransform, ix, y, iw, LH(13));
            y += LH(13) + 4f;
            Place(cardSlot.rectTransform, ix, y, iw, LH(9));
            y += LH(9);
            for (int i = 0; i < cardStats.Length; i++)
            {
                bool on = i < n;
                cardStats[i].enabled = on;
                if (!on) continue;
                cardStats[i].text = item.Stats[i];
                y += 4f;
                Place(cardStats[i].rectTransform, ix, y, iw, LH(11));
                y += LH(11);
            }
            Place(cardFlavor.rectTransform, ix, y + 8f, iw, flavorH);
        }

        void BuildSkills(RectTransform root, float cax, float cay)
        {
            var skills = HudData.Skills;
            const float w = 278f;
            for (int i = 0; i < skills.Length; i++)
            {
                var sk = skills[i];
                float x = cax + 10f, y = cay + 10f + i * 54f;
                Place(Sliced(root, "Row", HudArt.Rr6, A(Slate950, 0.45f)).rectTransform, x, y, w, 48f);
                Place(Sliced(root, "IconBox", HudArt.Rr4, Slate900).rectTransform, x + 8f, y + 8f, 32f, 32f);
                Place(Sliced(root, "IconRing", HudArt.Rr4Ring, A(Cyan500, 0.4f)).rectTransform, x + 8f, y + 8f, 32f, 32f);
                PlaceC(Icon(root, sk.Icon, 18f, sk.Ultimate ? Amber300 : Cyan300).rectTransform, x + 24f, y + 24f, 18f, 18f);

                float colX = x + 50f, colW = w - 50f - 8f - 40f - 10f, nameH = LH(12);
                float colY = y + (48f - (nameH + 8f)) * 0.5f;
                Place(Txt(root, sk.Name, sans, 12f, Slate200, TextAlignmentOptions.BottomLeft, 0f, FontStyles.Bold).rectTransform, colX, colY, colW, nameH);
                Place(Txt(root, sk.SchoolUpper, mono, 9f, Slate500, TextAlignmentOptions.BottomRight, 0.05f).rectTransform, colX, colY, colW, nameH);

                // Rank is invented from the position in the list, as on the page.
                float bw = (colW - 8f) / 5f;
                for (int r = 0; r < 5; r++)
                {
                    var rank = Sliced(root, "Rank", HudArt.Pill, r <= 4 - i % 5 ? Cyan400 : Slate700);
                    rank.pixelsPerUnitMultiplier = 4f;
                    Place(rank.rectTransform, colX + r * (bw + 2f), colY + nameH + 4f, bw, 4f);
                }

                Place(Txt(root, sk.CooldownLabel, mono, 10f, Slate400, TextAlignmentOptions.Right).rectTransform, x + w - 48f, y, 40f, 48f);
            }
        }

        void BuildCodex(RectTransform root, float cax, float cay)
        {
            const float w = 278f, iw = 258f;
            float x = cax + 10f, ix = x + 10f, y = cay + 10f, rowH = LH(11);

            foreach (var q in HudData.Quests)
            {
                bool complete = true;
                for (int o = 0; o < q.Done.Length; o++) complete &= q.Done[o] >= q.Total[o];

                float h = 34f + q.Objectives.Length * (rowH + 14f);
                Place(Sliced(root, "Quest", HudArt.Rr6, A(Slate950, 0.45f)).rectTransform, x, y, w, h);
                Place(Sliced(root, "Ring", HudArt.Rr6Ring, complete ? A(Emerald500, 0.5f) : A(Slate700, 0.7f)).rectTransform, x, y, w, h);
                PlaceC(Icon(root, complete ? "done_all" : "flag", 14f, complete ? Emerald400 : Amber400).rectTransform, ix + 7f, y + 17f, 14f, 14f);
                Place(Txt(root, q.Name, sans, 12f, Slate100, TextAlignmentOptions.Left, 0f, FontStyles.Bold).rectTransform, ix + 22f, y + 10f, iw - 22f, 14f);
                Place(Txt(root, q.KindUpper, mono, 9f, Slate500, TextAlignmentOptions.Right, 0.1f).rectTransform, ix, y + 10f, iw, 14f);

                float oy = y + 24f;
                for (int o = 0; o < q.Objectives.Length; o++)
                {
                    bool done = q.Done[o] >= q.Total[o];
                    oy += 6f;
                    Place(Txt(root, q.Objectives[o], sans, 11f, done ? Emerald400 : Slate400, TextAlignmentOptions.Left).rectTransform, ix, oy, iw, rowH);
                    Place(Txt(root, q.Done[o] + "/" + q.Total[o], mono, 10f, Slate400, TextAlignmentOptions.Right).rectTransform, ix, oy, iw, rowH);
                    oy += rowH + 4f;
                    Place(Sliced(root, "Well", HudArt.Well4, Color.white).rectTransform, ix, oy, iw, 4f);
                    Bar(root, HudArt.Pill, done ? Emerald400 : Amber400, ix, oy, iw, 4f, (float)q.Done[o] / q.Total[o]);
                    oy += 4f;
                }

                y += h + 8f;
            }

            int count = HudData.StatNames.Length;
            float ah = 20f + LH(9) + count * (rowH + 14f);
            Place(Sliced(root, "Attributes", HudArt.Rr6, A(Slate950, 0.45f)).rectTransform, x, y, w, ah);
            Place(Sliced(root, "Ring", HudArt.Rr6Ring, A(Slate700, 0.7f)).rectTransform, x, y, w, ah);
            Place(Txt(root, "ATTRIBUTES", mono, 9f, A(Cyan300, 0.8f), TextAlignmentOptions.Left, 0.1f).rectTransform, ix, y + 10f, iw, LH(9));

            float sy = y + 10f + LH(9);
            for (int i = 0; i < count; i++)
            {
                sy += 6f;
                Place(Txt(root, HudData.StatNames[i], sans, 11f, Slate400, TextAlignmentOptions.Left).rectTransform, ix, sy, iw, rowH);
                Place(Txt(root, HudData.StatValues[i].ToString(), mono, 10f, Slate200, TextAlignmentOptions.Right).rectTransform, ix, sy, iw, rowH);
                sy += rowH + 4f;
                Place(Sliced(root, "Well", HudArt.Well4, Color.white).rectTransform, ix, sy, iw, 4f);
                Bar(root, HudArt.Pill, HudData.StatTints[i], ix, sy, iw, 4f, (float)HudData.StatValues[i] / HudData.StatMax[i]);
                sy += 4f;
            }
        }

        void BuildTooltip()
        {
            var rt = SubCanvas(hud, "Tooltip", false);
            tooltipCanvas = rt.GetComponent<Canvas>();
            tipX = W - 316f - 228f;
            tipY = 210f;
            tooltip = Frame(rt, "Tooltip", tipX, tipY, 228f, 100f, false, new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.93f));
            tooltipGroup = tooltip.gameObject.AddComponent<CanvasGroup>();
            tooltipGroup.blocksRaycasts = false;
            tooltipGroup.interactable = false;

            tipName = Txt(tooltip, "", sans, 13f, Color.white, TextAlignmentOptions.Left, 0f, FontStyles.Bold);
            tipRarity = Txt(tooltip, "", mono, 9f, Slate500, TextAlignmentOptions.Left, 0.1f);
            tipSlot = Txt(tooltip, "", sans, 10f, Slate500, TextAlignmentOptions.Left);
            for (int i = 0; i < tipStats.Length; i++) tipStats[i] = Txt(tooltip, "", sans, 11f, Emerald300, TextAlignmentOptions.Left);
            tipFlavor = Txt(tooltip, "", sans, 10f, Slate500, TextAlignmentOptions.TopLeft, 0f, FontStyles.Italic);
            tipFlavor.textWrappingMode = TextWrappingModes.Normal;

            tooltipCanvas.enabled = false;
        }

        void LayoutTooltip(HudItem item)
        {
            var style = HudData.Rarities[(int)item.Rarity];
            const float ix = 13f, iw = 202f;
            float y = 13f;

            tipName.text = item.Name;
            tipName.color = style.Text;
            Place(tipName.rectTransform, ix, y, iw, LH(13));
            y += LH(13) + 4f;

            float rowH = Mathf.Max(LH(9), LH(10));
            tipRarity.text = style.Label;
            float rw = Width(tipRarity);
            Place(tipRarity.rectTransform, ix, y, rw + 2f, rowH);
            tipSlot.text = item.Slot;
            Place(tipSlot.rectTransform, ix + rw + 8f, y, iw - rw - 8f, rowH);
            y += rowH;

            int n = item.Stats.Length;
            for (int i = 0; i < tipStats.Length; i++)
            {
                bool on = i < n;
                tipStats[i].enabled = on;
                if (!on) continue;
                tipStats[i].text = item.Stats[i];
                y += 4f;
                Place(tipStats[i].rectTransform, ix, y, iw, LH(11));
                y += LH(11);
            }

            float flavorH = Mathf.Max(LH(10), Mathf.Ceil(tipFlavor.GetPreferredValues(item.Flavor, iw, 0f).y));
            tipFlavor.text = item.Flavor;
            Place(tipFlavor.rectTransform, ix, y + 4f, iw, flavorH);
            tooltip.sizeDelta = new Vector2(228f, y + 4f + flavorH + 13f);
        }

        void BuildFloaters()
        {
            var rt = SubCanvas(hud, "Floaters", false);
            floaterCanvas = rt.GetComponent<Canvas>();
            for (int i = 0; i < floaters.Length; i++)
            {
                var t = Txt(rt, "", mono, 20f, Color.white, TextAlignmentOptions.Center, 0f, FontStyles.Bold);
                if (underlay) t.fontSharedMaterial = underlay;
                t.rectTransform.pivot = new Vector2(0.5f, 0.5f);
                t.enabled = false;
                floaters[i] = new Floater { Text = t, Rt = t.rectTransform };
            }
            floaterCanvas.enabled = false;
        }

        void BuildLog()
        {
            float x0 = 16f, y0 = H - 286f, headH = Mathf.Max(14f, LH(10));
            Frame(hud, "CombatLog", x0, y0, 280f, 136f, false, PanelBg);
            PlaceC(Icon(hud, "forum", 14f, Cyan400).rectTransform, x0 + 20f, y0 + 9f + headH * 0.5f, 14f, 14f);
            Place(Txt(hud, "COMBAT LOG", mono, 10f, A(Cyan300, 0.8f), TextAlignmentOptions.Left, 0.1f).rectTransform, x0 + 33f, y0 + 9f, 200f, headH);

            // RectMask2D softness fades both edges by half its value, so the mask reaches up past the
            // header by the fade length and only the bottom fade lands on the lines.
            float top = y0 + 9f + headH, regionH = y0 + 135f - top;
            logFade = Mathf.Round(regionH * 0.42f);
            var canvas = SubCanvas(hud, "LogLines", false);
            logMask = NewRect("Mask", canvas);
            Place(logMask, x0 + 1f, top - logFade, 278f, regionH + logFade);
            logMask.gameObject.AddComponent<RectMask2D>().softness = new Vector2Int(0, Mathf.RoundToInt(logFade * 2f));

            for (int i = 0; i < logs.Length; i++)
            {
                var t = Txt(logMask, "", sans, 11f, Color.white, TextAlignmentOptions.TopLeft);
                t.textWrappingMode = TextWrappingModes.Normal;
                t.enabled = false;
                logs[i] = new LogLine { Text = t, Rt = t.rectTransform };
            }
        }

        void BuildToast()
        {
            var rt = SubCanvas(hud, "Toast", false);
            toastCanvas = rt.GetComponent<Canvas>();
            float h = LH(11) + 16f;
            toast = NewRect("Toast", rt);
            PlaceC(toast, W * 0.5f, 96f + h * 0.5f, 100f, h);
            toastGroup = toast.gameObject.AddComponent<CanvasGroup>();
            toastGroup.blocksRaycasts = false;
            toastGroup.interactable = false;
            Stretch(Sliced(toast, "Bg", HudArt.Rr6, A(Slate950, 0.85f)).rectTransform);
            Stretch(Sliced(toast, "Ring", HudArt.Rr6Ring, A(Cyan400, 0.5f)).rectTransform);
            toastText = Txt(toast, "", mono, 11f, Color.white, TextAlignmentOptions.Center, 0.1f);
            Stretch(toastText.rectTransform);
            toastCanvas.enabled = false;
        }

        void BuildBottom()
        {
            const float orb = 76f;
            xpRowH = Mathf.Max(LH(9), 10f);
            float fw = 2f + 16f + 490f, fh = 2f + 16f + 56f + 6f + xpRowH;
            float x0 = Mathf.Round(W * 0.5f - (orb * 2f + 32f + fw) * 0.5f), bottom = H - 16f;
            float fx = x0 + orb + 16f, fy = bottom - fh;

            hpOrb = BuildOrb(x0, bottom - orb, Rose600, Rose400, Rose50, hp);

            Frame(hud, "ActionBar", fx, fy, fw, fh, true, PanelBg);

            // Rims spin under the slots, the slots only change on hover, the wipes run over them.
            var rims = SubCanvas(hud, "SlotRims", false);
            var buttons = SubCanvas(hud, "Slots", true);
            var effects = SubCanvas(hud, "SlotFx", false);
            var skills = HudData.Skills;
            for (int i = 0; i < skills.Length; i++)
            {
                var sk = skills[i];
                float sx = fx + 9f + i * 62f, sy = fy + 9f;
                var s = new SkillSlot
                {
                    Skill = sk,
                    Pos = new Vector2(sx, sy),
                    FlashStart = -100f,
                    ShadowT = new HudTween(0f, 0.16f, 0f, HudEase.EaseOut),
                    LiftT = new HudTween(0f, 0.12f, 0f, HudEase.EaseOut),
                };

                s.Rim = Add<HudArmedRim>(rims, "Rim");
                PlaceC(s.Rim.rectTransform, sx + 28f, sy + 28f, 62f, 62f);

                s.Button = NewRect(sk.Id, buttons);
                Place(s.Button, sx, sy, 56f, 56f);
                s.Shadow = Sliced(s.Button, "Shadow", HudArt.Glow, Color.black);
                var bg = Img(s.Button, "Bg", sk.Ultimate ? HudArt.SlotUlt : HudArt.Slot, Color.white);
                Place(bg.rectTransform, 0f, 0f, 56f, 56f);
                bg.raycastTarget = true;
                AddPointer(bg.gameObject, HudPointerKind.Skill, i);
                s.Ring = Sliced(s.Button, "Ring", HudArt.Rr10Ring, A(Slate400, 0.28f));
                Place(s.Ring.rectTransform, 0f, 0f, 56f, 56f);
                PlaceC(Icon(s.Button, sk.Icon, 24f, sk.Ultimate ? Amber300 : Cyan200).rectTransform, 28f, 28f, 24f, 24f);
                if (sk.Cost > 0)
                    Place(Txt(s.Button, sk.Cost.ToString(), mono, 9f, A(Sky300, 0.9f), TextAlignmentOptions.Left).rectTransform, 4f, 2f, 30f, LH(9));
                Place(Txt(s.Button, sk.Hotkey, mono, 10f, Slate400, TextAlignmentOptions.Right, 0f, FontStyles.Bold).rectTransform, 22f, 54f - LH(10), 30f, LH(10));

                // The slot's rounded clip is baked into the wipe sprite, so the fill needs no mask.
                s.Fx = NewRect(sk.Id, effects);
                Place(s.Fx, sx, sy, 56f, 56f);
                s.Cooldown = Img(s.Fx, "Cooldown", HudArt.SlotMask, new Color(2 / 255f, 6 / 255f, 23 / 255f, 0.78f), Image.Type.Filled);
                s.Cooldown.fillMethod = Image.FillMethod.Vertical;
                s.Cooldown.fillOrigin = (int)Image.OriginVertical.Top;
                Stretch(s.Cooldown.rectTransform);
                s.Cooldown.enabled = false;
                s.Flash = Img(s.Fx, "Flash", HudArt.SlotMask, A(Cyan200, 0.85f));
                Stretch(s.Flash.rectTransform);
                s.Flash.enabled = false;

                ApplySlotShadow(s, 0f);
                slots[i] = s;
            }

            float ry = fy + 9f + 56f + 6f;
            var xpLabel = Txt(hud, "XP", mono, 9f, Slate500, TextAlignmentOptions.Left, 0.1f);
            float xw = Run(xpLabel, fx + 9f, ry, xpRowH);
            xpRowLeft = xw + 8f;
            xpRowRight = fx + 9f + 490f;
            xpRowY = ry;
            var xpCanvas = SubCanvas(hud, "XpMeter", false);
            xpMeter = MakeMeter(xpCanvas, xpRowLeft, ry + (xpRowH - 10f) * 0.5f, 100f, Fuchsia400, A(Fuchsia200, 0.5f), xp);
            xpText = Txt(xpCanvas, "", mono, 9f, Fuchsia300, TextAlignmentOptions.Right);

            mpOrb = BuildOrb(fx + fw + 16f, bottom - orb, Sky600, Sky400, Sky50, mp);
        }

        Orb BuildOrb(float x, float y, Color fill, Color wave, Color tint, float value)
        {
            var o = new Orb { Height = new HudTween(value, 0.32f, 0f, HudEase.Snappy) };
            float cx = x + 38f, cy = y + 38f;
            PlaceC(Img(hud, "OrbBase", HudArt.OrbBase, Color.white).rectTransform, cx, cy, 132f, 132f);

            var canvas = SubCanvas(hud, "Orb", false);
            var clip = Img(canvas, "Clip", HudArt.Circle, Color.white);
            PlaceC(clip.rectTransform, cx, cy, 76f, 76f);
            clip.gameObject.AddComponent<Mask>().showMaskGraphic = false;

            // The liquid's own clip-path: inset(0) is a plain rect clip inside the circular stencil.
            o.Liquid = NewRect("Liquid", clip.rectTransform);
            o.Liquid.gameObject.AddComponent<RectMask2D>();
            Stretch(Img(o.Liquid, "Fill", HudArt.White, fill).rectTransform);
            o.WaveFast = Img(o.Liquid, "Wave", HudArt.Wave, A(wave, 0.85f)).rectTransform;
            PlaceC(o.WaveFast, 38f, 92f, 168f, 168f);
            o.WaveSlow = Img(o.Liquid, "WaveSlow", HudArt.Wave, A(wave, 0.5f)).rectTransform;
            PlaceC(o.WaveSlow, 38f, 92f, 168f, 168f);
            SetLiquid(o, value);

            PlaceC(Img(canvas, "Glass", HudArt.OrbGlass, Color.white).rectTransform, cx, cy, 76f, 76f);
            o.Label = Txt(canvas, "", mono, 14f, tint, TextAlignmentOptions.Center, 0f, FontStyles.Bold);
            PlaceC(o.Label.rectTransform, cx, cy, 76f, LH(14));
            return o;
        }

        static void SetLiquid(Orb o, float v)
        {
            float h = 76f * Mathf.Clamp01(v);
            o.Liquid.anchoredPosition = new Vector2(0f, -(76f - h));
            o.Liquid.sizeDelta = new Vector2(76f, h);
        }

        void BuildTitle()
        {
            title = Txt(hud, "AETHERFALL", sans, 20f, Color.white, TextAlignmentOptions.Left, 0.2f, FontStyles.Bold);
            title.outlineWidth = 0.12f;
            title.outlineColor = new Color32(2, 6, 23, 140);
            float tw = Width(title), th = LH(20);
            Place(title.rectTransform, W - 16f - tw, H - 104f - th, tw, th);

            // background-clip: text as vertex colours, re-applied whenever TMP regenerates the mesh.
            TMPro_EventManager.TEXT_CHANGED_EVENT.Add(OnTextChanged);
            title.ForceMeshUpdate();
            ApplyTitleGradient();
        }

        void OnTextChanged(Object obj)
        {
            if (title && obj == title) ApplyTitleGradient();
        }

        void ApplyTitleGradient()
        {
            var info = title.textInfo;
            if (info == null || info.characterCount == 0) return;

            var rect = title.rectTransform.rect;
            float s = Mathf.Sin(100f * Mathf.Deg2Rad), c = Mathf.Cos(100f * Mathf.Deg2Rad);
            float len = Mathf.Abs(rect.width * s) + Mathf.Abs(rect.height * c);
            var centre = rect.center;
            for (int i = 0; i < info.characterCount; i++)
            {
                var ch = info.characterInfo[i];
                if (!ch.isVisible) continue;
                var mesh = info.meshInfo[ch.materialReferenceIndex];
                for (int k = 0; k < 4; k++)
                {
                    var p = mesh.vertices[ch.vertexIndex + k];
                    float t = Mathf.Clamp01(((p.x - centre.x) * s + (p.y - centre.y) * c) / len + 0.5f);
                    mesh.colors32[ch.vertexIndex + k] = t < 0.55f
                        ? Color.Lerp(Hex(0x67e8f9), Hex(0xf0abfc), t / 0.55f)
                        : Color.Lerp(Hex(0xf0abfc), Hex(0xfcd34d), (t - 0.55f) / 0.45f);
                }
            }
            title.UpdateVertexData(TMP_VertexDataUpdateFlags.Colors32);
        }

        // --- Gameplay (index.tsx) -------------------------------------------------------------

        /// <summary>Casts action-bar skill <paramref name="index"/>, exactly as clicking its slot does.</summary>
        public void Cast(int index)
        {
            if (!built || index < 0 || index >= slots.Length) return;
            var s = slots[index];
            var skill = s.Skill;
            if (s.Cooling)
            {
                Notify(skill.Name + " is not ready", Slate300);
                return;
            }
            if (mp * 100f < skill.Cost)
            {
                Notify("Not enough flux", Sky300);
                return;
            }

            s.Cooling = true;
            s.CooldownStart = now;
            s.Cooldown.fillAmount = 1f;
            s.Cooldown.enabled = true;
            s.Rim.enabled = false;
            s.FlashStart = now;
            s.Flash.canvasRenderer.SetAlpha(0.9f);
            s.Flash.enabled = true;
            mp = Mathf.Max(0f, mp - skill.Cost / 100f);

            if (skill.DamageMax > 0)
            {
                bool crit = Random.value < 0.28f;
                float rolled = skill.DamageMin + Random.value * (skill.DamageMax - skill.DamageMin);
                int damage = Mathf.RoundToInt(crit ? rolled * 2.4f : rolled);
                SpawnFloater(crit ? Grouped(damage) + "!" : Grouped(damage), crit ? Amber300 : Rose200, crit);
                PushLog(skill.Name + " hits Warden Ix for " + Grouped(damage) + (crit ? " (critical)." : "."), crit ? Amber300 : Slate300);
                xp = Mathf.Min(1f, xp + 0.012f);

                float remaining = bossHp - (float)damage / HudData.BossPool;
                if (remaining <= 0f)
                {
                    bossHp = 1f;
                    Notify("WARDEN IX ENRAGES — PHASE II", Rose300);
                    PushLog("Warden Ix sheds its plating.", Rose300);
                }
                else
                {
                    bossHp = remaining;
                }
            }

            if (skill.Heal > 0)
            {
                hp = Mathf.Min(1f, hp + skill.Heal / 12000f);
                SpawnFloater("+" + Grouped(skill.Heal), Emerald300, false);
                PushLog("Mendfield restores " + Grouped(skill.Heal) + ".", Emerald300);
            }

            if (skill.Id == "bulwark")
            {
                ward = 1f;
                Notify("Ward at full", Cyan200);
                PushLog("Bulwark raises a full ward.", Cyan300);
            }

            SyncStats();
        }

        /// <summary>The page's "Take a hit" button.</summary>
        public void TakeHit()
        {
            if (!built) return;
            int damage = 600 + Mathf.RoundToInt(Random.value * 900f);
            float absorbed = Mathf.Min(ward, damage / 6000f);

            hurtStart = now;
            hurt.canvasRenderer.SetAlpha(0.95f);
            hurt.enabled = true;
            ward = Mathf.Max(0f, ward - absorbed);
            SpawnFloater("-" + Grouped(damage), Rose400, false);
            PushLog("Warden Ix strikes you for " + Grouped(damage) + ".", Rose300);

            float remaining = hp - damage / 12000f + absorbed;
            if (remaining <= 0.02f)
            {
                hp = 1f;
                ward = 0.35f;
                Notify("You have fallen. Respawning…", Rose300);
            }
            else
            {
                hp = remaining;
            }

            SyncStats();
        }

        /// <summary>When on, casts a random ready skill every ~0.7s and takes a hit every ~2.3s.</summary>
        public void AutoPlay(bool on)
        {
            autoPlay = on;
            autoCastTimer = 0.7f;
            autoHitTimer = 2.3f;
        }

        void TickGame(float dt)
        {
            // Flux and ward come back on their own, and the fight keeps talking.
            ambientTimer += dt;
            if (ambientTimer >= 2.6f)
            {
                ambientTimer -= 2.6f;
                mp = Mathf.Min(1f, mp + 0.05f);
                ward = Mathf.Min(1f, ward + 0.04f);
                PushLog(HudData.AmbientLog[Random.Range(0, HudData.AmbientLog.Length)], Slate400);
                SyncStats();
            }

            if (!autoPlay) return;

            autoCastTimer -= dt;
            if (autoCastTimer <= 0f)
            {
                autoCastTimer += 0.7f;
                int ready = 0;
                for (int i = 0; i < slots.Length; i++)
                    if (!slots[i].Cooling && mp * 100f >= slots[i].Skill.Cost) readyBuffer[ready++] = i;
                if (ready > 0) Cast(readyBuffer[Random.Range(0, ready)]);
            }

            autoHitTimer -= dt;
            if (autoHitTimer <= 0f)
            {
                autoHitTimer += 2.3f;
                TakeHit();
            }
        }

        void SyncStats()
        {
            hpMeter.Set(hp, now);
            mpMeter.Set(mp, now);
            wardMeter.Set(ward, now);
            xpMeter.Set(xp, now);
            hpOrb.Height.Retarget(hp, now);
            mpOrb.Height.Retarget(mp, now);
            SetNumber(hpOrb.Label, ref hpOrb.Shown, Mathf.RoundToInt(hp * 100f));
            SetNumber(mpOrb.Label, ref mpOrb.Shown, Mathf.RoundToInt(mp * 100f));
            SetNumber(wardText, ref shownWard, Mathf.RoundToInt(ward * 2400f));
            xpFill.fillAmount = xp;

            int xpTenths = Mathf.RoundToInt(xp * 1000f);
            if (xpTenths != shownXp)
            {
                shownXp = xpTenths;
                xpText.text = (xpTenths / 10f).ToString("0.0", CultureInfo.InvariantCulture) + "%";
                LayoutXpRow();
            }

            bossFillT.Retarget(bossHp, now);
            bossGhostT.Retarget(bossHp, now);
            int bossTenths = Mathf.RoundToInt(bossHp * 1000f);
            if (bossTenths != shownBoss)
            {
                shownBoss = bossTenths;
                bossPct.text = (bossTenths / 10f).ToString("0.0", CultureInfo.InvariantCulture) + "%";
                bossPool.text = Grouped(Mathf.RoundToInt(bossHp * HudData.BossPool)) + " / " + Grouped(HudData.BossPool);
            }
        }

        void LayoutXpRow()
        {
            float tw = Width(xpText);
            Place(xpText.rectTransform, xpRowRight - tw - 1f, xpRowY, tw + 1f, xpRowH);
            xpMeter.Resize(xpRowLeft, xpRowY + (xpRowH - 10f) * 0.5f, xpRowRight - tw - 1f - 8f - xpRowLeft);
        }

        static void SetNumber(TMP_Text text, ref int shown, int value)
        {
            if (value == shown) return;
            shown = value;
            text.text = value.ToString(CultureInfo.InvariantCulture);
        }

        static string Grouped(int n) => n.ToString("N0", CultureInfo.InvariantCulture);

        void Notify(string text, Color tint)
        {
            toastText.text = text;
            toastText.color = tint;
            toast.sizeDelta = new Vector2(Width(toastText) + 32f, toast.sizeDelta.y);
            toastStart = now;
            toastGroup.alpha = 0f;
            toast.localScale = new Vector3(0.85f, 0.85f, 1f);
            toastCanvas.enabled = true;
        }

        void SpawnFloater(string text, Color tint, bool crit)
        {
            Floater f = null;
            for (int i = 0; i < floaters.Length; i++)
            {
                var c = floaters[i];
                if (!c.Active)
                {
                    f = c;
                    break;
                }
                if (f == null || c.Start < f.Start) f = c;
            }

            var t = f.Text;
            t.fontSize = crit ? 30f : 20f;
            var mat = crit ? underlayCrit : underlay;
            if (mat) t.fontSharedMaterial = mat;
            t.color = tint;
            t.text = text;
            t.canvasRenderer.SetAlpha(0f);
            t.enabled = true;

            // Between the two side panels, spread wide so two hits in one second rarely overlap.
            float w = Width(t) + 4f, h = crit ? 36f : 28f;
            f.Cx = W * (0.26f + Random.value * 0.44f) + w * 0.5f;
            f.Cy = 230f + h * 0.5f;
            f.Rt.sizeDelta = new Vector2(w, h);
            f.Rt.anchoredPosition = new Vector2(f.Cx, -f.Cy);
            f.Rt.localScale = new Vector3(0.6f, 0.6f, 1f);
            f.Start = now;
            f.Duration = crit ? 1.4f : 1.1f;
            f.Active = true;
            floaterCanvas.enabled = true;
        }

        void PushLog(string text, Color tint)
        {
            int idx = logOrder[logs.Length - 1];
            for (int k = logs.Length - 1; k > 0; k--) logOrder[k] = logOrder[k - 1];
            logOrder[0] = idx;
            logCount = Mathf.Min(logCount + 1, logs.Length);

            var line = logs[idx];
            line.Text.color = tint;
            line.Height = Mathf.Max(LH(11), Mathf.Ceil(line.Text.GetPreferredValues(text, LogWidth, 0f).y));
            line.Text.text = text;
            line.Text.canvasRenderer.SetAlpha(0f);
            line.Text.enabled = true;
            line.Start = now;

            // Newest first: everything below the new line moves down at once, as it does on the page.
            float y = logFade;
            for (int k = 0; k < logCount; k++)
            {
                var l = logs[logOrder[k]];
                l.Y = y;
                l.Rt.sizeDelta = new Vector2(LogWidth, l.Height);
                l.Rt.anchoredPosition = new Vector2(k == 0 ? 0f : 12f, -y);
                y += l.Height + 2f;
            }
        }

        // --- Pointer input -------------------------------------------------------------------

        public void OnHudHover(HudPointerKind kind, int index, bool on)
        {
            switch (kind)
            {
                case HudPointerKind.Skill:
                {
                    var s = slots[index];
                    s.Hover = on;
                    s.ShadowT.Retarget(on ? 1f : 0f, now);
                    UpdateLift(s);
                    break;
                }
                case HudPointerKind.Tab:
                    tabHover[index] = on;
                    UpdateTabColor(index);
                    break;
                case HudPointerKind.Item:
                {
                    var b = bag[index];
                    if (b == null) break;
                    b.HoverT.Retarget(on ? 1f : 0f, now);
                    b.ScaleT.Retarget(on ? 1.08f : 1f, now);
                    if (on) hovered = index;
                    else if (hovered == index) hovered = -1;
                    break;
                }
            }
        }

        public void OnHudPress(HudPointerKind kind, int index, bool down)
        {
            if (kind != HudPointerKind.Skill) return;
            slots[index].Pressed = down;
            UpdateLift(slots[index]);
        }

        public void OnHudClick(HudPointerKind kind, int index)
        {
            switch (kind)
            {
                case HudPointerKind.Skill:
                    Cast(index);
                    break;
                case HudPointerKind.Tab:
                    SetTab(index);
                    break;
                case HudPointerKind.Item:
                    Select(index);
                    break;
            }
        }

        void UpdateLift(SkillSlot s) => s.LiftT.Retarget(s.Pressed ? 1f : s.Hover ? -3f : 0f, now);

        void UpdateTabColor(int i) => tabColor[i].Retarget(i == tab ? Cyan200 : tabHover[i] ? Slate300 : Slate500, now);

        void SetTab(int index)
        {
            if (index == tab) return;
            tab = index;
            gearRoot.gameObject.SetActive(index == 0);
            skillsRoot.gameObject.SetActive(index == 1);
            codexRoot.gameObject.SetActive(index == 2);
            inkT.Retarget(index, now);
            for (int i = 0; i < 3; i++) UpdateTabColor(i);
            if (index != 0) hovered = -1;
        }

        void Select(int index)
        {
            if (index == selected || HudData.Inventory[index] == null) return;
            if (bag[selected] != null) bag[selected].Selected.enabled = false;
            selected = index;
            bag[index].Selected.enabled = true;
            LayoutCard();
        }

        // --- Per frame ---------------------------------------------------------------------------

        void Update()
        {
            if (!built) return;
            float dt = Time.deltaTime;
            now += dt;
            TickGame(dt);
            AnimateScene();
            AnimateHud();
        }

        void LateUpdate()
        {
            if (!built) return;
            PositionHud(false);

            // One camera render for the whole backdrop, then three blits shared by every glass panel.
            // The scene canvas batches in PostLateUpdate, so this draws last frame's geometry.
            sceneCam.Render();
            if (!blurMat) return;
            var active = RenderTexture.active;
            Graphics.Blit(sceneRT, blurA, blurMat, 0);
            Graphics.Blit(blurA, blurB, blurMat, 1);
            Graphics.Blit(blurB, blurA, blurMat, 2);
            RenderTexture.active = active;
        }

        void AnimateScene()
        {
            float e = HudEase.EaseInOut.Evaluate(HudEase.PingPong(now, 26f));
            skyRt.localScale = new Vector3(1f + 0.08f * e, 1f + 0.06f * e, 1f);
            skyRt.anchoredPosition = new Vector2(W * (0.49f + 0.02f * e), -H * 0.5f + H * 0.01f * e);

            starsGroup.alpha = 0.4f + 0.6f * HudEase.EaseInOut.Evaluate(HudEase.PingPong(now, 4.5f));

            float p = HudEase.Loop(now, 5f);
            float fade = p < 0.12f ? HudEase.Pulse.Evaluate(p / 0.12f) : 1f - HudEase.Pulse.Evaluate((p - 0.12f) / 0.88f);
            pulse.Set(340f * HudEase.Pulse.Evaluate(p), fade);

            scanlines.uvRect = new Rect(0f, p, 1f, H / 3f);

            if (hurt.enabled)
            {
                float t = (now - hurtStart) / 0.7f;
                if (t >= 1f) hurt.enabled = false;
                else hurt.canvasRenderer.SetAlpha(0.95f * (1f - HudEase.EaseOut.Evaluate(t)));
            }
        }

        void AnimateHud()
        {
            xpRing.localRotation = Quaternion.Euler(0f, 0f, -360f * HudEase.Loop(now, 18f));

            float sp = HudEase.Loop(now, 4.5f);
            float sx = sp < 0.55f ? Mathf.Lerp(-106.2f, 106.2f, HudEase.EaseInOut.Evaluate(sp / 0.55f)) : 106.2f;
            sheen.anchoredPosition = new Vector2(26f + sx, -26f);

            hpMeter.Tick(now);
            mpMeter.Tick(now);
            wardMeter.Tick(now);
            xpMeter.Tick(now);

            for (int i = 0; i < buffDrains.Length; i++)
                buffDrains[i].fillAmount = HudEase.Loop(now, HudData.Buffs[i].Duration);

            AnimateBoss();

            radar.localRotation = Quaternion.Euler(0f, 0f, -360f * HudEase.Loop(now, 3.6f));
            for (int i = 0; i < blips.Length; i++)
            {
                float t = now - HudData.Blips[i].z;
                float k = 1f, a = 1f;
                if (t >= 0f)
                {
                    float e = HudEase.EaseOut.Evaluate(HudEase.Loop(t, 1.8f));
                    k = Mathf.Lerp(0.6f, 1.8f, e);
                    a = Mathf.Lerp(1f, 0.15f, e);
                }
                blips[i].rectTransform.localScale = new Vector3(k, k, 1f);
                blips[i].canvasRenderer.SetAlpha(a);
            }

            AnimateOrb(hpOrb);
            AnimateOrb(mpOrb);
            AnimateSlots();
            AnimateBag();
            AnimatePanel();
            AnimateTransients();
        }

        void AnimateBoss()
        {
            if (bossFillT.Running(now))
            {
                bossFillWidth = 360f * Mathf.Clamp01(bossFillT.Value(now));
                bossFill.rectTransform.sizeDelta = new Vector2(bossFillWidth, 16f);
                bossFill.enabled = bossFillWidth > 0.5f;
            }
            if (bossGhostT.Running(now)) bossGhost.Fill = bossGhostT.Value(now);

            float e = HudEase.EaseInOut.Evaluate(HudEase.Loop(now, 2.6f));
            bossSweep.anchoredPosition = new Vector2(bossFillWidth * (2f * e - 1f), 0f);
            bossSweep.sizeDelta = new Vector2(bossFillWidth, 16f);
        }

        void AnimateOrb(Orb o)
        {
            o.WaveFast.localRotation = Quaternion.Euler(0f, 0f, -360f * HudEase.Loop(now, 7f));
            o.WaveSlow.localRotation = Quaternion.Euler(0f, 0f, 360f * HudEase.Loop(now, 11f));
            if (o.Height.Running(now)) SetLiquid(o, o.Height.Value(now));
        }

        void AnimateSlots()
        {
            float spin = 360f * HudEase.Loop(now, 1.6f);
            for (int i = 0; i < slots.Length; i++)
            {
                var s = slots[i];
                if (s.Cooling)
                {
                    float t = (now - s.CooldownStart) / s.Skill.Cooldown;
                    if (t >= 1f)
                    {
                        s.Cooling = false;
                        s.Cooldown.enabled = false;
                        s.Rim.enabled = true;
                    }
                    else
                    {
                        s.Cooldown.fillAmount = 1f - t;
                    }
                }

                if (!s.Cooling) s.Rim.SetRotation(spin);

                if (s.Flash.enabled)
                {
                    // The page also scales the flash to 1.5, but the slot's clip hides that entirely.
                    float t = (now - s.FlashStart) / 0.38f;
                    if (t >= 1f) s.Flash.enabled = false;
                    else s.Flash.canvasRenderer.SetAlpha(0.9f * (1f - HudEase.EaseOut.Evaluate(t)));
                }

                if (s.ShadowT.Running(now)) ApplySlotShadow(s, s.ShadowT.Value(now));
                if (s.LiftT.Running(now))
                {
                    var pos = new Vector2(s.Pos.x, -(s.Pos.y + s.LiftT.Value(now)));
                    s.Button.anchoredPosition = pos;
                    s.Fx.anchoredPosition = pos;
                }
            }
        }

        static void ApplySlotShadow(SkillSlot s, float k)
        {
            s.Shadow.color = Color.Lerp(new Color(0f, 0f, 0f, 0.9f), A(Cyan400, 0.65f), k);
            SetGlow(s.Shadow, 0f, 0f, 56f, 56f, Mathf.Lerp(10f, 18f, k), Mathf.Lerp(-4f, -2f, k), 0f, Mathf.Lerp(4f, 0f, k));
            s.Ring.color = Color.Lerp(A(Slate400, 0.28f), A(Cyan300, 0.85f), k);
        }

        void AnimateBag()
        {
            float pulseT = HudEase.EaseInOut.Evaluate(HudEase.PingPong(now, 2.4f));
            for (int i = 0; i < bag.Length; i++)
            {
                var b = bag[i];
                if (b == null) continue;
                if (b.ScaleT.Running(now))
                {
                    float k = b.ScaleT.Value(now);
                    b.Root.localScale = new Vector3(k, k, 1f);
                }

                if (b.Item.Rarity == HudRarity.Mythic)
                {
                    // The pulse is an animation, which outranks the :hover box-shadow on the page too.
                    var st = b.Style;
                    b.Glow.color = A(st.Tier, Mathf.Lerp(0.7f, 1f, pulseT));
                    SetGlow(b.Glow, 0f, 0f, 46f, 46f, Mathf.Lerp(10f, 22f, pulseT), Mathf.Lerp(-4f, 0f, pulseT), 0f, 0f);
                    b.Ring.color = Color.Lerp(A(st.Tier, 0.9f), st.RingPulse, pulseT);
                }
                else if (b.HoverT.Running(now))
                {
                    ApplyBagGlow(b, b.HoverT.Value(now));
                }
            }
        }

        static void ApplyBagGlow(BagSlot b, float k)
        {
            var st = b.Style;
            float halo = st.Halo + 0.1f * k, reach = st.Reach + 8f * k;
            bool on = halo > 0.001f && reach > 0.5f;
            b.Glow.enabled = on;
            if (on)
            {
                b.Glow.color = A(st.Tier, halo);
                SetGlow(b.Glow, 0f, 0f, 46f, 46f, reach, st.Spread, 0f, 0f);
            }
            b.Ring.color = Color.Lerp(A(st.Tier, st.Ring), st.RingHover, k);
        }

        void AnimatePanel()
        {
            if (inkT.Running(now))
                tabInk.anchoredPosition = new Vector2(W - 315f + inkT.Value(now) * tabW, inkY);

            for (int i = 0; i < 3; i++)
            {
                if (!tabColor[i].Running(now)) continue;
                var c = tabColor[i].Value(now);
                tabIcon[i].canvasRenderer.SetColor(c);
                tabLabel[i].canvasRenderer.SetColor(c);
            }

            // Moving straight from one slot to the next swaps the content without replaying the entry.
            if (hovered != shownTip)
            {
                if (hovered < 0)
                {
                    tooltipCanvas.enabled = false;
                }
                else
                {
                    if (shownTip < 0)
                    {
                        tipStart = now;
                        tooltipGroup.alpha = 0f;
                        tooltipCanvas.enabled = true;
                    }
                    LayoutTooltip(HudData.Inventory[hovered]);
                }
                shownTip = hovered;
            }

            if (tooltipCanvas.enabled)
            {
                float t = (now - tipStart) / 0.16f;
                if (t <= 1.2f)
                {
                    float e = HudEase.EaseOut.Evaluate(t);
                    tooltipGroup.alpha = e;
                    tooltip.anchoredPosition = new Vector2(tipX + 8f * (1f - e), -tipY);
                }
            }
        }

        void AnimateTransients()
        {
            for (int k = 0; k < logCount; k++)
            {
                var l = logs[logOrder[k]];
                float t = (now - l.Start) / 0.22f;
                if (t > 1.2f) continue;
                float e = HudEase.EaseOut.Evaluate(t);
                l.Text.canvasRenderer.SetAlpha(e);
                l.Rt.anchoredPosition = new Vector2(12f * e, -l.Y);
            }

            if (toastCanvas.enabled)
            {
                float age = now - toastStart;
                if (age >= 1.9f)
                {
                    toastCanvas.enabled = false;
                }
                else if (age <= 0.35f)
                {
                    float t = age / 0.26f;
                    toastGroup.alpha = HudEase.EaseOut.Evaluate(t);
                    float k = Mathf.LerpUnclamped(0.85f, 1f, HudEase.Overshoot.Evaluate(t));
                    toast.localScale = new Vector3(k, k, 1f);
                }
            }

            bool anyFloater = false;
            for (int i = 0; i < floaters.Length; i++)
            {
                var f = floaters[i];
                if (!f.Active) continue;
                float age = now - f.Start;
                if (age >= 1.5f)
                {
                    f.Active = false;
                    f.Text.enabled = false;
                    continue;
                }

                anyFloater = true;
                float t = Mathf.Min(1f, age / f.Duration);
                var ease = HudEase.Float;
                float scale = t < 0.22f
                    ? Mathf.LerpUnclamped(0.6f, 1.25f, ease.Evaluate(t / 0.22f))
                    : t < 0.4f ? Mathf.LerpUnclamped(1.25f, 1f, ease.Evaluate((t - 0.22f) / 0.18f)) : 1f;
                float alpha = t < 0.22f ? ease.Evaluate(t / 0.22f) : 1f - ease.Evaluate((t - 0.22f) / 0.78f);
                f.Rt.anchoredPosition = new Vector2(f.Cx, -f.Cy + 90f * ease.Evaluate(t));
                f.Rt.localScale = new Vector3(scale, scale, 1f);
                f.Text.canvasRenderer.SetAlpha(alpha);
            }
            if (!anyFloater && floaterCanvas.enabled) floaterCanvas.enabled = false;
        }

        // --- Building blocks -----------------------------------------------------------------

        static float LH(float px) => Mathf.Round(px * 1.2f);

        static float Width(TMP_Text t) => Mathf.Ceil(t.GetPreferredValues().x);

        /// <summary>Places a text at its own width in a row and returns where the next item starts.</summary>
        static float Run(TMP_Text t, float x, float y, float h)
        {
            float w = Width(t);
            Place(t.rectTransform, x, y, w + 1f, h);
            return x + w;
        }

        static RectTransform NewRect(string name, Transform parent)
        {
            var go = new GameObject(name, typeof(RectTransform));
            go.layer = parent.gameObject.layer;
            var rt = (RectTransform)go.transform;
            rt.SetParent(parent, false);
            rt.anchorMin = rt.anchorMax = new Vector2(0f, 1f);
            rt.pivot = new Vector2(0f, 1f);
            rt.sizeDelta = Vector2.zero;
            return rt;
        }

        /// <summary>Top-left placement in the parent's box, y down, like the page's absolute insets.</summary>
        static void Place(RectTransform rt, float x, float y, float w, float h)
        {
            rt.anchorMin = rt.anchorMax = new Vector2(0f, 1f);
            rt.pivot = new Vector2(0f, 1f);
            rt.anchoredPosition = new Vector2(x, -y);
            rt.sizeDelta = new Vector2(w, h);
        }

        /// <summary>Centre placement, for anything that scales or rotates about its middle.</summary>
        static void PlaceC(RectTransform rt, float cx, float cy, float w, float h)
        {
            rt.anchorMin = rt.anchorMax = new Vector2(0f, 1f);
            rt.pivot = new Vector2(0.5f, 0.5f);
            rt.anchoredPosition = new Vector2(cx, -cy);
            rt.sizeDelta = new Vector2(w, h);
        }

        static void Stretch(RectTransform rt)
        {
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.pivot = new Vector2(0f, 1f);
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;
        }

        /// <summary>
        /// A box-shadow from the one baked glow sprite: the rect grows by spread plus twice the blur, and
        /// the sliced border is scaled so the falloff matches the blur radius.
        /// </summary>
        static void SetGlow(Image img, float x, float y, float w, float h, float blur, float spread, float ox, float oy)
        {
            blur = Mathf.Max(0.5f, blur);
            float grow = spread + 2f * blur;
            var rt = img.rectTransform;
            rt.anchoredPosition = new Vector2(x - grow + ox, -(y - grow + oy));
            rt.sizeDelta = new Vector2(w + 2f * grow, h + 2f * grow);
            img.pixelsPerUnitMultiplier = HudArt.GlowBlur / blur;
        }

        static RectTransform SubCanvas(Transform parent, string name, bool raycast)
        {
            var rt = NewRect(name, parent);
            Stretch(rt);
            rt.gameObject.AddComponent<Canvas>().additionalShaderChannels = TmpChannels;
            if (raycast) rt.gameObject.AddComponent<GraphicRaycaster>();
            return rt;
        }

        RectTransform Frame(Transform parent, string name, float x, float y, float w, float h, bool glass, Color bg)
        {
            var root = NewRect(name, parent);
            Place(root, x, y, w, h);
            if (glass)
            {
                // Coordinates here are the HUD's own, so the panel's rect is its window into the blur.
                var g = RawImg(root, "Glass", blurA ? blurA : sceneRT, Color.white);
                Stretch(g.rectTransform);
                g.uvRect = new Rect(x / W, 1f - (y + h) / H, w / W, h / H);
            }

            Stretch(Img(root, "Bg", HudArt.White, bg).rectTransform);
            Stretch(Sliced(root, "Border", HudArt.SquareRing, PanelBorder).rectTransform);
            Place(Img(root, "BracketTop", HudArt.Bracket, BracketTint).rectTransform, -1f, -1f, 18f, 18f);
            var bottom = Img(root, "BracketBottom", HudArt.Bracket, BracketTint).rectTransform;
            bottom.anchorMin = bottom.anchorMax = new Vector2(1f, 0f);
            bottom.pivot = new Vector2(0.5f, 0.5f);
            bottom.anchoredPosition = new Vector2(-8f, 8f);
            bottom.sizeDelta = new Vector2(18f, 18f);
            bottom.localRotation = Quaternion.Euler(0f, 0f, 180f);
            return root;
        }

        Meter MakeMeter(Transform parent, float x, float y, float w, Color fill, Color ghost, float value)
        {
            var m = new Meter
            {
                FillT = new HudTween(value, 0.26f, 0f, HudEase.Snappy),
                GhostT = new HudTween(value, 0.9f, 0.32f, HudEase.EaseOut),
            };
            var well = Sliced(parent, "Well", HudArt.Well10, Color.white);
            Place(well.rectTransform, x, y, w, 10f);
            m.Well = well.rectTransform;
            m.Ghost = Bar(parent, HudArt.Pill, ghost, x, y, w, 10f, value);
            m.Fill = Bar(parent, HudArt.Pill, fill, x, y, w, 10f, value);
            var ticks = Img(parent, "Ticks", HudArt.Ticks, Color.white, Image.Type.Tiled);
            Place(ticks.rectTransform, x, y, w, 10f);
            m.Ticks = ticks.rectTransform;
            return m;
        }

        static HudFillBar Bar(Transform parent, Sprite sprite, Color color, float x, float y, float w, float h, float value)
        {
            var b = Add<HudFillBar>(parent, "Bar");
            b.Sprite = sprite;
            b.color = color;
            b.Fill = value;
            Place(b.rectTransform, x, y, w, h);
            return b;
        }

        static T Add<T>(Transform parent, string name) where T : Graphic
        {
            var g = NewRect(name, parent).gameObject.AddComponent<T>();
            g.raycastTarget = false;
            return g;
        }

        static Image Img(Transform parent, string name, Sprite sprite, Color color, Image.Type type = Image.Type.Simple)
        {
            var img = Add<Image>(parent, name);
            img.sprite = sprite;
            img.type = type;
            img.color = color;
            return img;
        }

        static Image Sliced(Transform parent, string name, Sprite sprite, Color color) => Img(parent, name, sprite, color, Image.Type.Sliced);

        static RawImage RawImg(Transform parent, string name, Texture texture, Color color)
        {
            var raw = Add<RawImage>(parent, name);
            raw.texture = texture;
            raw.color = color;
            return raw;
        }

        static TextMeshProUGUI Txt(Transform parent, string text, TMP_FontAsset font, float fontSize, Color color, TextAlignmentOptions align,
            float trackingEm = 0f, FontStyles style = FontStyles.Normal)
        {
            var t = Add<TextMeshProUGUI>(parent, "Text");
            if (font) t.font = font;
            t.fontSize = fontSize;
            t.color = color;
            t.alignment = align;
            t.characterSpacing = trackingEm * 100f;
            t.fontStyle = style;
            t.textWrappingMode = TextWrappingModes.NoWrap;
            t.overflowMode = TextOverflowModes.Overflow;
            t.richText = false;
            t.text = text;
            return t;
        }

        TextMeshProUGUI Icon(Transform parent, string name, float fontSize, Color color) =>
            Txt(parent, iconSet ? iconSet.ConvertTextContent(name) : "", icons, fontSize, color, TextAlignmentOptions.Center);

        void AddPointer(GameObject go, HudPointerKind kind, int index)
        {
            var p = go.AddComponent<HudPointer>();
            p.Owner = this;
            p.Kind = kind;
            p.Index = index;
        }
    }
}
