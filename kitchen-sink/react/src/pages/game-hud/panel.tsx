import { icon } from '@reactunity/renderer';
import clsx from 'clsx';
import { type Item, inventory, quests, rarityBg, rarityRing, rarityText, skills, stats } from './data';
import { Frame } from './hud';
import styles from './index.module.scss';

const tabs = [
  { id: 'gear', label: 'GEAR', Icon: icon.backpack },
  { id: 'skills', label: 'SKILLS', Icon: icon.auto_awesome },
  { id: 'codex', label: 'CODEX', Icon: icon.auto_stories },
] as const;

export type TabId = (typeof tabs)[number]['id'];

export interface PanelProps {
  tab: TabId;
  onTab: (tab: TabId) => void;
  selected: Item;
  onSelect: (item: Item) => void;
  onHover: (item: Item) => void;
}

export function Panel({ tab, onTab, selected, onSelect, onHover }: PanelProps) {
  return (
    <Frame className={'absolute top-[172px] right-4 bottom-[126px] w-[300px]'} glass>
      <view className={'relative flex-row'}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTab(t.id)}
            className={clsx(
              'flex-1 flex-row items-center justify-center gap-1.5 rounded-none bg-transparent px-0 py-2.5 transition-colors',
              tab === t.id ? 'text-cyan-200' : 'text-slate-500 hover:text-slate-300',
            )}
          >
            <t.Icon className={'text-sm'} />
            <text className={'font-mono text-[10px] tracking-widest'}>{t.label}</text>
          </button>
        ))}

        {/* One underline that slides, rather than three that fade past each other. */}
        <view className={styles.tabInk} style={{ translate: `${tabs.findIndex((t) => t.id === tab) * 100}% 0` }} />
      </view>

      {tab === 'gear' && <Gear selected={selected} onSelect={onSelect} onHover={onHover} />}
      {tab === 'skills' && <Skills />}
      {tab === 'codex' && <Codex />}
    </Frame>
  );
}

function Gear({ selected, onSelect, onHover }: Pick<PanelProps, 'selected' | 'onSelect' | 'onHover'>) {
  return (
    <view className={'flex-1 gap-2 p-2.5'}>
      <scroll className={'h-[158px] flex-row flex-wrap content-start gap-1.5'}>
        {inventory.map((item, i) => (
          <button
            // Position in the bag is the identity here: two stacks of the same thing are two slots.
            key={item?.id ?? `empty-${i}`}
            onClick={() => item && onSelect(item)}
            onPointerEnter={() => onHover(item)}
            onPointerExit={() => onHover(null)}
            className={clsx(
              'relative size-[46px] shrink-0 rounded-md p-0',
              item ? clsx(styles.rarity, rarityRing[item.rarity]) : styles.emptySlot,
              item && selected?.id === item.id && 'ring-2 ring-cyan-300',
            )}
          >
            {!!item && (
              <>
                <item.Icon className={clsx('text-xl', rarityText[item.rarity])} />
                <view className={clsx(styles.corner, rarityBg[item.rarity])} />
                {!!item.count && (
                  <text className={'absolute bottom-0.5 left-1 font-mono text-[9px] font-bold text-slate-200'}>{item.count}</text>
                )}
              </>
            )}
          </button>
        ))}
      </scroll>

      <ItemCard item={selected} />
    </view>
  );
}

function ItemCard({ item }: { item: Item }) {
  if (!item) {
    return (
      <view className={'flex-1 items-center justify-center rounded-md bg-slate-950/50'}>
        <text className={'text-[11px] text-slate-600'}>Nothing selected</text>
      </view>
    );
  }

  return (
    <view className={'flex-1 gap-1 rounded-md bg-slate-950/55 p-2.5 ring-1 ring-slate-700/70'}>
      <view className={'flex-row items-center justify-between'}>
        <text className={clsx('text-[13px] font-bold', rarityText[item.rarity])}>{item.name}</text>
        {!!item.level && <text className={'font-mono text-[10px] text-amber-300'}>{item.level}</text>}
      </view>

      <text className={'font-mono text-[9px] tracking-widest text-slate-500'}>{item.slot.toUpperCase()}</text>

      {item.stats.map((stat) => (
        <text key={stat} className={'text-[11px] text-emerald-300'}>
          {stat}
        </text>
      ))}

      <text className={'mt-auto text-[10px] text-slate-500 italic'}>{item.flavor}</text>
    </view>
  );
}

function Skills() {
  return (
    <scroll className={'flex-1 gap-1.5 p-2.5'}>
      {skills.map((skill, i) => (
        <view key={skill.id} className={'shrink-0 flex-row items-center gap-2.5 rounded-md bg-slate-950/45 p-2'}>
          <view className={'size-8 items-center justify-center rounded bg-slate-900 ring-1 ring-cyan-500/40'}>
            <skill.Icon className={clsx('text-lg', skill.ultimate ? 'text-amber-300' : 'text-cyan-300')} />
          </view>

          <view className={'flex-1 gap-1'}>
            <view className={'flex-row items-baseline justify-between'}>
              <text className={'text-[12px] font-semibold text-slate-200'}>{skill.name}</text>
              <text className={'font-mono text-[9px] tracking-wider text-slate-500'}>{skill.school.toUpperCase()}</text>
            </view>

            {/* Rank is invented from the position in the list, which is what a mock is for. */}
            <view className={'flex-row gap-0.5'}>
              {Array.from({ length: 5 }, (_, r) => (
                <view key={r} className={clsx('h-1 flex-1 rounded-full', r <= 4 - (i % 5) ? 'bg-cyan-400' : 'bg-slate-700')} />
              ))}
            </view>
          </view>

          <text className={'w-10 text-right font-mono text-[10px] text-slate-400'}>{`${skill.cooldown}s`}</text>
        </view>
      ))}
    </scroll>
  );
}

function Codex() {
  return (
    <scroll className={'flex-1 gap-2 p-2.5'}>
      {quests.map((quest) => {
        const complete = quest.objectives.every((o) => o.done >= o.total);

        return (
          <view
            key={quest.id}
            className={clsx(
              'shrink-0 gap-1.5 rounded-md bg-slate-950/45 p-2.5 ring-1',
              complete ? 'ring-emerald-500/50' : 'ring-slate-700/70',
            )}
          >
            <view className={'flex-row items-center gap-2'}>
              {complete ? <icon.done_all className={'text-sm text-emerald-400'} /> : <icon.flag className={'text-sm text-amber-400'} />}
              <text className={'flex-1 text-[12px] font-semibold text-slate-100'}>{quest.name}</text>
              <text className={'font-mono text-[9px] tracking-widest text-slate-500'}>{quest.kind.toUpperCase()}</text>
            </view>

            {quest.objectives.map((objective) => (
              <view key={objective.text} className={'gap-1'}>
                <view className={'flex-row items-center justify-between'}>
                  <text className={clsx('text-[11px]', objective.done >= objective.total ? 'text-emerald-400' : 'text-slate-400')}>
                    {objective.text}
                  </text>
                  <text className={'font-mono text-[10px] text-slate-400'}>{`${objective.done}/${objective.total}`}</text>
                </view>

                <view className={clsx(styles.well, 'h-1 overflow-hidden rounded-full')}>
                  <view
                    className={clsx(styles.statBar, 'h-full', objective.done >= objective.total ? 'bg-emerald-400' : 'bg-amber-400')}
                    style={{ width: `${(objective.done / objective.total) * 100}%` }}
                  />
                </view>
              </view>
            ))}
          </view>
        );
      })}

      <view className={'shrink-0 gap-1.5 rounded-md bg-slate-950/45 p-2.5 ring-1 ring-slate-700/70'}>
        <text className={'font-mono text-[9px] tracking-widest text-cyan-300/80'}>ATTRIBUTES</text>

        {stats.map((stat) => (
          <view key={stat.name} className={'gap-1'}>
            <view className={'flex-row items-center justify-between'}>
              <text className={'text-[11px] text-slate-400'}>{stat.name}</text>
              <text className={'font-mono text-[10px] text-slate-200'}>{stat.value}</text>
            </view>

            <view className={clsx(styles.well, 'h-1 overflow-hidden rounded-full')}>
              <view className={clsx(styles.statBar, 'h-full', stat.tint)} style={{ width: `${(stat.value / stat.max) * 100}%` }} />
            </view>
          </view>
        ))}
      </view>
    </scroll>
  );
}

/** Anchored beside the panel rather than at the pointer: a HUD tooltip has a place it belongs. */
export function Tooltip({ item }: { item: Item }) {
  if (!item) return null;

  return (
    <Frame className={clsx(styles.tooltip, 'absolute top-[210px] right-[316px] w-[228px] gap-1 p-3')}>
      <text className={clsx('text-[13px] font-bold', rarityText[item.rarity])}>{item.name}</text>

      <view className={'flex-row items-center gap-2'}>
        <text className={'font-mono text-[9px] tracking-widest text-slate-500'}>{item.rarity.toUpperCase()}</text>
        <text className={'text-[10px] text-slate-500'}>{item.slot}</text>
      </view>

      {item.stats.map((stat) => (
        <text key={stat} className={'text-[11px] text-emerald-300'}>
          {stat}
        </text>
      ))}

      <text className={'text-[10px] text-slate-500 italic'}>{item.flavor}</text>
    </Frame>
  );
}
