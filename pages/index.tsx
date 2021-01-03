import React from 'react'
import {applySession} from 'next-session'
import {sessionConfig} from '@config/index'
import Layout, {isLoginSelector} from '@components/layout/Layout'
import styles from './index.module.scss'
import {useRecoilValue} from 'recoil'

const Home = ({session}) => {
    const isLogin = useRecoilValue(isLoginSelector)

    return (
        <Layout session={session}>
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
        </Layout>
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
