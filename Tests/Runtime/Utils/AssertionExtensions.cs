using System.Collections.Generic;
using NUnit.Framework;

namespace ReactUnity.Tests
{
    public static class AssertionExtensions
    {
        public static void AssertListExhaustive<T>(this List<T> list, params T[] expectedItems)
        {
            Assert.AreEqual(expectedItems, list);
            list.Clear();
        }
    }
}
