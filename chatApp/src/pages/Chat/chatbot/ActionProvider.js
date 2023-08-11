class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet = () => {
      const message = this.createChatBotMessage("Hello friend.");
      this.addMessageToState(message);
    };
  
    handleJavascriptQuiz = () => {
      const mensagem = this.createChatBotMessage(
        "Uma variável é um nome associado a um valor ou espaço de armazenamento na programação. Ela permite que os dados sejam manipulados e referenciados de forma flexível durante a execução de um programa.",
        {
          widget: "1", // widget de variaveis
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleCondicionaisQuiz = () => {
      const mensagem = this.createChatBotMessage(
        "Fantastic. Here is your conditionals  quiz. Good luck!",
        {
          widget: "3", // widget de condicionais
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleFor = () => {
      const mensagem = this.createChatBotMessage(
        "Fantastic. Here is your  for quiz. Good luck!",
        {
          widget: "2", // widget de for
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploCorreto = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos ver um exemplo correto
         
        var a;
        console.log("O valor de a é " + "a);
        console.log("O valor de b é " + "b);`,
        {
          widget: "1", // widget de for
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorreto = () => {
      const mensagem = this.createChatBotMessage(
        `Agora vamos ver um exemplo incorreto

        var c;
        console.log("O valor de a é " + a);
        `,
        {
          widget: "1", // widget de for
        }
      );
  
      this.addMessageToState(mensagem);
    };
   
  
    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;