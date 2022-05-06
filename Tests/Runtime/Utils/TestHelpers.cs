using System.Collections.Generic;
using ReactUnity.Styling;

namespace ReactUnity.Tests
{
    public static class TestHelpers
    {
        public static (InlineStyles, NodeStyle) CreateStyle()
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });
            return (collection, style);
        }
    }
}
