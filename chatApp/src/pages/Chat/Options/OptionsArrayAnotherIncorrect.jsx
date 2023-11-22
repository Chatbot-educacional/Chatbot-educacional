import React from "react";

import "./Options.css";

const OptionsArrayAnotherIncorrect = (props) => {
    const options = [
        {
            text: "Exemplo Correto ✅",
            handler: props.actionProvider.handleCorrectWE,
            id: 1,
        },
        {
            text: "Ver outro Exemplo 🔍",
            handler: props.actionProvider.handleExampleChoice,
            id: -1,
        },
        {
            text: "Voltar ao menu",
            handler: props.actionProvider.handleGoToBackMenu,
            id: 3,
        }
    ]

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

export default OptionsArrayAnotherIncorrect;