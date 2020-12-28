import {IncomingMessage, ServerResponse} from 'http'
import {Session} from 'next-session/dist/types'

export interface ServerSideProps {
    req: IncomingMessage & {
        session?: Session & {
            user: {
                id: string
                name: string
                profileImage: string
                email: string
                ageRange: string
                gender: string
                userType: string
            }
        }
        oauth?: {
            accessToken: string
            refreshToken: string
            expiresIn: string
            refreshTokenExpiresIn: string
        }
    }
    res: ServerResponse
    query?: any
}
