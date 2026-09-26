using UnityEngine;

namespace ReactUnityKitchenSink.Benchmarks
{
    /// <summary>Tailwind v4 palette entries the page uses, as sRGB.</summary>
    public static class Tw
    {
        public static Color Hex(uint rgb, float a = 1f) =>
            new Color(((rgb >> 16) & 255) / 255f, ((rgb >> 8) & 255) / 255f, (rgb & 255) / 255f, a);

        public static readonly Color Slate100 = Hex(0xf1f5f9), Slate200 = Hex(0xe2e8f0), Slate300 = Hex(0xcbd5e1), Slate400 = Hex(0x94a3b8),
            Slate500 = Hex(0x64748b), Slate600 = Hex(0x475569), Slate700 = Hex(0x334155), Slate800 = Hex(0x1e293b), Slate900 = Hex(0x0f172a),
            Slate950 = Hex(0x020617);

        public static readonly Color Cyan50 = Hex(0xecfeff), Cyan100 = Hex(0xcffafe), Cyan200 = Hex(0xa5f3fc), Cyan300 = Hex(0x67e8f9),
            Cyan400 = Hex(0x22d3ee), Cyan500 = Hex(0x06b6d4);

        public static readonly Color Sky50 = Hex(0xf0f9ff), Sky200 = Hex(0xbae6fd), Sky300 = Hex(0x7dd3fc), Sky400 = Hex(0x38bdf8), Sky600 = Hex(0x0284c7);
        public static readonly Color Rose50 = Hex(0xfff1f2), Rose100 = Hex(0xffe4e6), Rose200 = Hex(0xfecdd3), Rose300 = Hex(0xfda4af),
            Rose400 = Hex(0xfb7185), Rose500 = Hex(0xf43f5e), Rose600 = Hex(0xe11d48);

        public static readonly Color Amber300 = Hex(0xfcd34d), Amber400 = Hex(0xfbbf24);
        public static readonly Color Emerald300 = Hex(0x6ee7b7), Emerald400 = Hex(0x34d399), Emerald500 = Hex(0x10b981);
        public static readonly Color Fuchsia200 = Hex(0xf5d0fe), Fuchsia300 = Hex(0xf0abfc), Fuchsia400 = Hex(0xe879f9);
        public static readonly Color Purple300 = Hex(0xd8b4fe), Purple400 = Hex(0xc084fc);
        public static readonly Color Green400 = Hex(0x4ade80);

        public static Color A(Color c, float a) => new Color(c.r, c.g, c.b, a);
    }

    public enum HudRarity
    {
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary,
        Mythic,
    }

    public sealed class HudRarityStyle
    {
        public Color Tier, Text, Corner, RingHover, RingPulse;
        public float Ring, Halo, Reach, Spread;
        public string Label;
    }

    public sealed class HudSkill
    {
        public string Id, Hotkey, Name, Icon, School, SchoolUpper, CooldownLabel;
        public float Cooldown;
        public int Cost, DamageMin, DamageMax, Heal;
        public bool Ultimate;
    }

    public sealed class HudItem
    {
        public string Id, Name, Icon, Slot, SlotUpper, Flavor;
        public HudRarity Rarity;
        public int Level, Count;
        public string[] Stats;
    }

    public sealed class HudBuff
    {
        public string Icon;
        public float Duration;
        public bool Debuff;
        public Color Tint;
    }

    public sealed class HudQuest
    {
        public string Name, KindUpper;
        public string[] Objectives;
        public int[] Done, Total;
    }

    public static class HudData
    {
        public const int BossPool = 84000;

        public const string PlayerName = "VESSA KYRN", PlayerTitle = "Voidrunner", PlayerGuild = "[NULLSET]", PlayerZone = "HOLLOW SPIRE · T3";
        public const int PlayerLevel = 47, GearScore = 412;
        public const string BossName = "WARDEN IX", BossEpithet = "THE UNMAKER";
        public const int BossTier = 3;

        public static readonly HudRarityStyle[] Rarities =
        {
            Style("COMMON", Tw.Slate400, Tw.Slate300, Tw.Slate400, 0.45f, 0f, 0f, -4f),
            Style("UNCOMMON", Tw.Green400, Tw.Emerald300, Tw.Emerald400, 0.6f, 0.8f, 10f, -4f),
            Style("RARE", Tw.Sky400, Tw.Sky300, Tw.Sky400, 0.7f, 0.9f, 12f, -4f),
            Style("EPIC", Tw.Purple400, Tw.Purple300, Tw.Purple400, 0.8f, 0.9f, 14f, -3f),
            Style("LEGENDARY", Tw.Amber400, Tw.Amber300, Tw.Amber400, 0.85f, 0.9f, 16f, -2f),
            Style("MYTHIC", Tw.Rose400, Tw.Rose300, Tw.Rose400, 0.9f, 0.95f, 18f, -2f),
        };

        public static readonly HudSkill[] Skills =
        {
            Skill("lance", "1", "Arc Lance", "bolt", 3, 12, "Storm", 420, 680),
            Skill("ember", "2", "Emberfall", "local_fire_department", 7, 26, "Pyre", 980, 1340),
            Skill("cryo", "3", "Cryostasis", "ac_unit", 11, 30, "Rime", 210, 340),
            Skill("bulwark", "4", "Bulwark", "shield", 16, 0, "Ward", 0, 0),
            Skill("mend", "5", "Mendfield", "healing", 9, 34, "Ward", 0, 0, heal: 1850),
            Skill("siphon", "6", "Siphon", "bloodtype", 13, 18, "Void", 640, 720),
            Skill("starbreak", "7", "Starbreak", "auto_awesome", 22, 55, "Void", 1800, 2400),
            Skill("overdrive", "R", "Overdrive", "whatshot", 40, 0, "Ultimate", 3200, 4600, ultimate: true),
        };

        public static readonly HudBuff[] Buffs =
        {
            new HudBuff { Icon = "speed", Duration = 12, Tint = Tw.Amber300 },
            new HudBuff { Icon = "security", Duration = 8, Tint = Tw.Cyan300 },
            new HudBuff { Icon = "favorite", Duration = 20, Tint = Tw.Emerald300 },
            new HudBuff { Icon = "bloodtype", Duration = 6, Debuff = true, Tint = Tw.Rose400 },
            new HudBuff { Icon = "ac_unit", Duration = 10, Debuff = true, Tint = Tw.Sky300 },
        };

        /// <summary>24 bag slots, a third of them empty.</summary>
        public static readonly HudItem[] Inventory =
        {
            Item("lance", "Nullforged Lance", "bolt", HudRarity.Mythic, "Main hand", "It was never forged. It was subtracted.", 442, 0,
                "+186 Power", "+9.4% Crit", "Rends space on critical hit"),
            Item("mantle", "Cinderweave Mantle", "local_fire_department", HudRarity.Legendary, "Back", "Still warm. It has been eleven years.", 428, 0,
                "+124 Resolve", "+6.1% Haste"),
            Item("aegis", "Tideglass Aegis", "shield", HudRarity.Epic, "Off hand", "Cut from a wave that never broke.", 415, 0,
                "+98 Ward", "Absorbs 2,400 damage"),
            Item("sigil", "Runner's Sigil", "explore", HudRarity.Epic, "Trinket", "Worn smooth by a thumb that no longer exists.", 410, 0,
                "+64 Finesse", "Dash gains a charge"),
            Item("crown", "Hollow Crown", "military_tech", HudRarity.Rare, "Head", "Light, for a crown.", 402, 0, "+71 Power", "+2.8% Crit"),
            Item("greaves", "Ashstep Greaves", "terrain", HudRarity.Rare, "Feet", "They leave prints in stone.", 398, 0, "+58 Resolve", "+3.3% Haste"),
            null,
            Item("gloves", "Static Weave Gloves", "back_hand", HudRarity.Uncommon, "Hands", "Your hair stands up when you wear them.", 380, 0, "+44 Finesse"),
            Item("focus", "Cracked Focus", "visibility", HudRarity.Common, "Trinket", "It works. Mostly.", 310, 0, "+12 Ward"),
            null,
            Item("vial", "Ash Vial", "science", HudRarity.Uncommon, "Consumable", "Tastes like a chimney.", 0, 12, "Restores 40% mana"),
            Item("core", "Void Core", "memory", HudRarity.Rare, "Quest item", "Cold in a way temperature does not explain.", 0, 7, "Warden Ix reacts to this"),
            null,
            Item("scrap", "Scrap Alloy", "hardware", HudRarity.Common, "Material", "Half a spire, eventually.", 0, 84, "Crafting reagent"),
            Item("dust", "Emberdust", "whatshot", HudRarity.Uncommon, "Material", "Do not inhale. Do not exhale either.", 0, 31, "Crafting reagent"),
            null,
            Item("key", "Warden Key", "lock_open", HudRarity.Legendary, "Key", "One use. Choose the door carefully.", 0, 0, "Opens the inner seal"),
            null,
            Item("ration", "Field Ration", "casino", HudRarity.Common, "Consumable", "Nutritionally complete. Emotionally not.", 0, 5,
                "Restores 8% health over 10s"),
            null,
            null,
            Item("charm", "Gravebloom Charm", "psychology", HudRarity.Epic, "Trinket", "It only works once, and it does not tell you when.", 407, 0,
                "+82 Resolve", "Death is delayed 3s"),
            null,
            null,
        };

        public static readonly HudQuest[] Quests =
        {
            new HudQuest
            {
                Name = "The Hollow Spire", KindUpper = "MAIN",
                Objectives = new[] { "Recover Void Cores", "Defeat Warden Ix", "Seal the rift" },
                Done = new[] { 7, 0, 0 }, Total = new[] { 12, 1, 1 },
            },
            new HudQuest { Name = "Ashes to Ashes", KindUpper = "SIDE", Objectives = new[] { "Burn the wreckage" }, Done = new[] { 3 }, Total = new[] { 5 } },
            new HudQuest { Name = "Field Survey", KindUpper = "BOUNTY", Objectives = new[] { "Scan anomalies" }, Done = new[] { 9 }, Total = new[] { 9 } },
        };

        public static readonly string[] StatNames = { "Power", "Finesse", "Ward", "Resolve", "Crit", "Haste" };
        public static readonly int[] StatValues = { 412, 268, 194, 331, 43, 18 };
        public static readonly int[] StatMax = { 600, 600, 600, 600, 100, 100 };
        public static readonly Color[] StatTints = { Tw.Rose400, Tw.Amber400, Tw.Cyan400, Tw.Emerald400, Tw.Fuchsia400, Tw.Sky400 };

        /// <summary>Minimap blips: position in percent of the dial, tint, animation delay.</summary>
        public static readonly Vector4[] Blips =
        {
            new Vector4(66, 30, 0f), new Vector4(74, 44, 0.4f), new Vector4(33, 62, 0.8f), new Vector4(24, 37, 1.2f), new Vector4(58, 70, 1.6f),
        };

        public static readonly Color[] BlipTints = { Tw.Rose400, Tw.Rose400, Tw.Amber300, Tw.Emerald400, Tw.Sky400 };

        public static readonly string[] AmbientLog =
        {
            "Warden Ix shudders. Plating peels away.",
            "You resist Gravewind.",
            "Rift shard fractures for 612.",
            "Mending ticks for 284.",
            "Warden Ix casts Null Sweep.",
            "You dodge Null Sweep.",
            "A Hollow Acolyte joins the fight.",
            "Emberdust x2 added to inventory.",
            "Warden Ix is Chilled.",
            "Your Ward absorbs 1,180.",
        };

        static HudRarityStyle Style(string label, Color tier, Color text, Color corner, float ring, float halo, float reach, float spread) =>
            new HudRarityStyle
            {
                Label = label, Tier = tier, Text = text, Corner = corner, Ring = ring, Halo = halo, Reach = reach, Spread = spread,
                RingHover = Lighten(tier, 0.14f), RingPulse = Lighten(tier, 0.10f),
            };

        static HudSkill Skill(string id, string hotkey, string name, string icon, float cooldown, int cost, string school, int min, int max,
            int heal = 0, bool ultimate = false) =>
            new HudSkill
            {
                Id = id, Hotkey = hotkey, Name = name, Icon = icon, Cooldown = cooldown, Cost = cost, School = school,
                SchoolUpper = school.ToUpperInvariant(), CooldownLabel = cooldown + "s", DamageMin = min, DamageMax = max, Heal = heal,
                Ultimate = ultimate,
            };

        static HudItem Item(string id, string name, string icon, HudRarity rarity, string slot, string flavor, int level, int count,
            params string[] stats) =>
            new HudItem
            {
                Id = id, Name = name, Icon = icon, Rarity = rarity, Slot = slot, SlotUpper = slot.ToUpperInvariant(), Flavor = flavor,
                Level = level, Count = count, Stats = stats,
            };

        /// <summary>hsl(from c h s calc(l + amount)).</summary>
        public static Color Lighten(Color c, float amount)
        {
            float max = Mathf.Max(c.r, Mathf.Max(c.g, c.b)), min = Mathf.Min(c.r, Mathf.Min(c.g, c.b));
            float l = (max + min) * 0.5f, h = 0f, s = 0f, d = max - min;
            if (d > 1e-5f)
            {
                s = l > 0.5f ? d / (2f - max - min) : d / (max + min);
                if (max == c.r) h = (c.g - c.b) / d + (c.g < c.b ? 6f : 0f);
                else if (max == c.g) h = (c.b - c.r) / d + 2f;
                else h = (c.r - c.g) / d + 4f;
                h /= 6f;
            }

            l = Mathf.Clamp01(l + amount);
            if (s <= 0f) return new Color(l, l, l, 1f);
            float q = l < 0.5f ? l * (1f + s) : l + s - l * s, p = 2f * l - q;
            return new Color(Hue(p, q, h + 1f / 3f), Hue(p, q, h), Hue(p, q, h - 1f / 3f), 1f);
        }

        static float Hue(float p, float q, float t)
        {
            if (t < 0f) t += 1f;
            if (t > 1f) t -= 1f;
            if (t < 1f / 6f) return p + (q - p) * 6f * t;
            if (t < 0.5f) return q;
            if (t < 2f / 3f) return p + (q - p) * (2f / 3f - t) * 6f;
            return p;
        }
    }
}
