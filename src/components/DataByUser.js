import React from "react";

function DataByUser({ dispatch, questions }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <select
        className="btn"
        onChange={(eve) =>
          dispatch({
            type: "certainQuestion",
            payload: +eve.target.value,
          })
        }
      >
        <option value={questions.length}>All</option>
        <option value="10">10</option>
        <option value="5">5</option>
      </select>

      <select
        className="btn"
        onChange={(eve) =>
          dispatch({
            type: "hardEasyALl",
            payload: eve.target.value,
          })
        }
      >
        <option value="All">All</option>
        <option value="Easy">Easy</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
}

export default DataByUser;
