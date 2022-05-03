using System.Collections.Generic;
using ReactUnity.Types;

namespace ReactUnity.Styling.Converters
{
    public class UrlConverter : StyleConverterBase
    {
        private static HashSet<string> DefaultAllowedFunctions = new HashSet<string> { "url", "resource" };
        protected override HashSet<string> AllowedFunctions => DefaultAllowedFunctions;

        protected override System.Type TargetType => typeof(Url);
    }
}
