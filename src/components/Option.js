import React from "react";

function Option({ options, dispatch, correctOption, points, answer }) {
  const isAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option  ${answer === index ? "answer" : ""} ${
            isAnswered ? (correctOption === index ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={isAnswered}
          onClick={() =>
            dispatch({
              type: "answer",
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
