const signature = require('cookie-signature');
const secret = 'keyboard cat';
export default {
    decode: (raw) => signature.unsign(raw.slice(2), secret),
    encode: (sid) => (sid ? 's:' + signature.sign(sid, secret) : null),
    cookie : {
        secure : false,
        httpOnly : false,
        maxAge : 10000
    }
}