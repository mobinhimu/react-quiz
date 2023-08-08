import React, { useEffect } from "react";

function Timer({ dispatch, timer }) {
  const min = Math.round(timer / 60);
  const sec = Math.round(timer % 60);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({
        type: "tick",
      });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min}:{sec < 10 ? "0" : ""}
      {sec}
    </div>
  );
}

export default Timer;
