import { Paper } from '@reactunity/material/paper';
import { FixedSizeGrid, FixedSizeList, VariableSizeList } from '@reactunity/material/virtual-scroll';

const Row = ({ index, style }: any) => (
  <text style={style} pool={true}>Row {index}</text>
);



const Cell = ({ columnIndex, rowIndex, style }) => (
  <text style={style}>Item {rowIndex},{columnIndex}</text>
);

const FixedGridExample = () => (
  <FixedSizeGrid
    columnCount={1000}
    columnWidth={100}
    height={450}
    rowCount={1000}
    rowHeight={35}
    width={450}
  >
    {Cell as any}
  </FixedSizeGrid>
);

// These row heights are arbitrary.
// Yours should be based on the content of the row.
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = index => rowHeights[index];

const FixedSizeExample = () => (
  <FixedSizeList
    height={450}
    itemCount={1000}
    itemSize={30}
    width={300}
    smoothness={0}
  >
    {Row}
  </FixedSizeList>
);

const VariableSizeExample = () => (
  <VariableSizeList
    height={450}
    itemCount={1000}
    itemSize={getItemSize}
    width={300}
  >
    {Row}
  </VariableSizeList>
);


export function VirtualScrolls() {
  return <section>
    <h2>Virtual Scrolls</h2>

    <Paper elevation={2}>
      <view style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <FixedSizeExample />
        <VariableSizeExample />
        <FixedGridExample />
      </view>
    </Paper>
  </section>;
}
