import React, { useState, useEffect } from "react";

import "./Quiz.css";

const FlashCard = ({ question, answer, incrementIndex }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => setShowAnswer(false), [question]);

  return (
    <>
      <div
        className="flashcard-container"
        
        onClick={() => setShowAnswer(!showAnswer)}
      >
       
        {!showAnswer && question}
        {showAnswer && answer}
      </div>
      {/* <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}

        </button> */} 
        {/* talvez esse botão fique melhor do que o click na tela */}
      {showAnswer && (
        <button onClick={incrementIndex} className="flashcard-button">
          Próxima Pergunta
        </button>
      )}
    </>
  );
};

export default FlashCard;