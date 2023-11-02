import React from 'react'
import { NavLink } from "react-router-dom"

// CSS
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.horizontalContent}>
        <div className={styles.row}>
          <div className={styles.footer_col}>
            <h4>Conta</h4>
            <ul>
              <li><a href="#">login</a></li>
              <li><a href="#">registrar</a></li>
              <li><a href="#">ajuda</a></li>
            </ul>
          </div>
          <div className={styles.footer_col}>
            <h4>Aprenda</h4>
            <ul>
              <li><a href="#">Exemplificação</a></li>
              <li><a href="#">Worked Examples</a></li>
              <li><a href="#">Conteúdos Abordados</a></li>
            </ul>
          </div>
          <div className={styles.footer_col}>
            <h4>Compania</h4>
            <ul>
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Time</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} StudyBot. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer