import { NUnit, UnityEngine } from '../generated';

declare global {
  var Assert: NUnit.Framework.Assert;
  var Has: NUnit.Framework.Has;
  var Is: NUnit.Framework.Is;
  var Iz: NUnit.Framework.Iz;
  var Contains: NUnit.Framework.Contains;
  var Does: NUnit.Framework.Does;
  var Assume: NUnit.Framework.Assume;
  var Throws: NUnit.Framework.Throws;
  var LogAssert: UnityEngine.TestTools.LogAssert;
}
