export { };

if (global.location.hash === '#uitoolkit') {
  import('./uitoolkit');
}
else {
  import('./app');
}
