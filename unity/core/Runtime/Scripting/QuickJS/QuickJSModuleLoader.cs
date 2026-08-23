#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS
using System;
using QuickJS.Module;
using UnityEngine.Networking;

namespace ReactUnity.Scripting
{
    /// Resolves import specifiers against the importing module and fetches each one over the
    /// network, the way a browser does.
    ///
    /// QuickJS's own loader reads a local file system, which a dev server cannot use: the graph is
    /// discovered one hop at a time and every hop has to arrive before anything evaluates. Its
    /// synchronous loader cannot wait for one either - it has to return a JSModuleDef there and
    /// then, and blocking would hold the frames the requests need. quickjs-ng's asynchronous
    /// loader is the hook for exactly that: the load is handed a completion to settle whenever the
    /// response comes back, and the engine keeps the graph pending until every module in it has
    /// settled.
    public class QuickJSModuleLoader : AsyncModuleLoader
    {
        private readonly ReactContext context;

        public QuickJSModuleLoader(ReactContext context)
        {
            this.context = context;
        }

        protected override string Resolve(string referrer, string specifier)
        {
            if (string.IsNullOrEmpty(specifier)) return null;

            // A specifier that resolves to nothing is handed back as it came rather than reported
            // as an error here, so the failure names it and arrives through the same path as a 404.
            var url = ResolveUrl(referrer, specifier);
            return url == null ? specifier : url.AbsoluteUri;
        }

        private Uri ResolveUrl(string referrer, string specifier)
        {
            // Relative to the importing module first. The source url only stands in when the
            // referrer is not one itself, which is the root of a module added from source.
            if (Uri.TryCreate(referrer, UriKind.Absolute, out var baseUri) &&
                Uri.TryCreate(baseUri, specifier, out var resolved)) return resolved;

            try
            {
                return Uri.TryCreate(context.ResolvePath(specifier), UriKind.Absolute, out var fromSource) ? fromSource : null;
            }
            catch
            {
                return null;
            }
        }

        protected override void LoadModuleAsync(string moduleName, ModuleLoadCompletion completion)
        {
            if (!Uri.IsWellFormedUriString(moduleName, UriKind.Absolute))
            {
                completion.SetError($"Could not resolve module '{moduleName}'");
                return;
            }

            context.Dispatcher.StartDeferred(ScriptSource.WatchWebRequest(
                UnityWebRequest.Get(moduleName),
                code => completion.SetSource(code),
                error => completion.SetError($"Failed to load module '{moduleName}': {error}")));
        }
    }
}
#endif
