import React from 'react';

const QuizStart = ({ onStart }) => {
  return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Welcome to the Quiz!</h1>
      <button onClick={onStart} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow-md transition">
        Start Quiz
      </button>
    </div>

  );
};

export default QuizStart;

