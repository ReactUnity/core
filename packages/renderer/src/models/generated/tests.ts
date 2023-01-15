//
// Types in assemblies: nunit.framework
// Generated 15/01/2023 19:33:30
//
/* eslint-disable */

import { System } from './system';

type Byte = number;

export declare namespace NUnit {
  export namespace Framework {
    export enum ActionTargets {
      Default = 0,
      Test = 1,
      Suite = 2,
    }
    export enum ParallelScope {
      None = 0,
      Self = 1,
      Children = 2,
      Fixtures = 4,
    }
    export class Assert {
      static Throws(expression: NUnit.Framework.Constraints.IResolveConstraint, code: (() => void), message: string, ...args: any[]): System.Exception;
      static Throws(expression: NUnit.Framework.Constraints.IResolveConstraint, code: (() => void)): System.Exception;
      static Throws(expectedExceptionType: System.Type, code: (() => void), message: string, ...args: any[]): System.Exception;
      static Throws(expectedExceptionType: System.Type, code: (() => void)): System.Exception;
      static Catch(code: (() => void), message: string, ...args: any[]): System.Exception;
      static Catch(code: (() => void)): System.Exception;
      static Catch(expectedExceptionType: System.Type, code: (() => void), message: string, ...args: any[]): System.Exception;
      static Catch(expectedExceptionType: System.Type, code: (() => void)): System.Exception;
      static DoesNotThrow(code: (() => void), message: string, ...args: any[]): void;
      static DoesNotThrow(code: (() => void)): void;
      static AreEqual(expected: number, actual: number, delta: number, message: string, ...args: any[]): void;
      static AreEqual(expected: number, actual: number, delta: number): void;
      static AreEqual(expected: number, actual: number | undefined, delta: number, message: string, ...args: any[]): void;
      static AreEqual(expected: number, actual: number | undefined, delta: number): void;
      static AreEqual(expected: any, actual: any, message: string, ...args: any[]): void;
      static AreEqual(expected: any, actual: any): void;
      static AreNotEqual(expected: any, actual: any, message: string, ...args: any[]): void;
      static AreNotEqual(expected: any, actual: any): void;
      static AreSame(expected: any, actual: any, message: string, ...args: any[]): void;
      static AreSame(expected: any, actual: any): void;
      static AreNotSame(expected: any, actual: any, message: string, ...args: any[]): void;
      static AreNotSame(expected: any, actual: any): void;
      static IsAssignableFrom(expected: System.Type, actual: any, message: string, ...args: any[]): void;
      static IsAssignableFrom(expected: System.Type, actual: any): void;
      static IsNotAssignableFrom(expected: System.Type, actual: any, message: string, ...args: any[]): void;
      static IsNotAssignableFrom(expected: System.Type, actual: any): void;
      static IsInstanceOf(expected: System.Type, actual: any, message: string, ...args: any[]): void;
      static IsInstanceOf(expected: System.Type, actual: any): void;
      static IsNotInstanceOf(expected: System.Type, actual: any, message: string, ...args: any[]): void;
      static IsNotInstanceOf(expected: System.Type, actual: any): void;
      static That(condition: boolean, message: string, ...args: any[]): void;
      static That(condition: boolean): void;
      static That(condition: boolean, getExceptionMessage: (() => string)): void;
      static That(condition: (() => boolean), message: string, ...args: any[]): void;
      static That(condition: (() => boolean)): void;
      static That(condition: (() => boolean), getExceptionMessage: (() => string)): void;
      static That(code: (() => void), constraint: NUnit.Framework.Constraints.IResolveConstraint): void;
      static That(code: (() => void), constraint: NUnit.Framework.Constraints.IResolveConstraint, message: string, ...args: any[]): void;
      static That(code: (() => void), constraint: NUnit.Framework.Constraints.IResolveConstraint, getExceptionMessage: (() => string)): void;
      static ByVal(actual: any, expression: NUnit.Framework.Constraints.IResolveConstraint): void;
      static ByVal(actual: any, expression: NUnit.Framework.Constraints.IResolveConstraint, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number): void;
      static Greater(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number): void;
      static Greater(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number): void;
      static Greater(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number): void;
      static Greater(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number): void;
      static Greater(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number): void;
      static Greater(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Greater(arg1: number, arg2: number): void;
      static Greater(arg1: System.IComparable, arg2: System.IComparable, message: string, ...args: any[]): void;
      static Greater(arg1: System.IComparable, arg2: System.IComparable): void;
      static Less(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Less(arg1: number, arg2: number): void;
      static Less(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Less(arg1: number, arg2: number): void;
      static Less(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Less(arg1: number, arg2: number): void;
      static Less(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Less(arg1: number, arg2: number): void;
      static Less(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Less(arg1: number, arg2: number): void;
      static Less(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Less(arg1: number, arg2: number): void;
      static Less(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static Less(arg1: number, arg2: number): void;
      static Less(arg1: System.IComparable, arg2: System.IComparable, message: string, ...args: any[]): void;
      static Less(arg1: System.IComparable, arg2: System.IComparable): void;
      static GreaterOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: number, arg2: number): void;
      static GreaterOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: number, arg2: number): void;
      static GreaterOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: number, arg2: number): void;
      static GreaterOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: number, arg2: number): void;
      static GreaterOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: number, arg2: number): void;
      static GreaterOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: number, arg2: number): void;
      static GreaterOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: number, arg2: number): void;
      static GreaterOrEqual(arg1: System.IComparable, arg2: System.IComparable, message: string, ...args: any[]): void;
      static GreaterOrEqual(arg1: System.IComparable, arg2: System.IComparable): void;
      static LessOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: number, arg2: number): void;
      static LessOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: number, arg2: number): void;
      static LessOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: number, arg2: number): void;
      static LessOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: number, arg2: number): void;
      static LessOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: number, arg2: number): void;
      static LessOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: number, arg2: number): void;
      static LessOrEqual(arg1: number, arg2: number, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: number, arg2: number): void;
      static LessOrEqual(arg1: System.IComparable, arg2: System.IComparable, message: string, ...args: any[]): void;
      static LessOrEqual(arg1: System.IComparable, arg2: System.IComparable): void;
      static True(condition: boolean | undefined, message: string, ...args: any[]): void;
      static True(condition: boolean, message: string, ...args: any[]): void;
      static True(condition: boolean | undefined): void;
      static True(condition: boolean): void;
      static IsTrue(condition: boolean | undefined, message: string, ...args: any[]): void;
      static IsTrue(condition: boolean, message: string, ...args: any[]): void;
      static IsTrue(condition: boolean | undefined): void;
      static IsTrue(condition: boolean): void;
      static False(condition: boolean | undefined, message: string, ...args: any[]): void;
      static False(condition: boolean, message: string, ...args: any[]): void;
      static False(condition: boolean | undefined): void;
      static False(condition: boolean): void;
      static IsFalse(condition: boolean | undefined, message: string, ...args: any[]): void;
      static IsFalse(condition: boolean, message: string, ...args: any[]): void;
      static IsFalse(condition: boolean | undefined): void;
      static IsFalse(condition: boolean): void;
      static NotNull(anObject: any, message: string, ...args: any[]): void;
      static NotNull(anObject: any): void;
      static IsNotNull(anObject: any, message: string, ...args: any[]): void;
      static IsNotNull(anObject: any): void;
      static Null(anObject: any, message: string, ...args: any[]): void;
      static Null(anObject: any): void;
      static IsNull(anObject: any, message: string, ...args: any[]): void;
      static IsNull(anObject: any): void;
      static IsNaN(aDouble: number, message: string, ...args: any[]): void;
      static IsNaN(aDouble: number): void;
      static IsNaN(aDouble: number | undefined, message: string, ...args: any[]): void;
      static IsNaN(aDouble: number | undefined): void;
      static IsEmpty(aString: string, message: string, ...args: any[]): void;
      static IsEmpty(aString: string): void;
      static IsEmpty(collection: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsEmpty(collection: System.Collections.IEnumerable): void;
      static IsNotEmpty(aString: string, message: string, ...args: any[]): void;
      static IsNotEmpty(aString: string): void;
      static IsNotEmpty(collection: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsNotEmpty(collection: System.Collections.IEnumerable): void;
      static Zero(actual: number): void;
      static Zero(actual: number, message: string, ...args: any[]): void;
      static Zero(actual: number): void;
      static Zero(actual: number, message: string, ...args: any[]): void;
      static Zero(actual: number): void;
      static Zero(actual: number, message: string, ...args: any[]): void;
      static Zero(actual: number): void;
      static Zero(actual: number, message: string, ...args: any[]): void;
      static Zero(actual: number): void;
      static Zero(actual: number, message: string, ...args: any[]): void;
      static Zero(actual: number): void;
      static Zero(actual: number, message: string, ...args: any[]): void;
      static Zero(actual: number): void;
      static Zero(actual: number, message: string, ...args: any[]): void;
      static NotZero(actual: number): void;
      static NotZero(actual: number, message: string, ...args: any[]): void;
      static NotZero(actual: number): void;
      static NotZero(actual: number, message: string, ...args: any[]): void;
      static NotZero(actual: number): void;
      static NotZero(actual: number, message: string, ...args: any[]): void;
      static NotZero(actual: number): void;
      static NotZero(actual: number, message: string, ...args: any[]): void;
      static NotZero(actual: number): void;
      static NotZero(actual: number, message: string, ...args: any[]): void;
      static NotZero(actual: number): void;
      static NotZero(actual: number, message: string, ...args: any[]): void;
      static NotZero(actual: number): void;
      static NotZero(actual: number, message: string, ...args: any[]): void;
      static Positive(actual: number): void;
      static Positive(actual: number, message: string, ...args: any[]): void;
      static Positive(actual: number): void;
      static Positive(actual: number, message: string, ...args: any[]): void;
      static Positive(actual: number): void;
      static Positive(actual: number, message: string, ...args: any[]): void;
      static Positive(actual: number): void;
      static Positive(actual: number, message: string, ...args: any[]): void;
      static Positive(actual: number): void;
      static Positive(actual: number, message: string, ...args: any[]): void;
      static Positive(actual: number): void;
      static Positive(actual: number, message: string, ...args: any[]): void;
      static Positive(actual: number): void;
      static Positive(actual: number, message: string, ...args: any[]): void;
      static Negative(actual: number): void;
      static Negative(actual: number, message: string, ...args: any[]): void;
      static Negative(actual: number): void;
      static Negative(actual: number, message: string, ...args: any[]): void;
      static Negative(actual: number): void;
      static Negative(actual: number, message: string, ...args: any[]): void;
      static Negative(actual: number): void;
      static Negative(actual: number, message: string, ...args: any[]): void;
      static Negative(actual: number): void;
      static Negative(actual: number, message: string, ...args: any[]): void;
      static Negative(actual: number): void;
      static Negative(actual: number, message: string, ...args: any[]): void;
      static Negative(actual: number): void;
      static Negative(actual: number, message: string, ...args: any[]): void;
      static Equals(a: any, b: any): boolean;
      static ReferenceEquals(a: any, b: any): void;
      static Pass(message: string, ...args: any[]): void;
      static Pass(message: string): void;
      static Pass(): void;
      static Fail(message: string, ...args: any[]): void;
      static Fail(message: string): void;
      static Fail(): void;
      static Ignore(message: string, ...args: any[]): void;
      static Ignore(message: string): void;
      static Ignore(): void;
      static Inconclusive(message: string, ...args: any[]): void;
      static Inconclusive(message: string): void;
      static Inconclusive(): void;
      static Contains(expected: any, actual: System.Collections.ICollection, message: string, ...args: any[]): void;
      static Contains(expected: any, actual: System.Collections.ICollection): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TestFixtureData {
      constructor(...args: any[]);
      constructor(arg: any);
      constructor(arg1: any, arg2: any);
      constructor(arg1: any, arg2: any, arg3: any);
      TypeArgs: System.Type[];
      RunState: NUnit.Framework.Interfaces.RunState;
      Arguments: any[];
      TestName: string;
      Properties: NUnit.Framework.Interfaces.IPropertyBag;
      OriginalArguments: any[];
      Explicit(): NUnit.Framework.TestFixtureData;
      Explicit(reason: string): NUnit.Framework.TestFixtureData;
      Ignore(reason: string): NUnit.Framework.TestFixtureData;
      ApplyToTest(test: NUnit.Framework.Internal.Test): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class DirectoryAssert {
      static Equals(a: any, b: any): boolean;
      static ReferenceEquals(a: any, b: any): void;
      static AreEqual(expected: System.IO.DirectoryInfo, actual: System.IO.DirectoryInfo, message: string, ...args: any[]): void;
      static AreEqual(expected: System.IO.DirectoryInfo, actual: System.IO.DirectoryInfo): void;
      static AreNotEqual(expected: System.IO.DirectoryInfo, actual: System.IO.DirectoryInfo, message: string, ...args: any[]): void;
      static AreNotEqual(expected: System.IO.DirectoryInfo, actual: System.IO.DirectoryInfo): void;
      static Exists(actual: System.IO.DirectoryInfo, message: string, ...args: any[]): void;
      static Exists(actual: System.IO.DirectoryInfo): void;
      static Exists(actual: string, message: string, ...args: any[]): void;
      static Exists(actual: string): void;
      static DoesNotExist(actual: System.IO.DirectoryInfo, message: string, ...args: any[]): void;
      static DoesNotExist(actual: System.IO.DirectoryInfo): void;
      static DoesNotExist(actual: string, message: string, ...args: any[]): void;
      static DoesNotExist(actual: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Does {
      static Not: NUnit.Framework.Constraints.ConstraintExpression;
      static Exist: NUnit.Framework.Constraints.FileOrDirectoryExistsConstraint;
      static Contain(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
      static Contain(expected: string): NUnit.Framework.Constraints.ContainsConstraint;
      static StartWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
      static EndWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
      static Match(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ResultStateException {
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      ResultState: NUnit.Framework.Interfaces.ResultState;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export interface ITestAction {
      Targets: NUnit.Framework.ActionTargets;
      BeforeTest(test: NUnit.Framework.Interfaces.ITest): void;
      AfterTest(test: NUnit.Framework.Interfaces.ITest): void;
    }
    export class TestDelegate {
      constructor(object: any, method: System.IntPtr);
      Method: System.Reflection.MethodInfo;
      Target: any; // System.Object
      Invoke(): void;
      BeginInvoke(callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
      EndInvoke(result: System.IAsyncResult): void;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetInvocationList(): System.Delegate[];
      DynamicInvoke(...args: any[]): any;
      Clone(): any;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AssertionHelper {
      constructor();
      Not: NUnit.Framework.Constraints.ConstraintExpression;
      No: NUnit.Framework.Constraints.ConstraintExpression;
      All: NUnit.Framework.Constraints.ConstraintExpression;
      Some: NUnit.Framework.Constraints.ConstraintExpression;
      None: NUnit.Framework.Constraints.ConstraintExpression;
      Length: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      Count: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      Message: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      InnerException: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      Null: NUnit.Framework.Constraints.NullConstraint;
      True: NUnit.Framework.Constraints.TrueConstraint;
      False: NUnit.Framework.Constraints.FalseConstraint;
      Positive: NUnit.Framework.Constraints.GreaterThanConstraint;
      Negative: NUnit.Framework.Constraints.LessThanConstraint;
      Zero: NUnit.Framework.Constraints.EqualConstraint;
      NaN: NUnit.Framework.Constraints.NaNConstraint;
      Empty: NUnit.Framework.Constraints.EmptyConstraint;
      Unique: NUnit.Framework.Constraints.UniqueItemsConstraint;
      BinarySerializable: NUnit.Framework.Constraints.BinarySerializableConstraint;
      XmlSerializable: NUnit.Framework.Constraints.XmlSerializableConstraint;
      Ordered: NUnit.Framework.Constraints.CollectionOrderedConstraint;
      Expect(condition: boolean, message: string, ...args: any[]): void;
      Expect(condition: boolean): void;
      Expect(code: (() => void), constraint: NUnit.Framework.Constraints.IResolveConstraint): void;
      Map(original: System.Collections.ICollection): NUnit.Framework.ListMapper;
      Property(name: string): NUnit.Framework.Constraints.ResolvableConstraintExpression;
      Attribute(expectedType: System.Type): NUnit.Framework.Constraints.ResolvableConstraintExpression;
      EqualTo(expected: any): NUnit.Framework.Constraints.EqualConstraint;
      SameAs(expected: any): NUnit.Framework.Constraints.SameAsConstraint;
      GreaterThan(expected: any): NUnit.Framework.Constraints.GreaterThanConstraint;
      GreaterThanOrEqualTo(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
      AtLeast(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
      LessThan(expected: any): NUnit.Framework.Constraints.LessThanConstraint;
      LessThanOrEqualTo(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
      AtMost(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
      TypeOf(expectedType: System.Type): NUnit.Framework.Constraints.ExactTypeConstraint;
      InstanceOf(expectedType: System.Type): NUnit.Framework.Constraints.InstanceOfTypeConstraint;
      AssignableFrom(expectedType: System.Type): NUnit.Framework.Constraints.AssignableFromConstraint;
      AssignableTo(expectedType: System.Type): NUnit.Framework.Constraints.AssignableToConstraint;
      EquivalentTo(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionEquivalentConstraint;
      SubsetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSubsetConstraint;
      SupersetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSupersetConstraint;
      Member(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
      Contains(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
      Contains(expected: string): NUnit.Framework.Constraints.ContainsConstraint;
      StringContaining(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
      ContainsSubstring(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
      DoesNotContain(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
      StartWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
      StartsWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
      StringStarting(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
      DoesNotStartWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
      EndWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
      EndsWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
      StringEnding(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
      DoesNotEndWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
      Match(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
      Matches(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
      StringMatching(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
      DoesNotMatch(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
      SamePath(expected: string): NUnit.Framework.Constraints.SamePathConstraint;
      SubPathOf(expected: string): NUnit.Framework.Constraints.SubPathConstraint;
      SamePathOrUnder(expected: string): NUnit.Framework.Constraints.SamePathOrUnderConstraint;
      InRange(from: System.IComparable, to: System.IComparable): NUnit.Framework.Constraints.RangeConstraint;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Assume {
      constructor();
      static Equals(a: any, b: any): boolean;
      static ReferenceEquals(a: any, b: any): void;
      static That(condition: boolean, message: string, ...args: any[]): void;
      static That(condition: boolean): void;
      static That(condition: boolean, getExceptionMessage: (() => string)): void;
      static That(condition: (() => boolean), message: string, ...args: any[]): void;
      static That(condition: (() => boolean)): void;
      static That(condition: (() => boolean), getExceptionMessage: (() => string)): void;
      static That(code: (() => void), constraint: NUnit.Framework.Constraints.IResolveConstraint): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class CollectionAssert {
      constructor();
      static Equals(a: any, b: any): boolean;
      static ReferenceEquals(a: any, b: any): void;
      static AllItemsAreInstancesOfType(collection: System.Collections.IEnumerable, expectedType: System.Type): void;
      static AllItemsAreInstancesOfType(collection: System.Collections.IEnumerable, expectedType: System.Type, message: string, ...args: any[]): void;
      static AllItemsAreNotNull(collection: System.Collections.IEnumerable): void;
      static AllItemsAreNotNull(collection: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static AllItemsAreUnique(collection: System.Collections.IEnumerable): void;
      static AllItemsAreUnique(collection: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static AreEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable): void;
      static AreEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, comparer: System.Collections.IComparer): void;
      static AreEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static AreEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, comparer: System.Collections.IComparer, message: string, ...args: any[]): void;
      static AreEquivalent(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable): void;
      static AreEquivalent(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static AreNotEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable): void;
      static AreNotEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, comparer: System.Collections.IComparer): void;
      static AreNotEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static AreNotEqual(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, comparer: System.Collections.IComparer, message: string, ...args: any[]): void;
      static AreNotEquivalent(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable): void;
      static AreNotEquivalent(expected: System.Collections.IEnumerable, actual: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static Contains(collection: System.Collections.IEnumerable, actual: any): void;
      static Contains(collection: System.Collections.IEnumerable, actual: any, message: string, ...args: any[]): void;
      static DoesNotContain(collection: System.Collections.IEnumerable, actual: any): void;
      static DoesNotContain(collection: System.Collections.IEnumerable, actual: any, message: string, ...args: any[]): void;
      static IsNotSubsetOf(subset: System.Collections.IEnumerable, superset: System.Collections.IEnumerable): void;
      static IsNotSubsetOf(subset: System.Collections.IEnumerable, superset: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsSubsetOf(subset: System.Collections.IEnumerable, superset: System.Collections.IEnumerable): void;
      static IsSubsetOf(subset: System.Collections.IEnumerable, superset: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsNotSupersetOf(superset: System.Collections.IEnumerable, subset: System.Collections.IEnumerable): void;
      static IsNotSupersetOf(superset: System.Collections.IEnumerable, subset: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsSupersetOf(superset: System.Collections.IEnumerable, subset: System.Collections.IEnumerable): void;
      static IsSupersetOf(superset: System.Collections.IEnumerable, subset: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsEmpty(collection: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsEmpty(collection: System.Collections.IEnumerable): void;
      static IsNotEmpty(collection: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsNotEmpty(collection: System.Collections.IEnumerable): void;
      static IsOrdered(collection: System.Collections.IEnumerable, message: string, ...args: any[]): void;
      static IsOrdered(collection: System.Collections.IEnumerable): void;
      static IsOrdered(collection: System.Collections.IEnumerable, comparer: System.Collections.IComparer, message: string, ...args: any[]): void;
      static IsOrdered(collection: System.Collections.IEnumerable, comparer: System.Collections.IComparer): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Contains {
      constructor();
      static Item(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
      static Key(expected: any): NUnit.Framework.Constraints.DictionaryContainsKeyConstraint;
      static Value(expected: any): NUnit.Framework.Constraints.DictionaryContainsValueConstraint;
      static Substring(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class AssertionException {
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      ResultState: NUnit.Framework.Interfaces.ResultState;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class IgnoreException {
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      ResultState: NUnit.Framework.Interfaces.ResultState;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class InconclusiveException {
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      ResultState: NUnit.Framework.Interfaces.ResultState;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class SuccessException {
      constructor(message: string);
      constructor(message: string, inner: System.Exception);
      ResultState: NUnit.Framework.Interfaces.ResultState;
      Message: string;
      Data: System.Collections.IDictionary;
      InnerException: System.Exception;
      TargetSite: System.Reflection.MethodBase;
      StackTrace: string;
      HelpLink: string;
      Source: string;
      HResult: number;
      GetBaseException(): System.Exception;
      ToString(): string;
      GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
      GetType(): System.Type;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
    }
    export class FileAssert {
      static Equals(a: any, b: any): boolean;
      static ReferenceEquals(a: any, b: any): void;
      static AreEqual(expected: System.IO.Stream, actual: System.IO.Stream, message: string, ...args: any[]): void;
      static AreEqual(expected: System.IO.Stream, actual: System.IO.Stream): void;
      static AreEqual(expected: System.IO.FileInfo, actual: System.IO.FileInfo, message: string, ...args: any[]): void;
      static AreEqual(expected: System.IO.FileInfo, actual: System.IO.FileInfo): void;
      static AreEqual(expected: string, actual: string, message: string, ...args: any[]): void;
      static AreEqual(expected: string, actual: string): void;
      static AreNotEqual(expected: System.IO.Stream, actual: System.IO.Stream, message: string, ...args: any[]): void;
      static AreNotEqual(expected: System.IO.Stream, actual: System.IO.Stream): void;
      static AreNotEqual(expected: System.IO.FileInfo, actual: System.IO.FileInfo, message: string, ...args: any[]): void;
      static AreNotEqual(expected: System.IO.FileInfo, actual: System.IO.FileInfo): void;
      static AreNotEqual(expected: string, actual: string, message: string, ...args: any[]): void;
      static AreNotEqual(expected: string, actual: string): void;
      static Exists(actual: System.IO.FileInfo, message: string, ...args: any[]): void;
      static Exists(actual: System.IO.FileInfo): void;
      static Exists(actual: string, message: string, ...args: any[]): void;
      static Exists(actual: string): void;
      static DoesNotExist(actual: System.IO.FileInfo, message: string, ...args: any[]): void;
      static DoesNotExist(actual: System.IO.FileInfo): void;
      static DoesNotExist(actual: string, message: string, ...args: any[]): void;
      static DoesNotExist(actual: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class GlobalSettings {
      static DefaultFloatingPointTolerance: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Has {
      constructor();
      static No: NUnit.Framework.Constraints.ConstraintExpression;
      static All: NUnit.Framework.Constraints.ConstraintExpression;
      static Some: NUnit.Framework.Constraints.ConstraintExpression;
      static None: NUnit.Framework.Constraints.ConstraintExpression;
      static Length: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static Count: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static Message: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static InnerException: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static Exactly(expectedCount: number): NUnit.Framework.Constraints.ConstraintExpression;
      static Property(name: string): NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static Attribute(expectedType: System.Type): NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static Member(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Is {
      constructor();
      static Not: NUnit.Framework.Constraints.ConstraintExpression;
      static All: NUnit.Framework.Constraints.ConstraintExpression;
      static Null: NUnit.Framework.Constraints.NullConstraint;
      static True: NUnit.Framework.Constraints.TrueConstraint;
      static False: NUnit.Framework.Constraints.FalseConstraint;
      static Positive: NUnit.Framework.Constraints.GreaterThanConstraint;
      static Negative: NUnit.Framework.Constraints.LessThanConstraint;
      static Zero: NUnit.Framework.Constraints.EqualConstraint;
      static NaN: NUnit.Framework.Constraints.NaNConstraint;
      static Empty: NUnit.Framework.Constraints.EmptyConstraint;
      static Unique: NUnit.Framework.Constraints.UniqueItemsConstraint;
      static BinarySerializable: NUnit.Framework.Constraints.BinarySerializableConstraint;
      static XmlSerializable: NUnit.Framework.Constraints.XmlSerializableConstraint;
      static Ordered: NUnit.Framework.Constraints.CollectionOrderedConstraint;
      static EqualTo(expected: any): NUnit.Framework.Constraints.EqualConstraint;
      static SameAs(expected: any): NUnit.Framework.Constraints.SameAsConstraint;
      static GreaterThan(expected: any): NUnit.Framework.Constraints.GreaterThanConstraint;
      static GreaterThanOrEqualTo(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
      static AtLeast(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
      static LessThan(expected: any): NUnit.Framework.Constraints.LessThanConstraint;
      static LessThanOrEqualTo(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
      static AtMost(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
      static TypeOf(expectedType: System.Type): NUnit.Framework.Constraints.ExactTypeConstraint;
      static InstanceOf(expectedType: System.Type): NUnit.Framework.Constraints.InstanceOfTypeConstraint;
      static AssignableFrom(expectedType: System.Type): NUnit.Framework.Constraints.AssignableFromConstraint;
      static AssignableTo(expectedType: System.Type): NUnit.Framework.Constraints.AssignableToConstraint;
      static EquivalentTo(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionEquivalentConstraint;
      static SubsetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSubsetConstraint;
      static SupersetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSupersetConstraint;
      static StringContaining(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
      static StringStarting(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
      static StringEnding(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
      static StringMatching(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
      static SamePath(expected: string): NUnit.Framework.Constraints.SamePathConstraint;
      static SubPathOf(expected: string): NUnit.Framework.Constraints.SubPathConstraint;
      static SamePathOrUnder(expected: string): NUnit.Framework.Constraints.SamePathOrUnderConstraint;
      static InRange(from: System.IComparable, to: System.IComparable): NUnit.Framework.Constraints.RangeConstraint;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Iz {
      constructor();
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class List {
      constructor();
      static Map(actual: System.Collections.ICollection): NUnit.Framework.ListMapper;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class ListMapper {
      constructor(original: System.Collections.ICollection);
      Property(name: string): System.Collections.ICollection;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export enum SpecialValue {
      Null = 0,
    }
    export class StringAssert {
      constructor();
      static Equals(a: any, b: any): boolean;
      static ReferenceEquals(a: any, b: any): void;
      static Contains(expected: string, actual: string, message: string, ...args: any[]): void;
      static Contains(expected: string, actual: string): void;
      static DoesNotContain(expected: string, actual: string, message: string, ...args: any[]): void;
      static DoesNotContain(expected: string, actual: string): void;
      static StartsWith(expected: string, actual: string, message: string, ...args: any[]): void;
      static StartsWith(expected: string, actual: string): void;
      static DoesNotStartWith(expected: string, actual: string, message: string, ...args: any[]): void;
      static DoesNotStartWith(expected: string, actual: string): void;
      static EndsWith(expected: string, actual: string, message: string, ...args: any[]): void;
      static EndsWith(expected: string, actual: string): void;
      static DoesNotEndWith(expected: string, actual: string, message: string, ...args: any[]): void;
      static DoesNotEndWith(expected: string, actual: string): void;
      static AreEqualIgnoringCase(expected: string, actual: string, message: string, ...args: any[]): void;
      static AreEqualIgnoringCase(expected: string, actual: string): void;
      static AreNotEqualIgnoringCase(expected: string, actual: string, message: string, ...args: any[]): void;
      static AreNotEqualIgnoringCase(expected: string, actual: string): void;
      static IsMatch(pattern: string, actual: string, message: string, ...args: any[]): void;
      static IsMatch(pattern: string, actual: string): void;
      static DoesNotMatch(pattern: string, actual: string, message: string, ...args: any[]): void;
      static DoesNotMatch(pattern: string, actual: string): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TestCaseData {
      constructor(...args: any[]);
      constructor(arg: any);
      constructor(arg1: any, arg2: any);
      constructor(arg1: any, arg2: any, arg3: any);
      ExpectedResult: any; // System.Object
      HasExpectedResult: boolean;
      RunState: NUnit.Framework.Interfaces.RunState;
      Arguments: any[];
      TestName: string;
      Properties: NUnit.Framework.Interfaces.IPropertyBag;
      OriginalArguments: any[];
      Returns(result: any): NUnit.Framework.TestCaseData;
      SetName(name: string): NUnit.Framework.TestCaseData;
      SetDescription(description: string): NUnit.Framework.TestCaseData;
      SetCategory(category: string): NUnit.Framework.TestCaseData;
      SetProperty(propName: string, propValue: string): NUnit.Framework.TestCaseData;
      SetProperty(propName: string, propValue: number): NUnit.Framework.TestCaseData;
      SetProperty(propName: string, propValue: number): NUnit.Framework.TestCaseData;
      Explicit(): NUnit.Framework.TestCaseData;
      Explicit(reason: string): NUnit.Framework.TestCaseData;
      Ignore(reason: string): NUnit.Framework.TestCaseData;
      ApplyToTest(test: NUnit.Framework.Internal.Test): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TestContext {
      constructor(testExecutionContext: NUnit.Framework.Internal.ITestExecutionContext);
      static CurrentContext: NUnit.Framework.TestContext;
      static Out: System.IO.TextWriter;
      Test: NUnit.Framework.TestContext_TestAdapter;
      Result: NUnit.Framework.TestContext_ResultAdapter;
      WorkerId: string;
      TestDirectory: string;
      WorkDirectory: string;
      Random: NUnit.Framework.Internal.Randomizer;
      static CurrentTestExecutionContext: NUnit.Framework.Internal.ITestExecutionContext;
      static Error: System.IO.TextWriter;
      static Progress: System.IO.TextWriter;
      static Parameters: NUnit.Framework.TestParameters;
      static Write(value: boolean): void;
      static Write(value: System.Char): void;
      static Write(value: System.Char[]): void;
      static Write(value: number): void;
      static Write(value: number): void;
      static Write(value: number): void;
      static Write(value: number): void;
      static Write(value: any): void;
      static Write(value: number): void;
      static Write(value: string): void;
      static Write(value: number): void;
      static Write(value: number): void;
      static Write(format: string, arg1: any): void;
      static Write(format: string, arg1: any, arg2: any): void;
      static Write(format: string, arg1: any, arg2: any, arg3: any): void;
      static Write(format: string, ...args: any[]): void;
      static WriteLine(): void;
      static WriteLine(value: boolean): void;
      static WriteLine(value: System.Char): void;
      static WriteLine(value: System.Char[]): void;
      static WriteLine(value: number): void;
      static WriteLine(value: number): void;
      static WriteLine(value: number): void;
      static WriteLine(value: number): void;
      static WriteLine(value: any): void;
      static WriteLine(value: number): void;
      static WriteLine(value: string): void;
      static WriteLine(value: number): void;
      static WriteLine(value: number): void;
      static WriteLine(format: string, arg1: any): void;
      static WriteLine(format: string, arg1: any, arg2: any): void;
      static WriteLine(format: string, arg1: any, arg2: any, arg3: any): void;
      static WriteLine(format: string, ...args: any[]): void;
      static AddFormatter(formatterFactory: ((next: ((val: any) => string)) => ((val: any) => string))): void;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TestParameters {
      constructor();
      Count: number;
      Names: System.Collections.Generic.ICollection<string>;
      Exists(name: string): boolean;
      Get(name: string): string;
      Get(name: string, defaultValue: string): string;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class Throws {
      constructor();
      static Exception: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static InnerException: NUnit.Framework.Constraints.ResolvableConstraintExpression;
      static TargetInvocationException: NUnit.Framework.Constraints.ExactTypeConstraint;
      static ArgumentException: NUnit.Framework.Constraints.ExactTypeConstraint;
      static ArgumentNullException: NUnit.Framework.Constraints.ExactTypeConstraint;
      static InvalidOperationException: NUnit.Framework.Constraints.ExactTypeConstraint;
      static Nothing: NUnit.Framework.Constraints.ThrowsNothingConstraint;
      static TypeOf(expectedType: System.Type): NUnit.Framework.Constraints.ExactTypeConstraint;
      static InstanceOf(expectedType: System.Type): NUnit.Framework.Constraints.InstanceOfTypeConstraint;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TestContext_TestAdapter {
      constructor(test: NUnit.Framework.Internal.Test);
      ID: string;
      Name: string;
      MethodName: string;
      FullName: string;
      ClassName: string;
      Properties: NUnit.Framework.Interfaces.IPropertyBag;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export class TestContext_ResultAdapter {
      constructor(result: NUnit.Framework.Internal.TestResult);
      Outcome: NUnit.Framework.Interfaces.ResultState;
      Message: string;
      StackTrace: string;
      FailCount: number;
      PassCount: number;
      SkipCount: number;
      InconclusiveCount: number;
      Equals(obj: any): boolean;
      GetHashCode(): number;
      GetType(): System.Type;
      ToString(): string;
    }
    export namespace Api {
      export class FrameworkController {
        constructor(assemblyNameOrPath: string, idPrefix: string, settings: System.Collections.IDictionary);
        constructor(assembly: System.Reflection.Assembly, idPrefix: string, settings: System.Collections.IDictionary);
        constructor(assemblyNameOrPath: string, idPrefix: string, settings: System.Collections.IDictionary, runnerType: string, builderType: string);
        constructor(assembly: System.Reflection.Assembly, idPrefix: string, settings: System.Collections.IDictionary, runnerType: string, builderType: string);
        Builder: NUnit.Framework.Api.ITestAssemblyBuilder;
        Runner: NUnit.Framework.Api.ITestAssemblyRunner;
        AssemblyNameOrPath: string;
        Assembly: System.Reflection.Assembly;
        LoadTests(): string;
        ExploreTests(filter: string): string;
        RunTests(filter: string): string;
        RunTests(callback: ((obj: string) => void), filter: string): string;
        StopRun(force: boolean): void;
        CountTests(filter: string): number;
        static InsertEnvironmentElement(targetNode: NUnit.Framework.Interfaces.TNode): NUnit.Framework.Interfaces.TNode;
        static InsertSettingsElement(targetNode: NUnit.Framework.Interfaces.TNode, settings: any): NUnit.Framework.Interfaces.TNode;
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NUnitTestAssemblyRunner {
        constructor(builder: NUnit.Framework.Api.ITestAssemblyBuilder);
        LoadedTest: NUnit.Framework.Interfaces.ITest;
        Result: NUnit.Framework.Interfaces.ITestResult;
        IsTestLoaded: boolean;
        IsTestRunning: boolean;
        IsTestComplete: boolean;
        Load(assemblyName: string, settings: Record<string, any>): NUnit.Framework.Interfaces.ITest;
        Load(assembly: System.Reflection.Assembly, settings: Record<string, any>): NUnit.Framework.Interfaces.ITest;
        CountTestCases(filter: NUnit.Framework.Interfaces.ITestFilter): number;
        Run(listener: NUnit.Framework.Interfaces.ITestListener, filter: NUnit.Framework.Interfaces.ITestFilter): NUnit.Framework.Interfaces.ITestResult;
        RunAsync(listener: NUnit.Framework.Interfaces.ITestListener, filter: NUnit.Framework.Interfaces.ITestFilter): void;
        WaitForCompletion(timeout: number): boolean;
        StopRun(force: boolean): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export interface ITestAssemblyBuilder {
        Build(assembly: System.Reflection.Assembly, options: Record<string, any>): NUnit.Framework.Interfaces.ITest;
        Build(assemblyName: string, options: Record<string, any>): NUnit.Framework.Interfaces.ITest;
      }
      export interface ITestAssemblyRunner {
        LoadedTest: NUnit.Framework.Interfaces.ITest;
        Result: NUnit.Framework.Interfaces.ITestResult;
        IsTestLoaded: boolean;
        IsTestRunning: boolean;
        IsTestComplete: boolean;
        Load(assemblyName: string, settings: Record<string, any>): NUnit.Framework.Interfaces.ITest;
        Load(assembly: System.Reflection.Assembly, settings: Record<string, any>): NUnit.Framework.Interfaces.ITest;
        CountTestCases(filter: NUnit.Framework.Interfaces.ITestFilter): number;
        Run(listener: NUnit.Framework.Interfaces.ITestListener, filter: NUnit.Framework.Interfaces.ITestFilter): NUnit.Framework.Interfaces.ITestResult;
        RunAsync(listener: NUnit.Framework.Interfaces.ITestListener, filter: NUnit.Framework.Interfaces.ITestFilter): void;
        WaitForCompletion(timeout: number): boolean;
        StopRun(force: boolean): void;
      }
      export class DefaultTestAssemblyBuilder {
        constructor();
        Build(assembly: System.Reflection.Assembly, options: Record<string, any>): NUnit.Framework.Interfaces.ITest;
        Build(assemblyName: string, options: Record<string, any>): NUnit.Framework.Interfaces.ITest;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FrameworkController_FrameworkControllerAction {
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FrameworkController_LoadTestsAction {
        constructor(controller: NUnit.Framework.Api.FrameworkController, handler: any);
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FrameworkController_ExploreTestsAction {
        constructor(controller: NUnit.Framework.Api.FrameworkController, filter: string, handler: any);
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FrameworkController_CountTestsAction {
        constructor(controller: NUnit.Framework.Api.FrameworkController, filter: string, handler: any);
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FrameworkController_RunTestsAction {
        constructor(controller: NUnit.Framework.Api.FrameworkController, filter: string, handler: any);
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FrameworkController_RunAsyncAction {
        constructor(controller: NUnit.Framework.Api.FrameworkController, filter: string, handler: any);
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FrameworkController_StopRunAction {
        constructor(controller: NUnit.Framework.Api.FrameworkController, force: boolean, handler: any);
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Constraints {
      export class CollectionSupersetConstraint {
        constructor(expected: System.Collections.IEnumerable);
        DisplayName: string;
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class DictionaryContainsValueConstraint {
        constructor(expected: any);
        DisplayName: string;
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EqualConstraintResult {
        constructor(constraint: NUnit.Framework.Constraints.EqualConstraint, actual: any, hasSucceeded: boolean);
        ActualValue: any; // System.Object
        Status: NUnit.Framework.Constraints.ConstraintStatus;
        IsSuccess: boolean;
        Name: string;
        Description: string;
        WriteMessageTo(writer: NUnit.Framework.Constraints.MessageWriter): void;
        WriteActualValueTo(writer: NUnit.Framework.Constraints.MessageWriter): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class FileExistsConstraint {
        constructor();
        Description: string;
        IgnoreDirectories: NUnit.Framework.Constraints.FileOrDirectoryExistsConstraint;
        IgnoreFiles: NUnit.Framework.Constraints.FileOrDirectoryExistsConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class FileOrDirectoryExistsConstraint {
        constructor();
        constructor(ignoreDirectories: boolean);
        IgnoreDirectories: NUnit.Framework.Constraints.FileOrDirectoryExistsConstraint;
        IgnoreFiles: NUnit.Framework.Constraints.FileOrDirectoryExistsConstraint;
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export interface IConstraint {
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
      }
      export class AllOperator {
        constructor();
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NoneOperator {
        constructor();
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SomeOperator {
        constructor();
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SubPathConstraint {
        constructor(expected: string);
        Description: string;
        RespectCase: NUnit.Framework.Constraints.PathConstraint;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ThrowsExceptionConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class AllItemsConstraint {
        constructor(itemConstraint: NUnit.Framework.Constraints.IConstraint);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class AndConstraint {
        constructor(left: NUnit.Framework.Constraints.IConstraint, right: NUnit.Framework.Constraints.IConstraint);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class AssignableFromConstraint {
        constructor(type: System.Type);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class AssignableToConstraint {
        constructor(type: System.Type);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class AttributeConstraint {
        constructor(type: System.Type, baseConstraint: NUnit.Framework.Constraints.IConstraint);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class AttributeExistsConstraint {
        constructor(type: System.Type);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class BinaryConstraint {
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class BinarySerializableConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class CollectionConstraint {
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class CollectionContainsConstraint {
        constructor(expected: any);
        DisplayName: string;
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class CollectionEquivalentConstraint {
        constructor(expected: System.Collections.IEnumerable);
        DisplayName: string;
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class CollectionItemsEqualConstraint {
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class CollectionOrderedConstraint {
        constructor();
        DisplayName: string;
        Ascending: NUnit.Framework.Constraints.CollectionOrderedConstraint;
        Descending: NUnit.Framework.Constraints.CollectionOrderedConstraint;
        Then: NUnit.Framework.Constraints.CollectionOrderedConstraint;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionOrderedConstraint;
        By(propertyName: string): NUnit.Framework.Constraints.CollectionOrderedConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class CollectionSubsetConstraint {
        constructor(expected: System.Collections.IEnumerable);
        DisplayName: string;
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class CollectionTally {
        constructor(comparer: NUnit.Framework.Constraints.NUnitEqualityComparer, c: System.Collections.IEnumerable);
        Count: number;
        TryRemove(o: any): boolean;
        TryRemove(c: System.Collections.IEnumerable): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ComparisonAdapter {
        static Default: NUnit.Framework.Constraints.ComparisonAdapter;
        static For(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.ComparisonAdapter;
        Compare(expected: any, actual: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ComparisonConstraint {
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.ComparisonConstraint;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ActualValueDelegate<TActual = any> {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(): TActual;
        BeginInvoke(callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): TActual;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class Constraint {
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ConstraintBuilder {
        constructor();
        Append(op: NUnit.Framework.Constraints.ConstraintOperator): void;
        Append(constraint: NUnit.Framework.Constraints.Constraint): void;
        Resolve(): NUnit.Framework.Constraints.IConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ConstraintExpression {
        constructor();
        constructor(builder: NUnit.Framework.Constraints.ConstraintBuilder);
        Not: NUnit.Framework.Constraints.ConstraintExpression;
        No: NUnit.Framework.Constraints.ConstraintExpression;
        All: NUnit.Framework.Constraints.ConstraintExpression;
        Some: NUnit.Framework.Constraints.ConstraintExpression;
        None: NUnit.Framework.Constraints.ConstraintExpression;
        Length: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Count: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Message: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        InnerException: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Null: NUnit.Framework.Constraints.NullConstraint;
        True: NUnit.Framework.Constraints.TrueConstraint;
        False: NUnit.Framework.Constraints.FalseConstraint;
        Positive: NUnit.Framework.Constraints.GreaterThanConstraint;
        Negative: NUnit.Framework.Constraints.LessThanConstraint;
        Zero: NUnit.Framework.Constraints.EqualConstraint;
        NaN: NUnit.Framework.Constraints.NaNConstraint;
        Empty: NUnit.Framework.Constraints.EmptyConstraint;
        Unique: NUnit.Framework.Constraints.UniqueItemsConstraint;
        BinarySerializable: NUnit.Framework.Constraints.BinarySerializableConstraint;
        XmlSerializable: NUnit.Framework.Constraints.XmlSerializableConstraint;
        Ordered: NUnit.Framework.Constraints.CollectionOrderedConstraint;
        Exist: NUnit.Framework.Constraints.Constraint;
        ToString(): string;
        Append(op: NUnit.Framework.Constraints.ConstraintOperator): NUnit.Framework.Constraints.ConstraintExpression;
        Append(op: NUnit.Framework.Constraints.SelfResolvingOperator): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Append(constraint: NUnit.Framework.Constraints.Constraint): NUnit.Framework.Constraints.Constraint;
        Exactly(expectedCount: number): NUnit.Framework.Constraints.ConstraintExpression;
        Property(name: string): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Attribute(expectedType: System.Type): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Matches(constraint: NUnit.Framework.Constraints.IResolveConstraint): NUnit.Framework.Constraints.Constraint;
        EqualTo(expected: any): NUnit.Framework.Constraints.EqualConstraint;
        SameAs(expected: any): NUnit.Framework.Constraints.SameAsConstraint;
        GreaterThan(expected: any): NUnit.Framework.Constraints.GreaterThanConstraint;
        GreaterThanOrEqualTo(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
        AtLeast(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
        LessThan(expected: any): NUnit.Framework.Constraints.LessThanConstraint;
        LessThanOrEqualTo(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
        AtMost(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
        TypeOf(expectedType: System.Type): NUnit.Framework.Constraints.ExactTypeConstraint;
        InstanceOf(expectedType: System.Type): NUnit.Framework.Constraints.InstanceOfTypeConstraint;
        AssignableFrom(expectedType: System.Type): NUnit.Framework.Constraints.AssignableFromConstraint;
        AssignableTo(expectedType: System.Type): NUnit.Framework.Constraints.AssignableToConstraint;
        EquivalentTo(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionEquivalentConstraint;
        SubsetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSubsetConstraint;
        SupersetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSupersetConstraint;
        Member(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
        Contains(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
        Contains(expected: string): NUnit.Framework.Constraints.ContainsConstraint;
        Contain(expected: string): NUnit.Framework.Constraints.ContainsConstraint;
        StringContaining(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
        ContainsSubstring(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
        StartWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        StartsWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        StringStarting(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        EndWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        EndsWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        StringEnding(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        Match(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        Matches(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        StringMatching(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        SamePath(expected: string): NUnit.Framework.Constraints.SamePathConstraint;
        SubPathOf(expected: string): NUnit.Framework.Constraints.SubPathConstraint;
        SamePathOrUnder(expected: string): NUnit.Framework.Constraints.SamePathOrUnderConstraint;
        InRange(from: System.IComparable, to: System.IComparable): NUnit.Framework.Constraints.RangeConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ConstraintFactory {
        constructor();
        Not: NUnit.Framework.Constraints.ConstraintExpression;
        No: NUnit.Framework.Constraints.ConstraintExpression;
        All: NUnit.Framework.Constraints.ConstraintExpression;
        Some: NUnit.Framework.Constraints.ConstraintExpression;
        None: NUnit.Framework.Constraints.ConstraintExpression;
        Length: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Count: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Message: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        InnerException: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Null: NUnit.Framework.Constraints.NullConstraint;
        True: NUnit.Framework.Constraints.TrueConstraint;
        False: NUnit.Framework.Constraints.FalseConstraint;
        Positive: NUnit.Framework.Constraints.GreaterThanConstraint;
        Negative: NUnit.Framework.Constraints.LessThanConstraint;
        Zero: NUnit.Framework.Constraints.EqualConstraint;
        NaN: NUnit.Framework.Constraints.NaNConstraint;
        Empty: NUnit.Framework.Constraints.EmptyConstraint;
        Unique: NUnit.Framework.Constraints.UniqueItemsConstraint;
        BinarySerializable: NUnit.Framework.Constraints.BinarySerializableConstraint;
        XmlSerializable: NUnit.Framework.Constraints.XmlSerializableConstraint;
        Ordered: NUnit.Framework.Constraints.CollectionOrderedConstraint;
        static Exactly(expectedCount: number): NUnit.Framework.Constraints.ConstraintExpression;
        Property(name: string): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Attribute(expectedType: System.Type): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        EqualTo(expected: any): NUnit.Framework.Constraints.EqualConstraint;
        SameAs(expected: any): NUnit.Framework.Constraints.SameAsConstraint;
        GreaterThan(expected: any): NUnit.Framework.Constraints.GreaterThanConstraint;
        GreaterThanOrEqualTo(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
        AtLeast(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
        LessThan(expected: any): NUnit.Framework.Constraints.LessThanConstraint;
        LessThanOrEqualTo(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
        AtMost(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
        TypeOf(expectedType: System.Type): NUnit.Framework.Constraints.ExactTypeConstraint;
        InstanceOf(expectedType: System.Type): NUnit.Framework.Constraints.InstanceOfTypeConstraint;
        AssignableFrom(expectedType: System.Type): NUnit.Framework.Constraints.AssignableFromConstraint;
        AssignableTo(expectedType: System.Type): NUnit.Framework.Constraints.AssignableToConstraint;
        EquivalentTo(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionEquivalentConstraint;
        SubsetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSubsetConstraint;
        SupersetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSupersetConstraint;
        Member(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
        Contains(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
        Contains(expected: string): NUnit.Framework.Constraints.ContainsConstraint;
        StringContaining(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
        ContainsSubstring(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
        DoesNotContain(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
        StartWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        StartsWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        StringStarting(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        DoesNotStartWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        EndWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        EndsWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        StringEnding(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        DoesNotEndWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        Match(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        Matches(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        StringMatching(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        DoesNotMatch(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        SamePath(expected: string): NUnit.Framework.Constraints.SamePathConstraint;
        SubPathOf(expected: string): NUnit.Framework.Constraints.SubPathConstraint;
        SamePathOrUnder(expected: string): NUnit.Framework.Constraints.SamePathOrUnderConstraint;
        InRange(from: System.IComparable, to: System.IComparable): NUnit.Framework.Constraints.RangeConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ContainsConstraint {
        constructor(expected: any);
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.ContainsConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class DelayedConstraint {
        constructor(baseConstraint: NUnit.Framework.Constraints.IConstraint, delayInMilliseconds: number);
        constructor(baseConstraint: NUnit.Framework.Constraints.IConstraint, delayInMilliseconds: number, pollingInterval: number);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class DictionaryContainsKeyConstraint {
        constructor(expected: any);
        DisplayName: string;
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EmptyCollectionConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EmptyConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EmptyDirectoryConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EmptyStringConstraint {
        constructor();
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EndsWithConstraint {
        constructor(expected: string);
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EqualConstraint {
        constructor(expected: any);
        Tolerance: NUnit.Framework.Constraints.Tolerance;
        CaseInsensitive: boolean;
        ClipStrings: boolean;
        FailurePoints: NUnit.Framework.Constraints.NUnitEqualityComparer_FailurePoint[];
        IgnoreCase: NUnit.Framework.Constraints.EqualConstraint;
        NoClip: NUnit.Framework.Constraints.EqualConstraint;
        AsCollection: NUnit.Framework.Constraints.EqualConstraint;
        WithSameOffset: NUnit.Framework.Constraints.EqualConstraint;
        Ulps: NUnit.Framework.Constraints.EqualConstraint;
        Percent: NUnit.Framework.Constraints.EqualConstraint;
        Days: NUnit.Framework.Constraints.EqualConstraint;
        Hours: NUnit.Framework.Constraints.EqualConstraint;
        Minutes: NUnit.Framework.Constraints.EqualConstraint;
        Seconds: NUnit.Framework.Constraints.EqualConstraint;
        Milliseconds: NUnit.Framework.Constraints.EqualConstraint;
        Ticks: NUnit.Framework.Constraints.EqualConstraint;
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Within(amount: any): NUnit.Framework.Constraints.EqualConstraint;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.EqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.EqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class EqualityAdapter {
        AreEqual(x: any, y: any): boolean;
        CanCompare(x: any, y: any): boolean;
        static For(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.EqualityAdapter;
        static For(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.EqualityAdapter;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ExactTypeConstraint {
        constructor(type: System.Type);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class FalseConstraint {
        constructor();
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class FloatingPointNumerics {
        static AreAlmostEqualUlps(left: number, right: number, maxUlps: number): boolean;
        static AreAlmostEqualUlps(left: number, right: number, maxUlps: number): boolean;
        static ReinterpretAsInt(value: number): number;
        static ReinterpretAsLong(value: number): number;
        static ReinterpretAsFloat(value: number): number;
        static ReinterpretAsDouble(value: number): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class GreaterThanConstraint {
        constructor(expected: any);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.ComparisonConstraint;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class GreaterThanOrEqualConstraint {
        constructor(expected: any);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.ComparisonConstraint;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export enum ConstraintStatus {
        Unknown = 0,
        Success = 1,
        Failure = 2,
        Error = 3,
      }
      export class ConstraintResult {
        constructor(constraint: NUnit.Framework.Constraints.IConstraint, actualValue: any);
        constructor(constraint: NUnit.Framework.Constraints.IConstraint, actualValue: any, status: NUnit.Framework.Constraints.ConstraintStatus);
        constructor(constraint: NUnit.Framework.Constraints.IConstraint, actualValue: any, isSuccess: boolean);
        ActualValue: any; // System.Object
        Status: NUnit.Framework.Constraints.ConstraintStatus;
        IsSuccess: boolean;
        Name: string;
        Description: string;
        WriteMessageTo(writer: NUnit.Framework.Constraints.MessageWriter): void;
        WriteActualValueTo(writer: NUnit.Framework.Constraints.MessageWriter): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class InstanceOfTypeConstraint {
        constructor(type: System.Type);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export interface IResolveConstraint {
        Resolve(): NUnit.Framework.Constraints.IConstraint;
      }
      export class LessThanConstraint {
        constructor(expected: any);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.ComparisonConstraint;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class LessThanOrEqualConstraint {
        constructor(expected: any);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.ComparisonConstraint;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class MessageWriter {
        MaxLineLength: number;
        Encoding: System.Text.Encoding;
        FormatProvider: System.IFormatProvider;
        NewLine: string;
        WriteMessageLine(message: string, ...args: any[]): void;
        WriteMessageLine(level: number, message: string, ...args: any[]): void;
        DisplayDifferences(result: NUnit.Framework.Constraints.ConstraintResult): void;
        DisplayDifferences(expected: any, actual: any): void;
        DisplayDifferences(expected: any, actual: any, tolerance: NUnit.Framework.Constraints.Tolerance): void;
        DisplayStringDifferences(expected: string, actual: string, mismatch: number, ignoreCase: boolean, clipping: boolean): void;
        WriteActualValue(actual: any): void;
        WriteValue(val: any): void;
        WriteCollectionElements(collection: System.Collections.IEnumerable, start: number, max: number): void;
        Close(): void;
        GetStringBuilder(): System.Text.StringBuilder;
        Write(value: System.Char): void;
        Write(buffer: System.Char[], index: number, count: number): void;
        Write(value: string): void;
        WriteAsync(value: System.Char): System.Threading.Tasks.Task;
        WriteAsync(value: string): System.Threading.Tasks.Task;
        WriteAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
        WriteLineAsync(value: System.Char): System.Threading.Tasks.Task;
        WriteLineAsync(value: string): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
        FlushAsync(): System.Threading.Tasks.Task;
        ToString(): string;
        Dispose(): void;
        DisposeAsync(): System.Threading.Tasks.ValueTask;
        Flush(): void;
        Write(buffer: System.Char[]): void;
        Write(buffer: System.ReadOnlySpan<System.Char>): void;
        Write(value: boolean): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: any): void;
        Write(format: string, arg0: any): void;
        Write(format: string, arg0: any, arg1: any): void;
        Write(format: string, arg0: any, arg1: any, arg2: any): void;
        Write(format: string, ...arg: any[]): void;
        WriteLine(): void;
        WriteLine(value: System.Char): void;
        WriteLine(buffer: System.Char[]): void;
        WriteLine(buffer: System.Char[], index: number, count: number): void;
        WriteLine(buffer: System.ReadOnlySpan<System.Char>): void;
        WriteLine(value: boolean): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: string): void;
        WriteLine(value: any): void;
        WriteLine(format: string, arg0: any): void;
        WriteLine(format: string, arg0: any, arg1: any): void;
        WriteLine(format: string, arg0: any, arg1: any, arg2: any): void;
        WriteLine(format: string, ...arg: any[]): void;
        WriteAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
        WriteAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
        WriteLineAsync(): System.Threading.Tasks.Task;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        InitializeLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ValueFormatter {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(val: any): string;
        BeginInvoke(val: any, callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): string;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ValueFormatterFactory {
        constructor(object: any, method: System.IntPtr);
        Method: System.Reflection.MethodInfo;
        Target: any; // System.Object
        Invoke(next: ((val: any) => string)): ((val: any) => string);
        BeginInvoke(next: ((val: any) => string), callback: ((ar: System.IAsyncResult) => void), object: any): System.IAsyncResult;
        EndInvoke(result: System.IAsyncResult): ((val: any) => string);
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetInvocationList(): System.Delegate[];
        DynamicInvoke(...args: any[]): any;
        Clone(): any;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NaNConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class NoItemConstraint {
        constructor(itemConstraint: NUnit.Framework.Constraints.IConstraint);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class NotConstraint {
        constructor(baseConstraint: NUnit.Framework.Constraints.IConstraint);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class NullConstraint {
        constructor();
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class Numerics {
        static IsNumericType(obj: any): boolean;
        static IsFloatingPointNumeric(obj: any): boolean;
        static IsFixedPointNumeric(obj: any): boolean;
        static Compare(expected: any, actual: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NUnitComparer {
        constructor();
        static Default: NUnit.Framework.Constraints.NUnitComparer;
        Compare(x: any, y: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NUnitEqualityComparer {
        constructor();
        static Default: NUnit.Framework.Constraints.NUnitEqualityComparer;
        IgnoreCase: boolean;
        CompareAsCollection: boolean;
        ExternalComparers: NUnit.Framework.Constraints.EqualityAdapter[];
        FailurePoints: NUnit.Framework.Constraints.NUnitEqualityComparer_FailurePoint[];
        WithSameOffset: boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AndOperator {
        constructor();
        LeftPrecedence: number;
        RightPrecedence: number;
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        ApplyOperator(left: NUnit.Framework.Constraints.IConstraint, right: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AttributeOperator {
        constructor(type: System.Type);
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class BinaryOperator {
        LeftPrecedence: number;
        RightPrecedence: number;
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        ApplyOperator(left: NUnit.Framework.Constraints.IConstraint, right: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class CollectionOperator {
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ConstraintOperator {
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NotOperator {
        constructor();
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class OrOperator {
        constructor();
        LeftPrecedence: number;
        RightPrecedence: number;
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        ApplyOperator(left: NUnit.Framework.Constraints.IConstraint, right: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PrefixOperator {
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PropOperator {
        constructor(name: string);
        Name: string;
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SelfResolvingOperator {
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ThrowsOperator {
        constructor();
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class WithOperator {
        constructor();
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class OrConstraint {
        constructor(left: NUnit.Framework.Constraints.IConstraint, right: NUnit.Framework.Constraints.IConstraint);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class PathConstraint {
        RespectCase: NUnit.Framework.Constraints.PathConstraint;
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class PredicateConstraint<T = any> {
        constructor(predicate: ((obj: T) => boolean));
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class PrefixConstraint {
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class PropertyConstraint {
        constructor(name: string, baseConstraint: NUnit.Framework.Constraints.IConstraint);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class PropertyExistsConstraint {
        constructor(name: string);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class RangeConstraint {
        constructor(from: System.IComparable, to: System.IComparable);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.RangeConstraint;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class RegexConstraint {
        constructor(pattern: string);
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ResolvableConstraintExpression {
        constructor();
        constructor(builder: NUnit.Framework.Constraints.ConstraintBuilder);
        And: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Not: NUnit.Framework.Constraints.ConstraintExpression;
        No: NUnit.Framework.Constraints.ConstraintExpression;
        All: NUnit.Framework.Constraints.ConstraintExpression;
        Some: NUnit.Framework.Constraints.ConstraintExpression;
        None: NUnit.Framework.Constraints.ConstraintExpression;
        Length: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Count: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Message: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        InnerException: NUnit.Framework.Constraints.ResolvableConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Null: NUnit.Framework.Constraints.NullConstraint;
        True: NUnit.Framework.Constraints.TrueConstraint;
        False: NUnit.Framework.Constraints.FalseConstraint;
        Positive: NUnit.Framework.Constraints.GreaterThanConstraint;
        Negative: NUnit.Framework.Constraints.LessThanConstraint;
        Zero: NUnit.Framework.Constraints.EqualConstraint;
        NaN: NUnit.Framework.Constraints.NaNConstraint;
        Empty: NUnit.Framework.Constraints.EmptyConstraint;
        Unique: NUnit.Framework.Constraints.UniqueItemsConstraint;
        BinarySerializable: NUnit.Framework.Constraints.BinarySerializableConstraint;
        XmlSerializable: NUnit.Framework.Constraints.XmlSerializableConstraint;
        Ordered: NUnit.Framework.Constraints.CollectionOrderedConstraint;
        Exist: NUnit.Framework.Constraints.Constraint;
        ToString(): string;
        Append(op: NUnit.Framework.Constraints.ConstraintOperator): NUnit.Framework.Constraints.ConstraintExpression;
        Append(op: NUnit.Framework.Constraints.SelfResolvingOperator): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Append(constraint: NUnit.Framework.Constraints.Constraint): NUnit.Framework.Constraints.Constraint;
        Exactly(expectedCount: number): NUnit.Framework.Constraints.ConstraintExpression;
        Property(name: string): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Attribute(expectedType: System.Type): NUnit.Framework.Constraints.ResolvableConstraintExpression;
        Matches(constraint: NUnit.Framework.Constraints.IResolveConstraint): NUnit.Framework.Constraints.Constraint;
        EqualTo(expected: any): NUnit.Framework.Constraints.EqualConstraint;
        SameAs(expected: any): NUnit.Framework.Constraints.SameAsConstraint;
        GreaterThan(expected: any): NUnit.Framework.Constraints.GreaterThanConstraint;
        GreaterThanOrEqualTo(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
        AtLeast(expected: any): NUnit.Framework.Constraints.GreaterThanOrEqualConstraint;
        LessThan(expected: any): NUnit.Framework.Constraints.LessThanConstraint;
        LessThanOrEqualTo(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
        AtMost(expected: any): NUnit.Framework.Constraints.LessThanOrEqualConstraint;
        TypeOf(expectedType: System.Type): NUnit.Framework.Constraints.ExactTypeConstraint;
        InstanceOf(expectedType: System.Type): NUnit.Framework.Constraints.InstanceOfTypeConstraint;
        AssignableFrom(expectedType: System.Type): NUnit.Framework.Constraints.AssignableFromConstraint;
        AssignableTo(expectedType: System.Type): NUnit.Framework.Constraints.AssignableToConstraint;
        EquivalentTo(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionEquivalentConstraint;
        SubsetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSubsetConstraint;
        SupersetOf(expected: System.Collections.IEnumerable): NUnit.Framework.Constraints.CollectionSupersetConstraint;
        Member(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
        Contains(expected: any): NUnit.Framework.Constraints.CollectionContainsConstraint;
        Contains(expected: string): NUnit.Framework.Constraints.ContainsConstraint;
        Contain(expected: string): NUnit.Framework.Constraints.ContainsConstraint;
        StringContaining(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
        ContainsSubstring(expected: string): NUnit.Framework.Constraints.SubstringConstraint;
        StartWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        StartsWith(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        StringStarting(expected: string): NUnit.Framework.Constraints.StartsWithConstraint;
        EndWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        EndsWith(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        StringEnding(expected: string): NUnit.Framework.Constraints.EndsWithConstraint;
        Match(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        Matches(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        StringMatching(pattern: string): NUnit.Framework.Constraints.RegexConstraint;
        SamePath(expected: string): NUnit.Framework.Constraints.SamePathConstraint;
        SubPathOf(expected: string): NUnit.Framework.Constraints.SubPathConstraint;
        SamePathOrUnder(expected: string): NUnit.Framework.Constraints.SamePathOrUnderConstraint;
        InRange(from: System.IComparable, to: System.IComparable): NUnit.Framework.Constraints.RangeConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ReusableConstraint {
        constructor(c: NUnit.Framework.Constraints.IResolveConstraint);
        ToString(): string;
        Resolve(): NUnit.Framework.Constraints.IConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class SameAsConstraint {
        constructor(expected: any);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class SamePathConstraint {
        constructor(expected: string);
        Description: string;
        RespectCase: NUnit.Framework.Constraints.PathConstraint;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class SamePathOrUnderConstraint {
        constructor(expected: string);
        Description: string;
        RespectCase: NUnit.Framework.Constraints.PathConstraint;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class SomeItemsConstraint {
        constructor(itemConstraint: NUnit.Framework.Constraints.IConstraint);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class StartsWithConstraint {
        constructor(expected: string);
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class StringConstraint {
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class SubstringConstraint {
        constructor(expected: string);
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.StringConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ThrowsConstraint {
        constructor(baseConstraint: NUnit.Framework.Constraints.IConstraint);
        ActualException: System.Exception;
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ThrowsNothingConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class Tolerance {
        constructor(amount: any);
        static Default: NUnit.Framework.Constraints.Tolerance;
        static Exact: NUnit.Framework.Constraints.Tolerance;
        Mode: NUnit.Framework.Constraints.ToleranceMode;
        Value: any; // System.Object
        Percent: NUnit.Framework.Constraints.Tolerance;
        Ulps: NUnit.Framework.Constraints.Tolerance;
        Days: NUnit.Framework.Constraints.Tolerance;
        Hours: NUnit.Framework.Constraints.Tolerance;
        Minutes: NUnit.Framework.Constraints.Tolerance;
        Seconds: NUnit.Framework.Constraints.Tolerance;
        Milliseconds: NUnit.Framework.Constraints.Tolerance;
        Ticks: NUnit.Framework.Constraints.Tolerance;
        IsUnsetOrDefault: boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum ToleranceMode {
        Unset = 0,
        Linear = 1,
        Percent = 2,
        Ulps = 3,
      }
      export class TrueConstraint {
        constructor();
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class TypeConstraint {
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class UniqueItemsConstraint {
        constructor();
        Description: string;
        IgnoreCase: NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        Using(comparer: System.Collections.IComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        Using(comparer: System.Collections.IEqualityComparer): NUnit.Framework.Constraints.CollectionItemsEqualConstraint;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class XmlSerializableConstraint {
        constructor();
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ExactCountConstraint {
        constructor(expectedCount: number, itemConstraint: NUnit.Framework.Constraints.IConstraint);
        Description: string;
        DisplayName: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ExactCountOperator {
        constructor(expectedCount: number);
        LeftContext: any; // System.Object
        RightContext: any; // System.Object
        LeftPrecedence: number;
        RightPrecedence: number;
        ApplyPrefix(constraint: NUnit.Framework.Constraints.IConstraint): NUnit.Framework.Constraints.IConstraint;
        Reduce(stack: NUnit.Framework.Constraints.ConstraintBuilder_ConstraintStack): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ExceptionTypeConstraint {
        constructor(type: System.Type);
        DisplayName: string;
        Description: string;
        Arguments: any[];
        Builder: NUnit.Framework.Constraints.ConstraintBuilder;
        And: NUnit.Framework.Constraints.ConstraintExpression;
        With: NUnit.Framework.Constraints.ConstraintExpression;
        Or: NUnit.Framework.Constraints.ConstraintExpression;
        ApplyTo(actual: any): NUnit.Framework.Constraints.ConstraintResult;
        ToString(): string;
        After(delayInMilliseconds: number): NUnit.Framework.Constraints.DelayedConstraint;
        After(delayInMilliseconds: number, pollingInterval: number): NUnit.Framework.Constraints.DelayedConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ConstraintBuilder_OperatorStack {
        constructor(builder: NUnit.Framework.Constraints.ConstraintBuilder);
        Empty: boolean;
        Top: NUnit.Framework.Constraints.ConstraintOperator;
        Push(op: NUnit.Framework.Constraints.ConstraintOperator): void;
        Pop(): NUnit.Framework.Constraints.ConstraintOperator;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ConstraintBuilder_ConstraintStack {
        constructor(builder: NUnit.Framework.Constraints.ConstraintBuilder);
        Empty: boolean;
        Push(constraint: NUnit.Framework.Constraints.IConstraint): void;
        Pop(): NUnit.Framework.Constraints.IConstraint;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NUnitEqualityComparer_FailurePoint {
        constructor();
        Position: number;
        ExpectedValue: any; // System.Object
        ActualValue: any; // System.Object
        ExpectedHasData: boolean;
        ActualHasData: boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
    }
    export namespace Interfaces {
      export interface IMethodInfo {
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        MethodInfo: System.Reflection.MethodInfo;
        Name: string;
        IsAbstract: boolean;
        IsPublic: boolean;
        ContainsGenericParameters: boolean;
        IsGenericMethod: boolean;
        IsGenericMethodDefinition: boolean;
        ReturnType: NUnit.Framework.Interfaces.ITypeInfo;
        GetParameters(): NUnit.Framework.Interfaces.IParameterInfo[];
        GetGenericArguments(): System.Type[];
        MakeGenericMethod(...typeArguments: System.Type[]): NUnit.Framework.Interfaces.IMethodInfo;
        Invoke(fixture: any, ...args: any[]): any;
      }
      export interface IParameterInfo {
        IsOptional: boolean;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        ParameterInfo: System.Reflection.ParameterInfo;
        ParameterType: System.Type;
      }
      export interface IReflectionInfo {
      }
      export interface ITypeInfo {
        Type: System.Type;
        BaseType: NUnit.Framework.Interfaces.ITypeInfo;
        Name: string;
        FullName: string;
        Assembly: System.Reflection.Assembly;
        Namespace: string;
        IsAbstract: boolean;
        IsGenericType: boolean;
        ContainsGenericParameters: boolean;
        IsGenericTypeDefinition: boolean;
        IsSealed: boolean;
        IsStaticClass: boolean;
        IsType(type: System.Type): boolean;
        GetDisplayName(): string;
        GetDisplayName(args: any[]): string;
        GetGenericTypeDefinition(): System.Type;
        MakeGenericType(typeArgs: System.Type[]): NUnit.Framework.Interfaces.ITypeInfo;
        HasMethodWithAttribute(attrType: System.Type): boolean;
        GetMethods(flags: System.Reflection.BindingFlags): NUnit.Framework.Interfaces.IMethodInfo[];
        GetConstructor(argTypes: System.Type[]): System.Reflection.ConstructorInfo;
        HasConstructor(argTypes: System.Type[]): boolean;
        Construct(args: any[]): any;
      }
      export class TestOutput {
        constructor(text: string, stream: string, testName: string);
        Text: string;
        Stream: string;
        TestName: string;
        ToString(): string;
        ToXml(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export interface ICombiningStrategy {
        GetTestCases(sources: System.Collections.IEnumerable[]): System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestCaseData>;
      }
      export interface ISimpleTestBuilder {
        BuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo, suite: NUnit.Framework.Internal.Test): NUnit.Framework.Internal.TestMethod;
      }
      export interface ITestBuilder {
        BuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo, suite: NUnit.Framework.Internal.Test): System.Collections.Generic.IEnumerable<NUnit.Framework.Internal.TestMethod>;
      }
      export interface IParameterDataProvider {
        HasDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): boolean;
        GetDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): System.Collections.IEnumerable;
      }
      export interface IParameterDataSource {
        GetData(parameter: NUnit.Framework.Interfaces.IParameterInfo): System.Collections.IEnumerable;
      }
      export interface IPropertyBag {
        Keys: System.Collections.Generic.ICollection<string>;
        Add(key: string, value: any): void;
        Set(key: string, value: any): void;
        Get(key: string): any;
        ContainsKey(key: string): boolean;
      }
      export interface ITest {
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        TestCaseCount: number;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        Parent: NUnit.Framework.Interfaces.ITest;
        IsSuite: boolean;
        HasChildren: boolean;
        Tests: NUnit.Framework.Interfaces.ITest[];
        Fixture: any; // System.Object
      }
      export interface ITestData {
        TestName: string;
        RunState: NUnit.Framework.Interfaces.RunState;
        Arguments: any[];
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
      }
      export interface ITestFixtureData {
        TypeArgs: System.Type[];
      }
      export interface ITestCaseData {
        ExpectedResult: any; // System.Object
        HasExpectedResult: boolean;
      }
      export interface ITestFilter {
        Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
        IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
      }
      export interface ITestListener {
        TestStarted(test: NUnit.Framework.Interfaces.ITest): void;
        TestFinished(result: NUnit.Framework.Interfaces.ITestResult): void;
        TestOutput(output: NUnit.Framework.Interfaces.TestOutput): void;
      }
      export interface ITestResult {
        ResultState: NUnit.Framework.Interfaces.ResultState;
        Name: string;
        FullName: string;
        Duration: number;
        StartTime: System.DateTime;
        EndTime: System.DateTime;
        Message: string;
        StackTrace: string;
        AssertCount: number;
        FailCount: number;
        PassCount: number;
        SkipCount: number;
        InconclusiveCount: number;
        HasChildren: boolean;
        Children: System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestResult>;
        Test: NUnit.Framework.Interfaces.ITest;
        Output: string;
      }
      export interface IXmlNodeBuilder {
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
      }
      export class ResultState {
        constructor(status: NUnit.Framework.Interfaces.TestStatus);
        constructor(status: NUnit.Framework.Interfaces.TestStatus, label: string);
        constructor(status: NUnit.Framework.Interfaces.TestStatus, site: NUnit.Framework.Interfaces.FailureSite);
        constructor(status: NUnit.Framework.Interfaces.TestStatus, label: string, site: NUnit.Framework.Interfaces.FailureSite);
        Status: NUnit.Framework.Interfaces.TestStatus;
        Label: string;
        Site: NUnit.Framework.Interfaces.FailureSite;
        static Inconclusive: NUnit.Framework.Interfaces.ResultState;
        static Skipped: NUnit.Framework.Interfaces.ResultState;
        static Ignored: NUnit.Framework.Interfaces.ResultState;
        static Explicit: NUnit.Framework.Interfaces.ResultState;
        static Success: NUnit.Framework.Interfaces.ResultState;
        static Failure: NUnit.Framework.Interfaces.ResultState;
        static Error: NUnit.Framework.Interfaces.ResultState;
        static Cancelled: NUnit.Framework.Interfaces.ResultState;
        static NotRunnable: NUnit.Framework.Interfaces.ResultState;
        static ChildFailure: NUnit.Framework.Interfaces.ResultState;
        static SetUpFailure: NUnit.Framework.Interfaces.ResultState;
        static SetUpError: NUnit.Framework.Interfaces.ResultState;
        static TearDownError: NUnit.Framework.Interfaces.ResultState;
        WithSite(site: NUnit.Framework.Interfaces.FailureSite): NUnit.Framework.Interfaces.ResultState;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        ToString(): string;
        GetType(): System.Type;
      }
      export enum FailureSite {
        Test = 0,
        SetUp = 1,
        TearDown = 2,
        Parent = 3,
        Child = 4,
      }
      export enum RunState {
        NotRunnable = 0,
        Runnable = 1,
        Explicit = 2,
        Skipped = 3,
        Ignored = 4,
      }
      export enum TestStatus {
        Inconclusive = 0,
        Skipped = 1,
        Passed = 2,
        Failed = 3,
      }
      export class TNode {
        constructor(name: string);
        constructor(name: string, value: string);
        constructor(name: string, value: string, valueIsCDATA: boolean);
        Name: string;
        Value: string;
        ValueIsCDATA: boolean;
        Attributes: NUnit.Framework.Interfaces.AttributeDictionary;
        ChildNodes: NUnit.Framework.Interfaces.TNode[];
        FirstChild: NUnit.Framework.Interfaces.TNode;
        OuterXml: string;
        static FromXml(xmlText: string): NUnit.Framework.Interfaces.TNode;
        AddElement(name: string): NUnit.Framework.Interfaces.TNode;
        AddElement(name: string, value: string): NUnit.Framework.Interfaces.TNode;
        AddElementWithCDATA(name: string, value: string): NUnit.Framework.Interfaces.TNode;
        AddAttribute(name: string, value: string): void;
        SelectSingleNode(xpath: string): NUnit.Framework.Interfaces.TNode;
        SelectNodes(xpath: string): NUnit.Framework.Interfaces.TNode[];
        WriteTo(writer: any): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class NodeList {
        constructor();
        Capacity: number;
        Count: number;
        Add(item: NUnit.Framework.Interfaces.TNode): void;
        AddRange(collection: System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.TNode>): void;
        AsReadOnly(): NUnit.Framework.Interfaces.TNode[];
        BinarySearch(index: number, count: number, item: NUnit.Framework.Interfaces.TNode, comparer: System.Collections.Generic.IComparer<NUnit.Framework.Interfaces.TNode>): number;
        BinarySearch(item: NUnit.Framework.Interfaces.TNode): number;
        BinarySearch(item: NUnit.Framework.Interfaces.TNode, comparer: System.Collections.Generic.IComparer<NUnit.Framework.Interfaces.TNode>): number;
        Clear(): void;
        Contains(item: NUnit.Framework.Interfaces.TNode): boolean;
        CopyTo(array: NUnit.Framework.Interfaces.TNode[]): void;
        CopyTo(index: number, array: NUnit.Framework.Interfaces.TNode[], arrayIndex: number, count: number): void;
        CopyTo(array: NUnit.Framework.Interfaces.TNode[], arrayIndex: number): void;
        Exists(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): boolean;
        Find(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): NUnit.Framework.Interfaces.TNode;
        FindAll(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): NUnit.Framework.Interfaces.TNode[];
        FindIndex(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): number;
        FindIndex(startIndex: number, match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): number;
        FindIndex(startIndex: number, count: number, match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): number;
        FindLast(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): NUnit.Framework.Interfaces.TNode;
        FindLastIndex(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): number;
        FindLastIndex(startIndex: number, match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): number;
        FindLastIndex(startIndex: number, count: number, match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): number;
        ForEach(action: ((obj: NUnit.Framework.Interfaces.TNode) => void)): void;
        GetEnumerator(): System.Collections.Generic.List<NUnit.Framework.Interfaces.TNode>;
        GetRange(index: number, count: number): NUnit.Framework.Interfaces.TNode[];
        IndexOf(item: NUnit.Framework.Interfaces.TNode): number;
        IndexOf(item: NUnit.Framework.Interfaces.TNode, index: number): number;
        IndexOf(item: NUnit.Framework.Interfaces.TNode, index: number, count: number): number;
        Insert(index: number, item: NUnit.Framework.Interfaces.TNode): void;
        InsertRange(index: number, collection: System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.TNode>): void;
        LastIndexOf(item: NUnit.Framework.Interfaces.TNode): number;
        LastIndexOf(item: NUnit.Framework.Interfaces.TNode, index: number): number;
        LastIndexOf(item: NUnit.Framework.Interfaces.TNode, index: number, count: number): number;
        Remove(item: NUnit.Framework.Interfaces.TNode): boolean;
        RemoveAll(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): number;
        RemoveAt(index: number): void;
        RemoveRange(index: number, count: number): void;
        Reverse(): void;
        Reverse(index: number, count: number): void;
        Sort(): void;
        Sort(comparer: System.Collections.Generic.IComparer<NUnit.Framework.Interfaces.TNode>): void;
        Sort(index: number, count: number, comparer: System.Collections.Generic.IComparer<NUnit.Framework.Interfaces.TNode>): void;
        Sort(comparison: ((x: NUnit.Framework.Interfaces.TNode, y: NUnit.Framework.Interfaces.TNode) => number)): void;
        ToArray(): NUnit.Framework.Interfaces.TNode[];
        TrimExcess(): void;
        TrueForAll(match: ((obj: NUnit.Framework.Interfaces.TNode) => boolean)): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class AttributeDictionary {
        constructor();
        Comparer: System.Collections.Generic.IEqualityComparer<string>;
        Count: number;
        Keys: Record<string, string>;
        Values: Record<string, string>;
        Add(key: string, value: string): void;
        Clear(): void;
        ContainsKey(key: string): boolean;
        ContainsValue(value: string): boolean;
        GetEnumerator(): Record<string, string>;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        OnDeserialization(sender: any): void;
        Remove(key: string): boolean;
        TryAdd(key: string, value: string): boolean;
        EnsureCapacity(capacity: number): number;
        TrimExcess(): void;
        TrimExcess(capacity: number): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export interface IFixtureBuilder {
        BuildFrom(typeInfo: NUnit.Framework.Interfaces.ITypeInfo): System.Collections.Generic.IEnumerable<NUnit.Framework.Internal.TestSuite>;
      }
      export interface IImplyFixture {
      }
      export interface IApplyToContext {
        ApplyToContext(context: NUnit.Framework.Internal.ITestExecutionContext): void;
      }
      export interface IApplyToTest {
        ApplyToTest(test: NUnit.Framework.Internal.Test): void;
      }
      export interface ISuiteBuilder {
        CanBuildFrom(typeInfo: NUnit.Framework.Interfaces.ITypeInfo): boolean;
        BuildFrom(typeInfo: NUnit.Framework.Interfaces.ITypeInfo): NUnit.Framework.Internal.TestSuite;
      }
      export interface ITestCaseBuilder {
        CanBuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo, suite: NUnit.Framework.Internal.Test): boolean;
        BuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo, suite: NUnit.Framework.Internal.Test): NUnit.Framework.Internal.Test;
      }
      export interface ICommandWrapper {
        Wrap(command: NUnit.Framework.Internal.Commands.TestCommand): NUnit.Framework.Internal.Commands.TestCommand;
      }
      export interface IWrapTestMethod {
      }
      export interface IWrapSetUpTearDown {
      }
    }
    export namespace Internal {
      export class AssemblyHelper {
        static GetAssemblyPath(assembly: System.Reflection.Assembly): string;
        static GetDirectoryName(assembly: System.Reflection.Assembly): string;
        static GetAssemblyName(assembly: System.Reflection.Assembly): System.Reflection.AssemblyName;
        static Load(nameOrPath: string): System.Reflection.Assembly;
        static GetAssemblyPathFromCodeBase(codeBase: string): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export interface ILogger {
        Error(message: string): void;
        Error(message: string, ...args: any[]): void;
        Warning(message: string): void;
        Warning(message: string, ...args: any[]): void;
        Info(message: string): void;
        Info(message: string, ...args: any[]): void;
        Debug(message: string): void;
        Debug(message: string, ...args: any[]): void;
      }
      export class InternalTrace {
        static Initialized: boolean;
        static Initialize(logName: string, level: NUnit.Framework.Internal.InternalTraceLevel): void;
        static Initialize(writer: System.IO.TextWriter, level: NUnit.Framework.Internal.InternalTraceLevel): void;
        static GetLogger(name: string): NUnit.Framework.Internal.Logger;
        static GetLogger(type: System.Type): NUnit.Framework.Internal.Logger;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum InternalTraceLevel {
        Default = 0,
        Off = 1,
        Error = 2,
        Warning = 3,
        Info = 4,
        Debug = 5,
        Verbose = 5,
      }
      export class InternalTraceWriter {
        constructor(logPath: string);
        constructor(writer: System.IO.TextWriter);
        Encoding: System.Text.Encoding;
        FormatProvider: System.IFormatProvider;
        NewLine: string;
        Write(value: System.Char): void;
        Write(value: string): void;
        WriteLine(value: string): void;
        Flush(): void;
        Close(): void;
        Dispose(): void;
        DisposeAsync(): System.Threading.Tasks.ValueTask;
        Write(buffer: System.Char[]): void;
        Write(buffer: System.Char[], index: number, count: number): void;
        Write(buffer: System.ReadOnlySpan<System.Char>): void;
        Write(value: boolean): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: any): void;
        Write(format: string, arg0: any): void;
        Write(format: string, arg0: any, arg1: any): void;
        Write(format: string, arg0: any, arg1: any, arg2: any): void;
        Write(format: string, ...arg: any[]): void;
        WriteLine(): void;
        WriteLine(value: System.Char): void;
        WriteLine(buffer: System.Char[]): void;
        WriteLine(buffer: System.Char[], index: number, count: number): void;
        WriteLine(buffer: System.ReadOnlySpan<System.Char>): void;
        WriteLine(value: boolean): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: any): void;
        WriteLine(format: string, arg0: any): void;
        WriteLine(format: string, arg0: any, arg1: any): void;
        WriteLine(format: string, arg0: any, arg1: any, arg2: any): void;
        WriteLine(format: string, ...arg: any[]): void;
        WriteAsync(value: System.Char): System.Threading.Tasks.Task;
        WriteAsync(value: string): System.Threading.Tasks.Task;
        WriteAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
        WriteAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
        WriteAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
        WriteLineAsync(value: System.Char): System.Threading.Tasks.Task;
        WriteLineAsync(value: string): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
        WriteLineAsync(): System.Threading.Tasks.Task;
        FlushAsync(): System.Threading.Tasks.Task;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        InitializeLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class Logger {
        constructor(name: string, level: NUnit.Framework.Internal.InternalTraceLevel, writer: System.IO.TextWriter);
        Error(message: string): void;
        Error(message: string, ...args: any[]): void;
        Warning(message: string): void;
        Warning(message: string, ...args: any[]): void;
        Info(message: string): void;
        Info(message: string, ...args: any[]): void;
        Debug(message: string): void;
        Debug(message: string, ...args: any[]): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class MethodWrapper {
        constructor(type: System.Type, method: System.Reflection.MethodInfo);
        constructor(type: System.Type, methodName: string);
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        MethodInfo: System.Reflection.MethodInfo;
        Name: string;
        IsAbstract: boolean;
        IsPublic: boolean;
        ContainsGenericParameters: boolean;
        IsGenericMethod: boolean;
        IsGenericMethodDefinition: boolean;
        ReturnType: NUnit.Framework.Interfaces.ITypeInfo;
        GetParameters(): NUnit.Framework.Interfaces.IParameterInfo[];
        GetGenericArguments(): System.Type[];
        MakeGenericMethod(...typeArguments: System.Type[]): NUnit.Framework.Interfaces.IMethodInfo;
        Invoke(fixture: any, ...args: any[]): any;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ParameterWrapper {
        constructor(method: NUnit.Framework.Interfaces.IMethodInfo, parameterInfo: System.Reflection.ParameterInfo);
        IsOptional: boolean;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        ParameterInfo: System.Reflection.ParameterInfo;
        ParameterType: System.Type;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestNameGenerator {
        constructor();
        constructor(pattern: string);
        static DefaultTestNamePattern: string;
        GetDisplayName(testMethod: NUnit.Framework.Internal.TestMethod): string;
        GetDisplayName(testMethod: NUnit.Framework.Internal.TestMethod, args: any[]): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TypeWrapper {
        constructor(type: System.Type);
        Type: System.Type;
        BaseType: NUnit.Framework.Interfaces.ITypeInfo;
        Name: string;
        FullName: string;
        Assembly: System.Reflection.Assembly;
        Namespace: string;
        IsAbstract: boolean;
        IsGenericType: boolean;
        ContainsGenericParameters: boolean;
        IsGenericTypeDefinition: boolean;
        IsSealed: boolean;
        IsStaticClass: boolean;
        IsType(type: System.Type): boolean;
        GetDisplayName(): string;
        GetDisplayName(args: any[]): string;
        MakeGenericType(typeArgs: System.Type[]): NUnit.Framework.Interfaces.ITypeInfo;
        GetGenericTypeDefinition(): System.Type;
        HasMethodWithAttribute(attributeType: System.Type): boolean;
        GetMethods(flags: System.Reflection.BindingFlags): NUnit.Framework.Interfaces.IMethodInfo[];
        GetConstructor(argTypes: System.Type[]): System.Reflection.ConstructorInfo;
        HasConstructor(argTypes: System.Type[]): boolean;
        Construct(args: any[]): any;
        ToString(): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class ActionsHelper {
        constructor();
        static ExecuteBeforeActions(actions: any, test: NUnit.Framework.Interfaces.ITest): void;
        static ExecuteAfterActions(actions: any, test: NUnit.Framework.Interfaces.ITest): void;
        static GetActionsFromTestAssembly(testAssembly: NUnit.Framework.Internal.TestAssembly): NUnit.Framework.ITestAction[];
        static GetActionsFromTestMethodInfo(testAssembly: NUnit.Framework.Interfaces.IMethodInfo): NUnit.Framework.ITestAction[];
        static GetActionsFromAttributeProvider(attributeProvider: System.Reflection.ICustomAttributeProvider): NUnit.Framework.ITestAction[];
        static GetActionsFromTypesAttributes(type: System.Type): NUnit.Framework.ITestAction[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TextMessageWriter {
        constructor();
        constructor(userMessage: string, ...args: any[]);
        MaxLineLength: number;
        Encoding: System.Text.Encoding;
        FormatProvider: System.IFormatProvider;
        NewLine: string;
        static Pfx_Expected: string;
        static Pfx_Actual: string;
        static PrefixLength: number;
        WriteMessageLine(level: number, message: string, ...args: any[]): void;
        DisplayDifferences(result: NUnit.Framework.Constraints.ConstraintResult): void;
        DisplayDifferences(expected: any, actual: any): void;
        DisplayDifferences(expected: any, actual: any, tolerance: NUnit.Framework.Constraints.Tolerance): void;
        DisplayStringDifferences(expected: string, actual: string, mismatch: number, ignoreCase: boolean, clipping: boolean): void;
        WriteActualValue(actual: any): void;
        WriteValue(val: any): void;
        WriteCollectionElements(collection: System.Collections.IEnumerable, start: number, max: number): void;
        WriteMessageLine(message: string, ...args: any[]): void;
        Close(): void;
        GetStringBuilder(): System.Text.StringBuilder;
        Write(value: System.Char): void;
        Write(buffer: System.Char[], index: number, count: number): void;
        Write(value: string): void;
        WriteAsync(value: System.Char): System.Threading.Tasks.Task;
        WriteAsync(value: string): System.Threading.Tasks.Task;
        WriteAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
        WriteLineAsync(value: System.Char): System.Threading.Tasks.Task;
        WriteLineAsync(value: string): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
        FlushAsync(): System.Threading.Tasks.Task;
        ToString(): string;
        Dispose(): void;
        DisposeAsync(): System.Threading.Tasks.ValueTask;
        Flush(): void;
        Write(buffer: System.Char[]): void;
        Write(buffer: System.ReadOnlySpan<System.Char>): void;
        Write(value: boolean): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: number): void;
        Write(value: any): void;
        Write(format: string, arg0: any): void;
        Write(format: string, arg0: any, arg1: any): void;
        Write(format: string, arg0: any, arg1: any, arg2: any): void;
        Write(format: string, ...arg: any[]): void;
        WriteLine(): void;
        WriteLine(value: System.Char): void;
        WriteLine(buffer: System.Char[]): void;
        WriteLine(buffer: System.Char[], index: number, count: number): void;
        WriteLine(buffer: System.ReadOnlySpan<System.Char>): void;
        WriteLine(value: boolean): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: number): void;
        WriteLine(value: string): void;
        WriteLine(value: any): void;
        WriteLine(format: string, arg0: any): void;
        WriteLine(format: string, arg0: any, arg1: any): void;
        WriteLine(format: string, arg0: any, arg1: any, arg2: any): void;
        WriteLine(format: string, ...arg: any[]): void;
        WriteAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
        WriteAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
        WriteLineAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
        WriteLineAsync(): System.Threading.Tasks.Task;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        InitializeLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class GenericMethodHelper {
        constructor(method: System.Reflection.MethodInfo);
        GetTypeArguments(argList: any[]): System.Type[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class InvalidDataSourceException {
        constructor();
        constructor(message: string);
        constructor(message: string, inner: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException(): System.Exception;
        ToString(): string;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        GetType(): System.Type;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class Randomizer {
        constructor();
        constructor(seed: number);
        static InitialSeed: number;
        static DefaultStringChars: string;
        static GetRandomizer(member: System.Reflection.MemberInfo): NUnit.Framework.Internal.Randomizer;
        static GetRandomizer(parameter: System.Reflection.ParameterInfo): NUnit.Framework.Internal.Randomizer;
        static CreateRandomizer(): NUnit.Framework.Internal.Randomizer;
        NextUInt(): number;
        NextUInt(max: number): number;
        NextUInt(min: number, max: number): number;
        NextShort(): number;
        NextShort(max: number): number;
        NextShort(min: number, max: number): number;
        NextUShort(): number;
        NextUShort(max: number): number;
        NextUShort(min: number, max: number): number;
        NextLong(): number;
        NextLong(max: number): number;
        NextLong(min: number, max: number): number;
        NextULong(): number;
        NextULong(max: number): number;
        NextULong(min: number, max: number): number;
        NextByte(): Byte;
        NextByte(max: Byte): Byte;
        NextByte(min: Byte, max: Byte): Byte;
        NextSByte(): System.SByte;
        NextSByte(max: System.SByte): System.SByte;
        NextSByte(min: System.SByte, max: System.SByte): System.SByte;
        NextBool(): boolean;
        NextBool(probability: number): boolean;
        NextDouble(max: number): number;
        NextDouble(min: number, max: number): number;
        NextFloat(): number;
        NextFloat(max: number): number;
        NextFloat(min: number, max: number): number;
        NextEnum(type: System.Type): any;
        GetString(outputLength: number, allowedChars: string): string;
        GetString(outputLength: number): string;
        GetString(): string;
        NextDecimal(): number;
        NextDecimal(max: number): number;
        NextDecimal(min: number, max: number): number;
        Next(): number;
        Next(minValue: number, maxValue: number): number;
        Next(maxValue: number): number;
        NextDouble(): number;
        NextBytes(buffer: Byte[]): void;
        NextBytes(buffer: System.Span<Byte>): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class StackFilter {
        static Filter(rawTrace: string): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class StringUtil {
        constructor();
        static Compare(strA: string, strB: string, ignoreCase: boolean): number;
        static StringsEqual(strA: string, strB: string, ignoreCase: boolean): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestFixtureParameters {
        constructor();
        constructor(exception: System.Exception);
        constructor(...args: any[]);
        constructor(data: NUnit.Framework.Interfaces.ITestFixtureData);
        TypeArgs: System.Type[];
        RunState: NUnit.Framework.Interfaces.RunState;
        Arguments: any[];
        TestName: string;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        OriginalArguments: any[];
        ApplyToTest(test: NUnit.Framework.Internal.Test): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestParameters {
        constructor();
        constructor(args: any[]);
        constructor(exception: System.Exception);
        constructor(data: NUnit.Framework.Interfaces.ITestData);
        RunState: NUnit.Framework.Interfaces.RunState;
        Arguments: any[];
        TestName: string;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        OriginalArguments: any[];
        ApplyToTest(test: NUnit.Framework.Internal.Test): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum TestExecutionStatus {
        Running = 0,
        StopRequested = 1,
        AbortRequested = 2,
      }
      export class PropertyNames {
        constructor();
        static AppDomain: string;
        static JoinType: string;
        static ProcessID: string;
        static ProviderStackTrace: string;
        static SkipReason: string;
        static Author: string;
        static ApartmentState: string;
        static Category: string;
        static Description: string;
        static LevelOfParallelism: string;
        static MaxTime: string;
        static ParallelScope: string;
        static RepeatCount: string;
        static RequiresThread: string;
        static SetCulture: string;
        static SetUICulture: string;
        static TestOf: string;
        static Timeout: string;
        static IgnoreUntilDate: string;
        static Order: string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class CultureDetector {
        constructor();
        constructor(culture: string);
        Reason: string;
        IsCultureSupported(cultures: string[]): boolean;
        IsCultureSupported(cultureAttribute: any): boolean;
        IsCultureSupported(culture: string): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ExceptionHelper {
        constructor();
        static Rethrow(exception: System.Exception): void;
        static BuildMessage(exception: System.Exception): string;
        static BuildStackTrace(exception: System.Exception): string;
        static GetStackTrace(exception: System.Exception): string;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class InvalidTestFixtureException {
        constructor();
        constructor(message: string);
        constructor(message: string, inner: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException(): System.Exception;
        ToString(): string;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        GetType(): System.Type;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class NUnitException {
        constructor();
        constructor(message: string);
        constructor(message: string, inner: System.Exception);
        Message: string;
        Data: System.Collections.IDictionary;
        InnerException: System.Exception;
        TargetSite: System.Reflection.MethodBase;
        StackTrace: string;
        HelpLink: string;
        Source: string;
        HResult: number;
        GetBaseException(): System.Exception;
        ToString(): string;
        GetObjectData(info: System.Runtime.Serialization.SerializationInfo, context: System.Runtime.Serialization.StreamingContext): void;
        GetType(): System.Type;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export class OSPlatform {
        constructor(platform: System.PlatformID, version: System.Version);
        constructor(platform: System.PlatformID, version: System.Version, product: NUnit.Framework.Internal.OSPlatform_ProductType);
        static CurrentPlatform: NUnit.Framework.Internal.OSPlatform;
        Platform: System.PlatformID;
        Version: System.Version;
        Product: NUnit.Framework.Internal.OSPlatform_ProductType;
        IsWindows: boolean;
        IsUnix: boolean;
        IsWin32S: boolean;
        IsWin32Windows: boolean;
        IsWin32NT: boolean;
        IsWinCE: boolean;
        IsXbox: boolean;
        IsMacOSX: boolean;
        IsWin95: boolean;
        IsWin98: boolean;
        IsWinME: boolean;
        IsNT3: boolean;
        IsNT4: boolean;
        IsNT5: boolean;
        IsWin2K: boolean;
        IsWinXP: boolean;
        IsWin2003Server: boolean;
        IsNT6: boolean;
        IsNT60: boolean;
        IsNT61: boolean;
        IsNT62: boolean;
        IsNT63: boolean;
        IsVista: boolean;
        IsWin2008Server: boolean;
        IsWin2008ServerR1: boolean;
        IsWin2008ServerR2: boolean;
        IsWin2012Server: boolean;
        IsWin2012ServerR1: boolean;
        IsWin2012ServerR2: boolean;
        IsWindows7: boolean;
        IsWindows8: boolean;
        IsWindows81: boolean;
        IsWindows10: boolean;
        IsWindowsServer10: boolean;
        static UnixPlatformID_Microsoft: System.PlatformID;
        static UnixPlatformID_Mono: System.PlatformID;
        static XBoxPlatformID: System.PlatformID;
        static MacOSXPlatformID: System.PlatformID;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestCaseParameters {
        constructor();
        constructor(exception: System.Exception);
        constructor(args: any[]);
        constructor(data: NUnit.Framework.Interfaces.ITestCaseData);
        ExpectedResult: any; // System.Object
        HasExpectedResult: boolean;
        RunState: NUnit.Framework.Interfaces.RunState;
        Arguments: any[];
        TestName: string;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        OriginalArguments: any[];
        ApplyToTest(test: NUnit.Framework.Internal.Test): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PlatformHelper {
        constructor();
        constructor(os: NUnit.Framework.Internal.OSPlatform, rt: NUnit.Framework.Internal.RuntimeFramework);
        Reason: string;
        static OSPlatforms: string;
        static RuntimePlatforms: string;
        IsPlatformSupported(platforms: string[]): boolean;
        IsPlatformSupported(platformAttribute: any): boolean;
        IsPlatformSupported(testCaseAttribute: any): boolean;
        IsPlatformSupported(platform: string): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class PropertyBag {
        constructor();
        Keys: System.Collections.Generic.ICollection<string>;
        Add(key: string, value: any): void;
        Set(key: string, value: any): void;
        Get(key: string): any;
        ContainsKey(key: string): boolean;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class Reflect {
        static MethodCallWrapper: ((arg: (() => any)) => any);
        static ConstructorCallWrapper: ((arg1: System.Type, arg2: any[]) => any);
        static GetMethodsWithAttribute(fixtureType: System.Type, attributeType: System.Type, inherit: boolean): System.Reflection.MethodInfo[];
        static HasMethodWithAttribute(fixtureType: System.Type, attributeType: System.Type): boolean;
        static Construct(type: System.Type): any;
        static Construct(type: System.Type, argumentsCS: any[]): any;
        static InvokeMethod(method: System.Reflection.MethodInfo, fixture: any): any;
        static InvokeMethod(method: System.Reflection.MethodInfo, fixture: any, ...args: any[]): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestResult {
        constructor(test: NUnit.Framework.Interfaces.ITest);
        Test: NUnit.Framework.Interfaces.ITest;
        ResultState: NUnit.Framework.Interfaces.ResultState;
        Name: string;
        FullName: string;
        Duration: number;
        StartTime: System.DateTime;
        EndTime: System.DateTime;
        Message: string;
        StackTrace: string;
        AssertCount: number;
        FailCount: number;
        PassCount: number;
        SkipCount: number;
        InconclusiveCount: number;
        HasChildren: boolean;
        Children: System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestResult>;
        OutWriter: System.IO.TextWriter;
        Output: string;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState): void;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState, message: string): void;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState, message: string, stackTrace: string): void;
        RecordException(ex: System.Exception): void;
        RecordException(ex: System.Exception, site: NUnit.Framework.Interfaces.FailureSite): void;
        RecordTearDownException(ex: System.Exception): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum RuntimeType {
        Any = 0,
        Net = 1,
        NetCF = 2,
        SSCLI = 3,
        Mono = 4,
        Silverlight = 5,
        MonoTouch = 6,
      }
      export class RuntimeFramework {
        constructor(runtime: NUnit.Framework.Internal.RuntimeType, version: System.Version);
        static CurrentFramework: NUnit.Framework.Internal.RuntimeFramework;
        Runtime: NUnit.Framework.Internal.RuntimeType;
        FrameworkVersion: System.Version;
        ClrVersion: System.Version;
        AllowAnyVersion: boolean;
        DisplayName: string;
        static DefaultVersion: System.Version;
        static Parse(s: string): NUnit.Framework.Internal.RuntimeFramework;
        ToString(): string;
        Supports(target: NUnit.Framework.Internal.RuntimeFramework): boolean;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
      }
      export interface ITestExecutionContext {
        CurrentTest: NUnit.Framework.Internal.Test;
        StartTime: System.DateTime;
        StartTicks: number;
        CurrentResult: NUnit.Framework.Internal.TestResult;
        OutWriter: System.IO.TextWriter;
        TestObject: any; // System.Object
        WorkDirectory: string;
        StopOnError: boolean;
        ExecutionStatus: NUnit.Framework.Internal.TestExecutionStatus;
        Dispatcher: NUnit.Framework.Internal.Execution.IWorkItemDispatcher;
        ParallelScope: NUnit.Framework.ParallelScope;
        WorkerId: string;
        RandomGenerator: NUnit.Framework.Internal.Randomizer;
        TestCaseTimeout: number;
        UpstreamActions: NUnit.Framework.ITestAction[];
        CurrentCulture: System.Globalization.CultureInfo;
        CurrentUICulture: System.Globalization.CultureInfo;
        CurrentValueFormatter: ((val: any) => string);
        IsSingleThreaded: boolean;
        IncrementAssertCount(): void;
        AddFormatter(formatterFactory: ((next: ((val: any) => string)) => ((val: any) => string))): void;
      }
      export class TestExecutionContext {
        constructor();
        constructor(other: NUnit.Framework.Internal.TestExecutionContext);
        static CurrentContext: NUnit.Framework.Internal.ITestExecutionContext;
        CurrentTest: NUnit.Framework.Internal.Test;
        StartTime: System.DateTime;
        StartTicks: number;
        CurrentResult: NUnit.Framework.Internal.TestResult;
        OutWriter: System.IO.TextWriter;
        TestObject: any; // System.Object
        WorkDirectory: string;
        StopOnError: boolean;
        ExecutionStatus: NUnit.Framework.Internal.TestExecutionStatus;
        Dispatcher: NUnit.Framework.Internal.Execution.IWorkItemDispatcher;
        ParallelScope: NUnit.Framework.ParallelScope;
        WorkerId: string;
        RandomGenerator: NUnit.Framework.Internal.Randomizer;
        TestCaseTimeout: number;
        UpstreamActions: NUnit.Framework.ITestAction[];
        CurrentCulture: System.Globalization.CultureInfo;
        CurrentUICulture: System.Globalization.CultureInfo;
        CurrentPrincipal: System.Security.Principal.IPrincipal;
        CurrentValueFormatter: ((val: any) => string);
        IsSingleThreaded: boolean;
        static GetTestExecutionContext(): NUnit.Framework.Internal.TestExecutionContext;
        static ClearCurrentContext(): void;
        UpdateContextFromEnvironment(): void;
        EstablishExecutionEnvironment(): void;
        IncrementAssertCount(): void;
        IncrementAssertCount(count: number): void;
        AddFormatter(formatterFactory: ((next: ((val: any) => string)) => ((val: any) => string))): void;
        InitializeLifetimeService(): any;
        CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
        GetLifetimeService(): any;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestFilter {
        IsEmpty: boolean;
        TopLevel: boolean;
        static Empty: NUnit.Framework.Internal.TestFilter;
        Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
        IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
        Match(test: NUnit.Framework.Interfaces.ITest): boolean;
        MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
        static FromXml(xmlText: string): NUnit.Framework.Internal.TestFilter;
        static FromXml(node: NUnit.Framework.Interfaces.TNode): NUnit.Framework.Internal.TestFilter;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestListener {
        static NULL: NUnit.Framework.Interfaces.ITestListener;
        TestStarted(test: NUnit.Framework.Interfaces.ITest): void;
        TestFinished(result: NUnit.Framework.Interfaces.ITestResult): void;
        TestOutput(output: NUnit.Framework.Interfaces.TestOutput): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestProgressReporter {
        constructor(handler: any);
        TestStarted(test: NUnit.Framework.Interfaces.ITest): void;
        TestFinished(result: NUnit.Framework.Interfaces.ITestResult): void;
        TestOutput(output: NUnit.Framework.Interfaces.TestOutput): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ParameterizedFixtureSuite {
        constructor(typeInfo: NUnit.Framework.Interfaces.ITypeInfo);
        TestType: string;
        Tests: NUnit.Framework.Interfaces.ITest[];
        TestCaseCount: number;
        Arguments: any[];
        HasChildren: boolean;
        XmlElementName: string;
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Fixture: any; // System.Object
        Seed: number;
        Sort(): void;
        Add(test: NUnit.Framework.Internal.Test): void;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ParameterizedMethodSuite {
        constructor(method: NUnit.Framework.Interfaces.IMethodInfo);
        TestType: string;
        Tests: NUnit.Framework.Interfaces.ITest[];
        TestCaseCount: number;
        Arguments: any[];
        HasChildren: boolean;
        XmlElementName: string;
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Fixture: any; // System.Object
        Seed: number;
        Sort(): void;
        Add(test: NUnit.Framework.Internal.Test): void;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class SetUpFixture {
        constructor(type: NUnit.Framework.Interfaces.ITypeInfo);
        Tests: NUnit.Framework.Interfaces.ITest[];
        TestCaseCount: number;
        Arguments: any[];
        HasChildren: boolean;
        XmlElementName: string;
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        TestType: string;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Fixture: any; // System.Object
        Seed: number;
        Sort(): void;
        Add(test: NUnit.Framework.Internal.Test): void;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class Test {
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        XmlElementName: string;
        TestType: string;
        TestCaseCount: number;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        HasChildren: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Tests: NUnit.Framework.Interfaces.ITest[];
        Fixture: any; // System.Object
        static IdPrefix: string;
        Seed: number;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestAssembly {
        constructor(assembly: System.Reflection.Assembly, path: string);
        constructor(path: string);
        Assembly: System.Reflection.Assembly;
        TestType: string;
        Tests: NUnit.Framework.Interfaces.ITest[];
        TestCaseCount: number;
        Arguments: any[];
        HasChildren: boolean;
        XmlElementName: string;
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Fixture: any; // System.Object
        Seed: number;
        Sort(): void;
        Add(test: NUnit.Framework.Internal.Test): void;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestFixture {
        constructor(fixtureType: NUnit.Framework.Interfaces.ITypeInfo);
        Tests: NUnit.Framework.Interfaces.ITest[];
        TestCaseCount: number;
        Arguments: any[];
        HasChildren: boolean;
        XmlElementName: string;
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        TestType: string;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Fixture: any; // System.Object
        Seed: number;
        Sort(): void;
        Add(test: NUnit.Framework.Internal.Test): void;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestMethod {
        constructor(method: NUnit.Framework.Interfaces.IMethodInfo);
        constructor(method: NUnit.Framework.Interfaces.IMethodInfo, parentSuite: NUnit.Framework.Internal.Test);
        HasChildren: boolean;
        Tests: NUnit.Framework.Interfaces.ITest[];
        XmlElementName: string;
        MethodName: string;
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        TestType: string;
        TestCaseCount: number;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Fixture: any; // System.Object
        Seed: number;
        parms: NUnit.Framework.Internal.TestCaseParameters;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestSuite {
        constructor(name: string);
        constructor(parentSuiteName: string, name: string);
        constructor(fixtureType: NUnit.Framework.Interfaces.ITypeInfo);
        constructor(fixtureType: System.Type);
        Tests: NUnit.Framework.Interfaces.ITest[];
        TestCaseCount: number;
        Arguments: any[];
        HasChildren: boolean;
        XmlElementName: string;
        Id: string;
        Name: string;
        FullName: string;
        ClassName: string;
        MethodName: string;
        TypeInfo: NUnit.Framework.Interfaces.ITypeInfo;
        Method: NUnit.Framework.Interfaces.IMethodInfo;
        RunState: NUnit.Framework.Interfaces.RunState;
        TestType: string;
        Properties: NUnit.Framework.Interfaces.IPropertyBag;
        IsSuite: boolean;
        Parent: NUnit.Framework.Interfaces.ITest;
        Fixture: any; // System.Object
        Seed: number;
        Sort(): void;
        Add(test: NUnit.Framework.Internal.Test): void;
        MakeTestResult(): NUnit.Framework.Internal.TestResult;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        ApplyAttributesToTest(provider: System.Reflection.ICustomAttributeProvider): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        CompareTo(obj: any): number;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class ThreadUtility {
        static Kill(thread: System.Threading.Thread): void;
        static Kill(thread: System.Threading.Thread, stateInfo: any): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TypeHelper {
        constructor();
        static NonmatchingType: System.Type;
        static GetDisplayName(type: System.Type): string;
        static GetDisplayName(type: System.Type, arglist: any[]): string;
        static BestCommonType(type1: System.Type, type2: System.Type): System.Type;
        static IsNumeric(type: System.Type): boolean;
        static ConvertArgumentList(arglist: any[], parameters: NUnit.Framework.Interfaces.IParameterInfo[]): void;
        static GetEnumValues(enumType: System.Type): System.Array;
        static GetEnumNames(enumType: System.Type): string[];
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestCaseResult {
        constructor(test: NUnit.Framework.Internal.TestMethod);
        FailCount: number;
        PassCount: number;
        SkipCount: number;
        InconclusiveCount: number;
        HasChildren: boolean;
        Children: System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestResult>;
        Test: NUnit.Framework.Interfaces.ITest;
        ResultState: NUnit.Framework.Interfaces.ResultState;
        Name: string;
        FullName: string;
        Duration: number;
        StartTime: System.DateTime;
        EndTime: System.DateTime;
        Message: string;
        StackTrace: string;
        AssertCount: number;
        OutWriter: System.IO.TextWriter;
        Output: string;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState): void;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState, message: string): void;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState, message: string, stackTrace: string): void;
        RecordException(ex: System.Exception): void;
        RecordException(ex: System.Exception, site: NUnit.Framework.Interfaces.FailureSite): void;
        RecordTearDownException(ex: System.Exception): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export class TestSuiteResult {
        constructor(suite: NUnit.Framework.Internal.TestSuite);
        FailCount: number;
        PassCount: number;
        SkipCount: number;
        InconclusiveCount: number;
        HasChildren: boolean;
        Children: System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestResult>;
        Test: NUnit.Framework.Interfaces.ITest;
        ResultState: NUnit.Framework.Interfaces.ResultState;
        Name: string;
        FullName: string;
        Duration: number;
        StartTime: System.DateTime;
        EndTime: System.DateTime;
        Message: string;
        StackTrace: string;
        AssertCount: number;
        OutWriter: System.IO.TextWriter;
        Output: string;
        AddResult(result: NUnit.Framework.Interfaces.ITestResult): void;
        ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
        AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState): void;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState, message: string): void;
        SetResult(resultState: NUnit.Framework.Interfaces.ResultState, message: string, stackTrace: string): void;
        RecordException(ex: System.Exception): void;
        RecordException(ex: System.Exception, site: NUnit.Framework.Interfaces.FailureSite): void;
        RecordTearDownException(ex: System.Exception): void;
        Equals(obj: any): boolean;
        GetHashCode(): number;
        GetType(): System.Type;
        ToString(): string;
      }
      export enum OSPlatform_ProductType {
        Unknown = 0,
        WorkStation = 1,
        DomainController = 2,
        Server = 3,
      }
      export namespace Builders {
        export class ParameterDataProvider {
          constructor(...providers: NUnit.Framework.Interfaces.IParameterDataProvider[]);
          HasDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): boolean;
          GetDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): System.Collections.IEnumerable;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class DefaultSuiteBuilder {
          constructor();
          CanBuildFrom(typeInfo: NUnit.Framework.Interfaces.ITypeInfo): boolean;
          BuildFrom(typeInfo: NUnit.Framework.Interfaces.ITypeInfo): NUnit.Framework.Internal.TestSuite;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NUnitTestCaseBuilder {
          constructor();
          BuildTestMethod(method: NUnit.Framework.Interfaces.IMethodInfo, parentSuite: NUnit.Framework.Internal.Test, parms: NUnit.Framework.Internal.TestCaseParameters): NUnit.Framework.Internal.TestMethod;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NamespaceTreeBuilder {
          constructor(rootSuite: NUnit.Framework.Internal.TestSuite);
          RootSuite: NUnit.Framework.Internal.TestSuite;
          Add(fixtures: NUnit.Framework.Internal.Test[]): void;
          Add(fixture: NUnit.Framework.Internal.TestSuite): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class CombinatorialStrategy {
          constructor();
          GetTestCases(sources: System.Collections.IEnumerable[]): System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestCaseData>;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class DatapointProvider {
          constructor();
          HasDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): boolean;
          GetDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): System.Collections.IEnumerable;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class DefaultTestCaseBuilder {
          constructor();
          CanBuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo): boolean;
          BuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo): NUnit.Framework.Internal.Test;
          CanBuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo, parentSuite: NUnit.Framework.Internal.Test): boolean;
          BuildFrom(method: NUnit.Framework.Interfaces.IMethodInfo, parentSuite: NUnit.Framework.Internal.Test): NUnit.Framework.Internal.Test;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NUnitTestFixtureBuilder {
          constructor();
          BuildFrom(typeInfo: NUnit.Framework.Interfaces.ITypeInfo): NUnit.Framework.Internal.TestSuite;
          BuildFrom(typeInfo: NUnit.Framework.Interfaces.ITypeInfo, testFixtureData: NUnit.Framework.Interfaces.ITestFixtureData): NUnit.Framework.Internal.TestSuite;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class PairwiseStrategy {
          constructor();
          GetTestCases(sources: System.Collections.IEnumerable[]): System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestCaseData>;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class ParameterDataSourceProvider {
          constructor();
          HasDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): boolean;
          GetDataFor(parameter: NUnit.Framework.Interfaces.IParameterInfo): System.Collections.IEnumerable;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class SequentialStrategy {
          constructor();
          GetTestCases(sources: System.Collections.IEnumerable[]): System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.ITestCaseData>;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
      }
      export namespace Commands {
        export class SetUpTearDownItem {
          constructor(setUpMethods: System.Reflection.MethodInfo[], tearDownMethods: System.Reflection.MethodInfo[]);
          HasMethods: boolean;
          RunSetUp(context: NUnit.Framework.Internal.ITestExecutionContext): void;
          RunTearDown(context: NUnit.Framework.Internal.ITestExecutionContext): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TestActionCommand {
          constructor(innerCommand: NUnit.Framework.Internal.Commands.TestCommand);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          GetInnerCommand(): NUnit.Framework.Internal.Commands.TestCommand;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TestActionItem {
          constructor(action: NUnit.Framework.ITestAction);
          BeforeTest(test: NUnit.Framework.Interfaces.ITest): void;
          AfterTest(test: NUnit.Framework.Interfaces.ITest): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class ApplyChangesToContextCommand {
          constructor(innerCommand: NUnit.Framework.Internal.Commands.TestCommand, changes: System.Collections.Generic.IEnumerable<NUnit.Framework.Interfaces.IApplyToContext>);
          Test: NUnit.Framework.Internal.Test;
          ApplyChanges(context: NUnit.Framework.Internal.ITestExecutionContext): void;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          GetInnerCommand(): NUnit.Framework.Internal.Commands.TestCommand;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class DelegatingTestCommand {
          Test: NUnit.Framework.Internal.Test;
          GetInnerCommand(): NUnit.Framework.Internal.Commands.TestCommand;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class MaxTimeCommand {
          constructor(innerCommand: NUnit.Framework.Internal.Commands.TestCommand, maxTime: number);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          GetInnerCommand(): NUnit.Framework.Internal.Commands.TestCommand;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class OneTimeSetUpCommand {
          constructor(suite: NUnit.Framework.Internal.TestSuite, setUpTearDown: NUnit.Framework.Internal.Commands.SetUpTearDownItem[], actions: NUnit.Framework.Internal.Commands.TestActionItem[]);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class OneTimeTearDownCommand {
          constructor(suite: NUnit.Framework.Internal.TestSuite, setUpTearDownItems: NUnit.Framework.Internal.Commands.SetUpTearDownItem[], actions: NUnit.Framework.Internal.Commands.TestActionItem[]);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class SetUpTearDownCommand {
          constructor(innerCommand: NUnit.Framework.Internal.Commands.TestCommand);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          GetInnerCommand(): NUnit.Framework.Internal.Commands.TestCommand;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class SkipCommand {
          constructor(test: NUnit.Framework.Internal.Test);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TestCommand {
          constructor(test: NUnit.Framework.Internal.Test);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TestMethodCommand {
          constructor(testMethod: NUnit.Framework.Internal.TestMethod);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TheoryResultCommand {
          constructor(command: NUnit.Framework.Internal.Commands.TestCommand);
          Test: NUnit.Framework.Internal.Test;
          Execute(context: NUnit.Framework.Internal.ITestExecutionContext): NUnit.Framework.Internal.TestResult;
          GetInnerCommand(): NUnit.Framework.Internal.Commands.TestCommand;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export enum CommandStage {
          Default = 0,
          BelowSetUpTearDown = 1,
          SetUpTearDown = 2,
          AboveSetUpTearDown = 3,
        }
      }
      export namespace Execution {
        export class EventListenerTextWriter {
          constructor(streamName: string, defaultWriter: System.IO.TextWriter);
          Encoding: System.Text.Encoding;
          FormatProvider: System.IFormatProvider;
          NewLine: string;
          Write(aChar: System.Char): void;
          Write(aString: string): void;
          WriteLine(aString: string): void;
          Close(): void;
          Dispose(): void;
          DisposeAsync(): System.Threading.Tasks.ValueTask;
          Flush(): void;
          Write(buffer: System.Char[]): void;
          Write(buffer: System.Char[], index: number, count: number): void;
          Write(buffer: System.ReadOnlySpan<System.Char>): void;
          Write(value: boolean): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: any): void;
          Write(format: string, arg0: any): void;
          Write(format: string, arg0: any, arg1: any): void;
          Write(format: string, arg0: any, arg1: any, arg2: any): void;
          Write(format: string, ...arg: any[]): void;
          WriteLine(): void;
          WriteLine(value: System.Char): void;
          WriteLine(buffer: System.Char[]): void;
          WriteLine(buffer: System.Char[], index: number, count: number): void;
          WriteLine(buffer: System.ReadOnlySpan<System.Char>): void;
          WriteLine(value: boolean): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: any): void;
          WriteLine(format: string, arg0: any): void;
          WriteLine(format: string, arg0: any, arg1: any): void;
          WriteLine(format: string, arg0: any, arg1: any, arg2: any): void;
          WriteLine(format: string, ...arg: any[]): void;
          WriteAsync(value: System.Char): System.Threading.Tasks.Task;
          WriteAsync(value: string): System.Threading.Tasks.Task;
          WriteAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
          WriteAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
          WriteAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
          WriteLineAsync(value: System.Char): System.Threading.Tasks.Task;
          WriteLineAsync(value: string): System.Threading.Tasks.Task;
          WriteLineAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
          WriteLineAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
          WriteLineAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
          WriteLineAsync(): System.Threading.Tasks.Task;
          FlushAsync(): System.Threading.Tasks.Task;
          CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
          GetLifetimeService(): any;
          InitializeLifetimeService(): any;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class CommandBuilder {
          static MakeOneTimeSetUpCommand(suite: NUnit.Framework.Internal.TestSuite, setUpTearDown: NUnit.Framework.Internal.Commands.SetUpTearDownItem[], actions: NUnit.Framework.Internal.Commands.TestActionItem[]): NUnit.Framework.Internal.Commands.TestCommand;
          static MakeOneTimeTearDownCommand(suite: NUnit.Framework.Internal.TestSuite, setUpTearDownItems: NUnit.Framework.Internal.Commands.SetUpTearDownItem[], actions: NUnit.Framework.Internal.Commands.TestActionItem[]): NUnit.Framework.Internal.Commands.TestCommand;
          static MakeTestCommand(test: NUnit.Framework.Internal.TestMethod): NUnit.Framework.Internal.Commands.TestCommand;
          static MakeSkipCommand(test: NUnit.Framework.Internal.Test): NUnit.Framework.Internal.Commands.SkipCommand;
          static BuildSetUpTearDownList(fixtureType: System.Type, setUpType: System.Type, tearDownType: System.Type): NUnit.Framework.Internal.Commands.SetUpTearDownItem[];
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export interface IWorkItemDispatcher {
          Dispatch(work: NUnit.Framework.Internal.Execution.WorkItem): void;
          CancelRun(force: boolean): void;
        }
        export class SimpleWorkItemDispatcher {
          constructor();
          Dispatch(work: NUnit.Framework.Internal.Execution.WorkItem): void;
          CancelRun(force: boolean): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TextCapture {
          constructor(defaultWriter: System.IO.TextWriter);
          Encoding: System.Text.Encoding;
          FormatProvider: System.IFormatProvider;
          NewLine: string;
          Write(value: System.Char): void;
          Write(value: string): void;
          WriteLine(value: string): void;
          Close(): void;
          Dispose(): void;
          DisposeAsync(): System.Threading.Tasks.ValueTask;
          Flush(): void;
          Write(buffer: System.Char[]): void;
          Write(buffer: System.Char[], index: number, count: number): void;
          Write(buffer: System.ReadOnlySpan<System.Char>): void;
          Write(value: boolean): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: number): void;
          Write(value: any): void;
          Write(format: string, arg0: any): void;
          Write(format: string, arg0: any, arg1: any): void;
          Write(format: string, arg0: any, arg1: any, arg2: any): void;
          Write(format: string, ...arg: any[]): void;
          WriteLine(): void;
          WriteLine(value: System.Char): void;
          WriteLine(buffer: System.Char[]): void;
          WriteLine(buffer: System.Char[], index: number, count: number): void;
          WriteLine(buffer: System.ReadOnlySpan<System.Char>): void;
          WriteLine(value: boolean): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: number): void;
          WriteLine(value: any): void;
          WriteLine(format: string, arg0: any): void;
          WriteLine(format: string, arg0: any, arg1: any): void;
          WriteLine(format: string, arg0: any, arg1: any, arg2: any): void;
          WriteLine(format: string, ...arg: any[]): void;
          WriteAsync(value: System.Char): System.Threading.Tasks.Task;
          WriteAsync(value: string): System.Threading.Tasks.Task;
          WriteAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
          WriteAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
          WriteAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
          WriteLineAsync(value: System.Char): System.Threading.Tasks.Task;
          WriteLineAsync(value: string): System.Threading.Tasks.Task;
          WriteLineAsync(buffer: System.Char[]): System.Threading.Tasks.Task;
          WriteLineAsync(buffer: System.Char[], index: number, count: number): System.Threading.Tasks.Task;
          WriteLineAsync(buffer: System.ReadOnlyMemory<System.Char>, cancellationToken?: System.Threading.CancellationToken): System.Threading.Tasks.Task;
          WriteLineAsync(): System.Threading.Tasks.Task;
          FlushAsync(): System.Threading.Tasks.Task;
          CreateObjRef(requestedType: System.Type): System.Runtime.Remoting.ObjRef;
          GetLifetimeService(): any;
          InitializeLifetimeService(): any;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class CompositeWorkItem {
          constructor(suite: NUnit.Framework.Internal.TestSuite, childFilter: NUnit.Framework.Interfaces.ITestFilter);
          Children: NUnit.Framework.Internal.Execution.WorkItem[];
          State: NUnit.Framework.Internal.Execution.WorkItemState;
          Test: NUnit.Framework.Internal.Test;
          Context: NUnit.Framework.Internal.TestExecutionContext;
          WorkerId: string;
          Actions: NUnit.Framework.ITestAction[];
          Result: NUnit.Framework.Internal.TestResult;
          Cancel(force: boolean): void;
          InitializeContext(context: NUnit.Framework.Internal.TestExecutionContext): void;
          Execute(): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class CountdownEvent {
          constructor(initialCount: number);
          InitialCount: number;
          CurrentCount: number;
          Signal(): void;
          Wait(): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class SimpleWorkItem {
          constructor(test: NUnit.Framework.Internal.TestMethod, filter: NUnit.Framework.Interfaces.ITestFilter);
          State: NUnit.Framework.Internal.Execution.WorkItemState;
          Test: NUnit.Framework.Internal.Test;
          Context: NUnit.Framework.Internal.TestExecutionContext;
          WorkerId: string;
          Actions: NUnit.Framework.ITestAction[];
          Result: NUnit.Framework.Internal.TestResult;
          InitializeContext(context: NUnit.Framework.Internal.TestExecutionContext): void;
          Execute(): void;
          Cancel(force: boolean): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class WorkItem {
          constructor(test: NUnit.Framework.Internal.Test);
          State: NUnit.Framework.Internal.Execution.WorkItemState;
          Test: NUnit.Framework.Internal.Test;
          Context: NUnit.Framework.Internal.TestExecutionContext;
          WorkerId: string;
          Actions: NUnit.Framework.ITestAction[];
          Result: NUnit.Framework.Internal.TestResult;
          static CreateWorkItem(test: NUnit.Framework.Interfaces.ITest, filter: NUnit.Framework.Interfaces.ITestFilter): NUnit.Framework.Internal.Execution.WorkItem;
          InitializeContext(context: NUnit.Framework.Internal.TestExecutionContext): void;
          Execute(): void;
          Cancel(force: boolean): void;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export enum WorkItemState {
          Ready = 0,
          Running = 1,
          Complete = 2,
        }
      }
      export namespace Filters {
        export class CompositeFilter {
          constructor();
          constructor(...filters: NUnit.Framework.Interfaces.ITestFilter[]);
          Filters: NUnit.Framework.Interfaces.ITestFilter[];
          IsEmpty: boolean;
          TopLevel: boolean;
          Add(filter: NUnit.Framework.Interfaces.ITestFilter): void;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class PropertyFilter {
          constructor(propertyName: string, expectedValue: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class TestNameFilter {
          constructor(expectedValue: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class ClassNameFilter {
          constructor(expectedValue: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class MethodNameFilter {
          constructor(expectedValue: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class IdFilter {
          constructor(id: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class ValueMatchFilter {
          constructor(expectedValue: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class AndFilter {
          constructor();
          constructor(...filters: NUnit.Framework.Interfaces.ITestFilter[]);
          Filters: NUnit.Framework.Interfaces.ITestFilter[];
          IsEmpty: boolean;
          TopLevel: boolean;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          Add(filter: NUnit.Framework.Interfaces.ITestFilter): void;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class CategoryFilter {
          constructor(name: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class NotFilter {
          constructor(baseFilter: NUnit.Framework.Internal.TestFilter);
          BaseFilter: NUnit.Framework.Internal.TestFilter;
          IsEmpty: boolean;
          TopLevel: boolean;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class OrFilter {
          constructor();
          constructor(...filters: NUnit.Framework.Interfaces.ITestFilter[]);
          Filters: NUnit.Framework.Interfaces.ITestFilter[];
          IsEmpty: boolean;
          TopLevel: boolean;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          Add(filter: NUnit.Framework.Interfaces.ITestFilter): void;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
        export class FullNameFilter {
          constructor(expectedValue: string);
          ExpectedValue: string;
          IsRegex: boolean;
          IsEmpty: boolean;
          TopLevel: boolean;
          Match(test: NUnit.Framework.Interfaces.ITest): boolean;
          AddToXml(parentNode: NUnit.Framework.Interfaces.TNode, recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Pass(test: NUnit.Framework.Interfaces.ITest): boolean;
          IsExplicitMatch(test: NUnit.Framework.Interfaces.ITest): boolean;
          MatchParent(test: NUnit.Framework.Interfaces.ITest): boolean;
          ToXml(recursive: boolean): NUnit.Framework.Interfaces.TNode;
          Equals(obj: any): boolean;
          GetHashCode(): number;
          GetType(): System.Type;
          ToString(): string;
        }
      }
    }
  }
}
