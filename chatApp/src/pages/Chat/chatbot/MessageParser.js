class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      const lowerCaseMessage = message.toLowerCase()

        if (lowerCaseMessage.includes("oi") || lowerCaseMessage.includes("ola") || lowerCaseMessage.includes("olá") || lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey") || lowerCaseMessage.includes("oi, tudo bem?") || lowerCaseMessage.includes("ola, tudo bem?") || lowerCaseMessage.includes("olá, tudo bem?") || lowerCaseMessage.includes("hello, tudo bem?") || lowerCaseMessage.includes("hi, tudo bem?") || lowerCaseMessage.includes("hey, tudo bem?") || lowerCaseMessage.includes("oi, tudo bem") || lowerCaseMessage.includes("ola, tudo bem") || lowerCaseMessage.includes("olá, tudo bem") || lowerCaseMessage.includes("hello, tudo bem") || lowerCaseMessage.includes("hi, tudo bem") || lowerCaseMessage.includes("hey, tudo bem") || lowerCaseMessage.includes("eae") || lowerCaseMessage.includes("eai") || lowerCaseMessage.includes("e aí") || lowerCaseMessage.includes("e aí?") || lowerCaseMessage.includes("eai?") || lowerCaseMessage.includes("eae?")) {
            this.actionProvider.greet()
        }

        if (lowerCaseMessage.includes("variavel") || lowerCaseMessage.includes("variable") || lowerCaseMessage.includes("variável") || lowerCaseMessage.includes("variáveis") || lowerCaseMessage.includes("variables") || lowerCaseMessage.includes("var") ||lowerCaseMessage.includes("1") || lowerCaseMessage.includes("um") || lowerCaseMessage.includes("um.") || lowerCaseMessage.includes("1.") || lowerCaseMessage.includes("um)") || lowerCaseMessage.includes("1)")) {
            this.actionProvider.handleVariavelQuiz()
        }
        
        if (lowerCaseMessage.includes("2") || lowerCaseMessage.includes("dois") || lowerCaseMessage.includes("dois.") || lowerCaseMessage.includes("2.") || lowerCaseMessage.includes("dois)") || lowerCaseMessage.includes("2)") || lowerCaseMessage.includes("condicional") || lowerCaseMessage.includes("condicionais") || lowerCaseMessage.includes("conditional") || lowerCaseMessage.includes("conditionals") || lowerCaseMessage.includes("if") || lowerCaseMessage.includes("else") || lowerCaseMessage.includes("if-else") || lowerCaseMessage.includes("if else")) {
            this.actionProvider.handleCondicionalQuiz()
        }

        if (lowerCaseMessage.includes("3") || lowerCaseMessage.includes("tres") || lowerCaseMessage.includes("três") || lowerCaseMessage.includes("3.") || lowerCaseMessage.includes("três.") || lowerCaseMessage.includes("3)") || lowerCaseMessage.includes("três)") || lowerCaseMessage.includes("laco") || lowerCaseMessage.includes("laço") || lowerCaseMessage.includes("repeticao") || lowerCaseMessage.includes("repetição") || lowerCaseMessage.includes("loop") || lowerCaseMessage.includes("looping") || lowerCaseMessage.includes("for") || lowerCaseMessage.includes("while")) {
            this.actionProvider.handleLacoRepeticao()
        }
    }
  }
  
  export default MessageParser;
  