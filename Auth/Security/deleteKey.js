const axios = require('axios')
const {stringDecryption} = require('../../Encryption/stringDecryption.js')

async function deleteKey(key) {
    /*
    Encrypted Server URL. Once it is decrypted by key, it will be sent back to the function
    and authed.
    */
    let authURL = await stringDecryption('U2FsdGVkX1+eUvoDpMR52OAwgT4KNlUB5+tFNiGVbwCLVIRsSWKWYFZa1ljiTTuFZTduaS6ZX6Kn9rg/q0p0f3MS64SzizdZB2bc2i3wZug=');
    const hostHeader = await stringDecryption('U2FsdGVkX1/4PKB6YrQuRyeOM3x+sHnDZIFRIvGLq0CZmwGQi5XzOCe7E1dIeWpX')
    try {
        //Sending a POST request
        const response = await axios({
            method: 'POST',
            url: authURL,
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
                "license": key
            },
        });
        if (response.data) {}
    } catch (e) {}
}

module.exports = {deleteKey}