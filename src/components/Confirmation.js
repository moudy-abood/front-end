import React from "react";

import "../assets/css/confirmation.css";

function Confirmation({ message, confirm, cancel }) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-btns">
          <button className="confirm-btn" onClick={confirm}>
            Yes
          </button>
          <button className="cancel-btn" onClick={cancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
