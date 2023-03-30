import { render } from "@reactunity/renderer";
import { useMemo, useState } from "react";
import './index.css';

const ROWS = 125;
const COLUMNS = 15;

function Row({ row, columns }: { row: number; columns: number }) {
  const children = useMemo(() => {
    return Array(columns)
      .fill(0)
      .map((_, col) => {
        return (
          <div key={col} class={`mr-1 h-6 w-[70px] bg-green-300`} id={`cell-${row}-${col}`}
            onClick={() => console.log(`Clicked ${row} x ${col}`)}>
            {`${row} x ${col}`}
          </div>
        );
      });
  }, [columns, row]);

  return <div class="mb-1 flex flex-row" id={`row-${row}`}>{children}</div>;
}

function Rows({ columns, rows }: { columns: number; rows: number }) {
  const children = useMemo(() => {
    return Array(rows)
      .fill(0)
      .map((_, i) => {
        return <Row key={i} row={i} columns={columns} />;
      });
  }, [columns, rows]);

  return <div class="flex flex-col p-3">{children}</div>;
}

export default function StressTest() {
  const [rows, setRows] = useState(ROWS);
  const [columns, setColumns] = useState(COLUMNS);

  return (
    <scroll>
      <button
        class="p-2 bg-white rounded-md w-[200px]"
        onClick={() => {
          const newRows = Math.floor(Math.random() * ROWS);
          const newColumns = Math.floor(Math.random() * COLUMNS);

          setRows(newRows);
          setColumns(newColumns);
        }}
      >
        Reroll
      </button>
      <Rows key={rows} columns={columns} rows={rows} />
    </scroll>
  );
}

render(<StressTest />);
