import React, { useState } from "react";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";

function App() {
  const [step, setStep] = useState("start");
  const [finalScore, setFinalScore] = useState(0);

  return (
    <div>
      {step === "start" && <QuizStart onStart={() => setStep("quiz")} />}
      {step === "quiz" && (
        <QuizQuestion
          onFinish={(score) => {
            setFinalScore(score);
            setStep("result");
          }}
        />
      )}
      {step === "result" && (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {finalScore}</p>
          <button onClick={() => setStep("start")}>Retry</button>
        </div>
      )}
    </div>
  );
}

export default App;
