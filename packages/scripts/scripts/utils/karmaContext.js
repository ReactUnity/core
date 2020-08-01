%CLIENT_CONFIG%
window.__karma__.setupContext(window);

var mappings = %MAPPINGS%

var scripts = Object.keys(mappings).filter(function(x) {
  return !x.includes('node_modules/karma-mocha/lib/adapter.js') && !x.includes('node_modules/mocha/mocha.js')
    && !x.includes('node_modules/karma-chai/lib/adapter.js') && !x.includes('node_modules/chai/chai.js');
});
var scriptIndex = 0;

function loadScript() {
  var src = scripts[scriptIndex];
  if (!src) return null;

  scriptIndex++;
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.onload = function (script) {
      resolve();
    };
    script.src = src;
    document.head.appendChild(script);
  }).then(loadScript);
}

loadScript().then(function () {
  window.__karma__.loaded();
});
