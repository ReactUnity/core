using System;
using System.Runtime.InteropServices;

namespace Yoga
{
    internal static class Native
    {
#if !UNITY_EDITOR && (UNITY_IOS || UNITY_WEBGL)
        private const string DllName = "__Internal";
#else
        private const string DllName = "yoga";
#endif

        #region YGNode.h

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGNodeHandle YGNodeNew();

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGNodeHandle YGNodeNewWithConfig(YGConfigHandle config);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGNodeHandle YGNodeClone(YGConfigHandle config);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeFree(IntPtr node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeFreeRecursive(IntPtr node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeFinalize(IntPtr node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeReset(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeCalculateLayout(YGNodeHandle node, float availableWidth, float availableHeight, YogaDirection parentDirection);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        [return: MarshalAs(UnmanagedType.I1)]
        public static extern bool YGNodeGetHasNewLayout(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetHasNewLayout(YGNodeHandle node, [MarshalAs(UnmanagedType.I1)] bool hasNewLayout);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        [return: MarshalAs(UnmanagedType.I1)]
        public static extern bool YGNodeIsDirty(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeMarkDirty(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetDirtiedFunc(YGNodeHandle node, [MarshalAs(UnmanagedType.FunctionPtr)] YogaDirtiedFunc measureFunc);

        // YGNodeGetDirtiedFunc

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeInsertChild(YGNodeHandle node, YGNodeHandle child, uint index);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSwapChild(YGNodeHandle node, YGNodeHandle child, uint index);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeRemoveChild(YGNodeHandle node, YGNodeHandle child);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeRemoveAllChildren(YGNodeHandle node);

        // YGNodeSetChildren

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGNodeHandle YGNodeGetChild(YGNodeHandle node, uint index);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern uint YGNodeGetChildCount(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGNodeHandle YGNodeGetOwner(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGNodeHandle YGNodeGetParent(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetConfig(YGNodeHandle node, YGConfigHandle config);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGConfigHandle YGNodeGetConfig(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetContext(IntPtr node, IntPtr managed);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern IntPtr YGNodeGetContext(IntPtr node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetMeasureFunc(YGNodeHandle node, [MarshalAs(UnmanagedType.FunctionPtr)] YogaMeasureFunc measureFunc);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        [return: MarshalAs(UnmanagedType.I1)]
        public static extern bool YGNodeHasMeasureFunc(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetBaselineFunc(YGNodeHandle node, [MarshalAs(UnmanagedType.FunctionPtr)] YogaBaselineFunc baselineFunc);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        [return: MarshalAs(UnmanagedType.I1)]
        public static extern bool YGNodeHasBaselineFunc(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetIsReferenceBaseline(YGNodeHandle node, bool isReferenceBaseline);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern bool YGNodeIsReferenceBaseline(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetNodeType(YGNodeHandle node, YogaNodeType nodeType);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaNodeType YGNodeGetNodeType(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeSetAlwaysFormsContainingBlock(YGNodeHandle node, bool alwaysFormsContainingBlock);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern bool YGNodeGetAlwaysFormsContainingBlock(YGNodeHandle node);

        // deprecated: YGNodeCanUseCachedMeasurement

        #endregion


        #region YGConfig.h

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGConfigHandle YGConfigNew();

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGConfigFree(IntPtr node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YGConfigHandle YGConfigGetDefault();

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGConfigSetUseWebDefaults(YGConfigHandle config, bool useWebDefaults);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern bool YGConfigGetUseWebDefaults(YGConfigHandle config);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGConfigSetPointScaleFactor(YGConfigHandle config, float pixelsInPoint);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGConfigGetPointScaleFactor(YGConfigHandle config);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGConfigSetErrata(YGConfigHandle config, YogaErrata errata);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaErrata YGConfigGetErrata(YGConfigHandle config);

        // YGConfigSetLogger

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGConfigSetContext(IntPtr config, IntPtr managed);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern IntPtr YGConfigGetContext(IntPtr config);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGConfigSetExperimentalFeatureEnabled(YGConfigHandle config, YogaExperimentalFeature feature, bool enabled);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern bool YGConfigIsExperimentalFeatureEnabled(YGConfigHandle config, YogaExperimentalFeature feature);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGConfigSetCloneNodeFunc(YGNodeHandle node, [MarshalAs(UnmanagedType.FunctionPtr)] YogaCloneNodeFunc baselineFunc);

        #endregion


        #region YGNodeStyle.h

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeCopyStyle(YGNodeHandle dstNode, YGNodeHandle srcNode);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetDirection(YGNodeHandle node, YogaDirection direction);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaDirection YGNodeStyleGetDirection(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlexDirection(YGNodeHandle node, YogaFlexDirection flexDirection);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaFlexDirection YGNodeStyleGetFlexDirection(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetJustifyContent(YGNodeHandle node, YogaJustify justifyContent);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaJustify YGNodeStyleGetJustifyContent(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetAlignContent(YGNodeHandle node, YogaAlign alignContent);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaAlign YGNodeStyleGetAlignContent(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetAlignItems(YGNodeHandle node, YogaAlign alignItems);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaAlign YGNodeStyleGetAlignItems(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetAlignSelf(YGNodeHandle node, YogaAlign alignSelf);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaAlign YGNodeStyleGetAlignSelf(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetPositionType(YGNodeHandle node, YogaPositionType positionType);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaPositionType YGNodeStyleGetPositionType(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlexWrap(YGNodeHandle node, YogaWrap flexWrap);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaWrap YGNodeStyleGetFlexWrap(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetOverflow(YGNodeHandle node, YogaOverflow flexWrap);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaOverflow YGNodeStyleGetOverflow(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetDisplay(YGNodeHandle node, YogaDisplay display);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaDisplay YGNodeStyleGetDisplay(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetBoxSizing(YGNodeHandle node, YogaBoxSizing display);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaBoxSizing YGNodeStyleGetBoxSizing(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlex(YGNodeHandle node, float flex);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeStyleGetFlex(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlexGrow(YGNodeHandle node, float flexGrow);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeStyleGetFlexGrow(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlexShrink(YGNodeHandle node, float flexShrink);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeStyleGetFlexShrink(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlexBasis(YGNodeHandle node, float flexBasis);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlexBasisPercent(YGNodeHandle node, float flexBasis);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetFlexBasisAuto(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetFlexBasis(YGNodeHandle node);


        #region Spacings

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetPosition(YGNodeHandle node, YogaEdge edge, float position);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetPositionPercent(YGNodeHandle node, YogaEdge edge, float position);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetPosition(YGNodeHandle node, YogaEdge edge);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMargin(YGNodeHandle node, YogaEdge edge, float margin);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMarginPercent(YGNodeHandle node, YogaEdge edge, float margin);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMarginAuto(YGNodeHandle node, YogaEdge edge);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetMargin(YGNodeHandle node, YogaEdge edge);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetPadding(YGNodeHandle node, YogaEdge edge, float padding);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetPaddingPercent(YGNodeHandle node, YogaEdge edge, float padding);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetPadding(YGNodeHandle node, YogaEdge edge);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetBorder(YGNodeHandle node, YogaEdge edge, float border);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeStyleGetBorder(YGNodeHandle node, YogaEdge edge);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetGap(YGNodeHandle node, YogaGutter gutter, float gapLength);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetGapPercent(YGNodeHandle node, YogaGutter gutter, float percent);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeStyleGetGap(YGNodeHandle node, YogaGutter gutter);

        #endregion


        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetWidth(YGNodeHandle node, float width);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetWidthPercent(YGNodeHandle node, float width);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetWidthAuto(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetWidth(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetHeight(YGNodeHandle node, float height);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetHeightPercent(YGNodeHandle node, float height);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetHeightAuto(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetHeight(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMinWidth(YGNodeHandle node, float minWidth);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMinWidthPercent(YGNodeHandle node, float minWidth);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetMinWidth(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMinHeight(YGNodeHandle node, float minHeight);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMinHeightPercent(YGNodeHandle node, float minHeight);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetMinHeight(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMaxWidth(YGNodeHandle node, float maxWidth);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMaxWidthPercent(YGNodeHandle node, float maxWidth);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetMaxWidth(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMaxHeight(YGNodeHandle node, float maxHeight);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetMaxHeightPercent(YGNodeHandle node, float maxHeight);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaValue YGNodeStyleGetMaxHeight(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern void YGNodeStyleSetAspectRatio(YGNodeHandle node, float aspectRatio);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeStyleGetAspectRatio(YGNodeHandle node);

        #endregion


        #region YGNodeLayout.h

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetLeft(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetTop(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetRight(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetBottom(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetWidth(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetHeight(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern YogaDirection YGNodeLayoutGetDirection(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern bool YGNodeLayoutGetHadOverflow(YGNodeHandle node);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetMargin(YGNodeHandle node, YogaEdge edge);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetBorder(YGNodeHandle node, YogaEdge edge);

        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGNodeLayoutGetPadding(YGNodeHandle node, YogaEdge edge);

        #endregion


        // YGPixelGrid.h
        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern float YGRoundValueToPixelGrid(double value, double pointScaleFactor, [MarshalAs(UnmanagedType.I1)] bool forceCeil, [MarshalAs(UnmanagedType.I1)] bool forceFloor);


        // YGValue.h
        [DllImport(DllName, ExactSpelling = true, CallingConvention = CallingConvention.Cdecl)]
        public static extern bool YGFloatIsUndefined(float value);
    }
}
