import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import styles from './PageError404.module.css'

function PageError404() {
    useEffect(() => {
        const container = document.getElementById(styles.container);
    
        const handleMouseMove = (e) => {
          const x = -e.clientX;
          const y = -e.clientY;
          container.style.backgroundPositionX = `${x}px`;
          container.style.backgroundPositionY = `${y}px`;
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);

    return (
    <div id={styles.container}>
        <div className={styles.content}>
            <h2>404</h2>
            <h4>Opps! Página não encontrada</h4>
            <p>A página que você estava procurando não existe; Você pode ter digitado o endereço errado ou a página pode ter sido movida</p>
            <NavLink to="/home">Voltar para Home</NavLink>
        </div>
    </div>
    )
}

export default PageError404