using ReactUnity;
using ReactUnity.Components;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CustomButtonComponent : ButtonComponent
{
    public CustomButtonComponent(UGUIContext context, Color backgroundColor) : base(context)
    {
        Style["backgroundColor"] = backgroundColor;
    }
}
