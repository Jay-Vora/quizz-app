import React, {  useEffect, useState } from "react";

const QuizResult = ({ score, total, onRetry}) => {
    const [history, setHistory] = useState([]);
    const [hasPosted, setHasPosted] = useState(false);
      useEffect(() => {
    if (!hasPosted) {
      fetch("http://localhost:5000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Score saved:", data);
          setHasPosted(true); // prevent duplicate post
        })
        .catch((err) => console.error("❌ POST failed:", err));
    }
  }, [score, hasPosted]);

   useEffect(() => {
    fetch("http://localhost:5000/results")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.reverse()); // newest first
      })
      .catch((err) => {
        console.error("Error fetching result history:", err);
      });
  }, []);

  useEffect(() => {
  fetch("http://localhost:5000/results")
    .then((res) => res.json())
    .then((data) => {
      console.log("All results:", data);
      // You could setResults(data) here
    })
    .catch((err) => console.error("GET error:", err));
}, []);



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
      {history.length > 0 && (
    <div className="mt-6 text-left">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Previous Attempts:</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        {history.slice(0, 5).map((entry, i) => (
          <li key={i}>
            Score: {entry.score} at {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )}
  </div>
</div>
    );
}

export default QuizResult;