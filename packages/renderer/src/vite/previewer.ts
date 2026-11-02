/**
 * The hosted previewer build, by the release it ships in. Each build gets its own directory on
 * reactunity.github.io and none is overwritten, so a new build is uploaded first and bumped here
 * second. `packages/scripts/config/public/index.html` loads the same build and pins it too.
 */
export const PREVIEWER_VERSION = '0.27.0';

const PREVIEWER_BASE = `https://reactunity.github.io/Unity/previewer/${PREVIEWER_VERSION}/Build/`;

/** Where the dev server serves the previewer, under Vite's `base`. */
export const PREVIEWER_PATH = 'previewer/';

/**
 * Sends a browser that opens the dev server's root to the previewer. Unity runs this page's
 * scripts too, and has `Globals`; a browser does not, and would otherwise run the app against
 * no Unity at all and fail on it.
 */
export function previewerRedirect(base: string): string {
  return `if (typeof Globals === 'undefined') location.replace(${JSON.stringify(base + PREVIEWER_PATH)});`;
}

/** The previewer page: the hosted WebGL player, loading `/index.js` from this dev server. */
export function previewerHtml(): string {
  return `<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ReactUnity Previewer</title>
  <style>
    html, body { font-size: 0; margin: 0; height: 100%; overflow: hidden; }
    #unity-canvas { height: 100%; width: 100%; background: #231F20; }
    .loader-center { position: absolute; left: 0; right: 0; top: 50%; height: 0; overflow: visible; pointer-events: none; user-select: none; }
    .loader { position: absolute; height: 50px; top: -25px; left: 50px; right: 50px; background: #c5cae9; border-radius: 10px; overflow: hidden; }
    .loader-bar { height: 100%; background: #3f51b5; width: 0; }
    #error { display: none; position: absolute; inset: 0; overflow: auto; padding: 3rem 1.5rem; background: #fff; color: #231F20; font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
    #error > div { max-width: 40rem; margin: 0 auto; }
    #error h1 { font-size: 1.5rem; margin: 0 0 1rem; }
    #error code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #f1f1f4; padding: .1em .3em; border-radius: 3px; }
  </style>
</head>
<body>
  <canvas id="unity-canvas"></canvas>
  <div class="loader-center" id="loader-root"><div class="loader"><div class="loader-bar" id="loader-bar"></div></div></div>
  <div id="error">
    <div>
      <h1>Couldn't load the previewer</h1>
      <p>
        The previewer's Unity WebGL build is hosted rather than bundled, so the first load needs
        network access. It is cached by the browser afterwards.
      </p>
      <p>
        To work offline, or to preview your own Unity scene instead, build a scene with a
        <code>ReactRendererUGUI</code> whose source is the URL <code>/index.js</code>, and put the
        output in <code>public/previewer</code>, so that <code>public/previewer/index.html</code> exists.
        The dev server serves that in place of this page.
      </p>
    </div>
  </div>
  <script>
    var base = ${JSON.stringify(PREVIEWER_BASE)};

    function fail() {
      document.getElementById('loader-root').style.display = 'none';
      document.getElementById('error').style.display = 'block';
    }

    function onProgress(progress) {
      document.getElementById('loader-bar').style.width = (progress * 100) + '%';
      document.getElementById('loader-root').style.display = progress < 1 ? 'block' : 'none';
    }

    // Unity's loader defines a global createUnityInstance, so it is appended rather than imported.
    var loader = document.createElement('script');
    loader.src = base + 'Previewer.loader.js';
    loader.onerror = fail;
    loader.onload = function () {
      if (typeof createUnityInstance !== 'function') return fail();

      createUnityInstance(document.getElementById('unity-canvas'), {
        dataUrl: base + 'Previewer.data.unityweb',
        frameworkUrl: base + 'Previewer.framework.js.unityweb',
        codeUrl: base + 'Previewer.wasm.unityweb',
        // Absolute, or it would resolve against this dev server, which has none to serve.
        streamingAssetsUrl: base + '../StreamingAssets',
        companyName: 'reactunity',
        productName: 'dev-sample',
        productVersion: ${JSON.stringify(PREVIEWER_VERSION)},
      }, onProgress).catch(fail);
    };
    document.head.appendChild(loader);
  </script>
</body>
</html>
`;
}
