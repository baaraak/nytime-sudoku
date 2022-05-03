import { useContext } from 'react';
import { BoardStateContext } from 'board-context';

export function useBoard() {
  const context = useContext(BoardStateContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
