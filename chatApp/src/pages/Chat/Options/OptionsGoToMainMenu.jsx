import React from "react";

import "./Options.css";

const OptionsGoToMainMenu = (props) => {
  const options = [
    {
      text: "Voltar ao menu principal",
      handler: props.actionProvider.handleGoToMainMenu,
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

export default OptionsGoToMainMenu;