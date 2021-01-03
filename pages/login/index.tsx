import React from 'react'
import styles from './login.module.scss'
import MainLayout from '@components/layout/mainLayout'
import {Button} from '@components/ui'
import Image from 'next/image'

const Login = () => {
    return (
        <MainLayout className={styles['login-page']} maxWidth>
            <Button
                onClick={() => {
                    window['Kakao'].Auth.authorize({
                        redirectUri: 'http://localhost:3000/oauth/kakao',
                    })
                }}>
                <Image src="/kakao_login.png" alt="me" width="183" height="45"></Image>
            </Button>
        </MainLayout>
    )
}

export default Login
