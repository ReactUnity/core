
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export const InteropPage = () => {
  const [shouldListen, setShouldListen] = useState(true);
  const [pressedKey, setPressedKey] = useState(null);

  useEffect(() => {
    if (shouldListen) {
      const remove = Globals.InteropTest.AddKeyPressListener((key) => {
        setPressedKey(key);
      });

      Interop.GetType('MyInterop.InteropTest').TestDebug()

      return () => remove();
    }
  }, [shouldListen]);

  return <view className={styles.host}>
    <button onClick={() => setShouldListen(x => !x)}>
      {shouldListen ? 'Remove Listener' : 'Add Listener'}
    </button>

    {!!pressedKey && <view>
      <text>Pressed key is: {pressedKey}</text>
    </view>}
  </view>;
};

export default InteropPage;
