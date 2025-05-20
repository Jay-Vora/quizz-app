import React from "react";

const QuizResult = ({ score, total, onRetry}) => {
    return (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h2>Quiz Completed!</h2>
            <p>You scored {score} out of {total}</p>
            <button onClick={onRetry} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Retry Quiz
      </button>
        </div>
    );
}

export default QuizResult;