import '@styles/globals.scss'
import '@styles/reset.scss'
import '@styles/animation.scss'
import '@styles/util.scss'
import 'material-design-icons/iconfont/material-icons.css'
import {JS_CLIENT_ID} from '@config/kakao'
import React, {useEffect} from 'react'
import Head from 'next/head'
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from 'recoil'

function MyApp({Component, pageProps}) {
    console.log(JS_CLIENT_ID)

    useEffect(() => {
        window['Kakao'].init(JS_CLIENT_ID)
        window['Kakao'].isInitialized()
    }, [])

    return (
        <RecoilRoot>
            <Head>
                <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
            </Head>
            <Component {...pageProps} />
        </RecoilRoot>
    )
}

export default MyApp
