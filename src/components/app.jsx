import Cell from './cell';
import Board from './board';
import { NYTimesScraper } from 'lib/nyt-scraper';
import { useEffect, useState } from 'react';
import { data } from './data';
import DigitsModal from './digits-modal';
import Logo from './logo';
import { useTimer } from 'hooks/useTimer';
import { useBoard } from 'hooks/useBoard';

function App() {
  const [gameData, setGameData] = useState(null);
  const { seconds, toggle, reset, isActive } = useTimer();
  const { puzzle, setPuzzle } = useBoard();
  const getBoard = async () => {
    // const data = await NYTimesScraper();
    setPuzzle(data.hard.puzzle_data.puzzle);
    setGameData(data);
  };
  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className="app flex align-center justify-center h-screen">
      {/*<div className="container mx-auto mt-20 flex flex-col items-center">
        <Logo />
        <div className="text-center text-xl mt-20 mb-4 text-primary-content">
          {gameData ? 'Puzzles loaded from NYTimes' : 'Loading puzzles...'}
        </div>
        <button className="btn btn-wide btn-success" disabled={!gameData}>
          Easy
        </button>
        <button className="btn btn-wide btn-info mt-4" disabled={!gameData}>
          Medium
        </button>
        <button className="btn btn-wide btn-warning mt-4" disabled={!gameData}>
          Hard
        </button>
        <label htmlFor="digits-modal" className="btn btn-wide mt-4">
          Paste a new puzzle
        </label>
      </div>
  <DigitsModal />*/}
      {puzzle && (
        <Board puzzle={puzzle}>
          {puzzle.map((props, i: number) => (
            <Cell key={i} {...props} />
          ))}
        </Board>
      )}
    </div>
  );
}

export default App;
// <button onClick={toggle}>toggle</button>
//       <br />
//       <button onClick={reset}>reset</button>
//       <br />
//       <button>
//         seconds: {new Date(seconds * 1000).toISOString().substr(11, 8)}
//       </button>
