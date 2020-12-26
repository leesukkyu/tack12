import React from 'react'
import styles from './button.module.scss'
interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button = (props: ButtonProps) => {
    const {children} = props
    return (
        <button {...props} className={styles['button-comp']}>
            {children}
        </button>
    )
}

export default Button
