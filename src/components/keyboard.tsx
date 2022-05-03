import { VscDebugRestart } from 'react-icons/vsc';
import { RiArrowGoForwardLine, RiArrowGoBackFill } from 'react-icons/ri';

function Keyboard({ width }: { width: number }) {
  return (
    <div className="keyboard" style={{ width }}>
      <div className="modes">
        <span>Mode:</span>
        <button className="btn mode">#</button>
        <button className="btn mode">123</button>
        <button className="btn mode">123</button>
        <button className="btn mode mode-color">
          <span className="red"></span>
          <span className="blue"></span>
          <span className="yellow"></span>
          <span className="green"></span>
        </button>
      </div>

      <div className="keys">
        {[...Array(9).keys()].map((n) => (
          <button className="btn num" key={n}>
            {n + 1}
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
        <button className="btn btn-delete">Delete</button>
        <button className="btn btn-info">Check</button>
      </div>
    </div>
  );
}

export default Keyboard;
