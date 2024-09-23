import React from "react";
import "../../styles/timer.css";
function Timer({ timer }) {
  return (
    <>
      <div className="container-timer">
        <p>Tiempo: {timer} segundos </p>
       
      </div>
      <div className="container-grass">
       
      </div>
    </>
  );
}

export default Timer;
