import React, { use, useState } from "react";
import { questions } from "../data/questions";

const QuizQuestion = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);

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
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2> Question {currentIndex + 1} of {questions.length} { current.question}</h2>

        {current.options.map((option, i) => (
        <button
            key={i}
            onClick={() => handleAnswer(i)}
            style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            backgroundColor:
                selectedIndex === null
                ? ""
                : i === current.answer
                ? "green"
                : i === selectedIndex
                ? "red"
                : "",
            color: selectedIndex !== null ? "white" : "black",
            }}
            disabled={selectedIndex !== null}
        >
            {option}
        </button>
        ))}

        {feedback && <p style={{ fontWeight: "bold" }}>{feedback}</p>}

        {showNext && (
        <button onClick={handleNextQuestion} style={{ marginTop: "20px" }}>
            Next Question
        </button>
        )}
    </div>
  );
};

export default QuizQuestion;