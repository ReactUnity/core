import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { BOSS_POOL, blips, boss, buffs, grouped, player, type Skill, skills } from './data';
import styles from './index.module.scss';

/** A HUD panel: the slab, its hairline, and an L bracket at two opposite corners. */
export function Frame({ className, glass, children }: { className?: string; glass?: boolean; children?: ReactNode }) {
  return (
    // `relative` only when the caller has not positioned it itself. Both are `position`, and the
    // one that loses does so silently.
    <view className={clsx(styles.panel, glass && styles.glass, className ?? 'relative')}>
      {children}
      <view className={styles.bracketTop} />
      <view className={styles.bracketBottom} />
    </view>
  );
}

/**
 * The well, a lagging ghost and the fill. Both bars are told the same number; the ghost's slower,
 * delayed transition is what leaves the pale tail behind a hit.
 */
export function Meter({ value, fill, ghost, className }: { value: number; fill: string; ghost: string; className?: string }) {
  const width = `${Math.max(0, Math.min(1, value)) * 100}%`;

  return (
    <view className={clsx(styles.well, 'relative h-2.5 overflow-hidden rounded-full', className)}>
      <view className={clsx(styles.barGhost, ghost, 'absolute inset-y-0 left-0')} style={{ width }} />
      <view className={clsx(styles.barFill, fill, 'absolute inset-y-0 left-0')} style={{ width }} />
      <view className={styles.ticks} />
    </view>
  );
}

export function Portrait({ hp, mp, xp, shield }: { hp: number; mp: number; xp: number; shield: number }) {
  const sweep = `${(xp * 360).toFixed(1)}deg`;

  return (
    <Frame className={'absolute top-4 left-4 w-[272px]'} glass>
      <view className={'flex-row gap-3 p-3'}>
        <view className={'relative size-[68px] shrink-0 items-center justify-center'}>
          {/* A conic gradient for the sweep, a radial mask to make it a ring rather than a disc. */}
          <view
            className={clsx(styles.xpRing, 'absolute inset-0 rounded-full')}
            style={{
              backgroundImage: `conic-gradient(from 0deg, #22d3ee 0deg, #a5f3fc ${sweep}, rgba(148, 163, 184, 0.22) ${sweep}, rgba(148, 163, 184, 0.22) 360deg)`,
            }}
          />

          <view className={clsx(styles.hex, 'relative size-[52px] items-center justify-center bg-slate-800')}>
            <icon.person className={'text-4xl text-cyan-200'} />
            <view className={styles.sheen} />
          </view>

          <view className={'absolute -bottom-1 rounded bg-slate-950 px-1.5 ring-1 ring-cyan-400/60'}>
            <text className={'font-mono text-[11px] font-bold text-cyan-200'}>{player.level}</text>
          </view>
        </view>

        <view className={'flex-1 gap-1.5'}>
          <view className={'flex-row items-baseline gap-2'}>
            <text className={'text-sm font-bold tracking-wide text-slate-100'}>{player.name}</text>
            <text className={'font-mono text-[10px] text-cyan-400/80'}>{`⟨${player.guild}⟩`}</text>
          </view>

          <view className={'flex-row items-center gap-1'}>
            <text className={'text-[11px] text-slate-400'}>{player.title}</text>
            <text className={'text-[11px] text-slate-600'}>•</text>
            <icon.military_tech className={'text-xs text-amber-400'} />
            <text className={'font-mono text-[11px] text-amber-300'}>{player.gearScore}</text>
          </view>

          <Meter value={hp} fill={'bg-rose-500'} ghost={'bg-rose-200/70'} />
          <Meter value={mp} fill={'bg-sky-400'} ghost={'bg-sky-200/60'} />

          {/* The ward is the one meter that can be empty for minutes, so it says its own number. */}
          <view className={'flex-row items-center gap-1.5'}>
            <icon.security className={'text-sm text-cyan-300'} />
            <Meter className={'flex-1'} value={shield} fill={'bg-cyan-300'} ghost={'bg-cyan-100/50'} />
            <text className={'w-8 text-right font-mono text-[10px] text-cyan-200'}>{Math.round(shield * 2400)}</text>
          </view>
        </view>
      </view>
    </Frame>
  );
}

/** Each icon drains on its own infinite timer, so the row is alive with nothing behind it. */
export function BuffBar() {
  return (
    <view className={'absolute top-[124px] left-4 flex-row gap-1.5'}>
      {buffs.map((buff) => (
        <view
          key={buff.id}
          className={clsx(
            'relative size-9 items-center justify-center rounded-md bg-slate-950/80',
            buff.debuff ? 'ring-1 ring-rose-500/70' : 'ring-1 ring-cyan-400/50',
          )}
        >
          <buff.Icon className={clsx('text-lg', buff.tint)} />
          <view className={styles.buffDrain} style={{ animationDuration: `${buff.duration}s` }} />
          <text className={'absolute -bottom-3.5 w-full text-center font-mono text-[9px] text-slate-400'}>{`${buff.duration}s`}</text>
        </view>
      ))}
    </view>
  );
}

export function BossBar({ hp }: { hp: number }) {
  return (
    <view className={'absolute top-4 left-1/2 w-[360px] -translate-x-1/2 items-center gap-1'}>
      <view className={'flex-row items-center gap-2'}>
        {Array.from({ length: boss.tier }, (_, i) => (
          <icon.star key={i} className={'text-sm text-amber-400'} />
        ))}
        <text className={'text-base font-bold tracking-[3px] text-rose-200'}>{boss.name}</text>
        <text className={'font-mono text-[10px] tracking-widest text-rose-400/80'}>{boss.epithet}</text>
      </view>

      <view className={clsx(styles.well, 'relative h-4 w-full overflow-hidden rounded-sm')}>
        <view className={clsx(styles.barGhost, 'absolute inset-y-0 left-0 bg-rose-100/50')} style={{ width: `${hp * 100}%` }} />
        <view className={clsx(styles.bossFill, 'absolute inset-y-0 left-0')} style={{ width: `${hp * 100}%` }}>
          <view className={styles.sweep} />
        </view>
        <view className={styles.ticks} />
      </view>

      <view className={'flex-row justify-between self-stretch'}>
        <text className={'font-mono text-[10px] text-slate-400'}>{`${(hp * 100).toFixed(1)}%`}</text>
        <text className={'font-mono text-[10px] text-slate-400'}>{`${grouped(Math.round(hp * BOSS_POOL))} / ${grouped(BOSS_POOL)}`}</text>
      </view>
    </view>
  );
}

export function Minimap() {
  return (
    <view className={'absolute top-4 right-4 size-[148px] rounded-full ring-1 ring-cyan-400/40'}>
      {/* The clip is on the map, so the sweep and the blips inside it are cut to the same circle. */}
      <view className={clsx(styles.minimap, 'absolute inset-0')}>
        <view className={styles.radar} />

        {blips.map((blip) => (
          <view
            key={blip.id}
            className={clsx(styles.blip, blip.tint)}
            style={{ left: `${blip.x}%`, top: `${blip.y}%`, animationDelay: blip.delay }}
          />
        ))}
      </view>

      <view className={'absolute inset-0 items-center justify-center'}>
        <icon.navigation className={'text-base text-cyan-100'} />
      </view>

      <text className={'absolute inset-x-0 top-1 text-center font-mono text-[9px] text-cyan-300/70'}>N</text>

      {/* Inside the dial: below it is where the gear panel starts, and the name is wider than 148px. */}
      <view className={'absolute inset-x-0 bottom-2 items-center'}>
        <text className={'rounded-full bg-slate-950/85 px-2 py-0.5 font-mono text-[9px] tracking-widest text-cyan-200/90'}>
          {player.zone}
        </text>
      </view>
    </view>
  );
}

/** The liquid is a plain block; the orb's `clip-path` is what makes it a sphere's worth of it. */
export function Orb({ value, fill, wave, tint }: { value: number; fill: string; wave: string; tint: string }) {
  return (
    <view className={clsx(styles.orb, 'relative size-[76px] shrink-0 items-center justify-center')}>
      <view className={styles.orbClip}>
        <view className={clsx(styles.orbFill, fill)} style={{ height: `${Math.max(0, Math.min(1, value)) * 100}%` }}>
          <view className={clsx(styles.orbWave, wave)} />
          <view className={clsx(styles.orbWave, styles.orbWaveSlow, wave)} />
        </view>
      </view>

      <view className={styles.orbGlass} />
      <text className={clsx('relative font-mono text-sm font-bold', tint)}>{Math.round(value * 100)}</text>
    </view>
  );
}

export interface ActionBarProps {
  /** Skill id to a nonce: a new nonce remounts the cooldown block, which restarts its animation. */
  cooldowns: Record<string, number>;
  flashes: Record<string, number>;
  onCast: (skill: Skill) => void;
  onCooldownEnd: (id: string) => void;
  onFlashEnd: (id: string) => void;
}

export function ActionBar({ cooldowns, flashes, onCast, onCooldownEnd, onFlashEnd }: ActionBarProps) {
  return (
    <view className={'flex-row gap-1.5'}>
      {skills.map((skill) => {
        const cooling = cooldowns[skill.id];

        return (
          <view key={skill.id} className={'relative'}>
            {!cooling && (
              <view className={styles.armed}>
                <view className={styles.armedSpin} />
              </view>
            )}

            <button
              onClick={() => onCast(skill)}
              className={clsx(styles.slot, skill.ultimate && styles.slotUlt, 'relative size-14 rounded-[10px] p-0')}
            >
              <skill.Icon className={clsx('text-2xl', skill.ultimate ? 'text-amber-300' : 'text-cyan-200')} />

              {skill.cost > 0 && <text className={'absolute top-0.5 left-1 font-mono text-[9px] text-sky-300/90'}>{skill.cost}</text>}

              <text className={'absolute right-1 bottom-0.5 font-mono text-[10px] font-bold text-slate-400'}>{skill.hotkey}</text>

              {/* Nothing counts the seconds here: the block drains for the skill's own duration and
                  the slot clears itself when the animation reports that it ended. */}
              {!!cooling && (
                <view
                  key={cooling}
                  className={styles.cooldown}
                  style={{ animationDuration: `${skill.cooldown}s` }}
                  onAnimationEnd={() => onCooldownEnd(skill.id)}
                />
              )}

              {/* Cleared the same way the cooldown is, or every cast would leave a spent one behind. */}
              {!!flashes[skill.id] && (
                <view key={flashes[skill.id]} className={styles.slotFlash} onAnimationEnd={() => onFlashEnd(skill.id)} />
              )}
            </button>
          </view>
        );
      })}
    </view>
  );
}

export interface LogLine {
  id: number;
  text: string;
  tint: string;
}

/** Newest first, so a new line enters at the top and the mask fades the old ones out at the bottom. */
export function CombatLog({ lines }: { lines: LogLine[] }) {
  return (
    <Frame className={'absolute bottom-[150px] left-4 h-[136px] w-[280px]'}>
      <view className={'flex-row items-center gap-1.5 px-3 pt-2'}>
        <icon.forum className={'text-sm text-cyan-400'} />
        <text className={'font-mono text-[10px] tracking-widest text-cyan-300/80'}>COMBAT LOG</text>
      </view>

      <view className={clsx(styles.logMask, 'flex-1 gap-0.5 overflow-hidden px-3 pb-2')}>
        {lines.map((line) => (
          <text key={line.id} className={clsx(styles.logLine, 'shrink-0 text-[11px]', line.tint)}>
            {line.text}
          </text>
        ))}
      </view>
    </Frame>
  );
}

export interface Floater {
  id: number;
  text: string;
  tint: string;
  x: number;
  crit?: boolean;
}

export function Floaters({ items }: { items: Floater[] }) {
  return (
    <view className={'absolute inset-x-0 top-[230px] h-0'}>
      {items.map((item) => (
        <text
          key={item.id}
          className={clsx(
            styles.floater,
            item.crit && styles.floaterCrit,
            'font-mono font-bold',
            item.tint,
            item.crit ? 'text-3xl' : 'text-xl',
          )}
          style={{ left: `${item.x}%` }}
        >
          {item.text}
        </text>
      ))}
    </view>
  );
}
