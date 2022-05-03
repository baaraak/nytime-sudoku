import React, { useLayoutEffect, useRef } from 'react';
import { Cell as CellType } from 'board-context';

function Cell({
  value,
  index,
  given,
  active,
  cPencilmarks,
  sPencilmarks,
}: CellType) {
  const cellRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (cellRef.current && active) {
      cellRef.current.focus();
    }
  }, [active]);
  return (
    <div
      tabIndex={index}
      ref={cellRef}
      data-index={index}
      data-row={~~(index / 9) + 1}
      data-col={Number((index / 9).toString().charAt(2)) + 1}
      className={`cell ${given ? 'given' : ''} ${active ? 'active' : ''}`}
    >
      {value.toString() !== '0' ? (
        <span className="value">{value}</span>
      ) : (
        <>
          <div className="side-pencil-marks">
            {sPencilmarks.sort().map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <div className="center-pencil-marks">{cPencilmarks}</div>
        </>
      )}
    </div>
  );
}

export default React.memo(Cell);
