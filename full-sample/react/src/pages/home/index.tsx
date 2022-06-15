
import { useNavigate } from 'react-router';
import styles from './index.module.scss';

export const HomePage = () => {
  const nav = useNavigate();

  return <view className={styles.host}>
    <richtext
      onPointerClick={(ev, sender) => {
        const linkId = sender.GetLinkInfo(ev);
        if (linkId === 'svgs') nav('svgs');
      }}
    >
      <size value={'32'}>
        Welcome to ReactUnity 😎
      </size>

      <br />
      <br />

      <size value='24'>
        <color value={'blue'}>
          Click an item in the

          <color value='red'>
            <uppercase>
              <margin value='20'>
                <nbsp />left menu<nbsp />
              </margin>
            </uppercase>
          </color>

          to see examples.
        </color>
      </size>


      Check out the new <link value={'svgs'}>
        <size value={24}>

          <color value='blue'>
            SVG
          </color>
        </size>
      </link> feature for example.
    </richtext>
  </view >;
};

export default HomePage;
