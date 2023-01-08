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

async function mekAIO(license, secretKey, hostHeader) {
        
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
            const email = emailList[i]

            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://release.mekrobotics.com/enterWaitList/',
                    headers: {
                        "Host": "release.mekrobotics.com",
                        "Sec-Ch-Ua": `"Chromium";v="103", ".Not/A)Brand";v="99"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36`,
                        "Sec-Ch-Ua-Platform": `"Windows"`,
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "*/*",
                        "Origin": "https://waitlist.mekrobotics.com",
                        "Sec-Fetch-Site": "same-site",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://waitlist.mekrobotics.com/",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9",
                        "Connection": "keep-alive"
                    },
                    data: qs.stringify({
                        "email": email.replace(/(\r\n|\n|\r)/gm, ""),
                        "token": "mfsdontcheck"
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

                if (response.data.error == false) {

                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🤖 Joined Waitlist 🤖')
                        .addField('Site', 'MekAIO', true)
                        .addField('Mode', 'Captcha-Bypass', true)
                        .addField('Email', '||' + email + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1518777030237913088/tRyubJAp_400x400.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR JOINING WAITLIST'.red.bold);
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
                .addField('Site', 'MekAIO', true)
                .addField('Mode', 'Captcha-Bypass', true)
                .addField('Entry Count', JSON.stringify(emailList.length))
                .setColor(webhookColor)
                .setThumbnail('https://pbs.twimg.com/profile_images/1518777030237913088/tRyubJAp_400x400.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }

    }

}

module.exports = {mekAIO}