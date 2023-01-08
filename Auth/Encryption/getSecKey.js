const axios = require('axios');
const {stringDecryption} = require('../../Encryption/stringDecryption.js');


async function decryptSecretKey(license, hostHeader, discordUsername, authNode) {
    /*
    Recieves the license and host header from the function above. Then it applies it to the secret key. This
    allows to encrypt further methods.
    */
    const decryptionURL = await stringDecryption('U2FsdGVkX19CmEsUxZqLOG0BK5HONxIJFWCpy1bLc52eHkHweQmw4XLn+5HN/u5icduh5UzORI7+u+k4SaCZ5dx/dASVC3OZScHs9/yOVjA=')
    try {
        // Send a GET request
        const response = await axios({
            method: 'POST',
            url: decryptionURL,
            headers: {
                //Same header passed as a parameter.
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
                "hwid": hardwareID,
                "node": authNode
            }
        });
        if (response.data.status == "success") {
            var secretKey = response.data.key
            launchCLI(secretKey, discordUsername, hostHeader, license);
        } else {
            await sendHook("Decryption Failed In Bot");
            sleep(2000);
            process.exit();
        }
    } catch (e) {
        await sendHook("Decryption Failed In Bot");
        sleep(2000);
        process.exit();
    }
}

module.exports = {decryptSecretKey}