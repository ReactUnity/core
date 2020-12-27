import * as React from "react";
import { NativeInputInstance, FlexDirection, YogaAlign, Display, PositionType, PointerEvents } from "@reactunity/renderer";

import { ITodoItemProps, ITodoItemState } from './interfaces';

class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

  public state: ITodoItemState;
  editField: React.Ref<NativeInputInstance>;

  constructor(props: ITodoItemProps) {
    super(props);
    this.state = { editText: this.props.todo.title, hovered: false };
  }

  public handleSubmit() {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({ editText: val });
    } else {
      this.props.onDestroy();
    }
  }

  public handleEdit() {
    this.props.onEdit();
    this.setState({ editText: this.props.todo.title });
  }

  setHover = (x: boolean) => this.setState({ hovered: x });
  pointerEnter = () => this.setHover(true);
  pointerExit = () => this.setHover(false);

  public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: ITodoItemState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText ||
      nextState.hovered !== this.state.hovered
    );
  }

  public render() {
    const completed = this.props.todo.completed;

    return (
      <view name="<TodoItem>" onPointerEnter={this.pointerEnter} onPointerExit={this.pointerExit}
        layout={{ FlexDirection: FlexDirection.Row, AlignItems: YogaAlign.Center, BorderBottomWidth: 1 }}
        style={{ borderColor: '#dedede', fontStyle: completed ? 'Strikethrough' : null, opacity: completed ? 0.4 : 1 }}>

        <view layout={{ FlexGrow: 1, FlexShrink: 1, Padding: 16, PaddingLeft: 64 }}>
          {this.props.todo.title}
        </view>

        <input layout={{ Display: Display.None }}
          ref={this.editField}
        />

        <toggle onChange={this.props.onToggle} value={this.props.todo.completed}
          layout={{ PositionType: PositionType.Absolute, Left: 8, Top: '50%' }}
          style={{ translate: [0, -0.5], translateRelative: true }}></toggle>

        <button onClick={this.props.onDestroy}
          style={{ backgroundColor: 'clear', fontColor: '#cc9a9a', visibility: this.state.hovered, pointerEvents: PointerEvents.All }}
          layout={{ MarginRight: 20 }}>
          ×
        </button>
      </view>
    );
  }
}

export { TodoItem };
