// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../Options/Options";
import Quiz from "../Quiz/Quiz";

const config = {
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage(`Hello. What do you want to learn`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "variaveis",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "O que é uma variável?",
            answer:
              "Variável é uma posição de memória que armazena temporariamente um valor.",
            id: 1,
          },
          {
            question: "Explain prototypal inheritance",
            answer:
              "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, javascript will check the prototype object.",
            id: 2,
          },
        ],
      },
    },
    {
      widgetName: "For",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "O que é um for?",
            answer:
              "For é uma estrutura de repetição que executa um bloco de código até que uma condição seja atendida.",
             
            id: 1,
          },
          {
            question: "Qual a sintaxe de um for?",
            answer:
              "A sintaxe de um for é: for (inicialização; condição; incremento) {bloco de código}, ela pode variar de acordo com a linguagem.",
            id: 2,
          },
        ],
      },
    },
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "Condicionais",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "O que é uma estrutura condicional ?",
            answer:
              "Estruturas condicionais são estruturas de decisão que executam um bloco de código caso uma condição seja atendida.",
            id: 1,
          },
          {
            question: "Quais são as estruturas condicionais?",
            answer:
              "As estruturas condicionais são: if, else if, else, switch case.",
            id: 2,
          },
          {
            question: "Como é a sintaxe de uma estrutura condicional?",
            answer:
              "A sintaxe de uma estrutura condicional é: if (condição) {bloco de código} else if (condição) {bloco de código} else {bloco de código}",
            id: 3,
          },
        ],
      },
    },
  ],
};

export default config;