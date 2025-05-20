# React Quiz App

A simple and interactive quiz application built with React. This project helps reinforce concepts like state management, component composition, conditional rendering, and event handling.

## 🧠 Features

- Start screen with "Start Quiz" button
- Multiple-choice questions rendered dynamically
- Score tracking based on correct answers
- Immediate feedback ("Correct!" or "Wrong!") after each question
- Manual progression using a "Next Question" button
- Final score display on completion
- Retry option to restart the quiz

## 🛠 Technologies Used

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- JSX for templating
- CSS (inline styles for now)

## 📁 Project Structure
```
quiz-app/
├── src/
│ ├── components/
│ │ ├── QuizStart.js
│ │ ├── QuizQuestion.js
│ │ └── QuizResult.js
│ ├── data/
│ │ └── questions.js
│ ├── App.js
│ └── index.js
├── public/
│ └── index.html
├── package.json
└── README.md
```