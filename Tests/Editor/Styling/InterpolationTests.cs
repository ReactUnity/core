using NUnit.Framework;
using ReactUnity.Animations;
using ReactUnity.Styling.Parsers;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    [TestFixture]
    public class InterpolationTests
    {
        [TestCase(1, StepsJumpMode.None, 0, 0, 0.5f, 0.5f, 1, 1)]
        [TestCase(1, StepsJumpMode.Start, 0, 0, 0.5f, 1, 1, 1)]
        [TestCase(1, StepsJumpMode.End, 0, 0, 0.5f, 0, 1, 1)]
        [TestCase(4, StepsJumpMode.End, 0, 0, 0.3f, 0.25f, 0.6f, 0.5f, 1, 1)]
        public void Steps(int steps, StepsJumpMode mode, params float[] cases)
        {
            var fn = TimingFunctions.Steps(steps, mode);

            for (int i = 0; i < cases.Length; i += 2)
            {
                var input = cases[i];
                var output = cases[i + 1];
                Assert.AreEqual(output, fn(input));
            }
        }
    }
}
