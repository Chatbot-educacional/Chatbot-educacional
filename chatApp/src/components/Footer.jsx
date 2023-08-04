import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <h3>ChatBot educacional destinado para ensino de programação</h3>
        <p>ChatBot &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer