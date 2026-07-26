import { useMemo } from 'react';
import styles from './index.module.scss';

function generatePolylineArray(arrayX: number[], arrayY: number[]) {
  let polyline = '';
  arrayX.map((coordX, i) => {
    return polyline += `${coordX}, ${arrayY[i]} `;
  });
  return polyline;
}

export const Graph = ({ arrayX, arrayY, lineWidth }: { arrayX: number[], arrayY: number[], lineWidth: number }) => {
  const polyline = useMemo(() => {
    return generatePolylineArray(arrayX, arrayY);
  }, [arrayX, arrayY]);

  return (
    <svg x='0px' y='0px' viewBox='0 0 1000 2' className={styles.graph} id='graph'>
      <polyline points={polyline} fill='none' stroke={'black'} strokeWidth={lineWidth} />

      {arrayX.map((coordX, i) =>
        <circle key={i} cx={coordX} cy={arrayY[i]} r={6} fill={'red'} />)}
    </svg>
  );
};
