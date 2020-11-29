
import * as React from 'react';
import { ReactUnity, FlexDirection, Wrap, YogaJustify, FontStyles, PositionType } from '@reactunity/renderer';
import { TextEditor } from './editor';

const shadow = '0 8 10 10 black 10';

export interface Sample {
  name: string;
  render: typeof React.Component | React.FC<any> | (() => React.ReactElement);
  source?: string;
  sourceCode?: string;
  styleCode?: string;
  wiki?: string;
  children?: Sample[];
}

export class App extends React.Component<{ samples: Sample[] }, { selectedSample?: string }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const selectedSample = this.state.selectedSample;
    const allSamples = ([] as Sample[]).concat(this.props.samples, ...this.props.samples.map(x => x.children || [] as Sample[]));
    const selected = allSamples.find(x => x.name === selectedSample);

    const homePage = () => <view layout={{ Padding: 20 }}>
      This page exists to demonstrate features of React Unity. Everything on this page is built with React Unity.
      You can navigate the examples using the left panel.
    </view>;

    const drawButtonForSample = (sample: Sample, depth = 0, key: string) => <view key={key}>
      <button layout={{ PaddingHorizontal: 20, PaddingVertical: 16, PaddingLeft: 20 + depth * 16, JustifyContent: YogaJustify.FlexStart }}
        style={{ backgroundColor: selected === sample ? 0.7 : 'transparent', borderRadius: 0, borderColor: Color.black }}
        stateStyles={{ hover: { backgroundColor: 0.8 } }}
        onClick={() => !sample.children && this.setState({ selectedSample: sample.name })}>
        {sample.name}
      </button>

      {!!sample.children && <view>
        {sample.children.map((x, i) => drawButtonForSample(x, depth + 1, `${key}_${i}`))}
      </view>}
    </view>;


    const SelectedComponent = selected?.render || homePage;

    return <view layout={{ Height: '100%', AlignItems: 'Stretch', JustifyContent: 'FlexStart', FlexDirection: FlexDirection.Column }}
      style={{ backgroundColor: '#fafafa' }}>

      <view name="<Header>"
        style={{ backgroundColor: '#2e9151', fontColor: Color.white, boxShadow: shadow, zOrder: 1 }}
        layout={{ AlignItems: 'Center', JustifyContent: 'SpaceBetween', FlexDirection: FlexDirection.Row, Wrap: Wrap.Wrap, FlexShrink: 0, PaddingVertical: 20, PaddingHorizontal: 40 }}>
        <view style={{ fontStyle: FontStyles.Bold, fontSize: 26 }}>React Unity</view>
        <view layout={{ FlexGrow: 1 }}></view>
        <anchor url="https://github.com/KurtGokhan/react-unity">Github</anchor>
      </view>

      <view layout={{ FlexGrow: 1, FlexShrink: 1, FlexDirection: FlexDirection.Row, AlignItems: 'Stretch' }}>
        <scroll name="<Sidebar>"
          layout={{ AlignItems: 'Stretch', JustifyContent: 'FlexStart', FlexDirection: FlexDirection.Column, Wrap: Wrap.NoWrap, FlexShrink: 0, Width: 250, PaddingVertical: 20 }}
          style={{ backgroundColor: '#dadada', boxShadow: shadow }}>
          {this.props.samples.map((x, i) => drawButtonForSample(x, 0, `${i}`))}
        </scroll>

        <scroll layout={{ FlexGrow: 1, FlexShrink: 1, FlexDirection: 'Column', AlignItems: 'Stretch', JustifyContent: 'FlexStart', Padding: 20 }}>


          <view layout={{ FlexGrow: selected?.sourceCode ? 0 : 1, FlexShrink: 0, FlexDirection: 'Column', AlignItems: 'Stretch', JustifyContent: 'FlexStart', Height: 250 }}>
            <SelectedComponent />
          </view>

          {selected?.sourceCode && <view layout={{ MarginTop: 20 }}>
            Source Code:
            <TextEditor text={selected.sourceCode} />
          </view>}


          {!selected?.sourceCode && !!(selected?.source || selected?.wiki) &&
            <view layout={{ PositionType: PositionType.Absolute, Right: 20, Top: 20, PaddingHorizontal: 30, PaddingVertical: 20 }}
              style={{
                backgroundColor: [0.1803922, 0.5686275, 0.3176471, 1],
                borderRadius: 5,
                boxShadow: shadow,
                fontColor: [1, 1, 1, 1],
                fontSize: 24,
              }}>
              {!!selected.source && <anchor url={selected.source}>Source</anchor>}
              {!!selected.wiki && <anchor url={selected.wiki}>Wiki</anchor>}
            </view>}
        </scroll>
      </view>
    </view >;
  }
}

export const SampleGallery = (samples: Sample[]) => <App samples={samples} />;


const renderGallery = (samples: Sample[]) => ReactUnity.render(<App samples={samples} />);
export default renderGallery;
