// Imports
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/form/Button';

// Images
import ExemCorreto from '../../assets/example.jpg';
import ExemCorreto1 from '../../assets/workedexamplecorreto.png';
import ExemIncorreto from '../../assets/workedexampleincorreto.png';


import AccordionComponent from '../../components/Accordion/AccordionComponent';
// CSS
import styles from './Home.module.css'; 

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundImage}>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>ChatBot</h1>
        <p className={styles.description}>Uma ferramenta de ensino de programação</p>
        <Link to="/chat" className={styles.startButton}>Iniciar</Link>
      </div>
      <div className={styles.exampleContainer}>
        <h1 className={styles.titleExem}>Exemplificação</h1>
        <div className={styles.divParagrafos}>
            <p className={styles.pExem}>
                <strong className={styles.strongPara1}>Dados Gerais sobre a abordagem</strong><br/>
                <strong className={styles.strongLi}>Título da disciplina:</strong> Construção de Algoritmos<br/>
                <strong className={styles.strongLi}>Tópico da disciplina:</strong> Estruturas de decisão<br/>
                <strong className={styles.strongLi}>Subtópicos:</strong> Uso do comando "if"<br/>
                <strong className={styles.strongLi}>Conhecimento prévio:</strong> Variáveis<br/>
                <strong className={styles.strongLi}>Dados do Local do Exemplo:</strong> Local onde foi retirado: Material didático - Aula Professor Renato - IFMS<br/>
            </p>
            <p className={styles.pExem2}>
            <strong className={styles.strongPara2}>Dados do Worked Example</strong><br/>
            <ul>
              <strong className={styles.strongLi}>Descrição do problema:</strong> Desenvolva um código para verificar se um número é ímpar ou par<br/>
              <strong className={styles.strongLi}>Resultado:</strong> para o valor 2, o resultado esperado é par<br/>
              <strong className={styles.strongLi}>Material complementar:</strong> Curso Intensivo de Python - 3ª Edição: Uma Introdução Prática e Baseada em Projetos à Programação. (2023). (n.p.): Novatec Editora.
            </ul>
            </p>
        </div>    
        <div className={styles.exampleImages}>
          <div className={styles.example}>
            <img src={ExemCorreto1} alt="Exemplo Correto" className={styles.exampleImage} />
            <h2 className={styles.exampleTitle}>Exemplo Correto</h2>
          </div>

          <div className={styles.example}>
            <img src={ExemIncorreto} alt="Exemplo Incorreto" className={styles.exampleImage} />
            <h2 className={styles.exampleTitle}>Exemplo Incorreto</h2>
          </div>
        </div>
      </div>
      <div className={styles.backgroundSession}>
        <div className={styles.sessionContent}>
        <h1 className={styles.sessionTitle}>Conteúdos Abordados</h1>
        </div>
      </div>
      <div className={styles.lastContainer}>
       
        {/* <div className={styles.componenteImagemTexto}>
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ExemCorreto} alt="Imagem" />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.textoContainer}>
              <h2>Constantes</h2>
              <p>Uso de constantes</p>
            </div>
            <div className={styles.numeroContainer}>
              <span>02</span>
            </div>
          </div>
        </div> */}


        <AccordionComponent />
        {/* <div className={styles.componenteImagemTexto}>
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ConteudoArit} alt="Imagem" />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.textoContainer}>
              <h2>Expressão aritméticas</h2>
              <p>Desenvolvimento de cálculos aritméticos</p>
            </div>
            <div className={styles.numeroContainer}>
              <span>02</span>
            </div>
          </div>
        </div>
        <div className={styles.componenteImagemTexto}>
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ConteudoCond} alt="Imagem" />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.textoContainer}>
              <h2>Estruturas condicionais</h2>
              <p>Uso de estruturas para definição de caminho condicionais</p>
            </div>
            <div className={styles.numeroContainer}>
              <span>03</span>
            </div>
          </div>
        </div>
        <div className={styles.componenteImagemTexto}>
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ConteudoLaco} alt="Imagem" />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.textoContainer}>
              <h2>Laços de repetição</h2>
              <p>Aplicação de laços para execução de uma ou mais vezes determinados trechos de código</p>
            </div>
            <div className={styles.numeroContainer}>
              <span>04</span>
            </div>
          </div>
        </div> */}

      </div>

    </div>
  )
}

export default Home