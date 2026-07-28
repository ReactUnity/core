import { useState } from 'react';
import { GiFireball, GiHealing, GiLightningBow, GiShield } from 'react-icons/gi';
import styles from './index.module.scss';

interface Quest {
  id: number;
  title: string;
  progress: number;
  maxProgress: number;
}

interface Skill {
  id: number;
  name: string;
  icon: typeof GiFireball;
  color: string;
  cooldown: number;
  maxCooldown: number;
}

export const GamePage = () => {
  const [health, setHealth] = useState(85);
  const [mana, setMana] = useState(60);
  const [playerPosition, setPlayerPosition] = useState({ x: 45, y: 65 });

  const [quests] = useState<Quest[]>([
    { id: 1, title: 'Defeat 10 Goblins', progress: 7, maxProgress: 10 },
    { id: 2, title: 'Collect Magic Crystals', progress: 3, maxProgress: 5 },
    { id: 3, title: 'Find the Ancient Artifact', progress: 1, maxProgress: 1 },
  ]);

  const [skills] = useState<Skill[]>([
    { id: 1, name: 'Fireball', icon: GiFireball, color: '#ff4444', cooldown: 0, maxCooldown: 5 },
    { id: 2, name: 'Heal', icon: GiHealing, color: '#44ff44', cooldown: 2, maxCooldown: 8 },
    { id: 3, name: 'Lightning', icon: GiLightningBow, color: '#66aaff', cooldown: 1, maxCooldown: 3 },
    { id: 4, name: 'Shield', icon: GiShield, color: '#cccccc', cooldown: 0, maxCooldown: 10 },
  ]);

  return (
    <view className={styles.page}>
      {/* Health and Mana Bars */}
      <view className={styles.statusBars}>
        <view className={styles.healthContainer}>
          <text className={styles.barLabel}>Health</text>
          <view className={styles.barBackground}>
            <view className={styles.healthBar} style={{ width: `${health}%` }} />
            <text className={styles.barText}>{health}/100</text>
          </view>
        </view>

        <view className={styles.manaContainer}>
          <text className={styles.barLabel}>Mana</text>
          <view className={styles.barBackground}>
            <view className={styles.manaBar} style={{ width: `${mana}%` }} />
            <text className={styles.barText}>{mana}/100</text>
          </view>
        </view>
      </view>

      {/* Minimap */}
      <view className={styles.minimap}>
        <text className={styles.minimapTitle}>Minimap</text>
        <view className={styles.minimapArea}>
          <view className={styles.minimapGrid}>
            {/* Terrain markers */}
            <view className={`${styles.mapMarker} ${styles.forest}`} style={{ left: '20%', top: '30%' }} />
            <view className={`${styles.mapMarker} ${styles.mountain}`} style={{ left: '70%', top: '15%' }} />
            <view className={`${styles.mapMarker} ${styles.village}`} style={{ left: '40%', top: '80%' }} />

            {/* Player position */}
            <view
              className={`${styles.mapMarker} ${styles.player}`}
              style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }}
            />
          </view>
        </view>
      </view>

      {/* Skill Bar */}
      <view className={styles.skillBar}>
        {skills.map((skill, index) => {
          const IconComponent = skill.icon;
          return (
            <view key={skill.id} className={styles.skillSlot}>
              <view className={styles.skillIcon} data-skill={skill.name.toLowerCase()}>
                <IconComponent color={skill.color} size={20} />
                {skill.cooldown > 0 && (
                  <view className={styles.cooldownOverlay}>
                    <text className={styles.cooldownText}>{skill.cooldown}</text>
                  </view>
                )}
              </view>
              <text className={styles.skillKey}>{index + 1}</text>
            </view>
          );
        })}
      </view>

      {/* Quest List */}
      <view className={styles.questPanel}>
        <text className={styles.questTitle}>Quests</text>
        <view className={styles.questList}>
          {quests.map((quest) => (
            <view key={quest.id} className={styles.questItem}>
              <text className={styles.questText}>{quest.title}</text>
              <view className={styles.questProgress}>
                <view className={styles.questProgressBackground}>
                  <view className={styles.questProgressFill} style={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }} />
                </view>
                <text className={styles.questProgressText}>
                  {quest.progress}/{quest.maxProgress}
                </text>
              </view>
            </view>
          ))}
        </view>
      </view>
    </view>
  );
};
