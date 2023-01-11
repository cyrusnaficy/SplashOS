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

async function bjBrewhouse(license, secretKey, hostHeader) {

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
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
            const d1 = new Date().getDate();
            const d3 = d1 + 1
            if (d3 == 1 || d3 == 2 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                var birthday = `${credentials.kkmonth}/0${JSON.stringify(d3)}/1999`
            } else {
                var birthday = `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`
            }

            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

            try {
                const response = await axios({
                    method: "POST",
                    url: 'https://www.bjsrestaurants.com/api/register-loyalty-account',
                    headers: {
                        "Host": "www.bjsrestaurants.com",
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                        "Content-Type": "application/json",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Accept": "*/*",
                        "Origin": "https://www.bjsrestaurants.com",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://www.bjsrestaurants.com/rewards",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: {
                        "addressLine1": fakerator.address.street(),
                        "addressLine2": "",
                        "addressCity": "New York City",
                        "addressState": "NY",
                        "birthDate": birthday,
                        "email": email,
                        "firstName": firstName,
                        "hasAgreedToRegistrationTerms": true,
                        "lastName": lastName,
                        "loyaltyId": "",
                        "optedInToSMSNotifications": false,
                        "password": password,
                        "passwordConfirmation": password,
                        "phoneNumber": `${JSON.stringify(fakerator.date.age(111, 999))}-${JSON.stringify(fakerator.date.age(111, 999))}-${JSON.stringify(fakerator.date.age(1111, 9999))}`,
                        "preferredLocationSiteId": "591",
                        "zipCode": "10001"
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

                if (response.data.member.Email == email) {
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🍺 Successfully Generated Account 🍺')
                        .addField('Site', 'BJ Brewhouse')
                        .addField('Email', '||' + email + '||', true)
                        .addField('Password', '||' + password + '||', true)
                        .setColor(webhookColor)
                        .setThumbnail('https://cloudfront.bjsrestaurants.com/img_5e4d91a1796f60.24461213_500_Daytona%20Beach_2019.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await masterLog(secretKey)
                    await masterLogAdmin(license, secretKey);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                    await logFileCreds(email, password, null);

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
            .setTitle('🍺 Successfully Generated Account 🍺')
            .addField('Site', 'BJ Brewhouse', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://cloudfront.bjsrestaurants.com/img_5e4d91a1796f60.24461213_500_Daytona%20Beach_2019.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }
}

module.exports = {bjBrewhouse}