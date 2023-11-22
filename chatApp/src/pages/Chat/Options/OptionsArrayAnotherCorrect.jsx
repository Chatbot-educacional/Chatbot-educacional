import React, { useState } from "react";

import "./Options.css";

const OptionsArrayAnotherCorrect = (props) => {
    const [clicked, setClicked] = useState(false);
    const options = [
        {
            text: "Ver outro Exemplo 🔍",
            handler: props.actionProvider.handleExampleChoice,
            id: -1,
        },
        {
            text: "Exemplo Incorreto ❌",
            handler: props.actionProvider.handleIncorrectWE,
            id: 2,
        },
        {
            text: "Voltar ao menu",
            handler: props.actionProvider.handleGoToBackMenu,
            id: 3,
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

export default OptionsArrayAnotherCorrect;