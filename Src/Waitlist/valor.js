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

async function valorAIO(license, secretKey, hostHeader) {
     
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
            email = email.replace('\r', '');
            const twitterHandle = fakerator.internet.userName();

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://analytics.valoraio.com/waiting",
                    headers: {
                        "Host": "analytics.valoraio.com",
                        "Cache-Control": "max-age=0",
                        "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": '"Windows"',
                        "Upgrade-Insecure-Requests": 1,
                        "Origin": "https://valoraio.com",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "same-site",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Referer": "https://valoraio.com/",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9",
                    },
                    data: qs.stringify({
                        "email": email,
                        "twitterHandle": twitterHandle
                    }),
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000,
                    maxRedirects: 1
                })
                if (response.status) {
                    console.log('TASK STATUS: '.bold + 'ERROR JOINING WAITLIST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                } 
            } catch (e) {
                if(e.message == 'Request failed with status code 400') {
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🤖 Joined Waitlist 🤖')
                        .addField('Site', 'ValorAIO', true)
                        .addField('Mode', 'Brute-Redirect', true)
                        .addField('Email', '||' + email + '||')
                        .addField('Twitter Handle', '||' + twitterHandle + '||', true)
                        .setColor(webhookColor)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1300176473442127875/GYSIS70T_400x400.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
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
            .setTitle('🤖 Joined Waitlist 🤖')
            .addField('Site', 'ValorAIO', true)
            .addField('Mode', 'Brute-Redirect', true)
            .addField('Entry Count', JSON.stringify(emailList.length))
            .setColor(webhookColor)
            .setThumbnail('https://pbs.twimg.com/profile_images/1300176473442127875/GYSIS70T_400x400.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);
    }

}

module.exporys = {valorAIO}