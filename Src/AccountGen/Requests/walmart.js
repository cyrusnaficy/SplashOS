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

async function walmart(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);

    for (let i = 0; i < threads; i++) {

        runOfficial();
        async function runOfficial() {

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const list = fs
                .readFileSync("./Storage/proxies.txt", "utf8")
                .split("\n")
                .filter(String);
            const raw = random(list);
            const splitproxy = raw.split(":");

            const firstName = fakerator.names.firstName()
            const lastName = fakerator.names.firstName()
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

            generateCookies();
            async function generateCookies() {

                console.log('TASK STATUS: '.bold + 'GENERATING COOKIES'.yellow.bold);

                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.walmart.com/account/signup',
                        headers: {
                            "Host": "www.walmart.com",
                            "Connection": "keep-alive",
                            "sec-ch-ua": '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": 'en-US,en;q=0.9'
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
                    });
                    const dayta = response.data
                    const regex = /Robot or human/
                    const found = regex.test(dayta);
                    if (found) {
                        console.log("TASK STATUS: ".bold + "ERROR SOLVING PERIMITERX".red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    } else {
                        console.log('TASK STATUS: '.bold + 'POSTING ACCOUNT'.yellow.bold);
                        generateAccount();
                    }
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }

            }

            async function generateAccount() {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.walmart.com/account/electrode/api/signup?vid=oaoh',
                        headers: {
                            "Host": "www.walmart.com",
                            "Connection": "keep-alive",
                            "sec-ch-ua": `"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"`,
                            "sec-ch-ua-mobile": "?0",
                            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                            "sec-ch-ua-platform": `"Windows"`,
                            "content-type": "application/json",
                            "Accept": "*/*",
                            "Origin": "https://www.walmart.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://www.walmart.com/account/signup",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": 'en-US,en;q=0.9'
                        },
                        data: {
                            "personName": {
                                "firstName": firstName,
                                "lastName": lastName
                            },
                            "email": email,
                            "password": password,
                            "rememberme": true,
                            "emailNotificationAccepted": true,
                            "captcha": {
                                "sensorData": ""
                            }
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
                    });
                    if (response.data.cid) {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🛒Successfully Generated🛒')
                            .addField('Site', 'Walmart', true)
                            .addField('Mode', 'Requests', true)
                            .addField('Email', '||' + email + '||')
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://cdn.corporate.walmart.com/dims4/WMT/31f79e1/2147483647/strip/true/crop/2400x1260+0+170/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2Fb6%2Fc6%2F5e1cb86e49f6948b3298e76c1123%2Fpress-hero-1.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await logFileCreds(email, password, null);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    } else {
                        console.log("TASK STATUS: ".bold + "ERROR SOLVING PERIMITERX".red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }
            }
        }

    }
    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🛒Successfully Generated🛒')
            .addField('Site', 'Walmart', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://cdn.corporate.walmart.com/dims4/WMT/31f79e1/2147483647/strip/true/crop/2400x1260+0+170/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2Fb6%2Fc6%2F5e1cb86e49f6948b3298e76c1123%2Fpress-hero-1.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);

    }
}

module.exports = {walmart}