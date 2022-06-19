export { };

declare global {

  const UTF8ToString: (ptr: number, maxBytesToRead?: number) => string;
  const stringToUTF8: (str: string, outPtr: number, maxBytesToRead?: number) => void;

  const Pointer_stringify: (val: any) => string;
  const lengthBytesUTF8: (val: any) => number;

  const dynCall: <T = void>(
    signature: T extends void ? string : string,
    ptr: number | Pointer<any>,
    args: T extends void ? (number | Pointer<any>)[] : Parameters<T>
  ) => void;
  const Runtime: any;
  const LibraryManager: any;
  const autoAddDeps: any;
  const mergeInto: any;



  function print(str: string): void;
  function printErr(str: string): void;
  const arguments: string[];
  const environment: Emscripten.EnvironmentType;
  const preInit: Array<{ (): void }>;
  const preRun: Array<{ (): void }>;
  const postRun: Array<{ (): void }>;
  const onAbort: { (what: any): void };
  const onRuntimeInitialized: { (): void };
  const preinitializedWebGLContext: WebGLRenderingContext;
  const noInitialRun: boolean;
  const noExitRuntime: boolean;
  const logReadFiles: boolean;
  const filePackagePrefixURL: string;
  const wasmBinary: ArrayBuffer;

  function destroy(object: object): void;
  function getPreloadedPackage(remotePackageName: string, remotePackageSize: number): ArrayBuffer;
  function instantiateWasm(
    imports: Emscripten.WebAssemblyImports,
    successCallback: (module: WebAssembly.Module) => void,
  ): Emscripten.WebAssemblyExports;
  function locateFile(url: string, scriptDirectory: string): string;
  function onCustomMessage(event: MessageEvent): void;

  // USE_TYPED_ARRAYS == 1
  const HEAP: Int32Array;
  const IHEAP: Int32Array;
  const FHEAP: Float64Array;

  // USE_TYPED_ARRAYS == 2
  const HEAP8: Int8Array;
  const HEAP16: Int16Array;
  const HEAP32: Int32Array;
  const HEAPU8: Uint8Array;
  const HEAPU16: Uint16Array;
  const HEAPU32: Uint32Array;
  const HEAPF32: Float32Array;
  const HEAPF64: Float64Array;

  const TOTAL_STACK: number;
  const TOTAL_MEMORY: number;
  const FAST_MEMORY: number;

  function addOnPreRun(cb: () => any): void;
  function addOnInit(cb: () => any): void;
  function addOnPreMain(cb: () => any): void;
  function addOnExit(cb: () => any): void;
  function addOnPostRun(cb: () => any): void;

  const preloadedImages: any;
  const preloadedAudios: any;

  function _malloc(size: number): number;
  function _memcpy(target: number, src: number, size: number): void;
  function _free(ptr: number): void;
}
