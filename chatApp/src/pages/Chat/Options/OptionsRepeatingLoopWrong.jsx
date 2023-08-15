import React from "react";

import "./Options.css";

const OptionsRepeatingLoopWrong = (props) => {
  const options = [
    {
      text: "Identificar o problema",
      handler: props.actionProvider.handleIdentificarErroLacoRepeticao,
      id: 12,
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

export default OptionsRepeatingLoopWrong;