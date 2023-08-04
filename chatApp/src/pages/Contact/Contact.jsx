import { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactForm}>
        <h2>Contato</h2>
        <form >
            <label>
              <span>Nome: </span>
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
                placeholder='Digite sua mensagem aqui'
                required
              />
            </label>
          <button type="submit" className="btn">Enviar</button>
        </form>
      </div>
      <div className={styles.contactInfo}>
        <h1>DADOS DE CONTATO</h1>
        <p>
          <span>Av. Tiaraju, 810</span>
          <br />
          <span>Ibirapuitã, Alegrete - RS</span>
          <br />
          <span>97546-550</span>
        </p>
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