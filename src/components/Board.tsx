import { useBoard } from 'hooks/useBoard';
import useEventListener from 'hooks/useEventListener';
import { MAXMIMUM_CELL_SIZE } from 'lib/constants';
import { useCallback, useRef, useState } from 'react';
import Keyboard from './keyboard';

type Props = {
  children: React.ReactNode;
};

function getIndexAttribute(el: any) {
  const index = el.closest('.cell')?.getAttribute('data-index');
  return parseInt(index);
}

function getBoardDimension() {
  const { innerWidth: width, innerHeight: height } = window;
  if (width > height) {
    const board = Math.min(Math.floor(height * 0.8), Math.floor(width * 0.52));
    const keyboard = Math.floor(board * 0.56);
    return { board, keyboard };
  } else {
    const board = Math.min(Math.floor(height * 0.54), Math.floor(width * 0.95));
    const keyboard = Math.floor(board * 0.7);
    return { board, keyboard };
  }
}

function Board({ children }: Props) {
  const dimension = getBoardDimension();
  const [cellSize, setCellSize] = useState(
    Math.min(dimension.board / 9, MAXMIMUM_CELL_SIZE)
  );
  const [keyboardWidth, setKeyboardWidth] = useState(dimension.keyboard);
  const { setActive, onDoubleClick, handleKeyboardGestures } = useBoard();
  const movingGestureCells = useRef<number[]>([]);
  const isMoving = useRef<boolean>(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!boardRef.current?.contains(e.target as Node)) return setActive([]);
    const index = getIndexAttribute(e.target);

    if (index) {
      setActive(index);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const index = getIndexAttribute(e.target);
    if (index) {
      onDoubleClick(index);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const index = getIndexAttribute(e.target);
      if (index) {
        handleKeyboardGestures(e);
      }
    },
    [handleKeyboardGestures]
  );

  const handleMouseDown = (e: Event | MouseEvent) => {
    const index = getIndexAttribute(e.target);
    if (!index || !boardRef.current?.contains(e.target as Node))
      return setActive([]);

    isMoving.current = true;
    movingGestureCells.current.push(getIndexAttribute(e.target));
  };

  const handleMouseUp = (e: Event | MouseEvent) => {
    isMoving.current = false;
    movingGestureCells.current = [];
  };

  const handleMouseMove = (e: Event | MouseEvent) => {
    if (!isMoving.current) return;
    const i = getIndexAttribute(e.target);
    if (movingGestureCells.current.includes(i)) return;
    movingGestureCells.current = [...movingGestureCells.current, i];
    setActive(movingGestureCells.current);
  };

  const handleResize = (e: Event) => {
    const dimension = getBoardDimension();
    setCellSize(Math.min(dimension.board / 9, MAXMIMUM_CELL_SIZE));
    setKeyboardWidth(dimension.keyboard);
  };

  // listening to the window to detect events outside the board to clear the active cells
  useEventListener('keydown', handleKeyDown);
  useEventListener('mousedown', handleMouseDown);
  useEventListener('mouseup', handleMouseUp);
  useEventListener('mousemove', handleMouseMove);
  useEventListener('resize', handleResize);

  return (
    <div className="board" ref={boardRef}>
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(9, ${cellSize}px)`,
          gridTemplateRows: `repeat(9, ${cellSize}px)`,
        }}
      >
        {children}
      </div>
      <Keyboard width={keyboardWidth} />
    </div>
  );
}

export default Board;
