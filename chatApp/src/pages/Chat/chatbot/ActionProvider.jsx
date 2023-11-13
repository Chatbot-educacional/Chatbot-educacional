import React, { useState } from 'react';
//import dataArraysWe1 from '../../Chat/workedExamples/wevetor/vetorwe1.json';
import dataVariable from '../../../Data/VariableQuizData.json';
import dataFor from '../../../Data/LoopsData.json';
import dataCondicional from '../../../Data/ConditionalQuizData.json';
import { useAuthValue } from "../../../context/AuthContext";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import dataArray from '../workedExamples/WorkedExamples';
let dataArraysWE;

const HeaderMessage = ({ desc, res }) => {
  return (
    <div>
      <p style={{ textAlign: 'center' }}><strong>WorkedExample</strong></p>
      <p><strong>Descrição: </strong>{desc}</p>
      <p><strong>Resultado: </strong>{res}</p>
    </div>
  );
};

const CorrectWE = ({ reflexivo, teste, passos, proposta }) => {
  return (
    <div>
      <p><strong>Reflexivo: </strong>{reflexivo}</p>
      <p><strong>Teste: </strong>{teste}</p>
      <p><strong>Passos: </strong>{passos}</p>
      <CodeMessage code={proposta} />
    </div>
  )
}

const IncorrectWE = ({ reflexivo, incorreto, teste, opcoes }) => {
  return (
    <div>
      <p><strong>Reflexivo: </strong>{reflexivo}</p>
      <p><strong>Solução Incorreta: </strong></p>
      <CodeMessage code={incorreto} />
      <p><strong>Teste: </strong>{teste}</p>
      <p><strong>Você consegue identificar onde ocorre o erro? Escolha uma das opções:</strong></p>
      <ol>
        <li>{opcoes.one}</li>
        <li>{opcoes.two}</li>
        <li>{opcoes.three}</li>
        <li>{opcoes.four}</li>
        <li>{opcoes.five}</li>
      </ol>
    </div>
  );
}

const ResponseWE = ({ text, erro, resposta, solucao, code }) => {
  return (
    <div>
      <p>{text}</p>
      <p><strong>Identificando o erro: </strong>{erro}</p>
      <p><strong>Resposta correta: </strong>{resposta}</p>
      <p><strong>Veja abaixo uma proposta de solução correta: </strong></p>
      <p>{solucao}</p>
      <CodeMessage code={code} />
    </div>
  );
}

const CodeMessage = ({ code }) => {
  return (
    <SyntaxHighlighter language="java" style={tomorrowNight} showLineNumbers={true}
    >
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

  // vetores  
  const handleArraysQuiz = () => {
    let random = 6;//Math.floor(Math.random() * dataArray.length);//TRANSFORMAR EM STATE???
    dataArraysWE = dataArray[random];

    const descricaoDoProblema = dataArraysWE.description
    const resultado = dataArraysWE.result

    const botMessages = [
      createChatBotMessage(<HeaderMessage desc={descricaoDoProblema} res={resultado} />,
        {
          widget: "vetores", // widget de vetores
        }),
    ];
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleCorrectWEArray = () => {
    const reflex = dataArraysWE.problemWECorrect.thinking;
    const teste = dataArraysWE.problemWECorrect.solutionProposal.test;
    const passos = dataArraysWE.problemWECorrect.solutionProposal.steps;
    const proposta = dataArraysWE.problemWECorrect.correctSolutionProposal;

    const botMessages = [
      createChatBotMessage(<CorrectWE reflexivo={reflex} teste={teste} passos={passos} proposta={proposta} />/*),
      createChatBotMessage(<CodeMessage code={codigo} />*/,
        {
          widget: "vetoresanothercorrect", // widget de vetores
        }),
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleIncorrectWEArray = () => {
    const reflexivo = dataArraysWE.problemWEIncorrect.thinking;
    const incorreto = dataArraysWE.problemWEIncorrect.incorrectSolution;
    const teste = dataArraysWE.problemWEIncorrect.test;
    const opcoes = dataArraysWE.problemWEIncorrect.options;

    const botMessages = [
      createChatBotMessage(
        <IncorrectWE reflexivo={reflexivo} teste={teste} incorreto={incorreto} opcoes={opcoes} />,
        { widget: "identificarErroVariavelLines", /* widget de vetores*/ }
      )
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleArrayResp1 = () => {
    //mandar o switch para saber se é array, function, dentre outros, pegar tema no json?
    handleQuestionArray("1");
  }
  const handleArrayResp2 = () => {
    handleQuestionArray("2");
  }
  const handleArrayResp3 = () => {
    handleQuestionArray("3");
  }
  const handleArrayResp4 = () => {
    handleQuestionArray("4");
  }
  const handleArrayResp5 = () => {
    handleQuestionArray("5");
  }

  const handleQuestionArray = (resp) => {
    const opcaoCorreta = dataArraysWE.problemWEIncorrect.correctOption;
    const erro = dataArraysWE.problemWEIncorrect.error;
    const resposta = dataArraysWE.problemWEIncorrect.response;
    const proposta = dataArraysWE.problemWECorrect.correctSolutionProposal;
    const solucao = dataArraysWE.problemWEIncorrect.correctSolutionProposal;
    let texto = "";

    if (resp === opcaoCorreta) {
      texto = "Parabéns! Você acertou.";
    } else {
      texto = "A resposta está incorreta.";
    }

    const botMessages = [
      createChatBotMessage(
        <ResponseWE text={texto}
          erro={erro} resposta={resposta} solucao={solucao} code={proposta}
        />,
        {
          widget: "vetoresfinal", // widget de vetores
        }
      )
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleVariavelQuiz = () => {
    const descricaoDoProblema = dataVariable.descricaoDoProblema

    const resultado = dataVariable.resultado

    const botMessages = [
      createChatBotMessage(descricaoDoProblema + resultado,
        {
          widget: "variavel", // widget de variavel
        })
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
    const botMessages = [
      createChatBotMessage(dataVariable.problemaComWorkedExampleCorreto.reflexivo + dataVariable.problemaComWorkedExampleCorreto.propostaDeSolucao.etapasDeSolucao),
      createChatBotMessage(<CodeMessage code={dataVariable.problemaComWorkedExampleCorreto.solucaoCorreta} />,
        {
          widget: "variavel", // widget de variavel
        })
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  };

  const handleExemploIncorretoVariavel = () => {
    const botMessages = [
      createChatBotMessage(dataVariable.problemaComWorkedExampleIncorreto.reflexivo),
      createChatBotMessage(<CodeMessage code={dataVariable.problemaComWorkedExampleIncorreto.solucaoIncorreta} />),
      createChatBotMessage('Você conseguiu identificar o erro?',
        {
          widget: "identificarErroVariavelYesOrNo",
        }
      )
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  };

  const handleIdentificarErroVariavelSim = () => {
    const botMessages = [
      createChatBotMessage('Em qual linha do código acima está o erro ?',
        {
          widget: "identificarErroVariavelLines",
        }
      ),
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
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
            handleIdentificarErroVariavelSim,
            handleArraysQuiz,
            handleCorrectWEArray,
            handleIncorrectWEArray,
            handleArrayResp1,
            handleArrayResp2,
            handleArrayResp3,
            handleArrayResp4,
            handleArrayResp5
          },
        });
      })}
    </div>
  )
}

export default ActionProvider;
