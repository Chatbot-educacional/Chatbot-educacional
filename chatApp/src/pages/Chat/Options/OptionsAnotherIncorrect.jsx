import React, { useState } from "react";

import "./Options.css";

const OptionsAnotherIncorrect = (props) => {
    const [clicked, setClicked] = useState(false);
    const options = [
        {
            text: "Exemplo Correto ✅",
            handler: props.actionProvider.handleCorrectWE,
            id: 1,
        },
        {
            text: "Ver outro Exemplo 🔍",
            handler: props.actionProvider.handleExampleChoice,
            id: 2,
        },
        {
            text: "Voltar ao menu",
            handler: props.actionProvider.handleGoToBackMenu,
            id: 3,
        },
        {
            text: "Finalizar a sessão ",
            handler: props.actionProvider.handleGoOut,
            id: 0,
        }
    ]

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

export default OptionsAnotherIncorrect;