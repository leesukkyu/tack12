import React, {useState, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {applySession} from 'next-session'
import {sessionConfig, helmetConfig} from '@config/index'
import MainLayout from '@components/layout/mainLayout'
import {Button} from '@components/ui'
import styles from './index.module.scss'
import {CSSTransition} from 'react-transition-group'
import Image from 'next/image'
import http from '@lib/http'

const Lnb = ({active, setActive}) => {
    const $lnb = useRef(null)
    return (
        <CSSTransition in={active} timeout={350} classNames="fade" unmountOnExit>
            <div
                className={styles['lnb-wrap']}
                onClick={(e) => {
                    setActive(false)
                }}>
                <div className={styles['lnb-box']}>
                    <CSSTransition in={active} timeout={350} classNames="lnb-slide" unmountOnExit>
                        <div
                            ref={$lnb}
                            className={styles['lnb']}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}>
                            <div className={styles['join-wrap']}>
                                <div>
                                    <Button
                                        onClick={() => {
                                            window['Kakao'].Auth.authorize({
                                                redirectUri: 'http://localhost:3000/oauth/kakao',
                                            })
                                        }}>
                                        <Image src="/kakao_login.png" alt="me" width="183" height="45"></Image>
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <Button
                                        onClick={async () => {
                                            const res = await http.post('/api/oauth/logout')
                                            console.log(res)
                                        }}>
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </CSSTransition>
    )
}

const Home = ({session: {user, isLogin}}) => {
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
                <div className={styles['header-logo']}>택2</div>
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
                로그인 전
            </main>

            <footer>footer</footer>
            <Lnb active={active} setActive={setActive}></Lnb>
        </MainLayout>
    )
}

export async function getServerSideProps({req, res}) {
    await applySession(req, res, sessionConfig)
    return {
        props: {
            session: {
                user: req.session?.user,
                isLogin: !!req.session?.user,
            },
        },
    }
}

export default Home
