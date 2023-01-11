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

async function missionBBQ(license, secretKey, hostHeader) {

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

            if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                this.getURL = `https://mission-bbq.activehosted.com/proc.php?u=628CED6280924&f=1&s=&c=0&m=0&act=sub&v=2&or=615a738affadf63ecba17f70fbdec19c&firstname=${firstName}&lastname=${lastName}safdsafa&email=${email}&field[43]=1999-${credentials.kkmonth}-0${JSON.stringify(d3)}&field[2]=10001&field[4]=PA%3A%20Plymouth%20Meeting&jsonp=true`
            } else {
                this.getURL = `https://mission-bbq.activehosted.com/proc.php?u=628CED6280924&f=1&s=&c=0&m=0&act=sub&v=2&or=615a738affadf63ecba17f70fbdec19c&firstname=${firstName}&lastname=${lastName}safdsafa&email=${email}&field[43]=1999-${credentials.kkmonth}-${JSON.stringify(d3)}&field[2]=10001&field[4]=PA%3A%20Plymouth%20Meeting&jsonp=true`
            }

            try {
                const response = await axios({
                    method: "GET",
                    url: this.getURL,
                    headers: {
                        "Host": "mission-bbq.activehosted.com",
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
                        "Sec-Ch-Ua-Platform": `"macOS"`,
                        "Accept": "*/*",
                        "Sec-Fetch-Site": "cross-site",
                        "Sec-Fetch-Mode": "no-cors",
                        "Sec-Fetch-Dest": "script",
                        "Referer": "https://mission-bbq.com/",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
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
                const regex = /WELCOME TO THE MISSION BBQ BIRTHDAY BRIGADE/
                const found = regex.test(dayta);
                if (found) {
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🍗 Successfully Generated Account 🍗')
                        .addField('Site', 'MissionBBQ')
                        .addField('Email', '||' + email + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://www.thereporteronline.com/wp-content/uploads/2021/12/Mission-BBQ.jpg')
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

                } else {
                    console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
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
            .setTitle('🍗 Successfully Generated Account 🍗')
            .addField('Site', 'MissionBBQ')
            .setColor(webhookColor)
            .setThumbnail('https://www.thereporteronline.com/wp-content/uploads/2021/12/Mission-BBQ.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}

module.exports = {missionBBQ}