import 'styles/cell.scss';
type Props = {
  value: string;
  index: number;
};

function Cell({ value, index }: Props) {
  return (
    <div
      className={`cell row-${~~(index / 9) + 1} col-${
        Number((index / 9).toString().charAt(2)) + 1
      }`}
    >
      {value !== '0' && value}
    </div>
  );
}

export default Cell;
