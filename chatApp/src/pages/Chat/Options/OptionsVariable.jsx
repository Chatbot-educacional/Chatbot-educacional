import React from "react";

import "./Options.css";

const OptionsVariable = (props) => {
  const options = [
    {
      text: "Exemplo Correto ✅",
      handler: props.actionProvider.handleExemploCorretoVariavel,
      id: 4,
    },
    {
      text: "Exemplo Incorreto ❌",
      handler: props.actionProvider.handleExemploIncorretoVariavel,
      id: 5,
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