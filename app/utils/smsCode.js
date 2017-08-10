/**
 * 后续如果需要短信验证码可以用
 */
import notp from 'notp'

const opt = {
    window: 0,
}

export default {
    encode(key) { //生成短信验证码
        return notp.totp.gen(key, opt)
    },
    decode(key, token) { // 解码短信验证码
        var login = notp.totp.verify(token, key, opt)
        if (!login) {
            return false
        }
        return true
    }
}