const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')
const axios = require('axios-https-proxy-fix')
const cheerio = require('cheerio');
var prompt = require('prompt-sync')();
var colors = require('colors');
const path = require("path");
const fs = require("fs");

async function slapperGame(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);

    if(JSON.parse(threads) > 5) {
        console.log('TASK STATUS: '.bold + 'MAX THREADS IS 5'.red.bold);
        sleep(2000);
        process.exit();
    }

    var couponType = "";

    const checkForType = new AutoComplete({
        name: 'mode',
        message: 'Select The Points You Wish To Redeem'.cyan.bold,
        limit: 4,
        initial: 0,
        choices: [
            '500'.yellow.bold,
            '2000'.yellow.bold,
            '5000'.yellow.bold
        ]
    });
    await checkForType.run()
    .then(answer => {
        couponType = answer.strip;
        masterLog(secretKey)
        for(let i = 0; i < threads; i++) {
            runSlapperGame(couponType)
        }
    })
    .catch();

    async function runSlapperGame(couponType) {

        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const list = fs
            .readFileSync("./Storage/proxies.txt", "utf8")
            .split("\n")
            .filter(String);
        const raw = random(list);
        const splitproxy = raw.split(":");

        let encryptedPoints = "";
        let productLink = "";

        if(couponType == "500") {
            encryptedPoints = "U2FsdGVkX1+lgNqeXtP0MDjQLK8=";
            productLink = "gid://shopify/Product/6774877093939"
        } else if(couponType == "2000") {
            encryptedPoints = "U2FsdGVkX1+lgNqeXtP0MDjQLK8=";
            productLink = "gid://shopify/Product/6774124740659"
        } else {
            encryptedPoints = "U2FsdGVkX1+lgNqeXtP0MDjQLK8=";
            productLink = "gid://shopify/Product/6774111535155"
        }


        try {
            const response = await axios({
                method: 'POST',
                url: 'https://shopmrbeast.com/api/slapper',
                headers : {
                    "Host": "shopmrbeast.com",
                    "Cookie": "",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0",
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Accept-Encoding": "gzip, deflate",
                    "Referer": "https://shopmrbeast.com/slap-to-win",
                    "Content-Type": "application/json",
                    "Content-Length": "95",
                    "Origin": "https://shopmrbeast.com",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Dnt": "1",
                },
                data: {
                    "score": encryptedPoints,
                    "redeemedItemId": productLink
                },
                proxy: {
                    host: splitproxy[0],
                    port: splitproxy[1],
                    auth: {
                        username: splitproxy[2],
                        password: splitproxy[3].replace('\r', '')
                    }
                },
                timeout: 10000
            })

            if(response.data.discountCode) {
                console.log(`Successfully Generated Code: ${response.data.discountCode}`.green.bold);
                await logFileCreds(response.data.discountCode, productLink, null);
                setTimeout(() => {
                    return runSlapperGame(couponType);
                }, 5000);
            } else {
                console.log('TASK STATUS: '.bold + 'ERR GENERATING CODE'.red.bold);
                setTimeout(() => {
                    return runSlapperGame(couponType);
                }, 5000);
            }

        } catch (e) {
            console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
            setTimeout(() => {
                return runSlapperGame(couponType);
            }, 5000);
        }
    }

    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🎁 Successfully Generated Coupon 🎁')
            .addField('Site', 'Shop Mr Beast', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://art.pixilart.com/9283ec98a2aefdf.png')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}

module.exports = {slapperGame}