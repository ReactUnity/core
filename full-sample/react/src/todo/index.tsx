import * as React from 'react';
import { Motion, spring, TransitionMotion, presets, } from 'react-motion';
import { FlexDirection, YogaAlign, NativeInputInstance, Style, Layout, Overflow, YogaJustify, ReactUnity } from 'react-unity-renderer';

interface TodoItem {
  text: string;
  completed: boolean;
  id: number;
}

class TodoItemComponent extends React.Component<{ item: TodoItem, style: Style, key: React.Key, toggleCallback: ((id: number) => void), children: any }, {}> {
  private readonly itemTextLayout = { FlexShrink: 1, FlexGrow: 1, MaxHeight: 60 };
  private readonly itemTextStyle: Style = { fontStyle: 'Normal', textOverflow: 'Ellipsis' };
  private readonly itemStyle: Style = {};
  private readonly itemLayout = { FlexDirection: FlexDirection.Row, Padding: 4, AlignItems: YogaAlign.Center };

  callback = () => {
    this.props.toggleCallback(this.props.item.id);
  };

  render() {
    return <view layout={this.itemLayout} style={{ ...this.itemStyle, ...this.props.style }} key={this.props.key}>
      <button onClick={this.callback}>-</button>

      <view style={this.itemTextStyle} layout={this.itemTextLayout}>
        {this.props.item.text}
      </view>
    </view>
  }
}

class App extends React.Component<{}, { items: TodoItem[] }> {
  static id: number = 0;

  inputRef: React.RefObject<NativeInputInstance>;

  get completedItems() { return this.state.items.filter(x => x.completed); }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.inputRef = React.createRef<NativeInputInstance>();
  }

  itemsLayout: Layout = {
    FlexDirection: FlexDirection.Column,
    AlignItems: YogaAlign.Stretch,
    AlignContent: YogaAlign.FlexStart,
    AlignSelf: YogaAlign.Stretch,
    Padding: 16,
    MarginTop: 24,
    FlexGrow: 1,
    FlexShrink: 1,
    Overflow: Overflow.Scroll,
  };

  generalLayout: Layout = {
    FlexDirection: FlexDirection.Column,
    Padding: '10%',
    Height: '100%',
    AlignItems: YogaAlign.Center,
    JustifyContent: YogaJustify.FlexStart,
    Overflow: Overflow.Hidden,
  };

  onClickHandler = () => {
    const value = this.inputRef.current.Value;

    if (value) {
      const newItem: TodoItem = { text: value, completed: false, id: App.id++ };
      this.setState(state => ({
        items: [...state.items, newItem],
      }));

      this.inputRef.current.Value = '';
    }

    this.inputRef.current.Focus();
  };

  toggleIndex = (i: number) => {
    this.setState(state => {
      const oldItem = this.state.items[i];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      return { items: [...state.items.slice(0, i), newItem, ...state.items.slice(i + 1)] };
    });
  };

  removeIndex = (i: number) => {
    this.setState(state => ({ items: [...state.items.slice(0, i), ...state.items.slice(i + 1)] }));
  };

  removeCompleted = () => {
    this.setState(state => ({ items: state.items.filter(x => !x.completed) }));
  };

  render() {
    return <view layout={this.generalLayout}>
      <input ref={this.inputRef} style={{ fontColor: 'red', borderColor: 'grey' }} layout={{ MarginBottom: 10, BorderWidth: 1 }} placeholder="Enter a  task" />

      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1) }}>
        {style =>
          <button onClick={this.onClickHandler} style={{ backgroundImage: NamedAssets.bg, ...style }}>
            Add TODO
          </button>}
      </Motion>

      <scroll layout={this.itemsLayout} style={{ backgroundColor: ColorNative.white, borderRadius: 20 }}>
        <TransitionMotion
          willEnter={() => ({ opacity: 0, translate: 100 })}
          willLeave={() => ({ opacity: spring(0), translate: spring(100) })}
          styles={this.state.items.map((item, i) => ({
            key: item.id as any,
            data: item,
            style: { opacity: spring(1), translate: spring(0) },
          }))}>
          {interpolatedStyles =>
            <>{
              interpolatedStyles.map(config =>
                <TodoItemComponent key={config.key} item={config.data} style={{ ...config.style, translate: [config.style.translate, 0] }}
                  toggleCallback={this.toggleIndex}>
                </TodoItemComponent>
              )}</>

          }
        </TransitionMotion>


      </scroll>

      <button onClick={this.removeCompleted}
        layout={{ Height: 42, MarginTop: 20, AlignSelf: YogaAlign.FlexEnd }}
        style={{ hidden: !this.completedItems.length }}>
        <image source={NamedAssets.delete} layout={{ AlignSelf: YogaAlign.Center }} fit={2} />
        Remove completed
      </button>

    </view >;
  }
}
ReactUnity.render(<App />, RootContainer, null);
