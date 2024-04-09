using System;
using System.Collections;
using System.Collections.Generic;
using AOT;

namespace Yoga
{
    public partial class YogaNode : IEnumerable<YogaNode>
    {
        private readonly YGNodeHandle _ygNode;
        private readonly YogaConfig _config;
        private WeakReference _parent;
        private List<YogaNode> _children;
        private MeasureFunction _measureFunction;
        private BaselineFunction _baselineFunction;
        private YogaMeasureFunc _managedMeasure;
        private YogaBaselineFunc _managedBaseline;
        private object _data;

        public YogaNode(YogaConfig config = null)
        {
            _config = config == null ? YogaConfig.Default : config;
            _ygNode = Native.YGNodeNewWithConfig(_config.Handle);
            if (_ygNode.IsInvalid)
            {
                throw new InvalidOperationException("Failed to allocate native memory");
            }

            _ygNode.SetContext(this);
        }

        public YogaNode(YogaNode srcNode)
            : this(srcNode._config)
        {
            CopyStyle(srcNode);
        }

        public void Reset()
        {
            _measureFunction = null;
            _baselineFunction = null;
            _data = null;

            _ygNode.ReleaseManaged();
            Native.YGNodeReset(_ygNode);
            _ygNode.SetContext(this);
        }

        public bool IsDirty => Native.YGNodeIsDirty(_ygNode);

        public virtual void MarkDirty()
        {
            Native.YGNodeMarkDirty(_ygNode);
        }

        public bool HasNewLayout => Native.YGNodeGetHasNewLayout(_ygNode);

        public void MarkHasNewLayout()
        {
            Native.YGNodeSetHasNewLayout(_ygNode, true);
        }

        public YogaNode Parent => _parent != null ? _parent.Target as YogaNode : null;

        public bool IsMeasureDefined => _measureFunction != null;

        public bool IsBaselineDefined => _baselineFunction != null;

        public void CopyStyle(YogaNode srcNode)
        {
            Native.YGNodeCopyStyle(_ygNode, srcNode._ygNode);
        }

        public YogaDirection StyleDirection
        {
            get => Native.YGNodeStyleGetDirection(_ygNode);
            set => Native.YGNodeStyleSetDirection(_ygNode, value);
        }

        public YogaFlexDirection FlexDirection
        {
            get => Native.YGNodeStyleGetFlexDirection(_ygNode);
            set => Native.YGNodeStyleSetFlexDirection(_ygNode, value);
        }

        public YogaJustify JustifyContent
        {
            get => Native.YGNodeStyleGetJustifyContent(_ygNode);
            set => Native.YGNodeStyleSetJustifyContent(_ygNode, value);
        }

        public YogaDisplay Display
        {
            get => Native.YGNodeStyleGetDisplay(_ygNode);
            set => Native.YGNodeStyleSetDisplay(_ygNode, value);
        }

        public YogaAlign AlignItems
        {
            get => Native.YGNodeStyleGetAlignItems(_ygNode);
            set
            {
                if (value == YogaAlign.Auto) Native.YGNodeStyleSetAlignItems(_ygNode, YogaAlign.Stretch);
                else Native.YGNodeStyleSetAlignItems(_ygNode, value);
            }
        }

        public YogaAlign AlignSelf
        {
            get => Native.YGNodeStyleGetAlignSelf(_ygNode);
            set => Native.YGNodeStyleSetAlignSelf(_ygNode, value);
        }

        public YogaAlign AlignContent
        {
            get => Native.YGNodeStyleGetAlignContent(_ygNode);
            set => Native.YGNodeStyleSetAlignContent(_ygNode, value);
        }

        public YogaPositionType PositionType
        {
            get => Native.YGNodeStyleGetPositionType(_ygNode);
            set => Native.YGNodeStyleSetPositionType(_ygNode, value);
        }

        public YogaWrap Wrap
        {
            get => Native.YGNodeStyleGetFlexWrap(_ygNode);
            set => Native.YGNodeStyleSetFlexWrap(_ygNode, value);
        }

        public float Flex
        {
            set => Native.YGNodeStyleSetFlex(_ygNode, value);
        }

        public float FlexGrow
        {
            get => Native.YGNodeStyleGetFlexGrow(_ygNode);
            set => Native.YGNodeStyleSetFlexGrow(_ygNode, value);
        }

        public float FlexShrink
        {
            get => Native.YGNodeStyleGetFlexShrink(_ygNode);
            set => Native.YGNodeStyleSetFlexShrink(_ygNode, value);
        }

        public YogaValue FlexBasis
        {
            get => Native.YGNodeStyleGetFlexBasis(_ygNode);
            set
            {
                if (value.Unit == YogaUnit.Percent)
                {
                    Native.YGNodeStyleSetFlexBasisPercent(_ygNode, value.Value);
                }
                else if (value.Unit == YogaUnit.Auto || value.Unit == YogaUnit.Undefined)
                {
                    Native.YGNodeStyleSetFlexBasisAuto(_ygNode);
                }
                else
                {
                    Native.YGNodeStyleSetFlexBasis(_ygNode, value.Value);
                }
            }
        }

        public YogaValue Width
        {
            get => Native.YGNodeStyleGetWidth(_ygNode);
            set
            {
                if (value.Unit == YogaUnit.Percent)
                {
                    Native.YGNodeStyleSetWidthPercent(_ygNode, value.Value);
                }
                else if (value.Unit == YogaUnit.Auto || value.Unit == YogaUnit.Undefined)
                {
                    Native.YGNodeStyleSetWidthAuto(_ygNode);
                }
                else
                {
                    Native.YGNodeStyleSetWidth(_ygNode, value.Value);
                }
            }
        }

        public YogaValue Height
        {
            get => Native.YGNodeStyleGetHeight(_ygNode);
            set
            {
                if (value.Unit == YogaUnit.Percent)
                {
                    Native.YGNodeStyleSetHeightPercent(_ygNode, value.Value);
                }
                else if (value.Unit == YogaUnit.Auto || value.Unit == YogaUnit.Undefined)
                {
                    Native.YGNodeStyleSetHeightAuto(_ygNode);
                }
                else
                {
                    Native.YGNodeStyleSetHeight(_ygNode, value.Value);
                }
            }
        }

        public YogaValue MaxWidth
        {
            get => Native.YGNodeStyleGetMaxWidth(_ygNode);
            set
            {
                if (value.Unit == YogaUnit.Percent)
                {
                    Native.YGNodeStyleSetMaxWidthPercent(_ygNode, value.Value);
                }
                else if (value.Unit == YogaUnit.Auto || value.Unit == YogaUnit.Undefined)
                {
                    Native.YGNodeStyleSetMaxWidth(_ygNode, float.NaN);
                }
                else
                {
                    Native.YGNodeStyleSetMaxWidth(_ygNode, value.Value);
                }
            }
        }

        public YogaValue MaxHeight
        {
            get => Native.YGNodeStyleGetMaxHeight(_ygNode);
            set
            {
                if (value.Unit == YogaUnit.Percent)
                {
                    Native.YGNodeStyleSetMaxHeightPercent(_ygNode, value.Value);
                }
                else if (value.Unit == YogaUnit.Auto || value.Unit == YogaUnit.Undefined)
                {
                    Native.YGNodeStyleSetMaxHeight(_ygNode, float.NaN);
                }
                else
                {
                    Native.YGNodeStyleSetMaxHeight(_ygNode, value.Value);
                }
            }
        }

        public YogaValue MinWidth
        {
            get => Native.YGNodeStyleGetMinWidth(_ygNode);
            set
            {
                if (value.Unit == YogaUnit.Percent)
                {
                    Native.YGNodeStyleSetMinWidthPercent(_ygNode, value.Value);
                }
                else if (value.Unit == YogaUnit.Auto || value.Unit == YogaUnit.Undefined)
                {
                    Native.YGNodeStyleSetMinWidth(_ygNode, float.NaN);
                }
                else
                {
                    Native.YGNodeStyleSetMinWidth(_ygNode, value.Value);
                }
            }
        }

        public YogaValue MinHeight
        {
            get => Native.YGNodeStyleGetMinHeight(_ygNode);
            set
            {
                if (value.Unit == YogaUnit.Percent)
                {
                    Native.YGNodeStyleSetMinHeightPercent(_ygNode, value.Value);
                }
                else if (value.Unit == YogaUnit.Auto || value.Unit == YogaUnit.Undefined)
                {
                    Native.YGNodeStyleSetMinHeight(_ygNode, float.NaN);
                }
                else
                {
                    Native.YGNodeStyleSetMinHeight(_ygNode, value.Value);
                }
            }
        }

        public float AspectRatio
        {
            get => Native.YGNodeStyleGetAspectRatio(_ygNode);
            set
            {
                if (value == 0) Native.YGNodeStyleSetAspectRatio(_ygNode, float.NaN);
                else Native.YGNodeStyleSetAspectRatio(_ygNode, value);
            }
        }

        public float Gap
        {
            get => Native.YGNodeStyleGetGap(_ygNode, YogaGutter.All);
            set => Native.YGNodeStyleSetGap(_ygNode, YogaGutter.All, value);
        }

        public float ColumnGap
        {
            get => Native.YGNodeStyleGetGap(_ygNode, YogaGutter.Column);
            set => Native.YGNodeStyleSetGap(_ygNode, YogaGutter.Column, value);
        }

        public float RowGap
        {
            get => Native.YGNodeStyleGetGap(_ygNode, YogaGutter.Row);
            set => Native.YGNodeStyleSetGap(_ygNode, YogaGutter.Row, value);
        }

        public float LayoutLeft => Native.YGNodeLayoutGetLeft(_ygNode);
        public float LayoutTop => Native.YGNodeLayoutGetTop(_ygNode);
        public float LayoutRight => Native.YGNodeLayoutGetRight(_ygNode);
        public float LayoutBottom => Native.YGNodeLayoutGetBottom(_ygNode);
        public float LayoutWidth => Native.YGNodeLayoutGetWidth(_ygNode);
        public float LayoutHeight => Native.YGNodeLayoutGetHeight(_ygNode);
        public YogaDirection LayoutDirection => Native.YGNodeLayoutGetDirection(_ygNode);
        public bool LayoutHadOverflow => Native.YGNodeLayoutGetHadOverflow(_ygNode);

        public YogaOverflow Overflow
        {
            get => Native.YGNodeStyleGetOverflow(_ygNode);
            set => Native.YGNodeStyleSetOverflow(_ygNode, value);
        }

        public object Data
        {
            get => _data;
            set => _data = value;
        }

        public YogaNode this[int index] => _children[index];

        public int Count => _children != null ? _children.Count : 0;

        public void MarkLayoutSeen()
        {
            Native.YGNodeSetHasNewLayout(_ygNode, false);
        }

        public bool IsReferenceBaseline
        {
            get => Native.YGNodeIsReferenceBaseline(_ygNode);
            set => Native.YGNodeSetIsReferenceBaseline(_ygNode, value);
        }

        public YogaNodeType NodeType
        {
            get => Native.YGNodeGetNodeType(_ygNode);
            set => Native.YGNodeSetNodeType(_ygNode, value);
        }

        public bool AlwaysFormsContainingBlock
        {
            get => Native.YGNodeGetAlwaysFormsContainingBlock(_ygNode);
            set => Native.YGNodeSetAlwaysFormsContainingBlock(_ygNode, value);
        }

        public bool ValuesEqual(float f1, float f2)
        {
            if (float.IsNaN(f1) || float.IsNaN(f2))
            {
                return float.IsNaN(f1) && float.IsNaN(f2);
            }

            return Math.Abs(f2 - f1) < float.Epsilon;
        }

        public void Insert(int index, YogaNode node)
        {
            if (_children == null)
            {
                _children = new List<YogaNode>(4);
            }
            _children.Insert(index, node);
            node._parent = new WeakReference(this);
            Native.YGNodeInsertChild(_ygNode, node._ygNode, (uint) index);
        }

        public void RemoveAt(int index)
        {
            var child = _children[index];
            child._parent = null;
            _children.RemoveAt(index);
            Native.YGNodeRemoveChild(_ygNode, child._ygNode);
        }

        public void RemoveAll()
        {
            Native.YGNodeRemoveAllChildren(_ygNode);
        }

        public void AddChild(YogaNode child)
        {
            Insert(Count, child);
        }

        public void RemoveChild(YogaNode child)
        {
            int index = IndexOf(child);
            if (index >= 0)
            {
                RemoveAt(index);
            }
        }

        public void Clear()
        {
            if (_children != null)
            {
                RemoveAll();
            }
        }

        public int IndexOf(YogaNode node)
        {
            return _children != null ? _children.IndexOf(node) : -1;
        }

        public void SetMeasureFunction(MeasureFunction measureFunction)
        {
            _measureFunction = measureFunction;
            _managedMeasure = measureFunction != null ? MeasureInternal : (YogaMeasureFunc) null;
            Native.YGNodeSetMeasureFunc(_ygNode, _managedMeasure);
        }

        public void SetBaselineFunction(BaselineFunction baselineFunction)
        {
            _baselineFunction = baselineFunction;
            _managedBaseline =
                baselineFunction != null ? BaselineInternal : (YogaBaselineFunc) null;
            Native.YGNodeSetBaselineFunc(_ygNode, _managedBaseline);
        }

        public void CalculateLayout(
            float availableWidth = YogaConstants.Undefined,
            float availableHeight = YogaConstants.Undefined)
        {
            Native.YGNodeCalculateLayout(
                _ygNode,
                availableWidth,
                availableHeight,
                Native.YGNodeStyleGetDirection(_ygNode));
        }

        [MonoPInvokeCallback(typeof(YogaMeasureFunc))]
        private static YogaSize MeasureInternal(
            IntPtr unmanagedNodePtr,
            float width,
            YogaMeasureMode widthMode,
            float height,
            YogaMeasureMode heightMode)
        {
            var node = YGNodeHandle.GetManaged(unmanagedNodePtr);
            if (node == null || node._measureFunction == null)
            {
                throw new InvalidOperationException("Measure function is not defined.");
            }
            return node._measureFunction(node, width, widthMode, height, heightMode);
        }

        [MonoPInvokeCallback(typeof(YogaBaselineFunc))]
        private static float BaselineInternal(
            IntPtr unmanagedNodePtr,
            float width,
            float height)
        {
            var node = YGNodeHandle.GetManaged(unmanagedNodePtr);
            if (node == null || node._baselineFunction == null)
            {
                throw new InvalidOperationException("Baseline function is not defined.");
            }
            return node._baselineFunction(node, width, height);
        }

        public IEnumerator<YogaNode> GetEnumerator()
        {
            return _children != null ? ((IEnumerable<YogaNode>) _children).GetEnumerator() :
                System.Linq.Enumerable.Empty<YogaNode>().GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _children != null ? ((IEnumerable<YogaNode>) _children).GetEnumerator() :
                System.Linq.Enumerable.Empty<YogaNode>().GetEnumerator();
        }
    }
}
