import { ReactUnity, UnityEngine } from '@reactunity/renderer';
import { UGUIElements } from '@reactunity/renderer/ugui';
import memoizeOne from 'memoize-one';
import { createElement, PureComponent } from 'react';
import { getRTLOffsetType, getScrollbarSize } from './domHelpers';
import { cancelTimeout, requestTimeout, TimeoutID } from './timer';


type Direction = 'ltr' | 'rtl';
export type ScrollToAlign = 'auto' | 'smart' | 'center' | 'start' | 'end';

type itemSize = number | ((index: number) => number);

type RenderComponentProps<T> = {
  columnIndex: number;
  data: T;
  isScrolling?: boolean;
  rowIndex: number;
  style: Object;
};
export type RenderComponent<T> = React.ComponentType<Partial<RenderComponentProps<T>>>;

type ScrollDirection = 'forward' | 'backward';

type OnItemsRenderedCallback = (val: {
  overscanColumnStartIndex: number;
  overscanColumnStopIndex: number;
  overscanRowStartIndex: number;
  overscanRowStopIndex: number;
  visibleColumnStartIndex: number;
  visibleColumnStopIndex: number;
  visibleRowStartIndex: number;
  visibleRowStopIndex: number;
}) => void;
type OnScrollCallback = (val: {
  horizontalScrollDirection: ScrollDirection;
  scrollLeft: number;
  scrollTop: number;
  scrollUpdateWasRequested: boolean;
  verticalScrollDirection: ScrollDirection;
}) => void;

type ScrollEvent = UnityEngine.Vector2;
type ScrollComponent = ReactUnity.UGUI.ScrollComponent;
type ItemStyleCache = { [key: string]: Object };

type OuterProps = {
  children: React.ReactNode;
  className: string | void;
  onScroll: (ev: ScrollEvent) => void;
  style: { [key: string]: any };
};

type InnerProps = {
  children: React.ReactNode;
  style: { [key: string]: any };
};

export type Props<T> = {
  children: RenderComponent<T>;
  className?: string;
  columnCount: number;
  columnWidth: itemSize;
  direction?: Direction;
  height: number;
  initialScrollLeft?: number;
  initialScrollTop?: number;
  innerRef?: any;
  innerElementType?: string | React.Component<InnerProps, any>;
  itemData?: T;
  itemKey?: (params: {
    columnIndex: number;
    data: T;
    rowIndex: number;
  }) => any;
  onItemsRendered?: OnItemsRenderedCallback;
  onScroll?: OnScrollCallback;
  outerRef?: any;
  outerElementType?: string | React.Component<OuterProps, any>;
  overscanColumnCount?: number;
  overscanRowCount?: number;
  rowCount: number;
  rowHeight: itemSize;
  style?: Object;
  useIsScrolling?: boolean;
  width: number;
} & UGUIElements['scroll'];;

type State = {
  instance: any;
  isScrolling: boolean;
  horizontalScrollDirection: ScrollDirection;
  scrollLeft: number;
  scrollTop: number;
  scrollUpdateWasRequested: boolean;
  verticalScrollDirection: ScrollDirection;
};

type getItemOffset = (
  props: Props<any>,
  index: number,
  instanceProps: any
) => number;
type getItemSize = (
  props: Props<any>,
  index: number,
  instanceProps: any
) => number;
type getEstimatedTotalSize = (props: Props<any>, instanceProps: any) => number;
type GetOffsetForItemAndAlignment = (
  props: Props<any>,
  index: number,
  align: ScrollToAlign,
  scrollOffset: number,
  instanceProps: any,
  scrollbarSize: number
) => number;
type GetStartIndexForOffset = (
  props: Props<any>,
  offset: number,
  instanceProps: any
) => number;
type GetStopIndexForStartIndex = (
  props: Props<any>,
  startIndex: number,
  scrollOffset: number,
  instanceProps: any
) => number;
type InitInstanceProps = (props: Props<any>, instance: any) => any;
type ValidateProps = (props: Props<any>) => void;

const IS_SCROLLING_DEBOUNCE_INTERVAL = 150;

const defaultItemKey = ({ columnIndex, data, rowIndex }) =>
  `${rowIndex}:${columnIndex}`;

export function createGridComponent({
  getColumnOffset,
  getColumnStartIndexForOffset,
  getColumnStopIndexForStartIndex,
  getColumnWidth,
  getEstimatedTotalHeight,
  getEstimatedTotalWidth,
  getOffsetForColumnAndAlignment,
  getOffsetForRowAndAlignment,
  getRowHeight,
  getRowOffset,
  getRowStartIndexForOffset,
  getRowStopIndexForStartIndex,
  initInstanceProps,
  shouldResetStyleCacheOnItemSizeChange,
  validateProps,
}: {
  getColumnOffset: getItemOffset;
  getColumnStartIndexForOffset: GetStartIndexForOffset;
  getColumnStopIndexForStartIndex: GetStopIndexForStartIndex;
  getColumnWidth: getItemSize;
  getEstimatedTotalHeight: getEstimatedTotalSize;
  getEstimatedTotalWidth: getEstimatedTotalSize;
  getOffsetForColumnAndAlignment: GetOffsetForItemAndAlignment;
  getOffsetForRowAndAlignment: GetOffsetForItemAndAlignment;
  getRowOffset: getItemOffset;
  getRowHeight: getItemSize;
  getRowStartIndexForOffset: GetStartIndexForOffset;
  getRowStopIndexForStartIndex: GetStopIndexForStartIndex;
  initInstanceProps: InitInstanceProps;
  shouldResetStyleCacheOnItemSizeChange: boolean;
  validateProps: ValidateProps;
}) {
  return class Grid<T> extends PureComponent<Props<T>, State> {
    _instanceProps: any = initInstanceProps(this.props, this);
    _resetIsScrollingTimeoutId: TimeoutID | null = null;
    _outerRef?: ScrollComponent;

    static defaultProps = {
      direction: 'ltr',
      itemData: undefined,
      useIsScrolling: false,
    };

    state: State = {
      instance: this,
      isScrolling: false,
      horizontalScrollDirection: 'forward',
      scrollLeft:
        typeof this.props.initialScrollLeft === 'number'
          ? this.props.initialScrollLeft
          : 0,
      scrollTop:
        typeof this.props.initialScrollTop === 'number'
          ? this.props.initialScrollTop
          : 0,
      scrollUpdateWasRequested: false,
      verticalScrollDirection: 'forward',
    };

    // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-useless-constructor
    constructor(props: Props<T>) {
      super(props);
    }

    static getDerivedStateFromProps(
      nextProps: Props<any>,
      prevState: State
    ): Partial<State> | null {
      validateSharedProps(nextProps, prevState);
      validateProps(nextProps);
      return null;
    }

    scrollTo({
      scrollLeft,
      scrollTop,
    }: {
      scrollLeft: number;
      scrollTop: number;
    }): void {
      if (scrollLeft !== undefined) {
        scrollLeft = Math.max(0, scrollLeft);
      }
      if (scrollTop !== undefined) {
        scrollTop = Math.max(0, scrollTop);
      }

      this.setState(prevState => {
        if (scrollLeft === undefined) {
          scrollLeft = prevState.scrollLeft;
        }
        if (scrollTop === undefined) {
          scrollTop = prevState.scrollTop;
        }

        if (
          prevState.scrollLeft === scrollLeft &&
          prevState.scrollTop === scrollTop
        ) {
          return null;
        }

        return {
          horizontalScrollDirection:
            prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          scrollUpdateWasRequested: true,
          verticalScrollDirection:
            prevState.scrollTop < scrollTop ? 'forward' : 'backward',
        };
      }, this._resetIsScrollingDebounced);
    }

    scrollToItem({
      align = 'auto',
      columnIndex,
      rowIndex,
    }: {
      align: ScrollToAlign;
      columnIndex?: number;
      rowIndex?: number;
    }): void {
      const { columnCount, height, rowCount, width } = this.props;
      const { scrollLeft, scrollTop } = this.state;
      const sizes = getScrollbarSize(this._outerRef);

      if (columnIndex !== undefined) {
        columnIndex = Math.max(0, Math.min(columnIndex, columnCount - 1));
      }
      if (rowIndex !== undefined) {
        rowIndex = Math.max(0, Math.min(rowIndex, rowCount - 1));
      }

      const estimatedTotalHeight = getEstimatedTotalHeight(
        this.props,
        this._instanceProps
      );
      const estimatedTotalWidth = getEstimatedTotalWidth(
        this.props,
        this._instanceProps
      );

      // The scrollbar size should be considered when scrolling an item into view,
      // to ensure it's fully visible.
      // But we only need to account for its size when it's actually visible.
      const horizontalScrollbarSize =
        estimatedTotalWidth > width ? sizes.horizontalHeight : 0;
      const verticalScrollbarSize =
        estimatedTotalHeight > height ? sizes.verticalWidth : 0;

      this.scrollTo({
        scrollLeft:
          columnIndex !== undefined
            ? getOffsetForColumnAndAlignment(
              this.props,
              columnIndex,
              align,
              scrollLeft,
              this._instanceProps,
              verticalScrollbarSize
            )
            : scrollLeft,
        scrollTop:
          rowIndex !== undefined
            ? getOffsetForRowAndAlignment(
              this.props,
              rowIndex,
              align,
              scrollTop,
              this._instanceProps,
              horizontalScrollbarSize
            )
            : scrollTop,
      });
    }

    componentDidMount() {
      const { initialScrollLeft, initialScrollTop } = this.props;

      if (this._outerRef != null) {
        const outerRef = this._outerRef;
        if (typeof initialScrollLeft === 'number') {
          outerRef.ScrollLeft = initialScrollLeft;
        }
        if (typeof initialScrollTop === 'number') {
          outerRef.ScrollTop = initialScrollTop;
        }
      }

      this._callPropsCallbacks();
    }

    componentDidUpdate() {
      const { direction } = this.props;
      const { scrollLeft, scrollTop, scrollUpdateWasRequested } = this.state;

      if (scrollUpdateWasRequested && this._outerRef != null) {
        // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
        // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
        // So we need to determine which browser behavior we're dealing with, and mimic it.
        const outerRef = this._outerRef;
        if (direction === 'rtl') {
          switch (getRTLOffsetType()) {
            case 'negative':
              outerRef.ScrollLeft = -scrollLeft;
              break;
            case 'positive-ascending':
              outerRef.ScrollLeft = scrollLeft;
              break;
            default:
              const clientWidth = outerRef.ClientWidth;
              const scrollWidth = outerRef.ScrollWidth;
              outerRef.ScrollLeft = scrollWidth - clientWidth - scrollLeft;
              break;
          }
        } else {
          outerRef.ScrollLeft = Math.max(0, scrollLeft);
        }

        outerRef.ScrollTop = Math.max(0, scrollTop);
      }

      this._callPropsCallbacks();
    }

    componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    }

    render() {
      const {
        children,
        className,
        columnCount,
        direction,
        height,
        innerRef,
        innerElementType,
        itemData,
        itemKey = defaultItemKey,
        outerElementType,
        rowCount,
        style,
        useIsScrolling,
        width,

        // Unused
        columnWidth,
        initialScrollLeft,
        initialScrollTop,
        onItemsRendered,
        onScroll,
        outerRef,
        overscanColumnCount,
        overscanRowCount,
        rowHeight,
        ...rest
      } = this.props;
      const { isScrolling } = this.state;

      const [
        columnStartIndex,
        columnStopIndex,
      ] = this._getHorizontalRangeToRender();
      const [rowStartIndex, rowStopIndex] = this._getVerticalRangeToRender();

      const items = [];
      if (columnCount > 0 && rowCount) {
        for (
          let rowIndex = rowStartIndex;
          rowIndex <= rowStopIndex;
          rowIndex++
        ) {
          for (
            let columnIndex = columnStartIndex;
            columnIndex <= columnStopIndex;
            columnIndex++
          ) {
            items.push(
              createElement(children, {
                columnIndex,
                data: itemData,
                isScrolling: useIsScrolling ? isScrolling : undefined,
                key: itemKey({ columnIndex, data: itemData, rowIndex }),
                rowIndex,
                style: this._getItemStyle(rowIndex, columnIndex),
              })
            );
          }
        }
      }

      // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.
      const estimatedTotalHeight = getEstimatedTotalHeight(
        this.props,
        this._instanceProps
      );
      const estimatedTotalWidth = getEstimatedTotalWidth(
        this.props,
        this._instanceProps
      );

      return createElement(
        (outerElementType || 'scroll') as any,
        {
          ...rest,
          className,
          onValueChanged: this._onScroll,
          ref: this._outerRefSetter,
          style: {
            position: 'relative',
            height,
            width,
            direction,
            ...style,
          },
        },
        createElement(
          (innerElementType || 'view') as any,
          {
            children: items,
            ref: innerRef,
            style: {
              height: estimatedTotalHeight,
              pointerEvents: isScrolling ? 'none' : undefined,
              width: estimatedTotalWidth,
            },
          },
        ),
      );
    }

    _callOnItemsRendered: (
      overscanColumnStartIndex: number,
      overscanColumnStopIndex: number,
      overscanRowStartIndex: number,
      overscanRowStopIndex: number,
      visibleColumnStartIndex: number,
      visibleColumnStopIndex: number,
      visibleRowStartIndex: number,
      visibleRowStopIndex: number
    ) => void = memoizeOne(
      (
        overscanColumnStartIndex: number,
        overscanColumnStopIndex: number,
        overscanRowStartIndex: number,
        overscanRowStopIndex: number,
        visibleColumnStartIndex: number,
        visibleColumnStopIndex: number,
        visibleRowStartIndex: number,
        visibleRowStopIndex: number
      ) =>
        (this.props.onItemsRendered as OnItemsRenderedCallback)({
          overscanColumnStartIndex,
          overscanColumnStopIndex,
          overscanRowStartIndex,
          overscanRowStopIndex,
          visibleColumnStartIndex,
          visibleColumnStopIndex,
          visibleRowStartIndex,
          visibleRowStopIndex,
        })
    );


    _callOnScroll: (
      scrollLeft: number,
      scrollTop: number,
      horizontalScrollDirection: ScrollDirection,
      verticalScrollDirection: ScrollDirection,
      scrollUpdateWasRequested: boolean
    ) => void = memoizeOne(
      (
        scrollLeft: number,
        scrollTop: number,
        horizontalScrollDirection: ScrollDirection,
        verticalScrollDirection: ScrollDirection,
        scrollUpdateWasRequested: boolean
      ) =>
        (this.props.onScroll as OnScrollCallback)({
          horizontalScrollDirection,
          scrollLeft,
          scrollTop,
          verticalScrollDirection,
          scrollUpdateWasRequested,
        })
    );

    _callPropsCallbacks() {
      const { columnCount, onItemsRendered, onScroll, rowCount } = this.props;

      if (typeof onItemsRendered === 'function') {
        if (columnCount > 0 && rowCount > 0) {
          const [
            overscanColumnStartIndex,
            overscanColumnStopIndex,
            visibleColumnStartIndex,
            visibleColumnStopIndex,
          ] = this._getHorizontalRangeToRender();
          const [
            overscanRowStartIndex,
            overscanRowStopIndex,
            visibleRowStartIndex,
            visibleRowStopIndex,
          ] = this._getVerticalRangeToRender();
          this._callOnItemsRendered(
            overscanColumnStartIndex,
            overscanColumnStopIndex,
            overscanRowStartIndex,
            overscanRowStopIndex,
            visibleColumnStartIndex,
            visibleColumnStopIndex,
            visibleRowStartIndex,
            visibleRowStopIndex
          );
        }
      }

      if (typeof onScroll === 'function') {
        const {
          horizontalScrollDirection,
          scrollLeft,
          scrollTop,
          scrollUpdateWasRequested,
          verticalScrollDirection,
        } = this.state;
        this._callOnScroll(
          scrollLeft,
          scrollTop,
          horizontalScrollDirection,
          verticalScrollDirection,
          scrollUpdateWasRequested
        );
      }
    }

    // Lazily create and cache item styles while scrolling,
    // So that pure component sCU will prevent re-renders.
    // We maintain this cache, and pass a style prop rather than index,
    // So that List can clear cached styles and force item re-render if necessary.
    _getItemStyle: (rowIndex: number, columnIndex: number) => Object
      = (rowIndex: number, columnIndex: number): Object => {
        const { columnWidth, direction, rowHeight } = this.props;

        const itemStyleCache = this._getItemStyleCache(
          shouldResetStyleCacheOnItemSizeChange && columnWidth,
          shouldResetStyleCacheOnItemSizeChange && direction,
          shouldResetStyleCacheOnItemSizeChange && rowHeight
        );

        const key = `${rowIndex}:${columnIndex}`;

        let style;
        if (itemStyleCache.hasOwnProperty(key)) {
          style = itemStyleCache[key];
        } else {
          const offset = getColumnOffset(
            this.props,
            columnIndex,
            this._instanceProps
          );
          const isRtl = direction === 'rtl';
          itemStyleCache[key] = style = {
            position: 'absolute',
            left: isRtl ? undefined : offset,
            right: isRtl ? offset : undefined,
            top: getRowOffset(this.props, rowIndex, this._instanceProps),
            height: getRowHeight(this.props, rowIndex, this._instanceProps),
            width: getColumnWidth(this.props, columnIndex, this._instanceProps),
          };
        }

        return style;
      };

    _getItemStyleCache: (_: any, __?: any, ___?: any) => ItemStyleCache
      = memoizeOne((_: any, __: any, ___: any) => ({}));

    _getHorizontalRangeToRender(): [number, number, number, number] {
      const {
        columnCount,
        overscanColumnCount,
        rowCount,
      } = this.props;
      const { horizontalScrollDirection, isScrolling, scrollLeft } = this.state;

      const overscanCountResolved: number =
        overscanColumnCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      const startIndex = getColumnStartIndexForOffset(
        this.props,
        scrollLeft,
        this._instanceProps
      );
      const stopIndex = getColumnStopIndexForStartIndex(
        this.props,
        startIndex,
        scrollLeft,
        this._instanceProps
      );

      // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.
      const overscanBackward =
        !isScrolling || horizontalScrollDirection === 'backward'
          ? Math.max(1, overscanCountResolved)
          : 1;
      const overscanForward =
        !isScrolling || horizontalScrollDirection === 'forward'
          ? Math.max(1, overscanCountResolved)
          : 1;

      return [
        Math.max(0, startIndex - overscanBackward),
        Math.max(0, Math.min(columnCount - 1, stopIndex + overscanForward)),
        startIndex,
        stopIndex,
      ];
    }

    _getVerticalRangeToRender(): [number, number, number, number] {
      const {
        columnCount,
        overscanRowCount,
        rowCount,
      } = this.props;
      const { isScrolling, verticalScrollDirection, scrollTop } = this.state;

      const overscanCountResolved: number =
        overscanRowCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      const startIndex = getRowStartIndexForOffset(
        this.props,
        scrollTop,
        this._instanceProps
      );
      const stopIndex = getRowStopIndexForStartIndex(
        this.props,
        startIndex,
        scrollTop,
        this._instanceProps
      );

      // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.
      const overscanBackward =
        !isScrolling || verticalScrollDirection === 'backward'
          ? Math.max(1, overscanCountResolved)
          : 1;
      const overscanForward =
        !isScrolling || verticalScrollDirection === 'forward'
          ? Math.max(1, overscanCountResolved)
          : 1;

      return [
        Math.max(0, startIndex - overscanBackward),
        Math.max(0, Math.min(rowCount - 1, stopIndex + overscanForward)),
        startIndex,
        stopIndex,
      ];
    }

    _onScroll = (event: ScrollEvent, sender: ScrollComponent): void => {
      const clientHeight = sender.ClientHeight;
      const clientWidth = sender.ClientWidth;
      const scrollLeft = sender.ScrollLeft;
      const scrollTop = sender.ScrollTop;
      const scrollHeight = sender.ScrollHeight;
      const scrollWidth = sender.ScrollWidth;

      this.setState(prevState => {
        if (
          prevState.scrollLeft === scrollLeft &&
          prevState.scrollTop === scrollTop
        ) {
          // Scroll position may have been updated by cDM/cDU,
          // In which case we don't need to trigger another render,
          // And we don't want to update state.isScrolling.
          return null;
        }

        const { direction } = this.props;

        // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
        // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
        // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
        // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
        let calculatedScrollLeft = scrollLeft;
        if (direction === 'rtl') {
          switch (getRTLOffsetType()) {
            case 'negative':
              calculatedScrollLeft = -scrollLeft;
              break;
            case 'positive-descending':
              calculatedScrollLeft = scrollWidth - clientWidth - scrollLeft;
              break;
          }
        }

        // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.
        calculatedScrollLeft = Math.max(
          0,
          Math.min(calculatedScrollLeft, scrollWidth - clientWidth)
        );
        const calculatedScrollTop = Math.max(
          0,
          Math.min(scrollTop, scrollHeight - clientHeight)
        );

        return {
          isScrolling: true,
          horizontalScrollDirection:
            prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
          scrollLeft: calculatedScrollLeft,
          scrollTop: calculatedScrollTop,
          verticalScrollDirection:
            prevState.scrollTop < scrollTop ? 'forward' : 'backward',
          scrollUpdateWasRequested: false,
        };
      }, this._resetIsScrollingDebounced);
    };

    _outerRefSetter = (ref: any): void => {
      const { outerRef } = this.props;

      this._outerRef = ref as ScrollComponent;

      if (typeof outerRef === 'function') {
        outerRef(ref);
      } else if (
        outerRef != null &&
        typeof outerRef === 'object' &&
        outerRef.hasOwnProperty('current')
      ) {
        outerRef.current = ref;
      }
    };

    _resetIsScrollingDebounced = () => {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }

      this._resetIsScrollingTimeoutId = requestTimeout(
        this._resetIsScrolling,
        IS_SCROLLING_DEBOUNCE_INTERVAL
      );
    };

    _resetIsScrolling = () => {
      this._resetIsScrollingTimeoutId = null;

      this.setState({ isScrolling: false }, () => {
        // Clear style cache after state update has been committed.
        // This way we don't break pure sCU for items that don't use isScrolling param.
        this._getItemStyleCache(-1);
      });
    };

  };
}

const validateSharedProps = (
  {
    children,
    direction,
    height,
    width,
  }: Props<any>,
  { instance }: State
): void => {
  if (process.env.NODE_ENV !== 'production') {
    if (children == null) {
      throw Error(
        'An invalid "children" prop has been specified. ' +
        'Value should be a React component. ' +
        `"${children === null ? 'null' : typeof children}" was specified.`
      );
    }

    switch (direction) {
      case 'ltr':
      case 'rtl':
        // Valid values
        break;
      default:
        throw Error(
          'An invalid "direction" prop has been specified. ' +
          'Value should be either "ltr" or "rtl". ' +
          `"${direction}" was specified.`
        );
    }

    if (typeof width !== 'number') {
      throw Error(
        'An invalid "width" prop has been specified. ' +
        'Grids must specify a number for width. ' +
        `"${width === null ? 'null' : typeof width}" was specified.`
      );
    }

    if (typeof height !== 'number') {
      throw Error(
        'An invalid "height" prop has been specified. ' +
        'Grids must specify a number for height. ' +
        `"${height === null ? 'null' : typeof height}" was specified.`
      );
    }
  }
};
