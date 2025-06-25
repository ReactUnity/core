import { ReactUnity, UnityEngine } from '../generated';
import { View } from './components';

type PropertiesOnly<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]?: T[K];
};

export interface Particles extends View<ReactUnity.UGUI.UGUIComponent> {
  startDelay?: number;
  loop?: boolean;
  playOnAwake?: boolean;
  playbackSpeed?: number;
  enableEmission?: boolean;
  emissionRate?: number;
  startSpeed?: number;
  startSize?: number;
  startColor?: UnityEngine.Color;
  startRotation?: number;
  startRotation3D?: UnityEngine.Vector3;
  startLifetime?: number;
  gravityModifier?: number;
  maxParticles?: number;
  simulationSpace?: UnityEngine.ParticleSystemSimulationSpace;
  scalingMode?: UnityEngine.ParticleSystemScalingMode;
  automaticCullingEnabled?: boolean;
  time?: number;
  randomSeed?: number;
  useAutoRandomSeed?: boolean;

  main?: PropertiesOnly<UnityEngine.ParticleSystem_MainModule>;
  emission?: PropertiesOnly<UnityEngine.ParticleSystem_EmissionModule>;
  shape?: PropertiesOnly<UnityEngine.ParticleSystem_ShapeModule>;
  velocityOverLifetime?: PropertiesOnly<UnityEngine.ParticleSystem_VelocityOverLifetimeModule>;
  limitVelocityOverLifetime?: PropertiesOnly<UnityEngine.ParticleSystem_LimitVelocityOverLifetimeModule>;
  inheritVelocity?: PropertiesOnly<UnityEngine.ParticleSystem_InheritVelocityModule>;
  lifetimeByEmitterSpeed?: PropertiesOnly<UnityEngine.ParticleSystem_LifetimeByEmitterSpeedModule>;
  forceOverLifetime?: PropertiesOnly<UnityEngine.ParticleSystem_ForceOverLifetimeModule>;
  colorOverLifetime?: PropertiesOnly<UnityEngine.ParticleSystem_ColorOverLifetimeModule>;
  colorBySpeed?: PropertiesOnly<UnityEngine.ParticleSystem_ColorBySpeedModule>;
  sizeOverLifetime?: PropertiesOnly<UnityEngine.ParticleSystem_SizeOverLifetimeModule>;
  sizeBySpeed?: PropertiesOnly<UnityEngine.ParticleSystem_SizeBySpeedModule>;
  rotationOverLifetime?: PropertiesOnly<UnityEngine.ParticleSystem_RotationOverLifetimeModule>;
  rotationBySpeed?: PropertiesOnly<UnityEngine.ParticleSystem_RotationBySpeedModule>;
  externalForces?: PropertiesOnly<UnityEngine.ParticleSystem_ExternalForcesModule>;
  noise?: PropertiesOnly<UnityEngine.ParticleSystem_NoiseModule>;
  collision?: PropertiesOnly<UnityEngine.ParticleSystem_CollisionModule>;
  trigger?: PropertiesOnly<UnityEngine.ParticleSystem_TriggerModule>;
  subEmitters?: PropertiesOnly<UnityEngine.ParticleSystem_SubEmittersModule>;
  textureSheetAnimation?: PropertiesOnly<UnityEngine.ParticleSystem_TextureSheetAnimationModule>;
  lights?: PropertiesOnly<UnityEngine.ParticleSystem_LightsModule>;
  trails?: PropertiesOnly<UnityEngine.ParticleSystem_TrailModule>;
  customData?: PropertiesOnly<UnityEngine.ParticleSystem_CustomDataModule>;
}
