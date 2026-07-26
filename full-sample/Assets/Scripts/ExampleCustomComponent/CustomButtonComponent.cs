using ReactUnity.Styling;
using ReactUnity.UGUI;
using UnityEngine;

public class CustomButtonComponent : ButtonComponent
{
    public CustomButtonComponent(UGUIContext context, Color backgroundColor) : base(context)
    {
        Style[StyleProperties.backgroundColor] = backgroundColor;
    }
}
