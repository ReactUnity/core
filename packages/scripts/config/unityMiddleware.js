function registerUnityMiddleware(app) {
  // Allow serving Unity builds
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

  contentEncodingShorthand('*.unityweb', 'gzip');
  contentEncodingShorthand('*.gz', 'gzip');
  contentEncodingShorthand('*.br', 'br');
  contentTypeShorthand('*.js.gz', 'application/javascript');
  contentTypeShorthand('*.js.br', 'application/javascript');
  contentTypeShorthand('*.wasm', 'application/wasm');
  contentTypeShorthand('*.wasm.gz', 'application/wasm');
  contentTypeShorthand('*.wasm.br', 'application/wasm');
}

module.exports = {
  registerUnityMiddleware,
};
