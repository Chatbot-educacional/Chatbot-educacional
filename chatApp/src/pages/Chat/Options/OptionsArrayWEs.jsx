import React from "react";

import "./Options.css";

const OptionsArrayWEs = (props) => {
    const options = [//demanda refatoração para pegar os titulos em um array em loop
        {
            text: props.actionProvider.dataArray[0].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 0,
        },
        {
            text: props.actionProvider.dataArray[1].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 1,
        },
        {
            text: props.actionProvider.dataArray[2].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 2,
        },
        {
            text: props.actionProvider.dataArray[3].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 3,
        },
        {
            text: props.actionProvider.dataArray[4].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 4,
        },
        {
            text: props.actionProvider.dataArray[5].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 5,
        },
        {
            text: props.actionProvider.dataArray[6].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 6,
        },
        {
            text: props.actionProvider.dataArray[7].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 7,
        },
        {
            text: props.actionProvider.dataArray[8].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 8,
        },
        {
            text: props.actionProvider.dataArray[9].title,
            handler: props.actionProvider.handleArraysQuiz,
            id: 9,
        },
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

export default OptionsArrayWEs;