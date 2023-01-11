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

async function cybersole(license, secretKey, hostHeader) {

    const emailList = fs
    .readFileSync("./Storage/emails.txt", "utf8")
    .split("\n")
    .filter(String);

    await masterLog(secretKey);
    await masterLogAdmin(license, secretKey);

    for (let i = 0; i < emailList.length; i++) {

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
            let email = emailList[i]
            email = email.slice(0, -1)

            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://cybersole.io/api/marketing/signup',
                    headers: {
                        "Host": "cybersole.io",
                        "Cookie": `cookieyesID=bypass; cky-active-check=yes; cookieyes-necessary=yes; cky-action=yes; cky-consent=yes; cookieyes-analytics=yes; cookieyes-functional=yes;`,
                        "Content-Length": "38",
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                        "Sec-Ch-Ua-Mobile": '0?',
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                        "Sec-Ch-Ua-Platform": `"Windows"`,
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Origin": "https://cybersole.io",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://cybersole.io/",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: {
                        "email": email
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
                        .addField('Site', 'Cybersole', true)
                        .addField('Email', '||' + email + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1443640433473642499/1PFOD83L_400x400.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                } else {
                    console.log("TASK STATUS: ".bold + "FAILED TO GENERATE ACCOUNT".red.bold);
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
    }
    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🤖 Joined Waitlist 🤖')
            .addField('Site', 'Cybersole', true)
            .addField('Entry Count', JSON.stringify(emailList.length))
            .setColor(webhookColor)
            .setThumbnail('https://pbs.twimg.com/profile_images/1443640433473642499/1PFOD83L_400x400.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);
    }
}

module.exports = {cybersole};