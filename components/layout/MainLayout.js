import React from 'react'
import styles from './mainLayout.module.scss'

const mainLayout = ({children}) => {
    return <div className={styles['main-layout-wrap']}>{children}</div>
}

export default mainLayout
