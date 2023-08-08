import React from "react";

function NextQuestion({ questions, index, answer, dispatch }) {
  if (answer === null) return;

  console.log(questions);

  return index < questions.length - 1 ? (
    <button
      onClick={() =>
        dispatch({
          type: "nextQuestion",
        })
      }
      className="btn btn-ui"
    >
      Next
    </button>
  ) : (
    <button
      onClick={() =>
        dispatch({
          type: "finished",
        })
      }
      className="btn btn-ui"
    >
      Finish
    </button>
  );
}

export default NextQuestion;
