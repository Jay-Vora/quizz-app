import React, { useState } from 'react';
import QuizStart from './components/QuizStart';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import { questions } from './data/questions';

export default function App() {
  const [step, setStep] = useState('start');
  const [score, setScore] = useState(0);

  const handleStart = () => setStep('quiz');
  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setStep('result');
  };
  const handleRetry = () => {
    setScore(0);
    setStep('start');
  };

  return (
    <>
      {step === 'start' && <QuizStart onStart={handleStart} />}
      {step === 'quiz' && <QuizQuestion onFinish={handleFinish} />}
      {step === 'result' && <QuizResult score={score} onRetry={handleRetry} />}
    </>
  );
}