using ReactUnity.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class Vector3Function : ICssFunction
    {
        public string Name { get; } = "vector3";

        public object Call(string name, string[] args, string argsCombined)
        {
            var x = args.Length > 0 ? AllConverters.FloatConverter.Parse(args[0]) : null;
            var y = args.Length > 1 ? AllConverters.FloatConverter.Parse(args[1]) : null;
            var z = args.Length > 2 ? AllConverters.FloatConverter.Parse(args[2]) : null;

            if (x is float xf)
            {
                if (y is float yf)
                {
                    if (z is float zf) return new Vector3(xf, yf, zf);
                    return new Vector3(xf, yf, 0);
                }
                return null;
            }
            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 2 || count == 3;
    }
}
