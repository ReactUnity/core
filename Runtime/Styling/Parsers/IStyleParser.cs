using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public interface IStyleParser
    {
        object FromString(string value);
    }
}
