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

async function dennys(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);

    for (let i = 0; i < threads; i++) {

        runOfficial();
        async function runOfficial() {

            console.log('TASK STATUS: '.bold + 'GENERATING HEADERS [0]'.yellow.bold);

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

            generateHeaders();
            async function generateHeaders() {
                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://nomnom-prod-api.dennys.com/punchhv2/create",
                        headers: {
                            "Host": "nomnom-prod-api.dennys.com",
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
                            "Content-Type": "application/json",
                            "Accept": "application/json, text/plain, */*",
                            "Clientid": "dennys",
                            "Nomnom-Platform": "web",
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Origin": "https://www.dennys.com",
                            "Sec-Fetch-Site": "same-site",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://www.dennys.com/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
                        },
                        data: {
                            "user": {
                                "email": email,
                                "first_name": firstName,
                                "last_name": lastName,
                                "password": password,
                                "phone": null,
                                "terms_and_conditions": true,
                                "favourite_location_ids": null,
                                "marketing_email_subscription": true,
                                "marketing_pn_subscription": false,
                                "anniversary": null,
                                "birthday": null,
                                "send_compliance_sms": false
                            },
                            "ignore": null
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
                    if (response.data.access_token) {
                        var bearerToken = response.data.access_token.token;
                        console.log('TASK STATUS: '.bold + 'GENERATING HEADERS [1]'.yellow.bold);
                        generateAccount(bearerToken);
                    } else {
                        console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE HEADERS'.red.bold);
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

            async function generateAccount(bearerToken) {

                if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                    var birthday = `1999-${credentials.kkmonth}-0${JSON.stringify(d3)}`;
                } else {
                    var birthday = `1999-${credentials.kkmonth}-${JSON.stringify(d3)}`;
                }
                try {
                    const response = await axios({
                        method: "PUT",
                        url: "https://nomnom-prod-api.dennys.com/punchhv2/update",
                        headers: {
                            "Host": "nomnom-prod-api.dennys.com",
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Authorization": `Bearer ${bearerToken}`,
                            "Content-Type": "application/json",
                            "Accept": "application/json, text/plain, */*",
                            "Clientid": "dennys",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
                            "Nomnom-Platform": "web",
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Origin": "https://www.dennys.com",
                            "Sec-Fetch-Site": "same-site",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://www.dennys.com/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
                        },
                        data: {
                            "user": {
                                "terms_and_conditions": true,
                                "birthday": birthday,
                                "favourite_location_ids": "8760"
                            }
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
                    if (response.data.access_token) {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);
                        const b_url = webhookIMG;
                        hook.setUsername('SplashAIO');
                        hook.setAvatar(b_url);

                        const embed = new MessageBuilder()
                            .setTitle('🥚 Successfully Generated 🥚')
                            .addField('Site', 'Dennys', true)
                            .addField('Mode', 'Requests', true)
                            .addField('Email', '||' + email + '||')
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.nrn.com/sites/nrn.com/files/Dennys-New-Digital-Tech-Offerings.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await logFileCreds(email, password, null);

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
    }

    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🥚 Successfully Generated 🥚')
            .addField('Site', 'Dennys', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://www.nrn.com/sites/nrn.com/files/Dennys-New-Digital-Tech-Offerings.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}