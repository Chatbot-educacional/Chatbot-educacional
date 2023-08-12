import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "1. Variáveis",
      handler: props.actionProvider.handleVariavelQuiz,
      id: 1,
    },
    { text: "2. Condicionais",
     handler: props.actionProvider.handleCondicionalQuiz,
      id: 2 },
    { text: "3. Laços de Repetição",
     handler: props.actionProvider.handleLacoRepeticao,
      id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button 
      key={option.id} 
      onClick={option.handler} 
      className="option-button"
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;