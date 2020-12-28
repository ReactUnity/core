import { TodoModel } from "./todoModel";
import { TodoFooter } from "./footer";
import { TodoItem } from "./todoItem";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";
import * as React from "react";
import { NativeInputInstance, NativeToggleInstance, Layout, YogaAlign, Style, FlexDirection, PositionType, ColorAux } from "@reactunity/renderer";
import { IAppProps, IAppState, ITodo } from "./interfaces";

export class TodoApp extends React.Component<IAppProps, IAppState> {
  public state: IAppState;
  newTodoField = React.createRef<NativeInputInstance>();
  selectAllToggle = React.createRef<NativeToggleInstance>();

  pageLayout: Layout = {
    alignSelf: YogaAlign.Center,
    width: '100%',
    maxWidth: 640,
    flexShrink: 1,
    padding: 30,
  };

  headerStyle: Style = {
    fontColor: [1, 0.5235849, 0.5235849, 1],
    fontSize: 100,
  };

  headerLayout: Layout = {
    paddingBottom: 20,
    alignSelf: YogaAlign.Center,
    minWidth: 'auto',
    minHeight: 'auto',
  };

  setShowing = (nowShowing: string) => this.setState(state => ({ nowShowing }));

  private readonly headerInputStyle = {
    borderColor: '#cecece' as ColorAux,
    zOrder: 1,
    backgroundColor: [1, 1, 1, 1],
    boxShadow: '0 8 10 10 black 10',
  };

  constructor(props: IAppProps) {
    super(props);

    var model = new TodoModel('react-todos');
    model.subscribe(() => this.setState({ model }));

    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
      model,
    };
  }

  public addTodo(val: string) {
    if (val) {
      this.state.model.addTodo(val);
      this.newTodoField.current.Value = '';
      setTimeout(() => this.newTodoField.current.Focus(), 0);
    }
  }

  public toggleAll = (checked: boolean) => {
    this.state.model.toggleAll(checked);
  }

  public toggle(todoToToggle: ITodo) {
    this.state.model.toggle(todoToToggle);
  }

  public destroy(todo: ITodo) {
    this.state.model.destroy(todo);
  }

  public edit(todo: ITodo) {
    this.setState({ editing: todo.id });
  }

  public save(todoToSave: ITodo, text: String) {
    this.state.model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  public cancel() {
    this.setState({ editing: null });
  }

  public clearCompleted() {
    this.state.model.clearCompleted();
  }

  public render() {
    var footer;
    var main;
    const todos = this.state.model.todos;

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
      <view style={this.pageLayout}>
        <view style={{ ...this.headerStyle, ...this.headerLayout }}>
          todos
        </view>

        <view style={{ backgroundColor: 'white', boxShadow: '6 6 22 22 black 16', flexShrink: 1 }}>

          <view name="Header" style={{ flexDirection: FlexDirection.Row, alignItems: YogaAlign.Center, borderBottomWidth: 2, ...this.headerInputStyle }}>
            <input
              style={{ padding: 16, paddingLeft: 64, flexGrow: 1, borderRadius: 0 }}
              ref={this.newTodoField}
              placeholder="What needs to be done?"
              onSubmit={value => this.addTodo(value)}
            />

            <toggle ref={this.selectAllToggle} onChange={this.toggleAll} value={activeTodoCount === 0 && completedCount > 0}
              style={{ positionType: PositionType.Absolute, left: 8, top: '50%', translate: [0, -0.5], translateRelative: true }} />
          </view>

          {main}
          {footer}
        </view>
      </view >
    );
  }
}
