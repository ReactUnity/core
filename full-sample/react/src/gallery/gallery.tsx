
import * as React from 'react';
import { ReactUnity, FlexDirection, Wrap, YogaJustify, FontStyles, Position } from '@reactunity/renderer';
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

    const homePage = () => <view style={{ padding: 20 }}>
      This page exists to demonstrate features of React Unity. Everything on this page is built with React Unity.
      You can navigate the examples using the left panel.
    </view>;

    const drawButtonForSample = (sample: Sample, depth = 0, key: string) => <view key={key}>
      <button style={{
        paddingHorizontal: 20, paddingVertical: 16, paddingLeft: 20 + depth * 16, justifyContent: YogaJustify.FlexStart,
        backgroundColor: selected === sample ? 0.7 : 'transparent', borderRadius: 0, borderColor: 'black',
      }}
        onClick={() => !sample.children && this.setState({ selectedSample: sample.name })}>
        {sample.name}
      </button>

      {!!sample.children && <view>
        {sample.children.map((x, i) => drawButtonForSample(x, depth + 1, `${key}_${i}`))}
      </view>}
    </view>;


    const SelectedComponent = selected?.render || homePage;

    return <view style={{ height: '100%', alignItems: 'Stretch', justifyContent: 'FlexStart', flexDirection: FlexDirection.Column, backgroundColor: '#fafafa' }}>

      <view name="<Header>"
        style={{
          backgroundColor: '#2e9151', fontColor: 'white', boxShadow: shadow, zIndex: 1,
          alignItems: 'Center', justifyContent: 'SpaceBetween', flexDirection: FlexDirection.Row,
          flexWrap: Wrap.Wrap, flexShrink: 0, paddingVertical: 20, paddingHorizontal: 40,
        }}>
        <view style={{ fontStyle: FontStyles.Bold, fontSize: 26 }}>React Unity</view>
        <view style={{ flexGrow: 1 }}></view>
        <anchor url="https://github.com/KurtGokhan/react-unity">Github</anchor>
      </view>

      <view style={{ flexGrow: 1, flexShrink: 1, flexDirection: FlexDirection.Row, alignItems: 'Stretch' }}>
        <scroll name="<Sidebar>"
          style={{
            alignItems: 'Stretch', justifyContent: 'FlexStart', flexDirection: FlexDirection.Column,
            flexWrap: Wrap.NoWrap, flexShrink: 0, width: 250, paddingVertical: 20,
            backgroundColor: '#dadada', boxShadow: shadow,
          }}>
          {this.props.samples.map((x, i) => drawButtonForSample(x, 0, `${i}`))}
        </scroll>

        <scroll style={{ flexGrow: 1, flexShrink: 1, flexDirection: 'Column', alignItems: 'Stretch', justifyContent: 'FlexStart', padding: 20 }}>


          <view style={{ flexGrow: selected?.sourceCode ? 0 : 1, flexShrink: 0, flexDirection: 'Column', alignItems: 'Stretch', justifyContent: 'FlexStart', height: 250 }}>
            <SelectedComponent />
          </view>

          {selected?.sourceCode && <view style={{ marginTop: 20 }}>
            Source Code:
            <TextEditor text={selected.sourceCode} />
          </view>}


          {!selected?.sourceCode && !!(selected?.source || selected?.wiki) &&
            <view style={{
              position: Position.Absolute, right: 20, top: 20, paddingHorizontal: 30, paddingVertical: 20,
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
