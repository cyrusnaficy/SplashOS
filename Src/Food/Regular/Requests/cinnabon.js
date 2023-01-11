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

async function cinnabon(license, secretKey, hostHeader) {

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
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://x.c.cinnabon.com/ats/go.aspx",
                    headers: {
                        "Host": "x.c.cinnabon.com",
                        "Content-Length": "237",
                        "Cache-Control": "max-age=0",
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Upgrade-Insecure-Requests": 1,
                        "Origin": "https://x.c.cinnabon.com",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "iframe",
                        "Referer": "https://x.c.cinnabon.com/ats/show.aspx?cr=100413&fm=37",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: qs.stringify({
                        cr: '100413',
                        fm: '37',
                        mg: '-2147483648',
                        cn: '-2147483648',
                        s_email: email,
                        s_firstname: firstName,
                        s_lastname: lastName,
                        s_zipcode: credentials.zip,
                        s_birthday: '1999-' + credentials.kkmonth + '-' + JSON.stringify(d3),
                        s_agree: 'I+agree+to+the+',
                        s_agree2: 'I+agree+to+marketing+comms+from+Cinnabon+and+affiliates'
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
                })
                const dayta = response.data
                const regex = /You're in!/
                const found = regex.test(dayta);
                if (found) {
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                    const hook = new Webhook(credentials.discordWebhook);
                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🥐 Successfully Generated 🥐')
                        .addField('Site', 'Cinnabon')
                        .addField('Email', '||' + email + '||', true)
                        .setColor(webhookColor)
                        .setThumbnail('https://images-gmi-pmc.edge-generalmills.com/473d320b-fa9f-43fb-8fde-410b450dd328.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                    await masterLog(secretKey);
                    await masterLogAdmin(license, secretKey);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    })
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
            .setTitle('🥐 Successfully Generated 🥐')
            .addField('Site', 'Cinnabon')
            .setColor(webhookColor)
            .setThumbnail('https://images-gmi-pmc.edge-generalmills.com/473d320b-fa9f-43fb-8fde-410b450dd328.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}

module.exports = {cinnabon}