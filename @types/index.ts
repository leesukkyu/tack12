import {IncomingMessage, ServerResponse} from 'http'
import {Session} from 'next-session/dist/types'

export interface IServerSideProps {
    req: IncomingMessage & {
        session?: Session & {
            user: IUser
        }
        oauth?: IOAuth
    }
    res: ServerResponse
    query?: any
}

export interface IUser {
    id: string
    name: string
    profileImage: string
    email: string
    ageRange: string
    gender: string
    userType: 'kakao' | 'naver' | ''
}

export interface IOAuth {
    accessToken: string
    refreshToken: string
    expiresIn: string
    refreshTokenExpiresIn: string
}
