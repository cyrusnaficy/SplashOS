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

async function kodai(license, secretKey, hostHeader) {

    runOfficial();
    async function runOfficial() {

        const emailList = fs
            .readFileSync("./Storage/emails.txt", "utf8")
            .split("\n")
            .filter(String);

        await masterLog(secretKey);
        await masterLogAdmin(license, secretKey);

        for (let i = 0; i < emailList.length; i++) {

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

            let email = emailList[i];
            email = email.replace('\r', '');

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://kodai.io/api/waitlist/enter",
                    headers: {
                        "Host": "kodai.io",
                        "Content-Length": 40,
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        "Sec-Ch-Ua-Mobile": "?0",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Origin": "https://kodai.io",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": 'empty',
                        "Referer": "https://kodai.io/",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: {
                        'email_address': email
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
                        .setTitle('🤖 Successfully Entered Waitlist 🤖')
                        .addField('Site', 'Kodai')
                        .addField('Email', '||' + email + '||', true)
                        .setColor(webhookColor)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1241542362121166852/0hQnV9lV_400x400.png')
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
                .setTitle('🤖 Successfully Entered Waitlist 🤖')
                .addField('Site', 'Kodai', true)
                .addField('Entry Count', JSON.stringify(emailList.length), true)
                .setColor(webhookColor)
                .setThumbnail('https://pbs.twimg.com/profile_images/1241542362121166852/0hQnV9lV_400x400.png')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }

}

module.exports = {kodai}