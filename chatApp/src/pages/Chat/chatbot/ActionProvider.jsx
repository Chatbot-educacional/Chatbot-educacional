import React from 'react';
import dataVariable from '../../../Data/VariableQuizData.json';
import dataFor from '../../../Data/LoopsData.json';
import dataCondicional from '../../../Data/ConditionalQuizData.json';
import { useAuthValue } from "../../../context/AuthContext";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const { user } = useAuthValue();

    const greet = () => {
      const botMessage = createChatBotMessage(`Olá, ${user.displayName}`);
      
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
  
    const handleVariavelQuiz = () => {
      const botMessage = createChatBotMessage(
        dataVariable.definicao,
        {
          widget: "variavel", // widget de variaveis
        }
      );
      
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleCondicionalQuiz = () => {
      const botMessage = createChatBotMessage(
        dataCondicional.definicao,
        {
          widget: "condicional", // widget de condicionais
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleLacoRepeticao = () => {
      const botMessage = createChatBotMessage(
        dataFor.definicao,
        {
          widget: "lacoRepeticao", // widget de laco de repeticao
        }
      );

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleExemploCorretoVariavel = () => {
      const botMessage = createChatBotMessage(
       dataVariable.exemploCorreto ,
        {
          widget: "variavel", // widget de variavel
        }
      );
      
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleExemploIncorretoVariavel = () => {
      const botMessage = createChatBotMessage(
        dataVariable.exemploIncorreto,
        {
          widget: "identificarErroVariavel", // widget de idenfica o erro
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleIdentificarErroVariavel = () => {
      const botMessage = createChatBotMessage(
        dataVariable.identificaProblema,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }

    const handleExemploCorretoCondicional = () => {
      const botMessage = createChatBotMessage(
        dataCondicional.exemploCorreto,
        {
          widget: "condicional", // widget de condiocional
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleExemploIncorretoCondicional = () => {
      const botMessage = createChatBotMessage(
        dataCondicional.exemploIncorreto,
        {
          widget: "identificarErroCondicional", // widget de condiocional
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleIdentificarErroCondicional = () => {
      const botMessage = createChatBotMessage(
        dataCondicional.identificaProblema,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }

    const handleExemploCorretoLacoRepeticao = () => {
      const botMessage = createChatBotMessage(
        dataFor.exemploCorreto,
        {
          widget: "lacoRepeticao", // widget de laco de repeticao
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };

    const handleExemploIncorretoLacoRepeticao = () => {
      const botMessage = createChatBotMessage(
        dataFor.exemploIncorreto,
        {
          widget: "identificarErroLacoRepeticao", // widget de erro de laco de repeticao
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    
    const handleIdentificarErroLacoRepeticao = () => { 
      const botMessage = createChatBotMessage(
        dataFor.identificaProblema,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }

    const handleGoToMainMenu = () => {
      const botMessage = createChatBotMessage(
        `Você voltou ao menu principal.
        Olá! Sou o EducaBot, e estou aqui para te auxiliar a aprender conceitos de programação. Escolha qual a opção que deseja aprender.
        `,
        {
          widget: "options",
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [botMessage],
      }));
    };

    const handleGoToBackMenu = () => {
      const botMessage = createChatBotMessage(
        `
        Olá! Sou o EducaBot, e estou aqui para te auxiliar a aprender conceitos de programação. Escolha qual a opção que deseja aprender.
        `,
        {
          widget: "options",
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [botMessage],
      }));
    };

    const handleDefaultMessage = () => {
      const botMessage = createChatBotMessage(
        "Desculpe, não entendi. Poderia repetir ou selecionar uma das opções abaixo?",
        {
          widget: "options",
        }
      );
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }

    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            actions: {
              greet,
              handleVariavelQuiz,
              handleCondicionalQuiz,
              handleLacoRepeticao,
              handleExemploCorretoVariavel,
              handleExemploIncorretoVariavel,
              handleIdentificarErroVariavel,
              handleExemploCorretoCondicional,
              handleExemploIncorretoCondicional,
              handleIdentificarErroCondicional,
              handleExemploCorretoLacoRepeticao,
              handleExemploIncorretoLacoRepeticao,
              handleIdentificarErroLacoRepeticao,
              handleGoToMainMenu,
              handleGoToBackMenu,
              handleDefaultMessage,
            },        
          });     
        })}
      </div>
    )
}
  
export default ActionProvider;