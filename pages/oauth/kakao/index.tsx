import React from 'react'
import axios from 'axios'
import qs from 'qs'
import {KAKAO_OAUTH_URL, REST_CLIENT_ID, REDIRECT_URI, CLIENT_SECRET} from '../../../config/kakao'

const index = () => {
    console.log('xxx')
    return <div>kakao login</div>
}

export async function getServerSideProps({req, res, query}) {
    if (query && query.code) {
        try {
            const token = await axios.post(
                KAKAO_OAUTH_URL,
                qs.stringify({
                    grant_type: 'authorization_code',
                    client_id: REST_CLIENT_ID,
                    redirect_uri: REDIRECT_URI,
                    code: query.code,
                    client_secret: CLIENT_SECRET,
                }),
            )
            console.log(token)
        } catch (error) {
            console.log(error)
        }
    }
    return {
        props: {},
    }
}

export default index
