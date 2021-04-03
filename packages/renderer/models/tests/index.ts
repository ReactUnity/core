import { NUnit, UnityEngine } from '../generated';

declare global {
  const Assert: NUnit.Framework.Assert;
  const Has: NUnit.Framework.Has;
  const Is: NUnit.Framework.Is;
  const Iz: NUnit.Framework.Iz;
  const Contains: NUnit.Framework.Contains;
  const Does: NUnit.Framework.Does;
  const Assume: NUnit.Framework.Assume;
  const Throws: NUnit.Framework.Throws;
  const LogAssert: UnityEngine.TestTools.LogAssert;
}
