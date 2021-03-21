import React from 'react'
import classnames from 'classnames'
import styles from './button.module.scss'

const Button = ({ children, primary,secondary,type,disabled,onClick}) => {
  const buttonClass = classnames({
    primary,
    secondary
  })
  return <button className={styles[buttonClass]} onClick={onClick} type={type} disabled={disabled} >{children}</button>
}
export default Button
