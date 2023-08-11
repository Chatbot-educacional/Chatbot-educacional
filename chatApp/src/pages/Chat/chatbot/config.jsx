// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../Options/Options";
import OptionsVariable from "../Options/OptionsVariable";
import Quiz from "../Quiz/Quiz";

const config = {
  botName: "Bot de Educação",
  initialMessages: [
    
    createChatBotMessage(`Olá, eu sou Edubot, irei lhe auxiliar aprendendo conceitos de programação.Digite a opção que deseja aprender.Opção 1: Variaveis 
        Opção 2: Laço For 
        Opção 3 condicionais   `, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "1", // variavel
      widgetFunc: (props) => <Quiz {...props} />,
      widgetFunc: (props) => <OptionsVariable {...props} />,
      props: {
        questions: [
          {
            question: "Vamos ver um exemplo correto",
            answer:
              "var a; "  +
             "console.log" + "("+ "O valor de a é " + "a);" +
              "console.log"+"("+"O valor de b é " + "b);",
            id: 1,
            option: "teste",
          },
          {
            question: "Agora vamos ver um exemplo incorreto",
            answer:
            "var c; "  +
            "console.log" + "("+ "O valor de a é " + "a);",
             
            id: 2,
            
          },
          {
            question: "Voce consegue identificar o erro?",
            answer:
            "O erro acontece porque a variável é definida como a, mas é chamada como b.",
             
            id: 3,
            
          },
        ],
      },
    },
    {
      widgetName: "3", // for
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
            question: "Vamos ver um exemplo correto de for, considerando que queremos mostrar os números de 1 a 10",
            answer:
              "for (var i = 0; i < 10; i++) {console.log(i);}",
            id: 2,
          },
          {
            question: "Vamos ver um exemplo incorreto de for, considerando que queremos mostrar os números de 1 a 10",
            answer:
              "for (var i = 0; i > 10; i++) {console.log(i);}",
            id: 3,
          },
          {
            question: "Voce consegue identificar o erro?",
            answer:
            "O erro acontece porque a condição está errada, o correto seria i < 10, pois queremos que o código seja executado até que i seja menor que 10.",
            id: 4,
          }
        ],
      },
    },
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "2", // condicional
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
            question: "Vamos ver um exemplo correto de condicionais?",
            answer:
              "x = 0, if(x == 0) {console.log('x é igual a 0');} else {console.log('x não é igual a 0');}",
            id: 2,
          },
          {
            question: "Agora vamos ver um exemplo incorreto de condicionais",
            answer:
              "x = 0, if(x > 0) {console.log('x é igual a 0');}",
            id: 3,
          },
          {
            question: "Voce consegue identificar o erro?",
            answer:
            "O erro acontece porque a condição está errada, o correto seria x == 0, pois queremos que o código seja executado caso x seja igual a 0.",
            id: 4,
          }
        ],
      },
    },
  ],
};

export default config;