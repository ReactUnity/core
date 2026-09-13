import { icon, type Style } from '@reactunity/renderer';
import styles from './index.module.scss';

/**
 * `Style` is a mapped type over the properties ReactUnity knows, so a custom property is not one of
 * its keys. Everything the renderer does with an inline style object goes through
 * `CssProperties.GetProperty`, which makes a `--name` into a variable property like any other -- so
 * the cast is the type system catching up with the runtime, not a hole in it.
 */
export const cssVars = (values: Record<string, string | number>) => values as Style;

type IconComponent = typeof icon.bolt;

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

/** Written out rather than built, because Tailwind only emits a class it has seen in a source file. */
export const rarityRing: Record<Rarity, string> = {
  common: styles.rarityCommon,
  uncommon: styles.rarityUncommon,
  rare: styles.rarityRare,
  epic: styles.rarityEpic,
  legendary: styles.rarityLegendary,
  mythic: styles.rarityMythic,
};

export const rarityText: Record<Rarity, string> = {
  common: 'text-slate-300',
  uncommon: 'text-emerald-300',
  rare: 'text-sky-300',
  epic: 'text-purple-300',
  legendary: 'text-amber-300',
  mythic: 'text-rose-300',
};

export const rarityBg: Record<Rarity, string> = {
  common: 'bg-slate-400',
  uncommon: 'bg-emerald-400',
  rare: 'bg-sky-400',
  epic: 'bg-purple-400',
  legendary: 'bg-amber-400',
  mythic: 'bg-rose-400',
};

export interface Item {
  id: string;
  name: string;
  Icon: IconComponent;
  rarity: Rarity;
  slot: string;
  level?: number;
  count?: number;
  stats: string[];
  flavor: string;
}

export interface Skill {
  id: string;
  hotkey: string;
  name: string;
  Icon: IconComponent;
  cooldown: number;
  cost: number;
  school: string;
  /** Absent for the ones that do not hit anything. */
  damage?: [number, number];
  heal?: number;
  ultimate?: boolean;
}

export interface Buff {
  id: string;
  name: string;
  Icon: IconComponent;
  duration: number;
  debuff?: boolean;
  tint: string;
}

export interface Quest {
  id: string;
  name: string;
  kind: 'Main' | 'Side' | 'Bounty';
  objectives: { text: string; done: number; total: number }[];
}

export const player = {
  name: 'VESSA KYRN',
  title: 'Voidrunner',
  guild: 'NULLSET',
  level: 47,
  gearScore: 412,
  zone: 'HOLLOW SPIRE · T3',
};

export const stats = [
  { name: 'Power', value: 412, max: 600, tint: 'bg-rose-400' },
  { name: 'Finesse', value: 268, max: 600, tint: 'bg-amber-400' },
  { name: 'Ward', value: 194, max: 600, tint: 'bg-cyan-400' },
  { name: 'Resolve', value: 331, max: 600, tint: 'bg-emerald-400' },
  { name: 'Crit', value: 43, max: 100, tint: 'bg-fuchsia-400' },
  { name: 'Haste', value: 18, max: 100, tint: 'bg-sky-400' },
];

export const skills: Skill[] = [
  { id: 'lance', hotkey: '1', name: 'Arc Lance', Icon: icon.bolt, cooldown: 3, cost: 12, school: 'Storm', damage: [420, 680] },
  {
    id: 'ember',
    hotkey: '2',
    name: 'Emberfall',
    Icon: icon.local_fire_department,
    cooldown: 7,
    cost: 26,
    school: 'Pyre',
    damage: [980, 1340],
  },
  { id: 'cryo', hotkey: '3', name: 'Cryostasis', Icon: icon.ac_unit, cooldown: 11, cost: 30, school: 'Rime', damage: [210, 340] },
  { id: 'bulwark', hotkey: '4', name: 'Bulwark', Icon: icon.shield, cooldown: 16, cost: 0, school: 'Ward' },
  { id: 'mend', hotkey: '5', name: 'Mendfield', Icon: icon.healing, cooldown: 9, cost: 34, school: 'Ward', heal: 1850 },
  { id: 'siphon', hotkey: '6', name: 'Siphon', Icon: icon.bloodtype, cooldown: 13, cost: 18, school: 'Void', damage: [640, 720] },
  {
    id: 'starbreak',
    hotkey: '7',
    name: 'Starbreak',
    Icon: icon.auto_awesome,
    cooldown: 22,
    cost: 55,
    school: 'Void',
    damage: [1800, 2400],
  },
  {
    id: 'overdrive',
    hotkey: 'R',
    name: 'Overdrive',
    Icon: icon.whatshot,
    cooldown: 40,
    cost: 0,
    school: 'Ultimate',
    damage: [3200, 4600],
    ultimate: true,
  },
];

export const buffs: Buff[] = [
  { id: 'haste', name: 'Quickened', Icon: icon.speed, duration: 12, tint: 'text-amber-300' },
  { id: 'ward', name: 'Warded', Icon: icon.security, duration: 8, tint: 'text-cyan-300' },
  { id: 'regen', name: 'Mending', Icon: icon.favorite, duration: 20, tint: 'text-emerald-300' },
  { id: 'bleed', name: 'Rended', Icon: icon.bloodtype, duration: 6, debuff: true, tint: 'text-rose-400' },
  { id: 'chill', name: 'Chilled', Icon: icon.ac_unit, duration: 10, debuff: true, tint: 'text-sky-300' },
];

const item = (
  id: string,
  name: string,
  Icon: IconComponent,
  rarity: Rarity,
  slot: string,
  stats: string[],
  flavor: string,
  extra?: { level?: number; count?: number },
): Item => ({ id, name, Icon, rarity, slot, stats, flavor, ...extra });

/** 24 slots, a third of them empty -- an inventory nobody has filled reads as a real one. */
export const inventory: (Item | null)[] = [
  item(
    'lance',
    'Nullforged Lance',
    icon.bolt,
    'mythic',
    'Main hand',
    ['+186 Power', '+9.4% Crit', 'Rends space on critical hit'],
    'It was never forged. It was subtracted.',
    { level: 442 },
  ),
  item(
    'mantle',
    'Cinderweave Mantle',
    icon.local_fire_department,
    'legendary',
    'Back',
    ['+124 Resolve', '+6.1% Haste'],
    'Still warm. It has been eleven years.',
    { level: 428 },
  ),
  item(
    'aegis',
    'Tideglass Aegis',
    icon.shield,
    'epic',
    'Off hand',
    ['+98 Ward', 'Absorbs 2,400 damage'],
    'Cut from a wave that never broke.',
    { level: 415 },
  ),
  item(
    'sigil',
    "Runner's Sigil",
    icon.explore,
    'epic',
    'Trinket',
    ['+64 Finesse', 'Dash gains a charge'],
    'Worn smooth by a thumb that no longer exists.',
    { level: 410 },
  ),
  item('crown', 'Hollow Crown', icon.military_tech, 'rare', 'Head', ['+71 Power', '+2.8% Crit'], 'Light, for a crown.', { level: 402 }),
  item('greaves', 'Ashstep Greaves', icon.terrain, 'rare', 'Feet', ['+58 Resolve', '+3.3% Haste'], 'They leave prints in stone.', {
    level: 398,
  }),
  null,
  item('gloves', 'Static Weave Gloves', icon.back_hand, 'uncommon', 'Hands', ['+44 Finesse'], 'Your hair stands up when you wear them.', {
    level: 380,
  }),
  item('focus', 'Cracked Focus', icon.visibility, 'common', 'Trinket', ['+12 Ward'], 'It works. Mostly.', { level: 310 }),
  null,
  item('vial', 'Ash Vial', icon.science, 'uncommon', 'Consumable', ['Restores 40% mana'], 'Tastes like a chimney.', { count: 12 }),
  item(
    'core',
    'Void Core',
    icon.memory,
    'rare',
    'Quest item',
    ['Warden Ix reacts to this'],
    'Cold in a way temperature does not explain.',
    { count: 7 },
  ),
  null,
  item('scrap', 'Scrap Alloy', icon.hardware, 'common', 'Material', ['Crafting reagent'], 'Half a spire, eventually.', { count: 84 }),
  item('dust', 'Emberdust', icon.whatshot, 'uncommon', 'Material', ['Crafting reagent'], 'Do not inhale. Do not exhale either.', {
    count: 31,
  }),
  null,
  item('key', 'Warden Key', icon.lock_open, 'legendary', 'Key', ['Opens the inner seal'], 'One use. Choose the door carefully.', {}),
  null,
  item(
    'ration',
    'Field Ration',
    icon.casino,
    'common',
    'Consumable',
    ['Restores 8% health over 10s'],
    'Nutritionally complete. Emotionally not.',
    { count: 5 },
  ),
  null,
  null,
  item(
    'charm',
    'Gravebloom Charm',
    icon.psychology,
    'epic',
    'Trinket',
    ['+82 Resolve', 'Death is delayed 3s'],
    'It only works once, and it does not tell you when.',
    { level: 407 },
  ),
  null,
  null,
];

export const quests: Quest[] = [
  {
    id: 'spire',
    name: 'The Hollow Spire',
    kind: 'Main',
    objectives: [
      { text: 'Recover Void Cores', done: 7, total: 12 },
      { text: 'Defeat Warden Ix', done: 0, total: 1 },
      { text: 'Seal the rift', done: 0, total: 1 },
    ],
  },
  {
    id: 'ashes',
    name: 'Ashes to Ashes',
    kind: 'Side',
    objectives: [{ text: 'Burn the wreckage', done: 3, total: 5 }],
  },
  {
    id: 'survey',
    name: 'Field Survey',
    kind: 'Bounty',
    objectives: [{ text: 'Scan anomalies', done: 9, total: 9 }],
  },
];

export const boss = {
  name: 'WARDEN IX',
  epithet: 'THE UNMAKER',
  tier: 3,
};

export const BOSS_POOL = 84_000;

/** Written out rather than `toLocaleString`: that is an Intl call, and not every engine carries one. */
export const grouped = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/** Blips on the minimap, as a percentage of its box. */
export const blips = [
  { id: 'a', x: 66, y: 30, tint: 'bg-rose-400', delay: '0s' },
  { id: 'b', x: 74, y: 44, tint: 'bg-rose-400', delay: '0.4s' },
  { id: 'c', x: 33, y: 62, tint: 'bg-amber-300', delay: '0.8s' },
  { id: 'd', x: 24, y: 37, tint: 'bg-emerald-400', delay: '1.2s' },
  { id: 'e', x: 58, y: 70, tint: 'bg-sky-400', delay: '1.6s' },
];

export const ambientLog = [
  'Warden Ix shudders. Plating peels away.',
  'You resist Gravewind.',
  'Rift shard fractures for 612.',
  'Mending ticks for 284.',
  'Warden Ix casts Null Sweep.',
  'You dodge Null Sweep.',
  'A Hollow Acolyte joins the fight.',
  'Emberdust x2 added to inventory.',
  'Warden Ix is Chilled.',
  'Your Ward absorbs 1,180.',
];
