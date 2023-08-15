import React from "react";

import "./Options.css";

const OptionsConditional = (props) => {
  const options = [
    {
      text: "Exemplo Correto ✅",
      handler: props.actionProvider.handleExemploCorretoCondicional,
      id: 4,
    },
    {
      text: "Exemplo Incorreto ❌",
      handler: props.actionProvider.handleExemploIncorretoCondicional,
      id: 5,
    },
    {
      text: "Voltar",
      handler: props.actionProvider.handleGoToBackMenu,
      id: 6,
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

export default OptionsConditional;