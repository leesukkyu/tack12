const signature = require('cookie-signature');
const secret =  process.env.NEXT_PUBLIC_SESSION_KEY;

export default {
    decode: (raw) => signature.unsign(raw.slice(2), secret),
    encode: (sid) => (sid ? 's:' + signature.sign(sid, secret) : null),
    cookie : {
        secure : false,
        httpOnly : false,
        maxAge : +process.env.NEXT_PUBLIC_SESSION_MAX_AGE
    }
}