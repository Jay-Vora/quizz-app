import React, {  useEffect } from "react";

const QuizResult = ({ score, total, onRetry}) => {
    useEffect(() => {
    // Send score to Flask backend
    fetch("http://localhost:5000/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Score saved to backend:", data);
      })
      .catch((err) => {
        console.error("Error saving score:", err);
      });
  }, [score]); // Only run when `score` is passed in



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="bg-white p-10 rounded-lg shadow-md max-w-md w-full text-center">
    <h2 className="text-2xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
    <p className="text-lg mb-6">You scored {score} out of {total}</p>
    <button
      onClick={onRetry}
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
    >
      Retry Quiz
    </button>
  </div>
</div>
    );
}

export default QuizResult;