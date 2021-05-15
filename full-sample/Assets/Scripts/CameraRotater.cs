using UnityEngine;

public class CameraRotater : MonoBehaviour
{
    void Update()
    {
        transform.Rotate(new Vector3(0, Time.deltaTime * 40, 0));
    }
}
