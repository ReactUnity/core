
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class Vector3Function : ICssFunction
    {
        public string Name { get; } = "vector3";

        public object Call(string name, string[] args, string argsCombined)
        {
            if (ComputedList.Create(out var result, args.OfType<object>().ToList(), AllConverters.FloatConverter,
                (resolved) => {
                    if (resolved.Count > 1 && resolved[0] is float xf && resolved[1] is float yf)
                    {
                        if (resolved.Count > 2 && resolved[2] is float zf)
                        {
                            return new Vector3(xf, yf, zf);
                        }

                        return new Vector3(xf, yf, 0);
                    }

                    return null;
                })) return result;
            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 2 || count == 3;
    }
}
