import React from "react";

import "./Options.css";

const OptionsVariable = (props) => {
  const options = [
    {
      text: "Exemplo Correto ✅",
      handler: props.actionProvider.handleExemploCorretoVariavel,
      id: 13,
    },
    {
      text: "Exemplo Incorreto ❌",
      handler: props.actionProvider.handleExemploIncorretoVariavel,
      id: 14,
    },
    {
      text: "Voltar",
      handler: props.actionProvider.handleGoToBackMenu,
      id: 15,
    }
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

export default OptionsVariable;