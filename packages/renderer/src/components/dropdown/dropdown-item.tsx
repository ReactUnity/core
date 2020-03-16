import * as React from 'react';

export interface DropdownItemProps {
  value?: any;
  triggerTemplate?: React.ReactNode;
}

export class DropdownItem extends React.Component<DropdownItemProps, {}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return this.props.children;
  }
}
