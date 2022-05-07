import { isNumeric } from 'lib/utils';
import * as React from 'react';

export type Cell = {
  given: boolean;
  active: boolean;
  value: number;
  index: number;
  sPencilmarks: number[];
  cPencilmarks: number[];
};

type State = {
  puzzle: Cell[] | undefined;

  setActive: (index: number | number[]) => void;
  setPuzzle: (puzzle: number[]) => void;
  updateCellValue: (index: number, value: number) => void;
  onDoubleClick: (index: number) => void;

  handleKeyboardGestures: (e: KeyboardEvent) => void;
};
type BoardProviderProps = { children: React.ReactNode };

const BoardStateContext = React.createContext<State | undefined>(undefined);

function BoardProvider({ children }: BoardProviderProps) {
  const [puzzle, setPuzzle] = React.useState<Cell[]>();

  const updateCellValue = (value: number) => {
    setPuzzle((p) =>
      p?.map((cell, i) => {
        if (cell.active && !cell.given) return { ...cell, value };
        return cell;
      })
    );
  };

  const onSetPuzzle = (puzzle: number[]) => {
    const p = puzzle.map((p, i) => ({
      index: i,
      given: p !== 0,
      value: p,
      active: false,
      sPencilmarks: [],
      cPencilmarks: [],
    }));
    setPuzzle(p);
  };

  const setActive = (indexes: number | number[]) => {
    setPuzzle((p) =>
      p?.map((cell, i) => ({
        ...cell,
        active: Array.isArray(indexes)
          ? indexes.includes(cell.index)
          : i === indexes,
      }))
    );
  };

  const onDoubleClick = (index: number) => {
    const indexValue = puzzle?.[index].value;
    if (indexValue === 0) return;
    const valueIndexes = puzzle
      ?.filter((cell) => cell.value === indexValue)
      .map((cell) => cell.index);
    if (valueIndexes?.length) {
      setActive(valueIndexes);
    }
  };

  const handleKeyboardGestures = (e: KeyboardEvent) => {
    if (!puzzle) return;
    const addOrRemove = (arr: number[], item: number) =>
      arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
    // TODO: find better way then e.which (deprecated), problem with shiftKey+number return symbol
    let charCode = String.fromCharCode(e.which).toLowerCase();

    if (e.shiftKey && isNumeric(charCode)) {
      // User clicked shiftKey+number = side pencil marks
      setPuzzle((p) =>
        p?.map((cell, i) => {
          if (cell.active)
            return {
              ...cell,
              sPencilmarks: addOrRemove(cell.sPencilmarks, Number(charCode)),
            };
          return cell;
        })
      );
    } else if (e.ctrlKey && isNumeric(e.key)) {
      // User clicked ctrlKey+number = center pencil marks
      setPuzzle((p) =>
        p?.map((cell, i) => {
          if (cell.active)
            return {
              ...cell,
              cPencilmarks: addOrRemove(cell.cPencilmarks, Number(e.key)),
            };
          return cell;
        })
      );
    } else if (isNumeric(e.key)) {
      // User clicked a number = if multiple cells are active, update all cells
      if (puzzle?.filter((p) => p.active).length > 1) {
        return setPuzzle((p) =>
          p?.map((cell, i) => {
            if (cell.active)
              return {
                ...cell,
                sPencilmarks: addOrRemove(cell.sPencilmarks, Number(charCode)),
              };
            return cell;
          })
        );
      }
      updateCellValue(parseInt(e.key));
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      const prevActive = puzzle?.findIndex((cell) => cell.active);
      if (prevActive === 80) return setActive(0);
      setActive((prevActive || 0) + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
      const prevActive = puzzle?.findIndex((cell) => cell.active);
      if (prevActive === 0) return setActive(80);
      setActive((prevActive || 0) - 1);
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
      const prevActive = puzzle?.findIndex((cell) => cell.active);
      // if (prevActive === 80) return setActive(0);
      setActive((prevActive || 0) - 9);
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      const prevActive = puzzle?.findIndex((cell) => cell.active);
      // if (prevActive === 0) return setActive(80);
      setActive((prevActive || 0) + 9);
    } else if (e.key === 'Backspace') {
      // remove cell value
      updateCellValue(0);
    }
  };

  const value = {
    puzzle,
    setPuzzle: onSetPuzzle,
    updateCellValue,
    setActive,
    onDoubleClick,
    handleKeyboardGestures,
  };
  return (
    <BoardStateContext.Provider value={value}>
      {children}
    </BoardStateContext.Provider>
  );
}

export { BoardProvider, BoardStateContext };
