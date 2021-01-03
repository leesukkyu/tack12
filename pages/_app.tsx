import '@styles/globals.scss'
import '@styles/reset.scss'
import '@styles/animation.scss'
import '@styles/util.scss'

import {JS_CLIENT_ID} from '@config/kakao'
import React, {useEffect} from 'react'
import Head from 'next/head'
import {RecoilRoot} from 'recoil'
import {helmetConfig} from '@config/index'

function MyApp({Component, pageProps}) {
    console.log(JS_CLIENT_ID)

    useEffect(() => {
        window['Kakao'].init(JS_CLIENT_ID)
        window['Kakao'].isInitialized()
    }, [])

    return (
        <RecoilRoot>
            <Head>
                <title>{helmetConfig.title}</title>
                <link rel="icon" href="/favicon.ico" />
                <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
            </Head>
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default MyApp
