using ReactUnity;
using ReactUnity.Components;
using UnityEngine;

public class CustomButtonComponent : ButtonComponent
{
    public CustomButtonComponent(UGUIContext context, Color backgroundColor) : base(context)
    {
        Style["backgroundColor"] = backgroundColor;
    }
}
