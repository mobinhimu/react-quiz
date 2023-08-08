import React from "react";

function Finished({ points, dispatch, highestPoints, questions }) {
  const totalPointsOfQuestion = questions.reduce(
    (acc, ele) => acc + ele.points,
    0
  );
  const percentageOfTotal = (points / totalPointsOfQuestion) * 100;

  let emoji;
  if (percentageOfTotal === 100) {
    emoji = "🥇";
  } else if (percentageOfTotal >= 80) {
    emoji = "💣";
  } else if (percentageOfTotal >= 50) {
    emoji = "😳";
  } else if (percentageOfTotal >= 0) {
    emoji = "🧐";
  } else {
    emoji = "👎";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your Scored <strong>{points}</strong> out of{" "}
        {totalPointsOfQuestion} ({Math.round(percentageOfTotal)}%)
      </p>
      <p className="highscore">(Highscore : {highestPoints} points)</p>

      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "reset",
          })
        }
      >
        Reset Quiz
      </button>
    </>
  );
}

export default Finished;
