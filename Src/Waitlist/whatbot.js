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

async function whatBot(license, secretKey, hostHeader) {

    let capType = ""

    const captchaTypeRes = prompt("2Captcha or AI: ".cyan.bold);
    if (captchaTypeRes.charAt(0) == '2' || captchaTypeRes.charAt(0) == 't' || captchaTypeRes.charAt(0) == 'T') {
        capType = "2captcha";
    } else {
        capType = "ai";
    }

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

            if (capType == "2captcha") {

                captchaToken = await solveTwoCap('recaptcha', '6LdQMdYbAAAAAEZ1cFq3w-iccwIZVeT9_kVfUUEz', `https://waitlist.whatbotisthis.com/`);

                if (captchaToken == null) {
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }

            }  else {
                captchaToken = await captchaAi('6LdQMdYbAAAAAEZ1cFq3w-iccwIZVeT9_kVfUUEz', 'https://waitlist.whatbotisthis.com/', 'RecaptchaV3TaskProxyless', license, secretKey);
            }

            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://wl.whatbotisthis.com/api/waitlist/join',
                    headers: {
                        "Host": "wl.whatbotisthis.com",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
                        "Accept": "*/*",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Accept-Encoding": "gzip, deflate",
                        "Referer": "https://waitlist.whatbotisthis.com/",
                        "Content-Type": "text/plain;charset=UTF-8",
                        "Origin": "https://waitlist.whatbotisthis.com",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-site",
                        "Dnt": "1",
                        "Te": "trailers",
                    },
                    data: {
                        "email": email,
                        "token": captchaToken
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
                if (response.data) {

                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🤖 Joined Waitlist 🤖')
                        .addField('Site', 'WhatBot', true)
                        .addField('Email', '||' + email + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1562257871034691584/z9tllqoj_400x400.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                } else {
                    console.log("TASK STATUS: ".bold + "FAILED TO ENTER WAITLIST".red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                }

            } catch (e) {
                console.log("TASK STATUS: ".bold + "ERR (SUBNET BANNED)".red.bold);
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
            .addField('Site', 'WhatBot', true)
            .setColor(webhookColor)
            .setThumbnail('https://pbs.twimg.com/profile_images/1562257871034691584/z9tllqoj_400x400.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);
    }
}

module.exports = {whatBot}