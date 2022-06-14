import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { FaAlignCenter, FaBeer } from 'react-icons/fa';
import { FcDoughnutChart } from 'react-icons/fc';
import { ReactComponent as CheckSVG } from 'src/assets/check.svg';
import { Graph } from './graph';
import styles from './index.module.scss';


const xPoints = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
const yPoints = [5, 30, -5, -10, 15, -15, 20, 5, 8, -12, -20, 2, 3, -5, 8, -2, 22, -30, -15, -35, -20];

export function SvgsPage() {
  const [points, setPoints] = useState(5);
  const [lineWidth, setLineWidth] = useState(3);

  const [arrayX, arrayY] = useMemo(() => {
    return [xPoints.slice(0, points), yPoints.slice(0, points)];
  }, [points]);

  return <div className={clsx(styles.host)}>

    <view>
      <h2>Inline SVGs</h2>

      <row style={{ height: 50 }}>
        <CheckSVG />

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="black">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </row>
    </view>

    <view>
      <h2>React Icons</h2>

      <row>
        <FaBeer />
        <FaAlignCenter />
        <FcDoughnutChart />
      </row>
    </view>

    <view>
      <h2>Dynamic SVG</h2>

      <Graph arrayX={arrayX} arrayY={arrayY} lineWidth={lineWidth} />

      <view style={{ flexDirection: 'row', marginTop: 10 }}>
        <button onClick={() => setPoints(x => x + 1)}>Add point</button>
        <button onClick={() => setLineWidth(x => x - 1)}>Thickness -</button>
        <button onClick={() => setLineWidth(x => x + 1)}>Thickness +</button>
      </view>
    </view>
  </div>;
}

export default SvgsPage;
