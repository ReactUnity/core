using System.Collections;
using UnityEngine;
using UnityEngine.XR;
using UnityEngine.XR.Management;

public class VREnabler : MonoBehaviour
{
    public string deviceName = "Oculus";

    IEnumerator LoadDevice(string newDevice, bool enable)
    {
        XRSettings.LoadDeviceByName(newDevice);
        yield return null;
        XRGeneralSettings.Instance.Manager.InitializeLoaderSync();
        XRGeneralSettings.Instance.Manager.StartSubsystems();
    }

    void EnableVR()
    {
        StartXR();
    }

    void DisableVR()
    {
        StopXR();
    }

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
