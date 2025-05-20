import React from 'react';

const QuizStart = ({ onStart }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to the Quiz!</h1>
      <button onClick={onStart} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;

// import React from "react";

// const QuizStart = ({ onStart }) => {
//     return (
//         <div style={{textAlign: 'center', marginTop: '100px'}}>
//             <h1>Hello Learners!!</h1>
//             <button onClick={onStart} style={{ padding: '10px 20px', marginTop: '20px' }}>
//             Start
//             </button>
//         </div>
//     );
// }
// export default QuizStart;