#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if REACT_JINT
using System;
using Jint;
using Jint.Runtime.Modules;
using UnityEngine.Networking;

namespace ReactUnity.Scripting
{
    /// Resolves import specifiers against the importing module and fetches each one over the
    /// network, the way a browser does.
    ///
    /// Jint's own loader reads a local file system, which a dev server cannot use: the graph is
    /// discovered one hop at a time, and every hop has to arrive before anything evaluates. A
    /// blocking fetch is not an option either - the requests need the frames the import would be
    /// holding. `IAsyncModuleLoader` is the hook for exactly that: the load is handed a completion
    /// to settle whenever the response comes back, and the engine keeps the graph pending until
    /// every module in it has settled.
    public class JintModuleLoader : ModuleLoader, IAsyncModuleLoader
    {
        readonly ReactContext context;

        public JintModuleLoader(ReactContext context)
        {
            this.context = context;
        }

        /// The name `Engine.Modules.Add` has to register a module under. Jint looks a registered
        /// module up by the key `Resolve` returned for it, so the two have to be the same string -
        /// and `http://host` and `http://host/` are one url but not one string.
        public string Canonicalize(string specifier) =>
            Resolve(null, new ModuleRequest(specifier, Array.Empty<ModuleImportAttribute>())).Key;

        public override ResolvedSpecifier Resolve(string referencingModuleLocation, ModuleRequest moduleRequest)
        {
            var specifier = moduleRequest.Specifier;
            var url = string.IsNullOrEmpty(specifier) ? null : ResolveUrl(referencingModuleLocation, specifier);

            // A specifier that resolves to nothing is still handed back rather than reported as an
            // error, so the failure names the url and arrives through the same path as a 404.
            if (url == null) return new ResolvedSpecifier(moduleRequest, specifier, null, SpecifierType.Bare);

            // The Uri is deliberately left out: Jint reduces one to its LocalPath for the module's
            // location, which drops the origin - and then every relative import inside that module
            // resolves against a bare path, and import.meta.url reports one.
            return new ResolvedSpecifier(moduleRequest, url.AbsoluteUri, null, SpecifierType.RelativeOrAbsolute);
        }

        Uri ResolveUrl(string referrer, string specifier)
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

        public void LoadModuleAsync(Engine engine, ResolvedSpecifier resolved, ModuleLoadCompletion completion)
        {
            if (resolved.Type == SpecifierType.Bare)
            {
                completion.SetError($"Could not resolve module '{resolved.Key}'");
                return;
            }

            var url = resolved.Key;

            context.Dispatcher.StartDeferred(ScriptSource.WatchWebRequest(
                UnityWebRequest.Get(url),
                code => completion.SetSource(code),
                error => completion.SetError($"Failed to load module '{url}': {error}")));
        }

        /// Unreachable while this is registered as the async loader, and there is nothing sensible
        /// to do here anyway - a blocking fetch would deadlock against the dispatcher.
        protected override string LoadModuleContents(Engine engine, ResolvedSpecifier resolved) =>
            throw new NotSupportedException($"Module '{resolved.Key}' cannot be loaded synchronously");
    }
}
#endif
