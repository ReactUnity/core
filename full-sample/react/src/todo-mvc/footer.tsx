import { Utils } from "./utils";
import * as React from 'react';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "./constants";
import { FlexDirection, YogaJustify, YogaAlign } from "@reactunity/renderer";
import { ITodoFooterProps } from "./interfaces";

class TodoFooter extends React.Component<ITodoFooterProps, {}> {

  public render() {
    var activeTodoWord = Utils.pluralize(this.props.count, 'item');

    var clearButton = (
      <button style={{ visibility: this.props.completedCount !== 0, width: 150 }}
        onClick={this.props.onClearCompleted}>
        Clear completed
      </button>
    );

    const nowShowing = this.props.nowShowing;
    const TabButton = (props) =>
      <button onClick={() => this.props.onSwitch(props.id)}
        style={{
          borderWidth: 1, marginHorizontal: 5, paddingHorizontal: 7, paddingVertical: 3,
          backgroundColor: props.id === nowShowing ? '#cecece' : 'transparent', borderColor: ['#af2f2f', 0.2],
        }}>
        {props.children}
      </button>;

    return (
      <view
        name="Footer"
        style={{
          fontSize: 14, borderColor: '#cecece',
          borderTopWidth: 2,
          flexDirection: FlexDirection.Row, justifyContent: YogaJustify.SpaceBetween,
          alignItems: YogaAlign.Center, paddingHorizontal: 16, paddingVertical: 4
        }}>
        <view style={{ width: 150 }}>
          {`<b>${this.props.count}</b> ${activeTodoWord} left`}
        </view>

        <view style={{ flexDirection: 'Row' }}>
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
