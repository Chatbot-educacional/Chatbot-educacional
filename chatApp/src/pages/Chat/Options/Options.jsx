import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "1. Variáveis 📦",
      handler: props.actionProvider.handleVariavelQuiz,
      id: 1,
    },
    {
      text: "2. Constantes 🔒",
      handler: props.actionProvider.handleConstantesQuiz,
      id: 2,
    },
    {
      text: "3. Expressões Aritméticas ➕➖✖️➗",
      handler: props.actionProvider.handleExpressoesAritmeticasQuiz,
      id: 3,
    },
    {
      text: "4. Estrutura Condicionais ❓",
      handler: props.actionProvider.handleCondicionalQuiz,
      id: 4,
    },
    {
      text: "5. Laços de Repetição 🔁",
      handler: props.actionProvider.handleLacoRepeticao,
      id: 5,
    },
    {
      text: "6. Funções 📋",
      handler: props.actionProvider.handleFuncoesQuiz,
      id: 6,
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

export default Options;