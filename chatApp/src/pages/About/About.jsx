// CSS
import styles from './About.module.css'; 

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>Sobre o Chatbot CoderBot</h1>
      <p>Bem-vindo ao chatbot CoderBot! O CoderBot tempo por objetivo aplicar o uso de Aprendizagem Baseada em Exempplos (métodologia ativa)  no apoio à aprendizagem de programação</p>
      <p>Por meio de exemplos construidos com apoio e adaptação de um template realizado pelo estudo <strong>"<a href="">Projeto e Avaliação de um Template de Worked Exemplos para o Ensino de Programação</a>"</strong>,  o chatbot fornece um apoio e feedback quase instantâneo para as dúvidas de iniciantes em programação.</p>
      <h2>Exemplos Corretos e Incorretos</h2>
      <p>Diante do pressuposto que a habilidade de resolução de problemas se dá pela formação de mapas mentais, conhecer exemplos corretos e incorretos auxilia o aprendiz a possuir um <i>background</i> mais completo para definir seus modelos mentais.</p>
      <h2>O que você vai aprender aqui?</h2>
      <p>Atualmente o projeto se encontra em desenvolvimento (pesquisa), sendo realizado por pesquisadores de pós graduação e graduação, sob orientação dos docentes responsáveis. O intuito é criar uma base de exemplos com conteúdos que apoie os passos de iniciantes em programação nos mais diversos conteúdos, tais como, variáveis, constantes, estruturas condicionais, laços de repetição, matrizes, estruturas, funções, dentre varios outros assuntos.</p>
      <h2>Como usar o chatbot?</h2>
      <p>Basta acessar o link chat disponibilizada na barra de navegação no topo desse website, a partir de lá o CoderBot irá te orientar a selecionar os botões que pode utilizar para obter os conhecimentos desejados.</p>
      <h2>Feedback a qualquer momento e quando precisar</h2>
      <p>Por se tratar de um sistema web, uma das principais vantagens de utilização é a possibilidade de acessar de um navegador de internet em qualquer lugar que você esteja, podendo ter a flexibilidade de acesso de acordo o horário do aprendiz.</p>
      <p>Estamos animados para apoiar sua jornada de aprendizado em programação e esperamos que você aproveite ao máximo o auxílio de nossa ferramenta.</p>
      <p>Bons estudos! O CoderBot lhe aguarda... Vamos aos códigos!</p>
    </div>
  )
}

export default About
