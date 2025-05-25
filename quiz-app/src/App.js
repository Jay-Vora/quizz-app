import React, { useState } from "react";
import UsernameInput from "./components/UsernameInput";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizResult from "./components/QuizResult";
// import { questions } from "./data/questions";


function App() {
  const [step, setStep] = useState("login"); // login → quiz → result
  const [username, setUsername] = useState("");
  const [finalScore, setFinalScore] = useState(0);

  return (
    <div>
      {step === "login" && (
        <UsernameInput
          onStart={(name) => {
            setUsername(name);
            setStep("quiz");
          }}
        />
      )}

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
          total={3} // or questions.length if you pass questions
          username={username}
          onRetry={() => setStep("login")}
        />
      )}
    </div>
  );
}

export default App;
