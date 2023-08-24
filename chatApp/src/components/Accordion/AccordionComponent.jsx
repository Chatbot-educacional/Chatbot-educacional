import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "./Accordion.module.css";
import ConteudoArit from '../../assets/codeArit.png';
import ConteudoCond from '../../assets/codeCond.png';
import ConteudoLaco from '../../assets/codeRep.png';
import ConteudoVar from '../../assets/codeVar.png';
const AccordionComponent = () => {
  return (
    <div className={styles.Accordions}>

{/* <div className={styles.componenteImagemTexto}>
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ConteudoVar} alt="Imagem" />
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
        </div> */}

        <div className={styles.AccordionVar}>
        <Accordion className={`${styles.componenteImagemTexto} ${styles.roundedAccordion}`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="pannela-content" id="panel4-header">
            <div className={`${styles.imagemContainer} ${styles.image}`}>
              <img src={ConteudoVar} alt="Imagem" />
            </div>
            <div className={styles.infoContainer}>
              <Typography className={styles.textoContainer} variant="h2">Variáveis</Typography>
              <Typography className={styles.textoContainer} variant="body1">Como declarar variáveis e uso de atribuição de valores</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Conteúdo expandido das variáveis.
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>








        <Accordion className={`${styles.componenteImagemTexto} ${styles.roundedAccordion}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ConteudoArit} alt="Imagem" />
          </div>
          <div className={styles.infoContainer}>
            <Typography className={styles.textoContainer} variant="h2">Expressão aritméticas</Typography>
            <Typography className={styles.textoContainer} variant="body1">Desenvolvimento de cálculos aritméticos</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Conteúdo expandido da expressão aritmética.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={`${styles.componenteImagemTexto} ${styles.roundedAccordion}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ConteudoCond} alt="Imagem" />
          </div>
          <div className={styles.infoContainer}>
            <Typography className={styles.textoContainer} variant="h2">Estruturas condicionais</Typography>
            <Typography className={styles.textoContainer} variant="body1">Uso de estruturas para definição de caminho condicionais</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Conteúdo expandido das estruturas condicionais.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion className={`${styles.componenteImagemTexto} ${styles.roundedAccordion}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
          <div className={`${styles.imagemContainer} ${styles.image}`}>
            <img src={ConteudoLaco} alt="Imagem" />
          </div>
          <div className={styles.infoContainer}>
            <Typography className={styles.textoContainer} variant="h2">Laços de repetição</Typography>
            <Typography className={styles.textoContainer} variant="body1">Aplicação de laços para execução de uma ou mais vezes determinados trechos de código</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Conteúdo expandido dos laços de repetição.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
