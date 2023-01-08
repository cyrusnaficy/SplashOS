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

async function waffleHouse(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);

    for (let i = 0; i < threads; i++) {

        runOfficial();
        async function runOfficial() {

            console.log('TASK STATUS: '.bold + 'POSTING FORM DATA'.yellow.bold);

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
            const d1 = new Date().getDate();
            const d3 = d1 + 1
            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

            try {
                const response = await axios({
                    method: "POST",
                    url: 'https://www.wafflehouse.com/doprocess',
                    headers: {
                        "Host": "www.wafflehouse.com",
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                        "Accept": "*/*",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Requested-With": "XMLHttpRequest",
                        "Sec-Ch-Ua-Mobile": "?0",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Origin": "https://www.wafflehouse.com",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://www.wafflehouse.com/regulars-club/",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: qs.stringify({
                        fn: firstName,
                        ln: lastName,
                        em: email,
                        emcon: email,
                        bmon: credentials.ddmonth,
                        bday: JSON.stringify(d3),
                        zip: credentials.zip,
                        theaction: 'regulars-club-two'
                    }),
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
                const regex = /1/
                const regexone = /2/
                const foundone = regexone.test(dayta);
                const found = regex.test(dayta);
                if (found) {
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🧇 Successfully Generated Account 🧇')
                        .addField('Site', 'Waffle House')
                        .addField('Email', '||' + email + '||', true)
                        .setColor(webhookColor)
                        .setThumbnail('https://images.wsj.net/im-122970?width=1280&size=1.77777778')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await masterLog(secretKey)
                    await masterLogAdmin(license, secretKey);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")

                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)

                } else if (foundone) {
                    console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                } else {
                    console.log('TASK STATUS: '.bold + 'INVALID REQUEST RESPONSE'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                setTimeout(() => {
                    return runOfficial();
                })
            }
        }
    }
    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🧇 Successfully Generated Account 🧇')
            .addField('Site', 'Waffle House')
            .setColor(webhookColor)
            .setThumbnail('https://images.wsj.net/im-122970?width=1280&size=1.77777778')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }
}