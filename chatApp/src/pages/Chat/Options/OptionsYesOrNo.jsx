import React from "react";

import "./Options.css";

const OptionsYesOrNo = (props) => {
  const options = [
  { 
    text: "Sim",
    handler: props.actionProvider.handleIdentificarErroVariavelSim,
    id: 17,
  },
  { 
    text: "Não",
    handler: props.actionProvider.handleIdentificarErroVariavelNao,
    id: 18,
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

export default OptionsYesOrNo;