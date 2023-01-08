const axios = require('axios');

async function captchaAi(siteKey, websiteUrl, captchaType, license, secretKey) {
    const encryptedURL = await secretStringDecryption('U2FsdGVkX19hG5dNFuPT5epZB/r4syzIOf/seu8RXqIR0k46QJEwZlLMyDVHtT7WnDA+I/jlBsFn4F4p+FY2MCcK0+Mt+fksA8TY1bS8qAk=', secretKey);
    const hostHeader = await secretStringDecryption('U2FsdGVkX184Hq+Hmi5KLBpwX7on99ehZPKILOkG+nQCSQA/EuQcKP9tBuAKGUnP', secretKey);
    console.log("CAPTCHA AI STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold)
    
    try {
        const response = await axios({
            method: 'POST',
            url: encryptedURL,
            headers: {
                'Host': hostHeader,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate",
                "Upgrade-Insecure-Requests": 1,
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Dnt": 1,
                "Te": "Trailers",
            },
            data: {
                "license": license,
                "api": credentials.captchaAi,
                "siteKey": siteKey,
                "websiteUrl": websiteUrl,
                "type": captchaType,
            },
            timeout: 100000,
            throwHttpErrors: false,
        });
        if (response.data.data) {
            console.log("CAPTCHA AI STATUS: ".bold + "SOLVED CAPTCHA".green.bold);
            return response.data.data
        } else {
            console.log("CAPTCHA AI STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
            return "invalid";
        }
    } catch (e) {
        console.log("CAPTCHA AI STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
        return "invalid";
    }
}

module.exports = {captchaAi}