// Config starter code
import React from "react";
import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";

// Options
import Options from "../Options/Options";
import OptionsGoToMainMenu from "../Options/OptionsGoToMainMenu";
import CustomMessage from "./CustomMessage";
import OptionsAnotherCorrect from "../Options/OptionsAnotherCorrect";
import OptionsArrayAnotherIncorrect from "../Options/OptionsAnotherIncorrect";
import OptionsArrayWEs from "../Options/OptionsArrayWEs";
import OptionsFunctionsWEs from "../Options/OptionsFunctionsWEs";
import OptionsButtonsLinesWE from "../Options/OptionsButtonsLinesWE";
import OptionsWE from "../Options/OptionsWE";
import OptionsListWE from "../Options/OptionsListWE";

const config = {
  botName: "ChatBot de Educação",
  initialMessages: [
    createChatBotMessage(`Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:`, {
      widget: "options",
    }),
    createCustomMessage(<CustomMessage />)
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "volteMenuPrincipal", // menu principal
      widgetFunc: (props) => <OptionsGoToMainMenu {...props} />,
    },
    {
      widgetName: "optionswe",
      widgetFunc: (props) => <OptionsWE {...props} />,
    },
    {
      widgetName: "anothercorrect",
      widgetFunc: (props) => <OptionsAnotherCorrect {...props} />,
    },
    {
      widgetName: "anotherincorrect",
      widgetFunc: (props) => <OptionsArrayAnotherIncorrect {...props} />,
    },
    {
      widgetName: "vetoreswe",
      widgetFunc: (props) => <OptionsArrayWEs {...props} />
    },
    {
      widgetName: "funcoeswe",
      widgetFunc: (props) => <OptionsFunctionsWEs {...props} />
    },
    {
      widgetName: "questionswe",
      widgetFunc: (props) => <OptionsButtonsLinesWE {...props} />
    },
    {
      widgetName: "listwe",
      widgetFunc: (props) => <OptionsListWE {...props} />
    }
  ],
};

export default config;