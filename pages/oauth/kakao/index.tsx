import React from 'react'
import http from '@lib/http'
import qs from 'qs'
import {KAKAO_OAUTH_URL, KAKAO_OAUTH_USER_URL, REST_CLIENT_ID, REDIRECT_URI, CLIENT_SECRET} from '@config/kakao'
import {applySession} from 'next-session'
import {sessionConfig} from '@config/index'
import {ServerSideProps} from '@types'

const index = () => {
    return <div>kakao login</div>
}

const getAccessToken = (code) => {
    return http.post(
        KAKAO_OAUTH_URL,
        qs.stringify({
            grant_type: 'authorization_code',
            client_id: REST_CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            code,
            client_secret: CLIENT_SECRET,
        }),
    )
}

const getUserInfo = (accessToken) => {
    return http.get(KAKAO_OAUTH_USER_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

export async function getServerSideProps({req, res, query}: ServerSideProps) {
    await applySession(req, res, sessionConfig)
    if (query && query.code) {
        try {
            const {data: oauth} = await getAccessToken(query.code)
            const {data: user} = await getUserInfo(oauth.accessToken)
            req.session.oauth = {
                accessToken: oauth.accessToken,
                refreshToken: oauth.refreshToken,
                expiresIn: oauth.expiresIn,
                refreshTokenExpiresIn: oauth.refreshTokenExpiresIn,
            }
            req.session.user = {
                id: `kakao_${user.id}`,
                name: user.properties.nickname,
                profileImage: user.properties.profileImage,
                email: user.kakaoAccount.email,
                ageRange: user.kakaoAccount.ageRange,
                gender: user.kakaoAccount.gender,
                userType: 'kakao',
            }
        } catch (error) {}
    }

    res.writeHead(302, {Location: '/'}).end()

    return {
        props: {},
    }
}

export default index
