using ReactUnity;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CustomComponentInitializer : MonoBehaviour
{
    public ReactUnity.ReactUnity reactUnity;
    public Color customButtonColor;

    void Start()
    {
        ReactUnityAPI.ComponentCreators["button"] = (type, text, context) => new CustomButtonComponent(context, Color.red);
        ReactUnityAPI.ComponentCreators["customButton"] = (type, text, context) => new CustomButtonComponent(context, customButtonColor);

        reactUnity.enabled = true;
    }
}
