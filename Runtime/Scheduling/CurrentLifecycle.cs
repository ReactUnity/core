#if REACT_UNITY_DEVELOPER
using System.Collections;
using UnityEngine;

namespace ReactUnity.Scheduling
{
    [DefaultExecutionOrder(-1000)]
    public class CurrentLifecycle : MonoBehaviour
    {
        public string State { get; set; } = "";
        public int StateID { get; set; } = 0;

        /*
         * Awake
         * OnEnable
         * Reset
         * Start
         * FixedUpdate
         * OnStateMachineEnter
         * OnStateMachineExit
         * OnAnimatorMove
         * OnAnimatorIK
         * OnTriggerXXX
         * OnCollisionXXX
         * yield WaitForFixedUpdate
         * OnMouseXXX
         * Update
         * yield null
         * yield WaitForSeconds
         * yield WWW
         * yield StartCoroutine
         * LateUpdate
         * OnPreCull
         * OnWillRenderObject
         * OnBecameVisible
         * OnBecameInvisible
         * OnPreRender
         * OnRenderObject
         * OnPostRender
         * OnRenderImage
         * OnDrawGizmos
         * OnGUI
         * yield WaitForEndOfFrame
         * OnApplicationPause
         * OnApplicationQuit
         * OnDisable
         * OnDestroy
         */

        void Awake()
        {
            State = "Awake";
            StateID = 1;

            StartCoroutine(WaitForFixedUpdate());
            StartCoroutine(Null());
            StartCoroutine(WaitForSeconds());
            StartCoroutine(WaitForEndOfFrame());
        }

        void OnEnable()
        {
            State = "OnEnable";
            StateID = 2;
        }

        void Reset()
        {
            State = "Reset";
            StateID = 3;
        }
        void Start()
        {
            State = "Start";
            StateID = 4;
        }
        void FixedUpdate()
        {
            State = "FixedUpdate";
            StateID = 11;
        }
        void OnStateMachineEnter()
        {
            State = "OnStateMachineEnter";
            StateID = 21;
        }
        void OnStateMachineExit()
        {
            State = "OnStateMachineExit";
            StateID = 22;
        }
        void OnAnimatorMove()
        {
            State = "OnAnimatorMove";
            StateID = 23;
        }
        void OnAnimatorIK()
        {
            State = "OnAnimatorIK";
            StateID = 24;
        }


        IEnumerator WaitForFixedUpdate()
        {
            var wait = new WaitForFixedUpdate();
            while (true)
            {
                yield return wait;
                State = "yield WaitForFixedUpdate";
                StateID = 31;
            }
        }


        void Update()
        {
            State = "Update";
            StateID = 41;
            StartCoroutine(YieldStartCoroutine());
        }
        IEnumerator Null()
        {
            while (true)
            {
                yield return null;
                State = "yield null";
                StateID = 42;
            }
        }
        IEnumerator WaitForSeconds()
        {
            var wait = new WaitForSeconds(0);
            while (true)
            {
                yield return wait;
                State = "yield WaitForSeconds";
                StateID = 43;
            }
        }

        IEnumerator YieldStartCoroutine()
        {
            State = "yield StartCoroutine";
            StateID = 44;
            yield return null;
        }

        void LateUpdate()
        {
            State = "LateUpdate";
            StateID = 51;
        }
        void OnPreCull()
        {
            State = "OnPreCull";
            StateID = 61;
        }
        void OnWillRenderObject()
        {
            State = "OnWillRenderObject";
            StateID = 62;
        }
        void OnBecameVisible()
        {
            State = "OnBecameVisible";
            StateID = 63;
        }
        void OnBecameInvisible()
        {
            State = "OnBecameInvisible";
            StateID = 64;
        }
        void OnPreRender()
        {
            State = "OnPreRender";
            StateID = 65;
        }
        void OnRenderObject()
        {
            State = "OnRenderObject";
            StateID = 66;
        }
        void OnPostRender()
        {
            State = "OnPostRender";
            StateID = 67;
        }
        void OnRenderImage()
        {
            State = "OnRenderImage";
            StateID = 68;
        }
        void OnDrawGizmos()
        {
            State = "OnDrawGizmos";
            StateID = 69;
        }
        void OnGUI()
        {
            State = "OnGUI";
            StateID = 71;
        }
        IEnumerator WaitForEndOfFrame()
        {
            var wait = new WaitForEndOfFrame();
            while (true)
            {
                yield return wait;
                State = "yield WaitForEndOfFrame";
                StateID = 81;
            }
        }
        void OnApplicationPause()
        {
            State = "OnApplicationPause";
            StateID = 91;
        }
        void OnApplicationQuit()
        {
            State = "OnApplicationQuit";
            StateID = 92;
        }
        void OnDisable()
        {
            State = "OnDisable";
            StateID = 93;
        }
        void OnDestroy()
        {
            State = "OnDestroy";
            StateID = 94;
        }
    }
}
#endif
