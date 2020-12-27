import React, {useState, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {applySession} from 'next-session'
import {sessionConfig, helmetConfig} from '../config'
import MainLayout from '../components/layout/mainLayout'
import {Button} from '../components/ui'
import styles from './index.module.scss'
import {CSSTransition} from 'react-transition-group'
import Image from 'next/image'

const Lnb = ({active, setActive}) => {
    const $lnbWrap = useRef(null)
    return (
        <CSSTransition in={active} timeout={350} classNames="fade" unmountOnExit>
            <div
                ref={$lnbWrap}
                className={styles['lnb-wrap']}
                onClick={(e) => {
                    if (e.target === $lnbWrap.current) {
                        setActive(false)
                    }
                }}>
                <div className={styles['lnb-box']}>
                    <CSSTransition in={active} timeout={350} classNames="slide" unmountOnExit>
                        <div className={styles['lnb']}>
                            <div className={styles['join-wrap']}>
                                <div>
                                    <div className={styles['join-btn-box']}>
                                        <Button className={styles['join-btn']} title="회원가입" icon>
                                            <i className="material-icons">person_add</i>
                                            <span>회원가입</span>
                                        </Button>
                                    </div>
                                    <div>로그인</div>
                                </div>
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
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </CSSTransition>
    )
}

const Home = ({views, name}) => {
    const [active, setActive] = useState(false)
    console.log(process.env.NEXT_PUBLIC_PROCESS)
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
                로그인 전 {views} {name}
            </main>

            <footer>footer</footer>
            <Lnb active={active} setActive={setActive}></Lnb>
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
