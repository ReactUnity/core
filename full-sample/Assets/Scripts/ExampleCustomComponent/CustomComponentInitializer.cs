using ReactUnity.UGUI;
using UnityEngine;

public class CustomComponentInitializer : MonoBehaviour
{
    public ReactUnityUGUI reactUnity;
    public Color customButtonColor;

    void Start()
    {
        UGUIContext.ComponentCreators["button"] = (type, text, context) => new CustomButtonComponent(context, Color.red);
        UGUIContext.ComponentCreators["customButton"] = (type, text, context) => new CustomButtonComponent(context, customButtonColor);

        reactUnity.enabled = true;
    }
}
