import React, { useState, useEffect } from 'react';
import { useAuthValue } from "../../../context/AuthContext";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useInsertDocument } from '../../../hooks/useInsertDocument';
import { useNavigate } from 'react-router-dom';

import dataArray from '../workedExamples/WorkedExamplesArraysC';
import dataFunc from '../workedExamples/WorkedExamplesFunctionsC';

import dataArrayJava from '../workedExamples/WorkedExamplesArraysJava';
import dataFuncJava from '../workedExamples/WorkedExamplesFunctionsJava';

import dataListPY from '../workedExamples/WorkedExamplesListspy';

let data, dataWE, idDataWE, currentWETheme, currentExWETheme, correctWETheme, incorrectWETheme, questionWETheme, variavelLugar, acertouResposta = 'N';


const langConfigs = {
  "Linguagem C": {
    themes: {
      1: { name: "Vetores", widget: "vetoreswe" },
      2: { name: "Funções", widget: "funcoeswe" },
    },
    data: [dataArray, dataFunc]
  },
  "Linguagem Java": {
    themes: {
      1: { name: "Arrays", widget: "vetoreswe" },
      2: { name: "Funções", widget: "funcoeswe" },
    },
    data: [dataArrayJava, dataFuncJava]
  },
  "Linguagem Python": {
    themes: {
      1: { name: "Listas", widget: "vetoreswe" },
    },
    data: [dataListPY]
  }
}

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

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const { user } = useAuthValue();
  const [visitado, setVisitado] = React.useState([]);
  const [exampleTime, setExampleTime] = React.useState(null);
  const [primeiraExecucao, setPrimeiraExecucao] = React.useState(true);
  const { insertDocument } = useInsertDocument("metrics-example-functions");
  const [isInserting, setIsInserting] = React.useState(false);
  const navigate = useNavigate();
  const [language, setLanguage] = useState('');
  const [langConfig, setLangConfig] = useState(null);
  const [themeNames, setThemeNames] = useState([]);


  //adaptação temp para pegar linguagem
  useEffect(() => {
    setLanguage(localStorage.getItem("conteudo"));
    selectLang();
  }, []);

  const selectLang = () => {
    const lang = localStorage.getItem("conteudo");
    setLanguage(lang);

    const selectedLangConfig = langConfigs[lang];
    setLangConfig(selectedLangConfig);

    // Pega os nomes de todos os temas da linguagem selecionada
    const themeNames = Object.values(selectedLangConfig?.themes || {}).map(theme => theme.name);

    setThemeNames(themeNames); // Atualiza o estado com os nomes dos temas
  };

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
        correctAnswer: cAnswer,
        createdBy: user.displayName
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
        acertouResposta = 'N';
      }
      setExampleTime(new Date())
    } else {
      //setExampleTime(new Date());
      setPrimeiraExecucao(false)
      acertouResposta = 'N';
    }
    const theme = langConfig?.themes[id];
    if (!theme) return;

    currentWETheme = theme.widget;
    currentExWETheme = "optionswe";
    correctWETheme = "anothercorrect";
    incorrectWETheme = "questionswe";
    questionWETheme = "anotherincorrect";

    data = langConfig?.data[id - 1];

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
        widget: "options",
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
        widget: "options",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [botMessage],
    }));
  };

  const handleGoOut = () => {
    if (!primeiraExecucao) {
      if (variavelLugar == 'C' || variavelLugar == 'I' || variavelLugar == 'D' || variavelLugar == 'Q') {
        let totalTime = calcTime();
        visitado.push({ user: user.uid, example: idDataWE, time: totalTime, category: variavelLugar, correctAnswer: acertouResposta })//de onde veio(WE, C, I)  
        handleMetricsStore(user.uid, idDataWE, totalTime, variavelLugar, acertouResposta);
        variavelLugar = null;
      }
    }
    console.log(visitado);
    navigate('/');
    const botMessage = createChatBotMessage(
      "Obrigado por participar deste experimento!",
      {
        widget: "options",
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
        widget: "options",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleLang = (id) => {
    return "teste"
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            //handlers
            greet,
            handleLang,
            handleGoToMainMenu,
            handleGoToBackMenu,
            handleDefaultMessage,
            handleExampleChoice,
            handleQuiz, handleCorrectWE, handleIncorrectWE, handleQuestionWE, handleGoOut,
            //variáveis de dados 
            dataWE, dataArray, dataFunc, dataArrayJava, dataListPY, themeNames
          },
        });
      })}
    </div>
  )
}

export default ActionProvider;
