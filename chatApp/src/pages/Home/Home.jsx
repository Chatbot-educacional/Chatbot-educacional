// Imports
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
// import ScrollReveal from "scrollreveal";
// import Fade from 'react-reveal/Fade';
// import Button from '../../components/form/Button';

// Images
import ConteudoVar from '../../assets/codeVar.png';
import ConteudoArit from '../../assets/codeArit.png';
import ConteudoCond from '../../assets/codeCond.png';
import ConteudoLaco from '../../assets/codeRep.png';
import HomeFormImage from '../../assets/home_bg_form.png';

// CSS
import styles from './Home.module.css'; 

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.home_image}>
          <img src={HomeFormImage} alt="Forma para estilização"/>
          <img className={styles.home_image2} src={HomeFormImage} alt="Forma para estilização2"/>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>WEBOT</h1>
        <p className={styles.description}>Desperte o potencial dos programadores do futuro com o WeBot - <span>A chave para o sucesso.</span></p>
        <Link to="/chat" className={styles.startButton}>
          {/* <svg xmlns="http://www.w3.org/2000/svg"></svg> */}
          Iniciar
          </Link>
      </div>

      <div className={styles.sub_content}>
          <h2>Aqui você vai...</h2>
          <div className={styles.texts}>
            <h1>
              <span>Conhecer</span>
              <span>Aprender</span>
              <span className={styles.spantext}>Desenvolver</span>
            </h1>
          </div>
          <div className={styles.texts_button}>
            <h2>Sua jornada para o mundo da programação inicia aqui.</h2>
            <Link to="/chat" className={styles.startbutton2}><p>Começar</p></Link>
          </div>
      </div>

      {/* <div className={styles.exampleContainer}>
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
              <strong className={styles.strongLi}>Descrição do problema:</strong> Desenvolva um código para verificar se um número é ímpar ou par<br/>
              <strong className={styles.strongLi}>Resultado:</strong> para o valor 2, o resultado esperado é par<br/>
              <strong className={styles.strongLi}>Material complementar:</strong> Curso Intensivo de Python - 3ª Edição: Uma Introdução Prática e Baseada em Projetos à Programação. (2023). (n.p.): Novatec Editora.
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
      </div> */}
      {/* <div className={styles.backgroundSession}>
        <div className={styles.sessionContent}>
        <h1 className={styles.sessionTitle}>Conteúdos Abordados</h1>
        </div>
      </div> */}
      <div className={styles.lastContainer}>
        <div className={styles.titleContainer}>
          <span>Confira também...</span>
          <h2>Conteúdos Abordados</h2>
        </div>
        <div className={styles.itens}>
          <div className={styles.componenteImagemTexto}>
            <div className={`${styles.imagemContainer} ${styles.image}`}>
              <img src={ConteudoVar} alt="Imagem" />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.textoContainer}>
                <h2>Variáveis</h2>
                <p>Como declarar variáveis e uso de atribuição de valores</p>
              </div>
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>01</h2>  
              </div>
            </div>
          </div>
          <div className={styles.componenteImagemTexto}>
            <div className={`${styles.imagemContainer} ${styles.image}`}>
              <img src={ConteudoArit} alt="Imagem" />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.textoContainer}>
                <h2>Expressão aritmética</h2>
                <p>Desenvolvimento de cálculos aritméticos</p>
              </div>
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>02</h2>  
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
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>03</h2>  
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
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>04</h2>  
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home