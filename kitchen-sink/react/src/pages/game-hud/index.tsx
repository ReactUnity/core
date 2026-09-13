import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ambientLog, BOSS_POOL, grouped, type Item, inventory, type Skill, skills } from './data';
import { ActionBar, BossBar, BuffBar, CombatLog, type Floater, Floaters, Frame, type LogLine, Meter, Minimap, Orb, Portrait } from './hud';
import styles from './index.module.scss';
import { Panel, type TabId, Tooltip } from './panel';

/** What the page is showing off, listed under the screen the way the other pages list theirs. */
const shown = [
  ['Layered gradients', 'The sky is four gradients on one element; every star is a radial gradient whose first stop ends at 0.4%.'],
  ['perspective', 'The floor is a flat pair of repeating gradients tilted by its parent, and the pulse travels in the tilted plane.'],
  ['conic-gradient', 'Shaped three ways: the XP ring masked to an annulus, the radar clipped to a circle, the armed ring to a rim.'],
  ['clip-path', 'The hexagon portrait, the round orbs, the minimap dial, and the rounded slot the cooldown wipe runs inside.'],
  ['mix-blend-mode', 'The scanlines blend with the scene rather than sitting on top of it, inside an isolation: isolate screen.'],
  ['background-blend-mode', "The boss bar's colour ramp is lit through a second gradient instead of being stacked under it."],
  ['backdrop-filter', 'Two panels frost what is behind them. Each one costs a camera render, which is why only two do.'],
  ['@starting-style', 'Log lines, the tooltip and the toast have a style for the frame they appear on, so they can transition in.'],
  ['Animation events', 'A cooldown is an animated height; the slot clears itself from onAnimationEnd rather than running a timer.'],
  ['background-clip: text', 'The watermark in the corner paints its gradient through the glyphs, over a dark stroke.'],
];

export function GameHudPage() {
  const [hp, setHp] = useState(0.82);
  const [mp, setMp] = useState(0.64);
  const [ward, setWard] = useState(0.35);
  const [xp, setXp] = useState(0.62);
  const [bossHp, setBossHp] = useState(0.74);

  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const [flashes, setFlashes] = useState<Record<string, number>>({});
  const [floaters, setFloaters] = useState<Floater[]>([]);
  const [lines, setLines] = useState<LogLine[]>([]);
  const [hurt, setHurt] = useState(0);
  const [toast, setToast] = useState<{ id: number; text: string; tint: string }>(null);

  const [tab, setTab] = useState<TabId>('gear');
  const [selected, setSelected] = useState<Item>(inventory[0]);
  const [hovered, setHovered] = useState<Item>(null);

  const nextId = useRef(1);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const handle = setTimeout(() => {
      timers.current.delete(handle);
      fn();
    }, ms);

    timers.current.add(handle);
  }, []);

  const pushLog = useCallback((text: string, tint = 'text-slate-400') => {
    setLines((prev) => [{ id: nextId.current++, text, tint }, ...prev].slice(0, 7));
  }, []);

  const spawn = useCallback(
    (text: string, tint: string, crit?: boolean) => {
      const id = nextId.current++;

      // Between the left panel and the right one, so a number never rises through either, and
      // spread wide enough that two hits in the same second rarely land on top of each other.
      setFloaters((prev) => [...prev, { id, text, tint, crit, x: 26 + Math.random() * 44 }]);
      after(1500, () => setFloaters((prev) => prev.filter((f) => f.id !== id)));
    },
    [after],
  );

  const notify = useCallback(
    (text: string, tint = 'text-cyan-200') => {
      const id = nextId.current++;

      setToast({ id, text, tint });
      after(1900, () => setToast((current) => (current?.id === id ? null : current)));
    },
    [after],
  );

  const cast = useCallback(
    (skill: Skill) => {
      if (cooldowns[skill.id]) return notify(`${skill.name} is not ready`, 'text-slate-300');
      if (mp * 100 < skill.cost) return notify('Not enough flux', 'text-sky-300');

      const nonce = nextId.current++;
      setCooldowns((prev) => ({ ...prev, [skill.id]: nonce }));
      setFlashes((prev) => ({ ...prev, [skill.id]: nonce }));
      setMp((x) => Math.max(0, x - skill.cost / 100));

      if (skill.damage) {
        const crit = Math.random() < 0.28;
        const rolled = skill.damage[0] + Math.random() * (skill.damage[1] - skill.damage[0]);
        const damage = Math.round(crit ? rolled * 2.4 : rolled);

        spawn(crit ? `${grouped(damage)}!` : grouped(damage), crit ? 'text-amber-300' : 'text-rose-200', crit);
        pushLog(
          `${skill.name} hits Warden Ix for ${grouped(damage)}${crit ? ' (critical)' : ''}.`,
          crit ? 'text-amber-300' : 'text-slate-300',
        );
        setXp((x) => Math.min(1, x + 0.012));

        const remaining = bossHp - damage / BOSS_POOL;

        if (remaining <= 0) {
          setBossHp(1);
          notify('WARDEN IX ENRAGES — PHASE II', 'text-rose-300');
          pushLog('Warden Ix sheds its plating.', 'text-rose-300');
        } else {
          setBossHp(remaining);
        }
      }

      if (skill.heal) {
        setHp((x) => Math.min(1, x + skill.heal / 12_000));
        spawn(`+${grouped(skill.heal)}`, 'text-emerald-300');
        pushLog(`Mendfield restores ${grouped(skill.heal)}.`, 'text-emerald-300');
      }

      if (skill.id === 'bulwark') {
        setWard(1);
        notify('Ward at full', 'text-cyan-200');
        pushLog('Bulwark raises a full ward.', 'text-cyan-300');
      }
    },
    [bossHp, cooldowns, mp, notify, pushLog, spawn],
  );

  const strike = useCallback(() => {
    const damage = 600 + Math.round(Math.random() * 900);
    const absorbed = Math.min(ward, damage / 6000);

    setHurt(nextId.current++);
    setWard((x) => Math.max(0, x - absorbed));
    spawn(`-${grouped(damage)}`, 'text-rose-400');
    pushLog(`Warden Ix strikes you for ${grouped(damage)}.`, 'text-rose-300');

    const remaining = hp - damage / 12_000 + absorbed;

    if (remaining <= 0.02) {
      setHp(1);
      setWard(0.35);
      notify('You have fallen. Respawning…', 'text-rose-300');
    } else {
      setHp(remaining);
    }
  }, [hp, ward, notify, pushLog, spawn]);

  // Flux and ward come back on their own, and the fight keeps talking while nobody presses anything.
  useEffect(() => {
    const handle = setInterval(() => {
      setMp((x) => Math.min(1, x + 0.05));
      setWard((x) => Math.min(1, x + 0.04));
      pushLog(ambientLog[Math.floor(Math.random() * ambientLog.length)]);
    }, 2600);

    return () => clearInterval(handle);
  }, [pushLog]);

  const endCooldown = useCallback((id: string) => {
    setCooldowns(({ [id]: _done, ...rest }) => rest);
  }, []);

  const endFlash = useCallback((id: string) => {
    setFlashes(({ [id]: _done, ...rest }) => rest);
  }, []);

  return (
    <view>
      <h1>Game HUD</h1>

      <text className={'mb-4 text-slate-600'}>
        A mock ARPG heads-up display, drawn entirely by ReactUnity: no sprites, no atlas, no shader of its own. Every panel edge, orb, ring
        and sweep below is CSS. Drive it with the action bar or the buttons under the screen.
      </text>

      <view className={styles.screen}>
        {/* The scene, back to front. None of it takes a click. */}
        <view className={'absolute inset-0'} style={{ pointerEvents: 'none' }}>
          <view className={styles.sky} />
          <view className={styles.stars} />

          <view className={styles.horizon}>
            <view className={styles.floor}>
              <view className={styles.floorPulse} />
            </view>
          </view>

          <view className={styles.vignette} />
          <view className={styles.scanlines} />
          {!!hurt && <view key={hurt} className={styles.hurt} />}
        </view>

        <Portrait hp={hp} mp={mp} xp={xp} shield={ward} />
        <BuffBar />
        <BossBar hp={bossHp} />
        <Minimap />

        <Panel tab={tab} onTab={setTab} selected={selected} onSelect={setSelected} onHover={setHovered} />
        <Tooltip item={hovered} />

        <Floaters items={floaters} />
        <CombatLog lines={lines} />

        {!!toast && (
          <view
            key={toast.id}
            className={clsx(
              styles.toast,
              'absolute top-[96px] left-1/2 -translate-x-1/2 rounded-md bg-slate-950/85 px-4 py-2 ring-1 ring-cyan-400/50',
            )}
          >
            <text className={clsx('font-mono text-[11px] tracking-widest', toast.tint)}>{toast.text}</text>
          </view>
        )}

        <view className={'absolute bottom-4 left-1/2 flex-row -translate-x-1/2 items-end gap-4'}>
          <Orb value={hp} fill={'bg-rose-600'} wave={'bg-rose-400'} tint={'text-rose-50'} />

          <Frame glass>
            <view className={'gap-1.5 p-2'}>
              <ActionBar cooldowns={cooldowns} flashes={flashes} onCast={cast} onCooldownEnd={endCooldown} onFlashEnd={endFlash} />

              <view className={'flex-row items-center gap-2'}>
                <text className={'font-mono text-[9px] tracking-widest text-slate-500'}>XP</text>
                <Meter className={'flex-1'} value={xp} fill={'bg-fuchsia-400'} ghost={'bg-fuchsia-200/50'} />
                <text className={'font-mono text-[9px] text-fuchsia-300'}>{`${(xp * 100).toFixed(1)}%`}</text>
              </view>
            </view>
          </Frame>

          <Orb value={mp} fill={'bg-sky-600'} wave={'bg-sky-400'} tint={'text-sky-50'} />
        </view>

        <text className={clsx(styles.title, 'absolute right-4 bottom-[104px] text-xl font-bold')}>AETHERFALL</text>
      </view>

      <view className={'mt-4 flex-row flex-wrap gap-2'}>
        <button className={'flex-row gap-2 bg-rose-600 text-white transition-colors hover:bg-rose-500'} onClick={strike}>
          <icon.dangerous className={'text-lg'} />
          Take a hit
        </button>

        <button
          className={'flex-row gap-2 bg-emerald-600 text-white transition-colors hover:bg-emerald-500'}
          onClick={() => cast(skills[4])}
        >
          <icon.healing className={'text-lg'} />
          Mendfield
        </button>

        <button
          className={'flex-row gap-2 bg-amber-500 text-slate-900 transition-colors hover:bg-amber-400'}
          onClick={() => cast(skills[7])}
        >
          <icon.whatshot className={'text-lg'} />
          Overdrive
        </button>

        <button
          className={'flex-row gap-2 bg-indigo-600 text-white transition-colors hover:bg-indigo-500'}
          onClick={() => {
            setXp((x) => (x + 0.18) % 1);
            notify('Attunement raised', 'text-fuchsia-200');
          }}
        >
          <icon.trending_up className={'text-lg'} />
          Gain XP
        </button>

        <button
          className={'flex-row gap-2 bg-slate-700 text-white transition-colors hover:bg-slate-600'}
          onClick={() => {
            setHp(1);
            setMp(1);
            setWard(1);
            setBossHp(1);
            setCooldowns({});
            notify('Encounter reset');
          }}
        >
          <icon.replay className={'text-lg'} />
          Reset
        </button>
      </view>

      <section>
        <h2>What is on show</h2>

        <view className={'gap-2'}>
          {shown.map(([name, note]) => (
            <view key={name} className={'flex-row items-baseline gap-3 rounded-lg bg-white p-3 ring-1 ring-slate-200'}>
              <text className={'w-52 shrink-0 font-mono text-[12px] text-indigo-600'}>{name}</text>
              <text className={'flex-1 text-[13px] text-slate-600'}>{note}</text>
            </view>
          ))}
        </view>
      </section>
    </view>
  );
}

export default GameHudPage;
