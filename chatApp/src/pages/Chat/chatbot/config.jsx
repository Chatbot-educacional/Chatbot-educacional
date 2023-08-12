// Config starter code
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

// QUI
import Quiz from "../Quiz/Quiz";

// Options
import Options from "../Options/Options";
import OptionsVariable from "../Options/OptionsVariable";
import OptionsConditional from "../Options/OptionsConditional";
import OptionsRepeatingLoop from "../Options/OptionsRepeatingLoop";
import OptionsVariableWrong from "../Options/OptionsVariableWrong";
import OptionsConditionalWrong from "../Options/OptionsConditionalWrong";
import OptionsRepeatingLoopWrong from "../Options/OptionsRepeatingLoopWrong";
import OptionsGoToMainMenu from "../Options/OptionsGoToMainMenu";

const config = {
  botName: "ChatBot de Educação",
  initialMessages: [
    
    createChatBotMessage(`Olá! Sou o EducaBot, e estou aqui para te auxiliar a aprender conceitos de programação. Escolha qual a opção que deseja aprender.`, {
      widget: "options",
    }),
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
      widgetName: "variavel", // variavel
      widgetFunc: (props) => <Quiz {...props} />,
      widgetFunc: (props) => <OptionsVariable {...props} />,
    },
    {
      widgetName: "condicional", // condicional
      widgetFunc: (props) => <Quiz {...props} />,
      widgetFunc: (props) => <OptionsConditional {...props} />,
    },
    {
      widgetName: "lacoRepeticao", // laco de repeticao
      widgetFunc: (props) => <Quiz {...props} />,
      widgetFunc: (props) => <OptionsRepeatingLoop {...props} />,
    },
    {
      widgetName: "identificarErroVariavel", // identificar erro variavel
      widgetFunc: (props) => <OptionsVariableWrong {...props} />,
    },
    {
      widgetName: "identificarErroCondicional", // identificar erro condicional
      widgetFunc: (props) => <OptionsConditionalWrong {...props} />,
    },
    {
      widgetName: "identificarErroLacoRepeticao", // identificar erro laco de repeticao
      widgetFunc: (props) => <OptionsRepeatingLoopWrong {...props} />,
    },
  ],
};

export default config;