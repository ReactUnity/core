import { TodoModel } from "./todoModel";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";
import * as React from "react";
import { ReactUnity, NativeInputInstance, NativeToggleInstance, Layout, YogaAlign, Style, FlexDirection, PositionType } from "react-unity-renderer";
import { IAppProps, IAppState, ITodo } from "./interfaces";

class TodoApp extends React.Component<IAppProps, IAppState> {
  public state: IAppState;
  newTodoField = React.createRef<NativeInputInstance>();
  selectAllToggle = React.createRef<NativeToggleInstance>();

  pageLayout: Layout = {
    AlignSelf: YogaAlign.Center,
    Width: '100%',
    MaxWidth: 640,
    FlexShrink: 1,
    Padding: 30,
  };

  headerStyle: Style = {
    fontColor: [1, 0.5235849, 0.5235849, 1],
    fontSize: 100,
  };

  headerLayout: Layout = {
    PaddingBottom: 20,
    AlignSelf: YogaAlign.Center,
    MinWidth: 'auto',
    MinHeight: 'auto',
  };

  setShowing = (nowShowing: string) => this.setState(state => ({ nowShowing }));

  private readonly headerInputStyle = {
    borderColor: '#cecece',
    zOrder: 1,
    backgroundColor: [1, 1, 1, 1],
    boxShadow: new ShadowDefinitionNative([0, 8], [10, 10], [0, 0, 0, 1], 10),
  };

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null
    };
  }

  public addTodo(val: string) {
    if (val) {
      this.props.model.addTodo(val);
      this.newTodoField.current.Value = '';
      setTimeout(() => this.newTodoField.current.Focus(), 0);
    }
  }

  public toggleAll = (checked: boolean) => {
    this.props.model.toggleAll(checked);
  }

  public toggle(todoToToggle: ITodo) {
    this.props.model.toggle(todoToToggle);
  }

  public destroy(todo: ITodo) {
    this.props.model.destroy(todo);
  }

  public edit(todo: ITodo) {
    this.setState({ editing: todo.id });
  }

  public save(todoToSave: ITodo, text: String) {
    this.props.model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  public cancel() {
    this.setState({ editing: null });
  }

  public clearCompleted() {
    this.props.model.clearCompleted();
  }

  public render() {
    var footer;
    var main;
    const todos = this.props.model.todos;

    var shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    var todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={e => this.cancel()}
        />
      );
    });

    var activeTodoCount = todos.filter(x => !x.completed).length;
    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onSwitch={this.setShowing}
          onClearCompleted={e => this.clearCompleted()}
        />;
    }

    if (todos.length) {
      main = (
        <scroll name="<Main>">
          {todoItems}
        </scroll>
      );
    }

    return (
      <view layout={this.pageLayout} style={{ font: NamedAssets.font }}>
        <view style={this.headerStyle} layout={this.headerLayout}>
          todos
        </view>

        <view style={{ backgroundColor: 'white', boxShadow: new ShadowDefinitionNative(6, 22, ColorNative.black, 16) }} layout={{ FlexShrink: 1 }}>

          <view name="Header" layout={{ FlexDirection: FlexDirection.Row, AlignItems: YogaAlign.Center, BorderBottomWidth: 2 }} style={this.headerInputStyle}>
            <input
              layout={{ Padding: 16, PaddingLeft: 64, FlexGrow: 1 }}
              style={{ borderRadius: 0 }}
              ref={this.newTodoField}
              placeholder="What needs to be done?"
              onSubmit={value => this.addTodo(value)}
            />

            <toggle ref={this.selectAllToggle} onChange={this.toggleAll} value={activeTodoCount === 0 && completedCount > 0}
              layout={{ PositionType: PositionType.Absolute, Left: 8, Top: '50%' }}
              style={{ translate: [0, -0.5], translateRelative: true }} />
          </view>

          {main}
          {footer}
        </view>
      </view >
    );
  }
}

var model = new TodoModel('react-todos');

function render() {
  ReactUnity.render(<TodoApp model={model} />, RootContainer, null);
}

model.subscribe(render);
render();
