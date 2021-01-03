import React from 'react'
import {Row, Col} from 'antd'
import classnames from 'classnames'
import styles from './maxWidthLayout.module.scss'

interface IMaxWidthLayout {
    className?: string
    children: JSX.Element | JSX.Element[]
}

const MaxWidthLayout = ({className, children}: IMaxWidthLayout) => {
    return (
        <Row
            justify="center"
            className={classnames(
                {
                    [className]: className,
                },
                styles['max-width-layout-wrap'],
            )}>
            <Col xs={24} sm={22} md={14} className={styles['max-width-layout-box']}>
                {children}
            </Col>
        </Row>
    )
}

export default MaxWidthLayout
