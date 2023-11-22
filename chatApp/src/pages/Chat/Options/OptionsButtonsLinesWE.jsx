import React from "react";

import "./Options.css";

const OptionsButtonsLinesWE = (props) => {
  const options = [
    {
      text: props.actionProvider.dataWE.problemWEIncorrect.options.one,
      handler: props.actionProvider.handleQuestionWE,
      id: 1,
    },
    {
      text: props.actionProvider.dataWE.problemWEIncorrect.options.two,
      handler: props.actionProvider.handleQuestionWE,
      id: 2,
    },
    {
      text: props.actionProvider.dataWE.problemWEIncorrect.options.three,
      handler: props.actionProvider.handleQuestionWE,
      id: 3,
    },
    {
      text: props.actionProvider.dataWE.problemWEIncorrect.options.four,
      handler: props.actionProvider.handleQuestionWE,
      id: 4,
    },
    {
      text: props.actionProvider.dataWE.problemWEIncorrect.options.five,
      handler: props.actionProvider.handleQuestionWE,
      id: 5,
    },
  ];

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={() => option.handler(option.id)}
      className="option-button"
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default OptionsButtonsLinesWE;