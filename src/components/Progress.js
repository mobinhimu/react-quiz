import React from "react";

function Progress({ questions, points, index, answer }) {
  const totalPointsOfQuestion = questions.reduce(
    (acc, ele) => acc + ele.points,
    0
  );
  const ques = questions.length;

  return (
    <div className="progress">
      <progress max={ques} value={index + Number(answer === null ? 0 : 1)} />
      <span>
        Question <strong>{index + 1}</strong> / {ques}
      </span>{" "}
      <span>
        <strong>{points}</strong> / {totalPointsOfQuestion}
      </span>
    </div>
  );
}

export default Progress;
