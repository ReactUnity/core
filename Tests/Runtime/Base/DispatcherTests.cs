using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Scheduling;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [TestFixture]
    public class DispatcherTests
    {
        [UnityTest]
        public IEnumerator RuntimeDispatcher_OnEveryUpdate_RunsOnEachUpdate()
        {
            var dispatcher = RuntimeDispatcher.Create(null);

            var value = 0;

            var handle = dispatcher.OnEveryUpdate(() => value++);

            yield return null;
            Assert.AreEqual(1, value);

            yield return null;
            Assert.AreEqual(2, value);

            dispatcher.StopDeferred(handle);

            yield return null;
            yield return null;
            yield return null;
            Assert.AreEqual(2, value, "Deferred failed to stop");
        }


        [UnityTest]
        public IEnumerator RuntimeDispatcher_OnEveryUpdate_StopDoesNotFailUnderLoad()
        {
            var dispatcher = RuntimeDispatcher.Create(null);

            var value = 0;

            var othersToStop = new List<int>();


            void stopRandom()
            {
                for (int i = 0; i < 100; i++)
                    dispatcher.StopDeferred(othersToStop[Mathf.FloorToInt(Random.value * (othersToStop.Count - 2))]);
            }

            for (int i = 0; i < 2400; i++)
                othersToStop.Add(dispatcher.OnEveryUpdate(() => { }));

            stopRandom();

            var handle = dispatcher.OnEveryUpdate(() => value++);

            for (int i = 0; i < 3000; i++)
                othersToStop.Add(dispatcher.OnEveryUpdate(() => { }));

            yield return null;
            Assert.AreEqual(1, value);
            stopRandom();

            yield return null;
            Assert.AreEqual(2, value);

            stopRandom();

            yield return null;
            Assert.AreEqual(3, value);

            stopRandom();
            dispatcher.StopDeferred(handle);
            stopRandom();

            yield return null;
            stopRandom();

            yield return null;
            stopRandom();

            yield return null;
            Assert.AreEqual(3, value, "Deferred failed to stop");
        }


        [UnityTest]
        public IEnumerator RuntimeDispatcher_CanStopDeferredAsResultOfAnotherDeferred()
        {
            var dispatcher = RuntimeDispatcher.Create(null);

            int handle = 0;
            handle = dispatcher.OnceUpdate(() => {
                handle = dispatcher.OnceUpdate(() => {
                    handle = dispatcher.OnceUpdate(() => {
                        dispatcher.StopDeferred(handle);
                    });
                });
            });

            yield return null;
            Assert.True(true);
        }
    }
}
