import React, { useState } from "react";

import "./Options.css";

const Options = (props) => {
  const [clicked, setClicked] = useState(false);

  // Cria as opções dinamicamente com base no tamanho de themeNames
  const options = props.actionProvider.themeNames.map((theme, index) => ({
    text: `${index + 1}. ${theme}`, // "1. Nome do Tema"
    handler: props.actionProvider.handleExampleChoice,
    id: index + 1, // O ID começa em 1
  }));

  // Adiciona a opção de "Finalizar a sessão" no final
  options.push({
    text: "Finalizar a sessão",
    handler: props.actionProvider.handleGoOut,
    id: 0, // ID para a opção de finalizar a sessão
  });

  const myfunc = (option) => {
    option.handler(option.id);
    setClicked(true);
  };

  const buttonsMarkup = options.map((option) => (
    <button
      key={option.id}
      onClick={() => myfunc(option)}
      className="option-button"
      disabled={clicked} // Desabilita os botões após clicar
    >
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
