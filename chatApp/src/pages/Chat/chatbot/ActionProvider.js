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
          widget: "5", // widget de for

        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleIndentificaErroVariavel = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos identificar o erro
          O Erro acontece porque a variável a não foi declarada, então não é possível acessar o seu valor.`,
        {
          // widget: "4", // widget de for
          // adicionar botão de voltar aqui ou para mostrar o exemplo correto
        }
      );
  
      this.addMessageToState(mensagem);
    }


    handleExemploIncorretoFor = () => {
      const mensagem = this.createChatBotMessage(
        `Considerando que queremos mostrar os números de 1 a 10
        for (var i = 0; i > 10; i++) {
          console.log(i);
        } `,
        {
          widget: "4", // widget de for
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploCorretoFor = () => {
      const mensagem = this.createChatBotMessage(
        `Considerando que queremos mostrar os números de 1 a 10
        for (var i = 0; i < 10; i++) {
          console.log(i);
        } `,
        {
          widget: "1", // widget de for
        }
      );
  
      this.addMessageToState(mensagem);
    };
    
    handleIdentificarErroFor = () => { 
      const mensagem = this.createChatBotMessage(
        `Vamos identificar o erro
        O erro acontece porque a condição está errada, o correto seria x == 0,
         pois queremos que o código seja executado caso x seja igual a 0.`,
        {
          // widget: "4", // widget de for
          // adicionar botão de voltar aqui
        }
      );
  
      this.addMessageToState(mensagem);
    }

    handleExemploCorretoConditional = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos ver um exemplo correto de condicionais.
        x = 0 
        if(x == 0){
          console.log('x é igual a 0');
        } else {
          console.log('x não é igual a 0');
        }
        `,
        {
          widget: "6", // widget de for
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorretoConditional = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos ver um exemplo incorreto de condicionais.
        x = 0
         if(x > 0) {
          console.log('x é igual a 0');
        }
        `,
        {
          widget: "6", // widget de for
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