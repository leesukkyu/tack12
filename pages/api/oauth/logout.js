import {applySession} from 'next-session'
import {sessionConfig} from '@config/index'

export default async (req, res) => {
    await applySession(req, res, sessionConfig)
    await req.session.destroy()
    res.json({
        redirect: '/',
    })
}
