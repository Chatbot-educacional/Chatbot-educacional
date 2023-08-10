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
        "Fantastic. Here is your quiz. Good luck!",
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

   
  
    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;