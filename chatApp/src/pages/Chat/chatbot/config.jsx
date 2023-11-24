// Config starter code
import React from "react";
import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";

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
import OptionsYesOrNo from "../Options/OptionsYesOrNo";
import OptionsButtonsLines from "../Options/OptionsButtonsLines";
import OptionsArray from "../Options/OptionsArray";
import CustomMessage from "./CustomMessage";
import OptionsArrayAnotherCorrect from "../Options/OptionsArrayAnotherCorrect";
import OptionsArrayAnotherIncorrect from "../Options/OptionsArrayAnotherIncorrect";

const config = {
  botName: "ChatBot de Educação",
  initialMessages: [
    createChatBotMessage(`Olá! Sou o CoderBot, e estou aqui para te auxiliar a aprender conceitos de programação. Escolha qual a opção que deseja aprender.`, {
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
    {
      widgetName: "identificarErroVariavelYesOrNo", // identificar erro variavel
      widgetFunc: (props) => <OptionsYesOrNo {...props} />,
    },
    {
      widgetName: "identificarErroVariavelLines", // identificar erro variavel
      widgetFunc: (props) => <OptionsButtonsLines {...props} />,
    },
    {
      widgetName: "vetores",
      widgetFunc: (props) => <OptionsArray {...props} />,
    },
    {
      widgetName: "vetoresanothercorrect",
      widgetFunc: (props) => <OptionsArrayAnotherCorrect {...props} />,
    },
    {
      widgetName: "vetoresanotherincorrect",
      widgetFunc: (props) => <OptionsArrayAnotherIncorrect {...props} />,
    }
  ],
};

export default config;