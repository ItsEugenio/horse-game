import React from "react";
import "../../styles/horse.css";
import horseImage from "../../assets/horse.png";
function Horse({ name, position, maxSteps }) {
  const progressPercentage = Math.min((position / maxSteps) * 100, 100);
  return (
    <div className="track-container">
      <div className="horse-container">
        <div className="horse-name">{name}</div>
        <div className="track">
          <img
            src={horseImage}
            alt="Caballo"
            className="horse-icon"
            style={{ left: `${progressPercentage}%` }}
          />
        </div>
        <div className="horse-position">{position} pasos</div>
      </div>
    </div>
  );
}

export default Horse;
