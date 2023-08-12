import React from 'react'
import PropTypes from 'prop-types';
import styles from './Button.module.css'

const Button = ({children}) => {
  return (
    // <button className={styles.button} type="submit">Enviar</button>
    <button className={styles.button}>{children}</button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;