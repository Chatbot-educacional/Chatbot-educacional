import React, { useState } from "react";

import "./Options.css";

const OptionsListWE = (props) => {
    const [clicked, setClicked] = useState(false);
    const options = [//demanda refatoração para pegar os titulos em um array em loop
        {
            text: props.actionProvider.data[0].title,
            handler: props.actionProvider.handleQuiz,
            id: 0,
        },
        {
            text: props.actionProvider.data[1].title,
            handler: props.actionProvider.handleQuiz,
            id: 1,
        },
        {
            text: props.actionProvider.data[2].title,
            handler: props.actionProvider.handleQuiz,
            id: 2,
        },
        {
            text: props.actionProvider.data[3].title,
            handler: props.actionProvider.handleQuiz,
            id: 3,
        },
        {
            text: props.actionProvider.data[4].title,
            handler: props.actionProvider.handleQuiz,
            id: 4,
        },
        {
            text: props.actionProvider.data[5].title,
            handler: props.actionProvider.handleQuiz,
            id: 5,
        },
        {
            text: props.actionProvider.data[6].title,
            handler: props.actionProvider.handleQuiz,
            id: 6,
        },
        {
            text: props.actionProvider.data[7].title,
            handler: props.actionProvider.handleQuiz,
            id: 7,
        },
        {
            text: props.actionProvider.data[8].title,
            handler: props.actionProvider.handleQuiz,
            id: 8,
        },
        {
            text: props.actionProvider.data[9].title,
            handler: props.actionProvider.handleQuiz,
            id: 9,
        },
        {
            text: "Voltar ao menu",
            handler: props.actionProvider.handleGoToBackMenu,
            id: 21,
        }
    ]

    const my = (option) => {
        option.handler(option.id);
        setClicked(true);
    }

    const buttonsMarkup = options.map((option) => (
        <button
            key={option.id}
            onClick={() => my(option)}
            className="option-button"
            disabled={clicked}
        >
            {option.text}
        </button>
    ));

    return <div className="options-container">{buttonsMarkup}</div>;
};

export default OptionsListWE;