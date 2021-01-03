import React, {useState, useRef, useEffect} from 'react'
import Router from 'next/router'
import MainLayout from '@components/layout/MainLayout'
import MaxWidthLayout from '@components/layout/MaxWidthLayout'
import {Button} from '@components/ui'
import styles from './layout.module.scss'
import {CSSTransition} from 'react-transition-group'
import Image from 'next/image'
import http from '@lib/http'
import {atom, selector, useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil'
import {IUser} from '@types'
import {MenuOutlined, AppstoreAddOutlined} from '@ant-design/icons'

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

export const isLoginSelector = selector({
    key: 'isLogin',
    get: ({get}) => !!get(userAtom)?.id,
})

const Lnb = ({active, setActive}) => {
    const $lnb = useRef(null)
    const [user, setUser] = useRecoilState(userAtom)
    const isLogin = useRecoilValue(isLoginSelector)

    return (
        <>
            <CSSTransition in={active} timeout={350} classNames={`${styles['lnb-box-dim']} lnb-fade`} unmountOnExit>
                <div
                    className={styles['lnb-box-dim']}
                    onClick={(e) => {
                        e.stopPropagation()
                        setActive(false)
                    }}></div>
            </CSSTransition>
            <CSSTransition in={active} timeout={350} classNames={`${styles['lnb-box']} lnb-slide`} unmountOnExit>
                <div
                    ref={$lnb}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}>
                    <div>
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
                </div>
            </CSSTransition>
        </>
    )
}

const Layout = ({session, children}) => {
    const [active, setActive] = useState(false)

    const setUserAtom = useSetRecoilState(userAtom)

    const isLogin = useRecoilValue(isLoginSelector)

    useEffect(() => {
        console.log(session.user)
        setUserAtom(session.user)
    }, [])

    return (
        <MainLayout className={styles['layout-wrap']}>
            <MaxWidthLayout className={styles['header-wrap']}>
                <div className={styles['header-box']}>
                    <div className={styles['header-menu']}>
                        <Button
                            onClick={() => {
                                setActive(!active)
                            }}>
                            <MenuOutlined />
                        </Button>
                    </div>
                    <div className={styles['header-logo']}>택2</div>
                    <div className={styles['header-add']}>
                        <Button
                            onClick={() => {
                                if (isLogin) {
                                    Router.push('/add')
                                } else {
                                    Router.push('/login')
                                }
                            }}>
                            <AppstoreAddOutlined />
                        </Button>
                    </div>
                </div>
            </MaxWidthLayout>
            <MaxWidthLayout className={styles['content-wrap']}>
                <div className={styles['content-box']}>{children}</div>
                <Lnb active={active} setActive={setActive}></Lnb>
            </MaxWidthLayout>
        </MainLayout>
    )
}

export default Layout
