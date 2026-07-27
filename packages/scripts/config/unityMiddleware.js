function registerUnityMiddleware(app) {
  // Allow serving Unity builds.
  //
  // The patterns are regular expressions rather than the `'*.unityweb'` globs they used to
  // be. Express 5 -- which webpack-dev-server 6 depends on -- routes through path-to-regexp
  // 8, and that rejects a bare `*`: it wants a named wildcard (`/*splat`), and there is no
  // spelling of "any path ending in .unityweb" in that syntax. A RegExp route says it
  // directly and works on Express 4 and 5 alike.
  //
  // Worth knowing if this regresses: the throw surfaces as `react-unity-scripts start`
  // printing "Starting the development server..." and then hanging with nothing listening,
  // because the rejection lands in webpack-dev-server's startCallback.
  function contentEncodingShorthand(pattern, encoding) {
    app.get(pattern, (req, res, next) => {
      res.set('Content-Encoding', encoding);
      next();
    });
  }

  function contentTypeShorthand(pattern, type) {
    app.get(pattern, (req, res, next) => {
      res.set('Content-Type', type);
      next();
    });
  }

  contentEncodingShorthand(/\.unityweb$/, 'gzip');
  contentEncodingShorthand(/\.gz$/, 'gzip');
  contentEncodingShorthand(/\.br$/, 'br');
  contentTypeShorthand(/\.js\.gz$/, 'application/javascript');
  contentTypeShorthand(/\.js\.br$/, 'application/javascript');
  contentTypeShorthand(/\.wasm$/, 'application/wasm');
  contentTypeShorthand(/\.wasm\.gz$/, 'application/wasm');
  contentTypeShorthand(/\.wasm\.br$/, 'application/wasm');
}

module.exports = {
  registerUnityMiddleware,
};
