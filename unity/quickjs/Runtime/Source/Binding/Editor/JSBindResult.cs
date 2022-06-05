using System.Collections.Generic;

namespace QuickJS.Binding
{
    /// <summary>
    /// some useful information collected in the binding process
    /// </summary>
    public class JSBindResult
    {
        public string comment;

        /// <summary>
        /// a list of all js modules corresponding to exported csharp types. 
        /// (useful for configuring webpack's externals)
        /// </summary>
        public List<string> modules = new List<string>();
    }
}
