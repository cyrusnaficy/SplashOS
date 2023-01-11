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

async function ssense(license, secretKey, hostHeader) {

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
            console.log('TASK STATUS: '.bold + 'POSTING FORM DATA'.yellow.bold);
            try {
                const response = await axios({
                    method: 'POST',
                    url: `https://www.ssense.com/en-us/account/register`,
                    headers: {
                        "Host": "www.ssense.com",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0",
                        "Accept": "application/json",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Accept-Encoding": "gzip, deflate",
                        "Referer": "https://www.ssense.com/en-us/account/login",
                        "Content-Type": "application/json",
                        "Cache-Control": "no-store",
                        "Origin": "https://www.ssense.com",
                        "Content-Length": "29",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    data: {
                        "email": email,
                        "password": password,
                        "confirmpassword": password,
                        "gender": "men",
                        "source": "SSENSE_EN_SIGNUP"
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
                if (response) {

                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold)
                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('👟 Successfully Generated Account 👟')
                        .addField('Site', 'SSENSE', true)
                        .addField('Mode', 'Requests', true)
                        .addField('Email', '||' + email + '||')
                        .addField('Password', '||' + password + '||', true)
                        .addField('Format', '||' + email + ':' + password + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://pbs.twimg.com/profile_images/1280220166731767808/tin9VBJ5_400x400.jpg')
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

                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR PERIMITERX BAN'.red.bold);
                setTimeout(() => {
                    return runOfficial();
                }, 5000);

            }
        }
    }

    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('👟 Successfully Generated Account 👟')
            .addField('Site', 'SSENSE', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://pbs.twimg.com/profile_images/1280220166731767808/tin9VBJ5_400x400.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);

    }
}

module.export = {ssense}