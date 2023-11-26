import React from 'react';
import { useAuthValue } from "../../../context/AuthContext";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useInsertDocument } from '../../../hooks/useInsertDocument';


import dataArray from '../workedExamples/WorkedExamplesArrays';
//import dataFunc from '../workedExamples/WorkedExamplesFunctions';
import dataFunc from '../workedExamples/WorkedExamplesFunctionsC';

let data, dataWE, idDataWE, currentWETheme, currentExWETheme, correctWETheme, incorrectWETheme, questionWETheme, variavelLugar, acertouResposta = 'N';

const HeaderMessage = ({ descricao, resultado, reflexivo, teste }) => {
  return (
    <div>
      <p style={{ textAlign: 'center' }}><strong>WorkedExample</strong></p>
      <p><strong>Descrição: </strong>{descricao}</p>
      <p><strong>Resultado: </strong>{resultado}</p>
      <p><strong>Reflexivo: </strong>{reflexivo}</p>
      <p><strong>Teste: </strong>{teste}</p>
    </div>
  );
};

const CorrectWE = ({ passos, proposta }) => {
  return (
    <div>
      <p><strong>Ok, abaixo temos os passos para construção do código correto.</strong></p>
      <p><strong>Passos: </strong>{passos}</p>
      <CodeMessage code={proposta} />
    </div>
  )
}

const IncorrectWE = ({ incorreto, teste, opcoes }) => {
  return (
    <div>
      <p><strong>Ok, abaixo segue um exemplo de código escrito de forma incorreta para o problema.</strong></p>
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
      {/*<p><strong>Resposta correta: </strong>{resposta}</p>*/}
      <p><strong>Veja abaixo uma proposta de solução correta: </strong></p>
      <p>{solucao}</p>
      <CodeMessage code={code} />
    </div>
  );
}

const CustomText = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
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

const ActionProvider2 = ({ createChatBotMessage, setState, children }) => {
  const { user } = useAuthValue();
  const [visitado, setVisitado] = React.useState([]);
  const [exampleTime, setExampleTime] = React.useState(null);
  const [primeiraExecucao, setPrimeiraExecucao] = React.useState(true);
  const { insertDocument } = useInsertDocument("metrics-example");
  const [isInserting, setIsInserting] = React.useState(false);

  const greet = () => {
    const botMessage = createChatBotMessage(`Olá, ${user.displayName}`);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const calcTime = () => {
    let finalExampleTime = new Date();
    let elapsedTimeInMilliseconds = finalExampleTime - exampleTime;
    let elapsedTimeInMinutes = elapsedTimeInMilliseconds / (1000 * 60);
    return elapsedTimeInMinutes;
  }

  const handleMetricsStore = async (uID, exID, tempo, lugar, cAnswer) => {
    setIsInserting(true);
    try {
      const documentData = {
        user: uID,
        example: exID,
        time: tempo,
        category: lugar,
        correctAnswer: cAnswer
      };
      await insertDocument(documentData);
      console.log('Documento inserido com sucesso:', documentData);
    } catch (error) {
      console.error('Erro ao inserir documento:', error);
    } finally {
      setIsInserting(false);
    }
  };

  /*#Métrica - 1 primeira execução sem cálculo
               2 proximas execuções precisa calcular de onde veio e armazenar C ou I*/
  const handleExampleChoice = (id) => {
    if (!primeiraExecucao) {
      let totalTime = calcTime();
      if (variavelLugar == 'C' || variavelLugar == 'I' || variavelLugar == 'D' || variavelLugar == 'Q') {
        visitado.push({ user: user.uid, example: idDataWE, time: totalTime, category: variavelLugar, correctAnswer: acertouResposta })//de onde veio(D, C, I)
        handleMetricsStore(user.uid, idDataWE, totalTime, variavelLugar, acertouResposta);
        variavelLugar = null;
      }
      setExampleTime(new Date())
    } else {
      //setExampleTime(new Date());
      setPrimeiraExecucao(false)
      acertouResposta = 'N';
    }
    switch (id) {
      case 1:
        currentWETheme = "vetoreswe";
        currentExWETheme = "vetores";
        correctWETheme = "vetoresanothercorrect";
        incorrectWETheme = "questionswe";
        questionWETheme = "vetoresanotherincorrect";
        data = dataArray;
        break;
      case 2:
        currentWETheme = "funcoeswe";
        currentExWETheme = "vetores";
        correctWETheme = "vetoresanothercorrect";
        incorrectWETheme = "questionswe";
        questionWETheme = "vetoresanotherincorrect";
        data = dataFunc;
        break;
      case -1:
        break;
      default:
        currentWETheme = "inexistente";
    }
    const botMessages = [
      createChatBotMessage(<CustomText text={`${user.displayName}, eu posso te ajudar com os temas abaixo, basta efetuar um click no botão desejado:`} />,
        {
          widget: currentWETheme,
        }),
    ];
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleQuiz = (op) => {
    //let totalTime = calcTime();
    //visitado.push({ user: user.uid, example: op, time: totalTime, category: variavelLugar })//de onde veio(WE, C, I)
    setExampleTime(new Date());

    idDataWE = op;//armazenando o id do exemplo escolhido
    dataWE = data[idDataWE];
    const descricaoDoProblema = dataWE.description
    const resultado = dataWE.result
    const reflex = dataWE.problemWECorrect.thinking;
    const teste = dataWE.problemWECorrect.solutionProposal.test;
    variavelLugar = 'D';
    const botMessages = [
      createChatBotMessage(<HeaderMessage descricao={descricaoDoProblema} resultado={resultado} reflexivo={reflex} teste={teste} />,
        {
          widget: currentExWETheme, // widget de vetores
        }),
    ];
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleCorrectWE = (op) => {
    let totalTime = calcTime();
    visitado.push({ user: user.uid, example: idDataWE, time: totalTime, category: variavelLugar, correctAnswer: acertouResposta })//de onde veio(WE, C, I)
    handleMetricsStore(user.uid, idDataWE, totalTime, variavelLugar, acertouResposta);
    setExampleTime(new Date());
    variavelLugar = 'C';

    dataWE = data[idDataWE];
    const passos = dataWE.problemWECorrect.solutionProposal.steps;
    const proposta = dataWE.problemWECorrect.correctSolutionProposal;

    const botMessages = [
      createChatBotMessage(<CorrectWE passos={passos} proposta={proposta} />,
        {
          widget: correctWETheme, // widget de vetores
        }),
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleIncorrectWE = (op) => {
    let totalTime = calcTime();
    visitado.push({ user: user.uid, example: idDataWE, time: totalTime, category: variavelLugar, correctAnswer: acertouResposta })//de onde veio(WE, C, I)
    handleMetricsStore(user.uid, idDataWE, totalTime, variavelLugar, acertouResposta);
    setExampleTime(new Date());
    variavelLugar = 'I';

    dataWE = data[idDataWE];
    const incorreto = dataWE.problemWEIncorrect.incorrectSolution;
    const teste = dataWE.problemWEIncorrect.test;
    const opcoes = dataWE.problemWEIncorrect.options;

    const botMessages = [
      createChatBotMessage(
        <IncorrectWE teste={teste} incorreto={incorreto} opcoes={opcoes} />,
        { widget: incorrectWETheme, /* widget de vetores*/ }
      )
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  /**Recebe a resposta da questão e mostra o feedback  */
  const handleQuestionWE = (resp) => {
    let totalTime = calcTime();
    visitado.push({ user: user.uid, example: idDataWE, time: totalTime, category: variavelLugar, correctAnswer: acertouResposta })//de onde veio(WE, C, I)
    handleMetricsStore(user.uid, idDataWE, totalTime, variavelLugar, acertouResposta);
    setExampleTime(new Date());
    variavelLugar = 'Q';

    const opcaoCorreta = dataWE.problemWEIncorrect.correctOption;
    const erro = dataWE.problemWEIncorrect.error;
    const resposta = dataWE.problemWEIncorrect.response;
    const proposta = dataWE.problemWECorrect.correctSolutionProposal;
    const solucao = dataWE.problemWEIncorrect.correctSolutionProposal;
    let texto = "";

    if (resp === Number(opcaoCorreta)) {
      texto = "Parabéns! Você acertou.";
      acertouResposta = 'T';
    } else if (resp == 5) {
      texto = "Tudo bem, eu irei te ajudar a identiticar."
      acertouResposta = '5';
    }
    else {
      texto = "A resposta está incorreta. Não desanime, eu irei te ajudar a identificar corretamente.";
      acertouResposta = 'F';
    }

    const botMessages = [
      createChatBotMessage(
        <ResponseWE text={texto}
          erro={erro} resposta={resposta} solucao={solucao} code={proposta}
        />,
        {
          widget: questionWETheme, // widget de vetores
        }
      )
    ];

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  }

  const handleGoToMainMenu = () => {
    const botMessage = createChatBotMessage(
      `Você voltou ao menu principal.
      Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:
        `,
      {
        widget: "options2",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [botMessage],
    }));
  };

  const handleGoToBackMenu = () => {
    if (!primeiraExecucao) {
      if (variavelLugar == 'C' || variavelLugar == 'I' || variavelLugar == 'D' || variavelLugar == 'Q') {
        let totalTime = calcTime();
        visitado.push({ user: user.uid, example: idDataWE, time: totalTime, category: variavelLugar, correctAnswer: acertouResposta })//de onde veio(WE, C, I)  
        handleMetricsStore(user.uid, idDataWE, totalTime, variavelLugar, acertouResposta);
        variavelLugar = null;
      }
    }
    console.log(visitado);
    const botMessage = createChatBotMessage(
      `Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:`,
      {
        widget: "options2",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [botMessage],
    }));
  };

  const handleGoOut = () => {
    console.log(visitado);
    const botMessage = createChatBotMessage(
      "Obrigado por participar deste experimento!",
      {
        widget: "options2",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleDefaultMessage = () => {
    const botMessage = createChatBotMessage(
      "Desculpe, não entendi. Poderia repetir ou selecionar uma das opções abaixo?",
      {
        widget: "options2",
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
            //handlers
            greet,
            handleGoToMainMenu,
            handleGoToBackMenu,
            handleDefaultMessage,
            handleExampleChoice,
            handleQuiz, handleCorrectWE, handleIncorrectWE, handleQuestionWE, handleGoOut,
            //variáveis de dados 
            dataWE, dataArray, dataFunc
          },
        });
      })}
    </div>
  )
}

export default ActionProvider2;
