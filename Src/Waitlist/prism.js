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

async function prismAIO(license, secretKey, hostHeader) {

    runOfficial();
    async function runOfficial() {

        const emailList = fs
            .readFileSync("./Storage/emails.txt", "utf8")
            .split("\n")
            .filter(String);

        await masterLog(secretKey);
        await masterLogAdmin(license, secretKey);

        for (let i = 0; i < emailList.length; i++) {

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const list = fs
                .readFileSync("./Storage/proxies.txt", "utf8")
                .split("\n")
                .filter(String);
            const raw = random(list);
            const splitproxy = raw.split(":");

            let email = emailList[i];
            email = email.replace('\r', '');

            console.log('TASK STATUS: '.bold + 'POSTING FORM DATA'.yellow.bold);

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://api.lancero.app/leads/create",
                    headers: {
                        "Host": "api.lancero.app",
                        "Accept": "*/*",
                        "Access-Control-Request-Method": "POST",
                        "Access-Control-Request-Headers": "authorization,content-type",
                        "Origin": "https://prismaio.com",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "cross-site",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://prismaio.com/",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9",
                        "Authorization": "Bearer pk_48017c19b65457ba76c8dfe0f680d053d197d77db6b5e2f9"
                    },
                    data: {
                        email,
                        waitlist: true
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

                if (response.data.success) {

                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🤖 Joined Waitlist 🤖')
                        .addField('Site', 'Prism Technologies')
                        .addField('Email', '||' + email + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1330634645835280384/vaR0meKr_400x400.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")

                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR ENTERING WAITLIST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                }
            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                setTimeout(() => {
                    return runOfficial();
                }, 5000)
            }

        }
        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🤖 Joined Waitlist 🤖')
                .addField('Site', 'Prism Technologies', true)
                .addField('Entry Count', JSON.stringify(emailList.length), true)
                .setColor(webhookColor)
                .setThumbnail('https://pbs.twimg.com/profile_images/1330634645835280384/vaR0meKr_400x400.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }
}

module.exports = {prismAIO}