import * as React from 'react';

// TODO

export interface RadioGroupProps {
  name: string;
  selectedValue: any;
  onChange: () => void;
  children: React.ReactNode;
}

export interface RadioContext {
  radioGroup: {
    name; selectedValue; onChange;
  };
}

export interface RadioProps {
  value?: any;
}

export class Radio extends React.Component<RadioProps, any, RadioContext> {
  // static contextType: React.ContextType<RadioContext>;

  render() {
    const { selectedValue, onChange } = this.context.radioGroup;
    const optional = {} as any;
    if (selectedValue !== undefined) {
      optional.checked = (this.props.value === selectedValue);
    }
    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return (
      <button name="[Radio]" onClick={() => optional.onChange(this.props.value)} />
    );
  }
}

export class RadioGroup extends React.Component<RadioGroupProps> {
  getChildContext() {
    const { selectedValue, onChange } = this.props;
    return { radioGroup: { selectedValue, onChange } };
  }

  render() {
    const { name, selectedValue, onChange, children, ...rest } = this.props;
    return <view name={name || '<RadioGroup>'} {...rest}>
      {children}
    </view>;
  }
}
