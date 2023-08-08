import React from "react";
import Option from "./Option";

function Question({ questions, dispatch, answer }) {
  const { question, options, correctOption, points } = questions;
  return (
    <div>
      <h4>{question}</h4>
      <Option
        options={options}
        dispatch={dispatch}
        correctOption={correctOption}
        points={points}
        answer={answer}
      />
    </div>
  );
}

export default Question;
