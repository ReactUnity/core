
import * as React from 'react';
import { ReactUnity, FlexDirection, Wrap } from 'react-unity-renderer';

export interface Sample {
  name: string;
  render: typeof React.Component | (() => React.ReactElement);
}

export class App extends React.Component<{ samples: Sample[] }, { selectedSample?: Sample }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const selected = this.state.selectedSample;
    const SelectedComponent = selected?.render || (() => null);
    return <view layout={{ Height: '100%', AlignItems: 'Stretch', JustifyContent: 'Center', FlexDirection: FlexDirection.Column }}>
      <view layout={{ AlignItems: 'Center', JustifyContent: 'Center', FlexDirection: FlexDirection.Row, Wrap: Wrap.Wrap, FlexShrink: 0 }}
        style={{ backgroundColor: ColorNative.white }}>
        {this.props.samples.map(sample =>
          <button layout={{ Margin: 10 }} style={{ backgroundColor: selected === sample ? 0.7 : 0.9 }}
            onClick={() => this.setState(s => ({ selectedSample: sample }))}>{sample.name}</button>
        )}
      </view>

      <view layout={{ FlexGrow: 1, FlexShrink: 1 }}>
        <SelectedComponent />
      </view>
    </view>;
  }
}

export const SampleGallery = (samples: Sample[]) => <App samples={samples} />;

export default (samples: Sample[]) => ReactUnity.render(<App samples={samples} />, RootContainer, null);
