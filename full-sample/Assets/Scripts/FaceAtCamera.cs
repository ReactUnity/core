using UnityEngine;

public class FaceAtCamera : MonoBehaviour
{
    public Canvas menuCanvas;
    public Camera playerCamera;

    void Update()
    {
        menuCanvas.transform.LookAt(playerCamera.transform);
    }
}
