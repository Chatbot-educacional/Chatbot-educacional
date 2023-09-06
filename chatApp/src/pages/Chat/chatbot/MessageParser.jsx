import React from "react";

const MessageParser = ({ children, actions }) => {
  
    const parse = (message) => {
      const lowerCaseMessage = message.toLowerCase()

        const greetingsKeywords = ["oi", "ola", "olá", "hello", "hi", "hey", "oi, tudo bem?", "ola, tudo bem?", "olá, tudo bem?", "hello, tudo bem?", "hi, tudo bem?", "hey, tudo bem?", "oi, tudo bem", "ola, tudo bem", "olá, tudo bem", "hello, tudo bem", "hi, tudo bem", "hey, tudo bem", "eae", "eai", "e aí", "e aí?", "eai?", "eae?"];
        const variableKeywords = ["variavel", "variable", "variável", "variáveis", "variables", "var", "1", "um", "um.", "1.", "um)", "1)"];
        const conditionalKeywords = ["2", "dois", "dois.", "2.", "dois)", "2)", "condicional", "condicionais", "conditional", "conditionals", "if", "else", "if-else", "if else"];
        const loopKeywords = ["3", "tres", "três", "3.", "três.", "3)", "três)", "laco", "laço", "repeticao", "repetição", "loop", "looping", "for", "while"];

        let matched = false;

        switch (true) {
            case greetingsKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                actions.greet();
                matched = true;
                break;

            case variableKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                actions.handleVariavelQuiz();
                matched = true;
                break;

            case conditionalKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                actions.handleCondicionalQuiz();
                matched = true;
                break;

            case loopKeywords.some(palavra => lowerCaseMessage.includes(palavra)):
                actions.handleLacoRepeticao();
                matched = true;
                break;
        }

        if (!matched) {
            actions.handleDefaultMessage();
        }
    }
    
    return (    
        <div>      
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
  }
  
  export default MessageParser;
  