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
import OptionsArrayWEs from "../Options/OptionsArrayWEs";
import OptionsFunctionsWEs from "../Options/OptionsFunctionsWEs";
import OptionsButtonsLinesWE from "../Options/OptionsButtonsLinesWE";
import Options2 from "../Options/Options2";
import Options1 from "../Options/Options1";

const config2 = {
  botName: "ChatBot de Educação",
  initialMessages: [
    createChatBotMessage(`Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:`, {
      widget: "options2",
    }),
    createCustomMessage(<CustomMessage />)
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {//remover depois do experimento
      widgetName: "options1",
      widgetFunc: (props) => <Options1 {...props} />,
    },
    {//remover depois do experimento
      widgetName: "options2",
      widgetFunc: (props) => <Options2 {...props} />,
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
    }
  ],
};

export default config2;