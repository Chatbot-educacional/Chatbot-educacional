import React from "react";

import "./Options.css";

const OptionsForWrong = (props) => {
  const options = [
    {
      text: "Identificar o problema",
      handler: props.actionProvider.handleIdentificarErroFor,
      id: 8,
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

export default OptionsForWrong;