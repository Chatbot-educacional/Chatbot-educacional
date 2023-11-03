import React from 'react';
import dataVariable from '../../../Data/VariableQuizData.json';
import dataFor from '../../../Data/LoopsData.json';
import dataCondicional from '../../../Data/ConditionalQuizData.json';
import { useAuthValue } from "../../../context/AuthContext";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const CodeMessage = ({ code }) => {
  return (
    <SyntaxHighlighter language="javascript" style={tomorrowNight}>
      {code}
    </SyntaxHighlighter>
  );
};

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
      const greetingMessage = `bla`;

      const codeExample = `const exemplo = 'Este é um exemplo de código em JavaScript';\nconsole.log(exemplo);`;
  
      const botMessages = [
        createChatBotMessage(greetingMessage),
        createChatBotMessage( <CodeMessage code={codeExample} />)
        
      ];
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, ...botMessages],
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
       dataVariable.problemaComWorkedExampleCorreto.reflexivo + "\n" + dataVariable.problemaComWorkedExampleCorreto.propostaDeSolucao.etapasDeSolucao + "\n" + dataVariable.problemaComWorkedExampleCorreto.propostaDeSolucao.teste + "\n" + dataVariable.problemaComWorkedExampleCorreto.solucaoCorreta ,
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
