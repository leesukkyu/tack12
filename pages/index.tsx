import React, {useState, useEffect, useCallback} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {applySession} from 'next-session'
import {sessionConfig, helmetConfig} from '../config'
import MainLayout from '../components/layout/mainLayout'
import {Button} from '../components/ui'
import styles from './index.module.scss'
import classnames from 'classnames'
import {Transition} from 'react-transition-group'

const duration = 300

const Lnb = ({active}) => {
    return (
        <Transition in={active} timeout={duration} unmountOnExit>
            <div
                className={classnames({
                    [styles['lnb-wrap']]: true,
                    [styles['lnb-animation-fade']]: true,
                })}>
                <div className={styles['lnb-box']}>
                    <Transition in={active} timeout={duration} unmountOnExit>
                        {(state) => (
                            <div
                                className={classnames({
                                    [styles['lnb']]: true,
                                    [styles['lnb-animation-slide']]: true,
                                })}>
                                lnb
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        </Transition>
    )
}

const Home = ({views, name}) => {
    const [active, setActive] = useState(false)

    return (
        <MainLayout className={styles['index-page']}>
            <Head>
                <title>{helmetConfig.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles['header-wrap']}>
                <div className={styles['header-menu']}>
                    <Button
                        onClick={() => {
                            setActive(!active)
                        }}>
                        <i className="material-icons">menu</i>
                    </Button>
                </div>
                <div className={styles['header-logo']}>택</div>
                <div className={styles['header-add']}>
                    <i className="material-icons">add</i>
                </div>
            </div>

            <div className={styles['category-wrap']}>
                <ul className={`${styles['category-box']}`}>
                    <li className={styles['category-item']}>먹을거</li>
                    <li className={styles['category-item']}>입을거</li>
                    <li className={styles['category-item']}>신을거</li>
                </ul>
            </div>

            <div className={styles['user-tac-wrap']}>
                <ul className={styles['user-tac-box']}>
                    <li className={styles['user-tac-item']}>뱃지1</li>
                    <li className={styles['user-tac-item']}>뱃지2</li>
                </ul>
            </div>

            <main>
                <i className="material-icons">face</i>
                로그인 전 {views} {name} {process.env.NEXT_PUBLIC_ANALYTICS_ID}
            </main>

            <footer>footer</footer>
            <Lnb active={active}></Lnb>
        </MainLayout>
    )
}

export async function getServerSideProps({req, res}) {
    await applySession(req, res, sessionConfig)
    req.session.views = req.session.views ? req.session.views + 1 : 1
    req.session.name = '이석규'
    return {
        props: {
            views: req.session.views,
            name: req.session.name,
        },
    }
}

export default Home
