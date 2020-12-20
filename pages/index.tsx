import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import {applySession} from 'next-session'
import {sessionConfig, helmetConfig} from '../config'

function Home({views, name}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{helmetConfig.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <i className="material-icons">face</i>
                로그인 전 {views} {name} {process.env.NEXT_PUBLIC_ANALYTICS_ID}
            </main>

            <footer className={styles.footer}>footer</footer>
        </div>
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
