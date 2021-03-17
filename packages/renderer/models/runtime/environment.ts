export { };

declare global {
  interface DefaultGlobals {
    [key: string]: any;
  }

  const Globals: DefaultGlobals;
}
