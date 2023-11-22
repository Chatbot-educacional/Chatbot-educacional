import React from "react";

import "./Options.css";

const OptionsArray = (props) => {
  const options = [
    {
      text: "Exemplo Correto ✅",
      handler: props.actionProvider.handleCorrectWE,
      id: 1,
    },
    {
      text: "Exemplo Incorreto ❌",
      handler: props.actionProvider.handleIncorrectWE,
      id: 2,
    },
    {
      text: "Voltar ao menu",
      handler: props.actionProvider.handleGoToBackMenu,
      id: 3,
    }
  ];

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={() => option.handler(option.id)}
      className="option-button"
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default OptionsArray;