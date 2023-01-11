const axios = require('axios')
const fs = require('fs')
const credentials = JSON.parse(fs.readFileSync('./Storage/configs.json', 'utf-8'));
const {stringDecryption} = require('../../encryption/stringDecryption.js')

async function authCheck() {

    /*
    Encrypted Server URL. Once it is decrypted by key, it will be sent back to the function
    and authed.
    */
    let authUrl = await stringDecryption('U2FsdGVkX1/HGq/M6Qd0uQznePQYBtb+K4fgV8tBQfVce1CA5GD/lZ5xr/w6oyLhKo9Wim0rodR+kmSFtKqR57lSJjQsQra6h7EZuwKQ/xM=');
    const hostHeader = await stringDecryption('U2FsdGVkX1/4PKB6YrQuRyeOM3x+sHnDZIFRIvGLq0CZmwGQi5XzOCe7E1dIeWpX')
    try {
        // Send a POST request
        const response = await axios({
            method: 'POST',
            url: authUrl,
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
                //Payload is required
                "license": credentials.license,
                "hwid": hardwareID,
            }
        });
        if (response.data && response.data.status != "error") {
            let decryptedAuth = await stringDecryption(response.data)
            decryptedAuth = JSON.parse(decryptedAuth);
            if(decryptedAuth.data.discordUser) {
                var discordUsername = decryptedAuth.data.discordUser
                var authNode = decryptedAuth.data.node
                console.log("Starting CLI... 🚀".bold);
                decryptSecretKey(credentials.license, hostHeader, discordUsername, authNode);
            } else {
                console.log("Error Authenticating".red.bold);
                sleep(2000);
                process.exit();
            }
        } else {
            console.log("Error Authenticating".red.bold);
            sleep(2000);
            process.exit();
        }
    } catch (e) {
        console.log("Error Authenticating".red.bold);
        sleep(2000);
        process.exit();
    }
}

module.exports = {authCheck}