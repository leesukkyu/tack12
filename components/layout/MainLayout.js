import React from 'react'
import styles from './mainLayout.module.scss'
import classnames from 'classnames'

const mainLayout = ({className, children}) => {
    return (
        <div
            id="__main"
            className={classnames(
                {
                    [className]: className,
                },
                styles['main-layout-wrap'],
            )}>
            {children}
        </div>
    )
}

export default mainLayout
