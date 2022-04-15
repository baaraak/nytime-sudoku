import Cell from './Cell';
import Board from './Board';

const puzzle: string =
  '001203400000607000500000003370000081000000000620000037100000008000805000006402500';

function App() {
  return (
    <div className="App">
      <Board>
        {puzzle.split('').map((num: string, i: number) => (
          <Cell key={i} value={num} index={i} />
        ))}
      </Board>
    </div>
  );
}

export default App;
