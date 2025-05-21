import React, { use, useEffect, useState } from "react";
// import { questions } from "../data/questions"; removing this since we are fetching the data from /questions in flask

const QuizQuestion = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://127.0.0.1:5000/questions")
    .then((res) => res.json())
    .then((data) => {
      setQuestions(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching questions:", err);
    });
}, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading questions...</p>
      </div>
    );
  }


  const current = questions[currentIndex];

  const handleAnswer = (index) => {
  if (selectedIndex !== null) return; // prevent double clicking

  setSelectedIndex(index);
  const isCorrect = index === current.answer;
  setFeedback(isCorrect ? "Correct!" : "Wrong!");

  if (isCorrect) {
    setScore(score + 1);
  }

  setShowNext(true); // show Next Question button
};
  

  const handleNextQuestion = () => {
    const next = currentIndex + 1;

    setSelectedIndex(null);
    setFeedback("");
    setShowNext(false);

    if (next < questions.length) {
        setCurrentIndex(next);
    } else {
        onFinish(score);
    }
  }; 


  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
        {/* Question Header */}
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Question {currentIndex + 1} of {questions.length}
        </h2>

        <p className="text-lg font-medium text-gray-900 mb-6">
          {current.question}
        </p>

        {/* Answer Options */}
        {current.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={selectedIndex !== null}
            className={`block w-full text-left mb-3 px-4 py-3 rounded border transition font-medium
              ${
                selectedIndex === null
                  ? "bg-white hover:bg-blue-100"
                  : i === current.answer
                  ? "bg-green-500 text-white"
                  : i === selectedIndex
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }
            `}
          >
            {option}
          </button>
        ))}

        {/* Feedback */}
        {feedback && (
          <p className="font-bold text-lg mt-4 text-gray-700">{feedback}</p>
        )}

        {/* Next Button */}
        {showNext && (
          <button
            onClick={handleNextQuestion}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;