import React, { useState } from "react";

import "./Options.css";

const OptionsButtonsLinesWE = (props) => {
  const [clicked, setClicked] = useState(false);
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

  const myfunc = (option) => {
    option.handler(option.id);
    setClicked(true);
  }

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={() => myfunc(option)}
      className="option-button"
      disabled={clicked}
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default OptionsButtonsLinesWE;