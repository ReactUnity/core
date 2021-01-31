export { };

declare global {
  class ColorNative {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;

    static get cyan(): ColorNative;
    static get clear(): ColorNative;
    static get grey(): ColorNative;
    static get gray(): ColorNative;
    static get magenta(): ColorNative;
    static get red(): ColorNative;
    static get yellow(): ColorNative;
    static get black(): ColorNative;
    static get white(): ColorNative;
    static get green(): ColorNative;
    static get blue(): ColorNative;
  }
}
