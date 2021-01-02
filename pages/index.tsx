import React, {useState, useRef, useEffect, useCallback} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import {applySession} from 'next-session'
import {sessionConfig, helmetConfig} from '@config/index'
import MainLayout from '@components/layout/mainLayout'
import {Button} from '@components/ui'
import styles from './index.module.scss'
import {CSSTransition} from 'react-transition-group'
import Image from 'next/image'
import http from '@lib/http'
import {atom, selector, useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil'
import {IUser} from '@types'

const userAtom = atom<IUser>({
    key: 'user',
    default: {
        id: '',
        name: '',
        profileImage: '',
        email: '',
        ageRange: '',
        gender: '',
        userType: 'kakao',
    },
})

const isLoginSelector = selector({
    key: 'isLogin',
    get: ({get}) => !!get(userAtom).id,
})

const Lnb = ({active}) => {
    const $lnb = useRef(null)
    const [user, setUser] = useRecoilState(userAtom)
    const isLogin = useRecoilValue(isLoginSelector)

    return (
        <>
            {active ? <div className={styles['lnb-box-dim']}></div> : null}
            <CSSTransition in={active} timeout={350} classNames={`${styles['lnb-box']} lnb-slide`} unmountOnExit>
                <div
                    ref={$lnb}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}>
                    {isLogin ? (
                        <div>
                            <div>
                                <Button
                                    onClick={async () => {
                                        const res = await http.post('/api/oauth/logout')
                                        setUser({
                                            id: '',
                                            name: '',
                                            profileImage: '',
                                            email: '',
                                            ageRange: '',
                                            gender: '',
                                            userType: '',
                                        })
                                    }}>
                                    Logout
                                </Button>
                            </div>
                            <div>{user.name}</div>
                            <div>{user.userType}</div>
                        </div>
                    ) : (
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
                    )}
                </div>
            </CSSTransition>
        </>
    )
}

const Home = ({session}) => {
    const [active, setActive] = useState(false)

    const setUserAtom = useSetRecoilState(userAtom)

    const isLogin = useRecoilValue(isLoginSelector)

    useEffect(() => {
        setUserAtom(session.user)
    }, [])

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
                    <Button
                        onClick={() => {
                            if (isLogin) {
                                alert('추가')
                            } else {
                                Router.push('/login')
                            }
                        }}>
                        <i className="material-icons">add</i>
                    </Button>
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
                로그인 {isLogin ? '후' : '전'}
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
                user: req.session?.user ? req.session.user : {},
            },
        },
    }
}

export default Home
