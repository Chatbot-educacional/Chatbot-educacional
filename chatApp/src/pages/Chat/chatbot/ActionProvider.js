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
        "Uma variável é um nome associado a um valor ou espaço de armazenamento na programação. Ela permite que os dados sejam manipulados e referenciados de forma flexível durante a execução de um programa.",
        {
          widget: "variavel", // widget de variaveis
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleCondicionalQuiz = () => {
      const mensagem = this.createChatBotMessage(
        `Uma condicional é uma estrutura de programação que permite que o código tome decisões com base em uma condição. Ela avalia se uma afirmação é verdadeira ou falsa e executa diferentes ações com base nessa avaliação. Geralmente é expressa com palavras-chave como "if" (se) e "else" (senão) em muitas linguagens de programação.`,
        {
          widget: "condicional", // widget de condicionais
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleLacoRepeticao = () => {
      const mensagem = this.createChatBotMessage(
        `Um laço de repetição é uma construção de programação que permite executar um conjunto de instruções várias vezes, com base em uma condição ou um número definido de iterações. Isso ajuda a automatizar tarefas repetitivas e economizar código. Em linguagens de programação, os laços de repetição são frequentemente implementados usando palavras-chave como "for" e "while".`,
        {
          widget: "lacoRepeticao", // widget de laco de repeticao
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploCorretoVariavel = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos ver um exemplo correto
         
        // Declaração e inicialização de uma variável
        let nome = "Williamson";

        // Impressão do valor da variável
        console.log("Meu nome é: " + nome);`,
        {
          widget: "variavel", // widget de variavel
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorretoVariavel = () => {
      const mensagem = this.createChatBotMessage(
        `Agora vamos ver um exemplo incorreto

        let nome = "Williamson";

        console.log("Meu nome é: " + nom);
        `,
        {
          widget: "identificarErroVariavel", // widget de idenfica o erro
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleIdentificarErroVariavel = () => {
      const mensagem = this.createChatBotMessage(
        `O problema é que a variável foi declarada como "nome", mas na linha de impressão, você está tentando acessar uma variável chamada "nom". Como a variável "nom" não foi declarada, isso resultará em um erro, indicando que a variável é indefinida. Para corrigir o erro, você deve usar o nome correto da variável, que é "nome"`,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      this.addMessageToState(mensagem);
    }

    handleExemploCorretoCondicional = () => {
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
          widget: "condicional", // widget de condiocional
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorretoCondicional = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos ver um exemplo incorreto de condicionais.

        x = 0;
        if (x = 0) {
          console.log('x é igual a 0'); 
        } else {
          console.log('x não é igual a 0');
        }     
        `,
        {
          widget: "identificarErroCondicional", // widget de condiocional
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleIdentificarErroCondicional = () => {
      const mensagem = this.createChatBotMessage(
        `Neste exemplo, o erro está na linha if (x = 0), o operador de atribuição (=) em vez do operador de comparação de igualdade (==). Como resultado, a expressão (x = 0) atribuirá o valor 0 à variável x e a condição será avaliada como falsa, levando à impressão da mensagem "x não é igual a 0" mesmo quando x é igual a 0. Para corrigir, você deve usar o operador de igualdade (==):`,
        {
          widget: "volteMenuPrincipal", // widget para voltar menu principal
        }
      );
  
      this.addMessageToState(mensagem);
    }

    handleExemploCorretoLacoRepeticao = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos ver um exemplo correto de laços de repetição.

        Considerando que queremos mostrar os números de 1 a 10
        for (var i = 0; i < 10; i++) {
          console.log(i);
        }
        `,
        {
          widget: "lacoRepeticao", // widget de laco de repeticao
        }
      );
  
      this.addMessageToState(mensagem);
    };

    handleExemploIncorretoLacoRepeticao = () => {
      const mensagem = this.createChatBotMessage(
        `Vamos ver um exemplo incorreto de laços de repetição.

        for (var i = 0; i > 10; i++) {
          console.log(i);
        }
        `,
        {
          widget: "identificarErroLacoRepeticao", // widget de erro de laco de repeticao
        }
      );
  
      this.addMessageToState(mensagem);
    };
    
    handleIdentificarErroLacoRepeticao = () => { 
      const mensagem = this.createChatBotMessage(
        `Vamos identificar o erro
        Neste exemplo, o erro está na condição do loop for. A condição i > 10 é falsa desde o início, já que i é inicializado como 0. Isso significa que o loop nunca será executado e nenhum número será impresso. Para imprimir os números de 0 a 9, a condição deveria ser i < 10`,
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

    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;