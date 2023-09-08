import React from 'react'
import { NavLink } from "react-router-dom"

// CSS
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className="h-[180px] flex items-center justify-center bg-[#edf3f6] dark:bg-[#02050c] dark:text-white">
      <div className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          Chat <span>Bot</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Contato
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.footerContent}>
        <h4>ChatBot educacional destinado para ensino de programação</h4>
        <p>ChatBot &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer