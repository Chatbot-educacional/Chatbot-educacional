// Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Images
import ExemCorreto from '../../assets/example.jpg';

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
        <div className={styles.exampleImages}>
          <div className={styles.example}>
            <img src={ExemCorreto} alt="Exemplo Correto" className={styles.exampleImage} />
            <h2 className={styles.exampleTitle}>Exemplo Correto</h2>
            <p className={styles.exampleDescription}>This is a description</p>
          </div>

          <div className={styles.example}>
            <img src={ExemCorreto} alt="Exemplo Incorreto" className={styles.exampleImage} />
            <h2 className={styles.exampleTitle}>Exemplo Incorreto</h2>
            <p className={styles.exampleDescription}>This is a description</p>
          </div>
        </div>
      </div>
      <div className={styles.backgroundSession}>
        <div className={styles.sessionContent}>
        <h1 className={styles.sessionTitle}>Sessão sobre conteúdos <br/>Abordados   ?</h1>
        </div>
      </div>
      <div className={styles.componenteImagemTexto}>
        <div className={`${styles.imagemContainer} ${styles.image}`}>
          <img src={ExemCorreto} alt="Imagem" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.textoContainer}>
            <h2>Variáveis</h2>
            <p>Como declarar variáveis e uso de atribuição de valores</p>
          </div>
          <div className={styles.numeroContainer}>
            <span>01</span>
          </div>
        </div>
      </div>
      <div className={styles.componenteImagemTexto}>
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
      </div>
      <div className={styles.componenteImagemTexto}>
        <div className={`${styles.imagemContainer} ${styles.image}`}>
          <img src={ExemCorreto} alt="Imagem" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.textoContainer}>
            <h2>Expressão aritméticas</h2>
            <p>desenvolvimento de cálculos aritméticos</p>
          </div>
          <div className={styles.numeroContainer}>
            <span>03</span>
          </div>
        </div>
      </div>
      <div className={styles.componenteImagemTexto}>
        <div className={`${styles.imagemContainer} ${styles.image}`}>
          <img src={ExemCorreto} alt="Imagem" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.textoContainer}>
            <h2>Estruturas condicionais</h2>
            <p>Uso de estruturas para definição de caminho condicionais</p>
          </div>
          <div className={styles.numeroContainer}>
            <span>04</span>
          </div>
        </div>
      </div>
      <div className={styles.componenteImagemTexto}>
        <div className={`${styles.imagemContainer} ${styles.image}`}>
          <img src={ExemCorreto} alt="Imagem" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.textoContainer}>
            <h2>Laços de repetição</h2>
            <p>aplicação de laços para execução de uma ou mais vezes determinadas trechos de código</p>
          </div>
          <div className={styles.numeroContainer}>
            <span>05</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home