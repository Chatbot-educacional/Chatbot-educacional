class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      const lowerCaseMessage = message.toLowerCase()

        const greetingsKeywords = ["oi", "ola", "olá", "hello", "hi", "hey", "oi, tudo bem?", "ola, tudo bem?", "olá, tudo bem?", "hello, tudo bem?", "hi, tudo bem?", "hey, tudo bem?", "oi, tudo bem", "ola, tudo bem", "olá, tudo bem", "hello, tudo bem", "hi, tudo bem", "hey, tudo bem", "eae", "eai", "e aí", "e aí?", "eai?", "eae?"];
        const variableKeywords = ["variavel", "variable", "variável", "variáveis", "variables", "var", "1", "um", "um.", "1.", "um)", "1)"];
        const conditionalKeywords = ["2", "dois", "dois.", "2.", "dois)", "2)", "condicional", "condicionais", "conditional", "conditionals", "if", "else", "if-else", "if else"];
        const loopKeywords = ["3", "tres", "três", "3.", "três.", "3)", "três)", "laco", "laço", "repeticao", "repetição", "loop", "looping", "for", "while"];

        let matched = false;

        switch (true) {
            case greetingsKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                this.actionProvider.greet();
                matched = true;
                break;

            case variableKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                this.actionProvider.handleVariavelQuiz();
                matched = true;
                break;

            case conditionalKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                this.actionProvider.handleCondicionalQuiz();
                matched = true;
                break;

            case loopKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                this.actionProvider.handleLacoRepeticao();
                matched = true;
                break;
        }

        if (!matched) {
            this.actionProvider.handleDefaultMessage();
        }
    }
  }
  
  export default MessageParser;
  