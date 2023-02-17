using System;

namespace ReactUnity.Scripting.DomProxies
{
    public class Location : URL
    {
        public event Action OnReload;

        public Location(string href) : base(href)
        {
        }

        public Location(ReactContext ctx) : this(ctx.Source.GetResolvedSourceUrl())
        {
            OnReload += () => {
                ctx.Dispatcher.OnceUpdate(ctx.OnRestart);
            };
        }

        public void reload()
        {
            OnReload?.Invoke();
        }

        public void assign(string href)
        {
            SetHref(href);
        }
    }
}
