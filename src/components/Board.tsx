import { KeyModeType } from 'board-context';
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
  const { setActive, onDoubleClick, handleKeyboardGestures, setMode } =
    useBoard();
  const movingGestureCells = useRef<number[]>([]);
  const isMoving = useRef<boolean>(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!boardRef.current?.contains(e.target as Node)) return setActive([]);
    const index = getIndexAttribute(e.target);

    if (index) {
      setActive(index, e.shiftKey);
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
      if (e.shiftKey) setMode(KeyModeType.side);
      if (e.ctrlKey) setMode(KeyModeType.center);
    },
    [handleKeyboardGestures]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const index = getIndexAttribute(e.target);
      if (index) {
        handleKeyboardGestures(e);
      }
    },
    [handleKeyboardGestures, setMode]
  );

  const handleMouseDown = (e: Event) => {
    // if the user clicked on the keyboard: do nothing
    if (keyboardRef.current?.contains(e.target as Node)) return;

    const index = getIndexAttribute(e.target);
    // user clicked outeside the board: clear active cells
    if (!index || !boardRef.current?.contains(e.target as Node))
      return setActive([]);

    // user clicked on a cell: store the hovered cells index
    isMoving.current = true;
    movingGestureCells.current.push(getIndexAttribute(e.target));
  };

  const handleMouseUp = (e: Event) => {
    isMoving.current = false;
    movingGestureCells.current = [];
  };

  const handleMouseMove = (e: Event) => {
    if (!isMoving.current) return;
    const i = getIndexAttribute(e.target);
    if (movingGestureCells.current.includes(i)) return;
    movingGestureCells.current = [...movingGestureCells.current, i];

    setActive(movingGestureCells.current, (e as KeyboardEvent).shiftKey);
  };

  const handleResize = (e: Event) => {
    const dimension = getBoardDimension();
    setCellSize(Math.min(dimension.board / 9, MAXMIMUM_CELL_SIZE));
    setKeyboardWidth(dimension.keyboard);
  };

  // to detect cliocks outside the board
  useEventListener('keydown', handleKeyDown);
  useEventListener('keyup', handleKeyUp);
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
      <Keyboard width={keyboardWidth} ref={keyboardRef} />
    </div>
  );
}

export default Board;
