import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";
import DataByUser from "./DataByUser";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highestPoints: 0,
  timer: null,
  selectQuestion: null,
};

const SESC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "failed",
      };

    case "start":
      return {
        ...state,
        status: "active",
        timer: state.selectQuestion
          ? state.selectQuestion.length * SESC_PER_QUESTION
          : state.questions.length * SESC_PER_QUESTION,
      };
    case "answer":
      const currentAns = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          currentAns.correctOption === action.payload
            ? state.points + currentAns.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index++,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highestPoints:
          state.points >= state.highestPoints
            ? state.points
            : state.highestPoints,
      };

    case "reset":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highestPoints: state.highestPoints,
      };
    case "tick":
      return {
        ...state,
        timer: state.timer--,
        status: state.timer === 0 ? "finished" : state.status,
      };
    case "certainQuestion":
      return {
        ...state,
        selectQuestion: state.questions.slice(0, action.payload),
      };
    case "hardEasyALl":
      return {
        ...state,
        selectQuestion: state.questions.filter((question) => {
          if (action.payload === "All") {
            return state;
          } else if (action.payload === "Easy") {
            return question.points <= 10;
          } else if (action.payload === "Hard") {
            return question.points > 10;
          }
          return question;
        }),
      };
    default:
      throw new Error("Unknown Dispatch");
  }
}

const App = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highestPoints,
      timer,
      selectQuestion,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuest = selectQuestion?.length
    ? selectQuestion?.length
    : questions.length;

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) =>
        dispatch({
          type: "dataReceived",
          payload: questions,
        })
      )
      .catch(() =>
        dispatch({
          type: "dataFailed",
        })
      );
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && (
          <StartScreen numberOfQuest={numberOfQuest} dispatch={dispatch}>
            <DataByUser
              dispatch={dispatch}
              questions={selectQuestion ? selectQuestion : questions}
            />
          </StartScreen>
        )}
        {status === "active" && (
          <>
            <Progress
              questions={selectQuestion ? selectQuestion : questions}
              points={points}
              index={index}
              answer={answer}
            />
            <Question
              questions={
                selectQuestion ? selectQuestion[index] : questions[index]
              }
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} timer={timer} />
              <NextQuestion
                dispatch={dispatch}
                index={index}
                answer={answer}
                questions={selectQuestion ? selectQuestion : questions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <Finished
            highestPoints={highestPoints}
            questions={selectQuestion ? selectQuestion : questions}
            points={points}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
