import 'styles/board.scss';
type Props = {
  children: React.ReactNode;
};

function Board({ children }: Props) {
  return <div className="board">{children}</div>;
}

export default Board;
