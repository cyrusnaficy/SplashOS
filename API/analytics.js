const axios = require('axios');
const fs = require('fs');
const {sendHook} = require('../security/Notify/sendHook.js')
const {secretStringDecryption} = require('../auth/Encryption/secretStringDecryption.js')

async function grabAnalytics(hostHeader, license, secretKey, type) {

    const proxyList = fs
        .readFileSync("./Storage/proxies.txt", "utf8")
        .split("\n")
        .filter(String);

    successCount = successCount + 1;
    process.title = `[200][Splash AIO] | Success Count: ${JSON.stringify(successCount)} | Server Connection: 200 | Total Proxies: ${proxyList.length}`;

    const decryptionURL = await secretStringDecryption('U2FsdGVkX1/0ZlV22C4nTrJnYWQYnj8ON7EWSHrtpEtZ4vXktfEzvsyN9ODnpFvx1KRWNbHzs8ybc19POYTZ52a7qvkB1lOnfZSuwPHOn/I=', secretKey)
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
                "type": type
            }
        });
        if (response.data.status == "success") {
            var analyticsData = response.data.data
            return analyticsData;
        } else {
            await sendHook("ErrorAPI");
            sleep(2000);
            process.exit();
        }
    } catch (e) {
        await sendHook("ErrorAPI");
        sleep(2000);
        process.exit();
    }
}

module.exports = {grabAnalytics}