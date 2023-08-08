import React from "react";

const StartScreen = ({ numberOfQuest, dispatch, children }) => {
  return (
    <>
      {children}
      <div className="start">
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numberOfQuest} questions to test your React mastery</h3>
        <div
          className="btn  btn-ui"
          onClick={() =>
            dispatch({
              type: "start",
            })
          }
        >
          Let's Start
        </div>
      </div>
    </>
  );
};

export default StartScreen;
