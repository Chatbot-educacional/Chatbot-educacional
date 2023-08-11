import React from "react";

import "./Options.css";

const OptionsFor = (props) => {
  const options = [
    {
      text: "Exemplo Correto de For",
      handler: props.actionProvider.handleExemploCorretoFor,
      id: 6,
    },
    {
      text: "Exemplo Incorreto de For",
      handler: props.actionProvider.handleExemploIncorretoFor,
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

export default OptionsFor;