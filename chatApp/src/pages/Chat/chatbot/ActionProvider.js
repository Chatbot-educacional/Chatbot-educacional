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
      const message = this.createChatBotMessage(
        "Fantastic. Here is your quiz. Good luck!",
        {
          widget: "variaveis",
        }
      );
  
      this.addMessageToState(message);
    };

    handleCondicionaisQuiz = () => {
      const message = this.createChatBotMessage(
        "Fantastic. Here is your conditionals  quiz. Good luck!",
        {
          widget: "Condicionais",
        }
      );
  
      this.addMessageToState(message);
    };

    handleFor = () => {
      const message = this.createChatBotMessage(
        "Fantastic. Here is your  for quiz. Good luck!",
        {
          widget: "For",
        }
      );
  
      this.addMessageToState(message);
    };

   
  
    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;