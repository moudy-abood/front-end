import React from "react";

function Confirmation({ message, confirm, cancel }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <div>
          <button onClick={confirm}>Yes</button>
          <button onClick={cancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
