import React, { useState } from "react";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";
import { questions } from "./data/questions";


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
      <QuizResult
        score={finalScore}
        total={questions.length}
        onRetry={() => {
          setFinalScore(0);
          setStep("start");
        }}
  />
)}
    </div>
  );
}

export default App;
