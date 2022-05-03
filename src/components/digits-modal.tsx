import { useState } from 'react';

function DigitsModal() {
  const [digits, setDigits] = useState('');
  return (
    <>
      <input type="checkbox" id="digits-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-auto p-10">
          <h3 className="font-bold text-lg">Enter 81 digits</h3>
          <p className="py-4">
            <textarea
              value={digits}
              onChange={(e) => {
                const { value } = e.target;
                // store only numbers
                if (!/[^0-9]/gi.test(value) && value.length <= 81)
                  setDigits(value);
              }}
              rows={4}
              cols={26}
              className="textarea textarea-bordered"
            />
          </p>
          <div className="modal-action">
            <label htmlFor="digits-modal" className="btn btn-outline">
              Cancel
            </label>
            <button className="btn btn-success" disabled={digits.length !== 81}>
              Play!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DigitsModal;
