import React from "react";

import "./Options.css";

const OptionArrayAnotherGoBack = (props) => {
    const options = [
        {
            text: "Ver outro Exemplo 🔍",
            handler: props.actionProvider.handleArraysQuiz,//VALIDATE ???
            id: 19,
        },
        {
            text: "Voltar ao menu",
            handler: props.actionProvider.handleGoToBackMenu,
            id: 21,
        }
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

export default OptionArrayAnotherGoBack;