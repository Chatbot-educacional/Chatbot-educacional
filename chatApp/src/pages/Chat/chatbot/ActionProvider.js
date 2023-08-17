import dataVariable from '../../../Data/VariableQuizData.json';
import dataFor from '../../../Data/LoopsData.json';
import dataCondicional from '../../../Data/ConditionalQuizData.json';
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet = () => {
      const message = this.createChatBotMessage("Olá, amigo/a");
      this.addMessageToState(message);
    };
  
    handleVariavelQuiz = () => {
      const mensagem = this.createChatBotMessage(
        dataVariable.definicao,
        {
          widget: "variavel", // widget de variaveis
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleCondicionalQuiz = () => {
      const mensagem = this.createChatBotMessage(
        dataCondicional.definicao,
        {
          widget: "condicional", // widget de condicionais
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleLacoRepeticao = () => {
      const mensagem = this.createChatBotMessage(
        dataFor.definicao,
        {
          widget: "lacoRepeticao", // widget de laco de repeticao
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploCorretoVariavel = () => {
      const mensagem = this.createChatBotMessage(
       dataVariable.exemploCorreto ,
        {
          widget: "variavel", // widget de variavel
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorretoVariavel = () => {
      const mensagem = this.createChatBotMessage(
        dataVariable.exemploIncorreto,
        {
          widget: "identificarErroVariavel", // widget de idenfica o erro
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleIdentificarErroVariavel = () => {
      const mensagem = this.createChatBotMessage(
        dataVariable.identificaProblema,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      this.addMessageToState(mensagem);
    }

    handleExemploCorretoCondicional = () => {
      const mensagem = this.createChatBotMessage(
        dataCondicional.exemploCorreto,
        {
          widget: "condicional", // widget de condiocional
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorretoCondicional = () => {
      const mensagem = this.createChatBotMessage(
        dataCondicional.exemploIncorreto,
        {
          widget: "identificarErroCondicional", // widget de condiocional
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleIdentificarErroCondicional = () => {
      const mensagem = this.createChatBotMessage(
        dataCondicional.identificaProblema,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      this.addMessageToState(mensagem);
    }

    handleExemploCorretoLacoRepeticao = () => {
      const mensagem = this.createChatBotMessage(
        dataFor.exemploCorreto,
        {
          widget: "lacoRepeticao", // widget de laco de repeticao
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorretoLacoRepeticao = () => {
      const mensagem = this.createChatBotMessage(
        dataFor.exemploIncorreto,
        {
          widget: "identificarErroLacoRepeticao", // widget de erro de laco de repeticao
        }
      );
  
      this.addMessageToState(mensagem);
    };
    
    handleIdentificarErroLacoRepeticao = () => { 
      const mensagem = this.createChatBotMessage(
        dataFor.identificaProblema,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      this.addMessageToState(mensagem);
    }

    handleGoToMainMenu = () => {
      this.setState({
        messages: [],
      });
      const mensagem = this.createChatBotMessage(
        `Você voltou ao menu principal.
        Olá! Sou o EducaBot, e estou aqui para te auxiliar a aprender conceitos de programação. Escolha qual a opção que deseja aprender.
        `,
        {
          widget: "options",
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleGoToBackMenu = () => {
      this.setState({
        messages: [],
      });
      const mensagem = this.createChatBotMessage(
        `
        Olá! Sou o EducaBot, e estou aqui para te auxiliar a aprender conceitos de programação. Escolha qual a opção que deseja aprender.
        `,
        {
          widget: "options",
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleDefaultMessage = () => {
      const mensagem = this.createChatBotMessage(
        "Desculpe, não entendi. Poderia repetir ou selecionar uma das opções abaixo?",
        {
          widget: "options",
        }
      );
  
      this.addMessageToState(mensagem);
    }

    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;