export type Namespace = any;

declare global {
  const importNamespace: (namespace: string) => Namespace;
  const System: Namespace;
}
