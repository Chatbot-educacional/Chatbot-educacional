import React from "react";

import "./Options.css";

// emojis: 📦 / 🔒 /➕➖✖️➗ /❓ /🔁 /📋

const Options = (props) => {
  const options = [
    {
      text: "1. Vetores (Arrays)",
      handler: props.actionProvider.handleExampleChoice,
      id: 1,
    },
    {
      text: "2. Funções ",
      handler: props.actionProvider.handleExampleChoice,
      id: 2,
    }/*,
    {
      text: "3. Constantes",
      handler: props.actionProvider.handleConstantesQuiz,
      id: 3,
    },
    {
      text: "4. Expressões Aritméticas",
      handler: props.actionProvider.handleExpressoesAritmeticasQuiz,
      id: 4,
    },
    {
      text: "5. Estrutura Condicionais",
      handler: props.actionProvider.handleCondicionalQuiz,
      id: 5,
    },
    {
      text: "6. Laços de Repetição",
      handler: props.actionProvider.handleLacoRepeticao,
      id: 6,
    },
    {
      text: "7. Funções",
      handler: props.actionProvider.handleFuncoesQuiz,
      id: 7,
    },*/
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

export default Options;