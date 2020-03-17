import { Utils } from "./utils";
import * as React from 'react';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";
import { FlexDirection, YogaJustify, YogaAlign } from "react-unity-renderer";
import { ITodoFooterProps } from "./interfaces";

class TodoFooter extends React.Component<ITodoFooterProps, {}> {

  public render() {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item');

    var clearButton = (
      <button style={{ hidden: this.props.completedCount === 0 }}
        layout={{ Width: 150 }}
        onClick={this.props.onClearCompleted}>
        Clear completed
      </button>
    );

    const nowShowing = this.props.nowShowing;
    const TabButton = (props) =>
      <button onClick={() => this.props.onSwitch(props.id)}
        layout={{ BorderWidth: 1, MarginHorizontal: 5, PaddingHorizontal: 7, PaddingVertical: 3 }}
        style={{ backgroundColor: props.id === nowShowing ? '#cecece' : 'transparent', borderColor: ['#af2f2f', 0.2] }}>
        {props.children}
      </button>;

    return (
      <view
        name="Footer"
        style={{ fontSize: 14, borderColor: '#cecece' }}
        layout={{
          BorderTopWidth: 2,
          FlexDirection: FlexDirection.Row, JustifyContent: YogaJustify.SpaceBetween,
          AlignItems: YogaAlign.Center, PaddingHorizontal: 16, PaddingVertical: 4
        }}>
        <view layout={{ Width: 150 }}>
          {`<b>${this.props.count}</b> ${activeTodoWord} left`}
        </view>

        <view layout={{ FlexDirection: 'Row' }}>
          <TabButton id={ALL_TODOS}>
            All
          </TabButton >
          <TabButton id={ACTIVE_TODOS}>
            Active
          </TabButton>
          <TabButton id={COMPLETED_TODOS}>
            Completed
          </TabButton>
        </view>

        {clearButton}
      </view>
    );
  }
}

export { TodoFooter };
