import React from 'react'
import styles from './button.module.scss'
import classnames from 'classnames'
interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: boolean
}

const Button = (props: ButtonProps) => {
    const {children, className, icon, ...rest} = props
    console.log(icon)
    return (
        <button
            {...rest}
            className={classnames({
                [className]: className,
                [styles['button-comp']]: true,
                [styles['icon']]: icon,
            })}>
            {children}
        </button>
    )
}

export default Button
