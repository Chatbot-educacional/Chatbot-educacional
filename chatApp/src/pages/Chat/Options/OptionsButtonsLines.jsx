import React from "react";

import "./Options.css";

const OptionsButtonsLines = (props) => {
  const options = [
    {
      text: "1",
      handler: props.actionProvider.handleArrayResp1,
      id: 19,
    },
    {
      text: "2",
      handler: props.actionProvider.handleArrayResp2,
      id: 20,
    },
    {
      text: "3",
      handler: props.actionProvider.handleArrayResp3,
      id: 21,
    },
    {
      text: "4",
      handler: props.actionProvider.handleArrayResp4,
      id: 22,
    },
    {
      text: "5",
      handler: props.actionProvider.handleArrayResp5,
      id: 23,
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

export default OptionsButtonsLines;