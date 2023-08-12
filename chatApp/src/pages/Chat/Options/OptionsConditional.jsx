import React from "react";

import "./Options.css";

const OptionsConditional = (props) => {
  const options = [
    {
      text: "Exemplo Correto",
      handler: props.actionProvider.handleExemploCorretoCondicional,
      id: 8,
    },
    {
      text: "Exemplo Incorreto",
      handler: props.actionProvider.handleExemploIncorretoCondicional,
      id: 9,
    },  
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