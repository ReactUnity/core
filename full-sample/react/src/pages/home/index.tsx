
import styles from './index.module.scss';

export const HomePage = () => {
  return <view className={styles.host}>
    <richtext>
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

          to see examples
        </color>
      </size>
    </richtext>
  </view >;
};

export default HomePage;
