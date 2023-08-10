import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "1",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "3",
     handler: props.actionProvider.handleCondicionaisQuiz,
      id: 2 },
    { text: "2",
     handler: props.actionProvider.handleFor,
      id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;