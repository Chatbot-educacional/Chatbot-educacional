import { useState } from 'react';
import styles from './Contact.module.css';
import Button from '../../components/form/Button';
import contactImage from '../../assets/contact_image3.svg';

// import Input from '../../components/form/Input';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <div className={styles.contactContainer}>
      <div className={styles.topContainer}>
        <span>
          <p>Envie-nos um email</p>
        </span>
          <p>Para informar bugs ou sugestões</p>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.contactForm}>
          <h2>Contato</h2>
          <form >
              <label>
                <span>Nome: </span>
                {/* <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Nome Completo"
                /> */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Nome completo'
                  required
                />
              </label>
              <label>
                <span>E-mail: </span> 
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='E-mail para contato'
                  required
                />
              </label>
              <label>
                <span>Mensagem: </span>
                <textarea
                  id="message"
                  name="message"
                  placeholder='Digite sua mensagem aqui...'
                  required
                />
              </label>
            <Button>
              Enviar
            </Button>
          </form>
        </div>
          <div className={styles.imageContact}>
                <img src={contactImage} alt="Um celular e duas pessoas, demonstrando o ato de comunicação um com o outro."></img>
          </div>
      </div>
      <div className={styles.arrow}></div>
        <div className={styles.contactInfo}>
          <h1>DADOS DE CONTATO</h1>
          <p>
            <span>Av. Tiaraju, 810</span>
            <br />
            <span>Ibirapuitã, Alegrete - RS</span>
            <br />
            <span>97546-550</span>
          </p>
          <br></br>
            <h3>Integrantes</h3>
          <ul>
            <li>andremiranda.aluno@unipampa.edu.br</li>
            <li>joaovilla.aluno@unipampa.edu.br</li>
            <li>renatogarcia.aluno@unipampa.edu.br</li>
            <li>mateusmota.aluno@unipampa.edu.br</li>
          </ul>
        </div>
    </div>
  )
}

export default Contact