// Imports
// eslint-disable-next-line no-unused-vars
// import React from 'react';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";

// import { IonIcon } from '@ionic/react';
// import ScrollReveal from "scrollreveal";
// import Fade from 'react-reveal/Fade';
// import Button from '../../components/form/Button';

// Images
import ConteudoVar from '../../assets/codeVar3.png';
import ConteudoArit from '../../assets/codeArit2.png';
import ConteudoCond from '../../assets/codeCond2.png';
import ConteudoLaco from '../../assets/codeRep2.png';
import HomeFormImage from '../../assets/home_bg_form.png';

// CSS
import styles from './Home.module.css'; 

const Home = () => {

  useEffect(()=> {
    AOS.init();
    AOS.refresh();
  }, [])

  return (
    <div className={styles.homeContainer}>
      <div className={styles.home_image}>
          <img src={HomeFormImage} alt="Forma para estilização"/>
          <img className={styles.home_image2} src={HomeFormImage} alt="Forma para estilização2"/>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title} data-aos="zoom-out" data-aos-duration="1500">CoderBot</h1>
        <p className={styles.description} data-aos="zoom-out" data-aos-duration="1500" data-aos-delay="250">Desperte o potencial dos programadores do futuro com o WeBot - <span>A chave para o sucesso.</span></p>
        <Link to="/chat" className={styles.startButton} data-aos="zoom-out" data-aos-duration="1500" data-aos-delay="350">Iniciar</Link>
      </div>

      <div className={styles.sub_content}>
          <h2>Aqui você vai...</h2>
          <div className={styles.texts}>
            <h1>
              <span data-aos="fade-up" data-aos-duration="1500" data-aos-anchorPlacement="center-center">Conhecer</span>
              <span data-aos="fade-up" data-aos-duration="1500" data-aos-anchorPlacement="center-center">Aprender</span>
              <span className={styles.spantext} data-aos="fade-up" data-aos-duration="1500" data-aos-anchorPlacement="center-center">Desenvolver</span>
            </h1>
          </div>
          <div className={styles.texts_button}>
            <h2 data-aos="fade-up" data-aos-duration="800">Sua jornada para o mundo da programação inicia aqui.</h2>
            <Link to="/chat" className={styles.startbutton2} data-aos="fade-up" data-aos-duration="800" data-aos-delay="200"><p>Começar</p></Link>
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
          <div className={styles.componenteImagemTexto} data-aos="fade-up" data-aos-duration="1000">
            <div className={`${styles.imagemContainer} ${styles.image}`}>
              <img src={ConteudoVar} alt="Imagem" />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.itemTitle}><h2>Variáveis</h2></div>
                <div className={styles.itemDesc}><p>Como declarar variáveis e uso de atribuição de valores</p></div>
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>01</h2>  
              </div>
            </div>
          </div>
          <div className={styles.componenteImagemTexto} data-aos="fade-up" data-aos-duration="1000">
            <div className={`${styles.imagemContainer} ${styles.image}`}>
              <img src={ConteudoArit} alt="Imagem" />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.itemTitle}><h2>Expressão aritmética</h2></div>
                <div className={styles.itemDesc}><p>Desenvolvimento de cálculos aritméticos</p></div>
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>02</h2>  
              </div>
            </div>
          </div>
          <div className={styles.componenteImagemTexto} data-aos="fade-up" data-aos-duration="1000">
            <div className={`${styles.imagemContainer} ${styles.image}`}>
              <img src={ConteudoCond} alt="Imagem" />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.itemTitle}><h2>Estruturas condicionais</h2></div>
                <div className={styles.itemDesc}><p>Uso de estruturas para definição de caminho condicionais</p></div>
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>03</h2>  
              </div>
            </div>
          </div>
          <div className={styles.componenteImagemTexto} data-aos="fade-up" data-aos-duration="1000">
            <div className={`${styles.imagemContainer} ${styles.image}`}>
              <img src={ConteudoLaco} alt="Imagem" />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.itemTitle}><h2>Laços de repetição</h2></div>
                <div className={styles.itemDesc}><p>Aplicação de laços para execução de uma ou mais vezes determinados trechos de código</p></div>
            </div>
            <div className={styles.numeroContainer}>
              <div className={styles.circle_num}>
                <h2>04</h2>  
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.finalContainer}>
        <div className={styles.contentTexts}>
          <div className={styles.primaryText}>
            <h2>VEM APRENDER COM A GENTE</h2>
            <h2>CoderBot 2023©</h2>
          </div>
          <div className={styles.secondText}>
            <h2>
              <span data-aos="zoom-out" data-aos-duration="1500" data-aos-anchorPlacement="center-center">Entre</span> <br></br>
              <span data-aos="zoom-out" data-aos-duration="1500" data-aos-anchorPlacement="center-center">Treine</span> <br></br>
              <span data-aos="zoom-out" data-aos-duration="1500" data-aos-anchorPlacement="center-center">Junte-se</span>
            </h2>
          </div>
          <Link to="/chat" className={styles.circleBottom}>
            <div className={styles.iconOnBottom} data-aos="fade-right" data-aos-duration="1000">
              <svg><FaArrowRight/></svg>
            </div>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home