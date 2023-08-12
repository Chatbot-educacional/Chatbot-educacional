import React from "react";

import "./Options.css";

const OptionsRepeatingLoop = (props) => {
  const options = [
    {
      text: "Exemplo Correto",
      handler: props.actionProvider.handleExemploCorretoLacoRepeticao,
      id: 6,
    },
    {
      text: "Exemplo Incorreto",
      handler: props.actionProvider.handleExemploIncorretoLacoRepeticao,
      id: 7,
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

export default OptionsRepeatingLoop;