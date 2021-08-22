export { };

const gl = global as any;

switch (gl.location.hash) {
  case '#uitoolkit':
    import('./uitoolkit');
    break;

  case '#material':
    import('./material');
    break;

  case '#ugui':
  default:
    import('./showcase');
    break;
}
