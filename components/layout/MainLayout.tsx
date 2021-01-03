import React from 'react'
import classnames from 'classnames'
import styles from './mainLayout.module.scss'
import MaxWidthLayout from './MaxWidthLayout'

interface IMainLayout {
    className?: string
    children: JSX.Element | JSX.Element[]
    maxWidth?: boolean
}

const mainLayout = ({className, children, maxWidth}: IMainLayout) => {
    return (
        <div
            id="__main"
            style={{}}
            className={classnames(
                {
                    [className]: className,
                },
                styles['main-layout-wrap'],
            )}>
            {maxWidth ? <MaxWidthLayout>{children}</MaxWidthLayout> : children}
        </div>
    )
}

export default mainLayout
