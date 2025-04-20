import React from "react";
import styles from "./Researchers.module.css";
import { FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
// Importe as imagens dos pesquisadores
import imgPesquisador1 from "./Andre.jpeg"; // Substitua pelo caminho correto da imagem
import imgPesquisador3 from "./joao.png"; // Substitua pelo caminho correto da imagem
import imgPesquisador4 from "./renato.png"; // Substitua pelo caminho correto da imagem
import imgPesquisador2 from "./balda.jpeg"; // Substitua pelo caminho correto da imagem
import imgPesquisador5 from "./will.png"; // Substitua pelo caminho correto da imagem
import imgPesquisador6 from "./Pedro.jpeg"; // Substitua pelo caminho correto da imagem
// Adicione os demais caminhos para as imagens dos outros pesquisadores

const researchersData = [
  {
    name: "André L M Miranda",
    description: "Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA. ",
    img: imgPesquisador1,
  },
  {
    name: "João Emilio Antonio Villa",
    description: "Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA.",
    img: imgPesquisador3,
  },
  {
    name: "Mateus Balda",
    description: "Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA.",
    img: imgPesquisador2,
  },
  {
    name: "Pedro Henrique Dias Valle",
    description: "Professor do Departamento de Ciência da Computação (DCC) da Universidade Federal de Juiz de Fora (UFJF) e atua como Docente Permanente no Programa de Pós-Graduação em Informática (PPGI) da Universidade Tecnológica Federal do Paraná (UTFPR), campus Cornélio Procópio.",
    img: imgPesquisador6,
  },
  {
    name: "Renato de Souza Garcia",
    description: "Estudante do Programa de Pós-Graduação em Engenharia de Software (PPGES) na universidade de Federal do Pampa - UNIPAMPA.",
    img: imgPesquisador4,
  },
  {
    name: "Williamson Alison Freitas Silva",
    description: "Professor adjunto na Universidade Federal do Pampa (UNIPAMPA) e membro do Programa Pós-Graduação em Engenharia de Software (PPGES-UNIPAMPA).",
    img: imgPesquisador5,
  },
];


const verifyIfHasGithub = (researcher) => {
  if (researcher.github) {
    return <p> <FaGithub /> {researcher.github}</p>
  }

}
const verifyIfHasEmail = (researcher) => {
  if (researcher.email) {
    return <p> <FaEnvelope /> {researcher.email}</p>
  }

}




const Researchers = () => {
  const chunkedResearchers = chunkArray(researchersData, 2);

  return (
    <div className={styles.container}>
      <h1>Pesquisadores</h1>
      {/* <p>Os pesquisadores são:</p> */}
      <div className={styles.researcherContainer}>
        {chunkedResearchers.map((researcherGroup, groupIndex) => (
          <div key={groupIndex} className={styles.researcherGroup}>
            {researcherGroup.map((researcher, index) => (
              <div key={index} className={styles.researcher}>
                <div className={styles.researcherNameAndPic}>
                  <div className={styles.researcherImage}>
                    <img className={styles.img} src={researcher.img} alt={`${researcher.name} - Foto`} />
                  </div>
                  <div className={styles.researcherName}>
                    <h2>{researcher.name}</h2>
                  </div>
                </div>
                <div className={styles.researcherDescription}>
                  <p>{researcher.description}</p>

                  <div className={researcher.contact}>
                    {verifyIfHasEmail(researcher)}
                    {verifyIfHasGithub(researcher)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Função para dividir o array de pesquisadores em grupos de tamanho específico
function chunkArray(arr, chunkSize) {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArr.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArr;
}


export default Researchers;