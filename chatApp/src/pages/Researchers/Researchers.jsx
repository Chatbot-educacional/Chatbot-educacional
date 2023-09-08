import React from "react";
// import styles from "./Researchers.module.css";
import { FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
// Importe as imagens dos pesquisadores
import imgPesquisador1 from "./Andre.jpeg"; // Substitua pelo caminho correto da imagem
import imgPesquisador3 from "./joao.png"; // Substitua pelo caminho correto da imagem
import imgPesquisador4 from "./renato.png"; // Substitua pelo caminho correto da imagem
import imgPesquisador2 from "./mateus.png"; // Substitua pelo caminho correto da imagem
import imgPesquisador5 from "./will.png"; // Substitua pelo caminho correto da imagem
// Adicione os demais caminhos para as imagens dos outros pesquisadores

const researchersData = [
  {
    name: "André L M Miranda",
    description: "Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA. ",
    email: "andremendes0113@gmail.com",
    github:"Mendes113",
    img: imgPesquisador1,
  },
  {
    name: "João ",
    description: "Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA.",
    img: imgPesquisador3,
  },
  {
    name: "Mateus Balda",
    description: "Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA.",
    img: imgPesquisador2,
  },
  {
    name: "Renato",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgPesquisador4,
  },
  {
    name: "Williamson Silva",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: imgPesquisador5,
  },
];


const verifyIfHasGithub = (researcher) => {
    if(researcher.github){
        return <p ><div className="ml-24 -mb-4 text-lg"><FaGithub /></div>   {researcher.github}</p>
    }

}
const verifyIfHasEmail = (researcher) => {
  if(researcher.email){
      return <p> <div className="ml-4 -mb-4 text-lg">  <FaEnvelope /> </div> {researcher.email}</p>
  }

}


// .researcherName {
//   font-size: 20px;
//   font-weight: bold;
//   margin-top: 10px;
// }


const Researchers = () => {
    const chunkedResearchers = chunkArray(researchersData, 2);
  
    return (
      <div className="text-center p-5 dark:bg-black">
        <h1>Pesquisadores</h1>
        {/* <p>Os pesquisadores são:</p> */}
        
        <div className="flex justify-center flex-wrap gap-5 ml-auto mr-auto max-w-1200">
          {chunkedResearchers.map((researcherGroup, groupIndex) => (
            <div key={groupIndex} >
              {researcherGroup.map((researcher, index) => (
               <div key={index} className="flex flex-col bg-purple-50 rounded-lg p-5 flex-1 w-96 h-96 mt-8 my-10 mx-auto dark:bg-slate-950">
                  <div className={"flex flex-col items-center"}>
                    <div >
                      <img className="w-40  h-40 rounded-full object-cover mb-2" src={researcher.img} alt={`${researcher.name} - Foto`} />
                    </div>
                    <div className="font-bold text-lg mt-2">
                      <h2>{researcher.name}</h2>
                    </div>
                  </div>
                  <div >
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
