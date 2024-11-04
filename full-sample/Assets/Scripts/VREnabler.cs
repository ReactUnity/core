using System.Collections;
using UnityEngine;
using UnityEngine.XR.Management;

public class VREnabler : MonoBehaviour
{
    public string deviceName = "Oculus";

    Coroutine StartXR()
    {
        return StartCoroutine(startVRRoutine());
        IEnumerator startVRRoutine()
        {
            // Add error handlers for both Instance and Manager
            var xrManager = XRGeneralSettings.Instance.Manager;
            if (!xrManager.isInitializationComplete)
                yield return xrManager.InitializeLoader();
            if (xrManager.activeLoader != null)
                xrManager.StartSubsystems();
            // Add else with error handling
        }
    }
    void StopXR()
    {
        var xrManager = XRGeneralSettings.Instance.Manager;
        if (!xrManager.isInitializationComplete)
            return; // Safety check
        xrManager.StopSubsystems();
        xrManager.DeinitializeLoader();
    }

    private void Start()
    {
        StartXR();
    }

    private void OnDestroy()
    {
        StopXR();
    }
}
