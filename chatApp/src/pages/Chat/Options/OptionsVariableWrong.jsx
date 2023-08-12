import React from "react";

import "./Options.css";

const OptionsVariableWrong = (props) => {
  const options = [
  { 
    text: "Identificar o problema",
    handler: props.actionProvider.handleIdentificarErroVariavel,
    id: 10,
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

export default OptionsVariableWrong;