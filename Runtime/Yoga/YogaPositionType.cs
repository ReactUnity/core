/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#if !UNITY_EDITOR && (UNITY_WEBGL || UNITY_IOS)
    #define OLD_YOGA
#endif

namespace Facebook.Yoga
{
    public enum YogaPositionType
    {
#if OLD_YOGA
        Default = 0,
        Static = 0,
        Relative = 1,
        Absolute = 2,
#else
        Default = 0,
        Static = 0,
        Relative = 1,
        Absolute = 2,
#endif
    }
}
