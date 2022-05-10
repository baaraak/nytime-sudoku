import React from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import { RiArrowGoForwardLine, RiArrowGoBackFill } from 'react-icons/ri';
import { useBoard } from 'hooks/useBoard';
import { KeyModeType } from 'board-context';

const Keyboard = React.forwardRef<HTMLDivElement, { width: number }>(
  ({ width }, ref) => {
    const { mode, setMode, updateCellValue } = useBoard();

    return (
      <div
        ref={ref}
        className="keyboard"
        style={{ width }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="modes">
          <span>Mode:</span>
          <button
            onClick={() => setMode(KeyModeType.normal)}
            className={`btn mode ${
              mode === KeyModeType.normal && 'mode-active'
            }`}
          >
            #
          </button>
          <button
            onClick={() => setMode(KeyModeType.side)}
            className={`btn mode ${mode === KeyModeType.side && 'mode-active'}`}
          >
            123
          </button>
          <button
            onClick={() => setMode(KeyModeType.center)}
            className={`btn mode ${
              mode === KeyModeType.center && 'mode-active'
            }`}
          >
            123
          </button>
          <button
            onClick={() => setMode(KeyModeType.color)}
            className={`btn mode mode-color ${
              mode === KeyModeType.color && 'mode-active'
            }`}
          >
            <span className="red"></span>
            <span className="blue"></span>
            <span className="yellow"></span>
            <span className="green"></span>
          </button>
        </div>

        <div className="keys">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              className="btn num"
              key={n}
              onClick={() => updateCellValue(n)}
            >
              {n}
            </button>
          ))}

          <button className="btn back num">
            <RiArrowGoBackFill />
          </button>
          <button className="btn forwards num">
            <RiArrowGoForwardLine />
          </button>
          <button className="btn restart num">
            <VscDebugRestart />
          </button>
        </div>

        <div className="actions">
          <button className="btn btn-delete" onClick={() => updateCellValue(0)}>
            Delete
          </button>
          <button className="btn btn-info">Check</button>
        </div>
      </div>
    );
  }
);

export default Keyboard;
