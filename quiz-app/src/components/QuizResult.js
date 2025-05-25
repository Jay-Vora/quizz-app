import React, { useEffect, useState } from "react";

const QuizResult = ({ score, total, onRetry, username }) => {
  const [history, setHistory] = useState([]);
  const [hasPosted, setHasPosted] = useState(false);

  // ✅ 1. POST score to backend (only once)
  useEffect(() => {
    if (!hasPosted) {
      fetch("http://localhost:5000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, score }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Score saved:", data);
          setHasPosted(true);
        })
        .catch((err) => console.error("❌ POST failed:", err));
    }
  }, [score, username, hasPosted]);

  // ✅ 2. Fetch this user's quiz history
  useEffect(() => {
    if (username) {
      fetch(`http://localhost:5000/results?username=${username}`)
        .then((res) => res.json())
        .then((data) => {
          setHistory(data.reverse()); // latest first
        })
        .catch((err) => {
          console.error("Error fetching history:", err);
        });
    }
  }, [username]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-2">
          {username ? `${username}, ` : ""}you scored {score} out of {total}
        </p>
        <button
          onClick={onRetry}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Retry Quiz
        </button>

        {history.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Your Previous Attempts:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {history.slice(0, 5).map((entry, i) => (
                <li key={i}>
                  Score: {entry.score} at{" "}
                  {new Date(entry.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
