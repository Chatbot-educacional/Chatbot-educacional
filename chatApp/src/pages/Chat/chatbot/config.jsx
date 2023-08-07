// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../Options/Options";
import Quiz from "../Quiz/Quiz";

const config = {
    botName: "LearningBot",
  initialMessages: [
    createChatBotMessage(`Olá, o que gostaria de aprender hoje`,{
        widget: "Options",
    }),
    ],
  widgets: [
    {
        widgetName: "Options",
        widgetFunc: (props) => <Options {...props}/>,
    },
    {
      widgetName: "JavascriptQuiz",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question : "O que é Javascript?",
            answer : "Linguagem de programação client-side",
            id : 1,

          },
          {
            question : "O que é React?",
            answer : "Biblioteca Javascript",
            id : 2,
          },
        ],
      },
    },
  ],

}

export default config