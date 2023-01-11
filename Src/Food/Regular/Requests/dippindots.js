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

async function dippinDots(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);

    for (let i = 0; i < threads; i++) {

        runOfficial();
        async function runOfficial() {

            const firstName = fakerator.names.firstName()
            const lastName = fakerator.names.firstName()
            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
            const d1 = new Date().getDate();
            const d3 = d1 + 1

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const list = fs
                .readFileSync("./Storage/proxies.txt", "utf8")
                .split("\n")
                .filter(String);
            const raw = random(list);
            const splitproxy = raw.split(":");

            console.log("TASK STATUS: ".bold + "GENERATING COOKIES".yellow.bold);

            generateCookies();
            async function generateCookies() {

                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://a.klaviyo.com/api/onsite/identify?c=R4Vkce",
                        headers: {
                            "Host": "a.klaviyo.com",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                            Accept: "*/*",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip,deflate",
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Origin": "https://www.dippindots.com",
                            "Referer": "https://www.dippindots.com/",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "cross-site",
                            Connection: "keep-alive"
                        },
                        data: {
                            "token": "R4Vkce",
                            "properties": {
                                "$referrer": {
                                    "ts": 1658523012,
                                    "value": "https://www.google.com/",
                                    "first_page": "https://www.dippindots.com/"
                                },
                                "$last_referrer": {
                                    "ts": 1658523016,
                                    "value": "https://www.google.com/",
                                    "first_page": "https://www.dippindots.com/"
                                },
                                "$source": "Dot Crazy! Sign up",
                                "$email": email,
                                "Birth Month": `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`,
                                "$zip": credentials.zip,
                                "$organization": [
                                    "Yes"
                                ]
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
                    })
                    if (response.data['$exchange_id']) {
                        console.log("TASK STATUS: ".bold + "POSTING COOKIES".magenta.bold);
                        postCookies(response.data['$exchange_id'])
                    } else {
                        console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                        setTimeout(() => {
                            return generateCookies();
                        }, 5000)
                    }
                } catch (e) {
                    console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                    setTimeout(() => {
                        return generateCookies();
                    }, 5000)
                }
            }

            async function postCookies(cookieData) {

                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://a.klaviyo.com/api/onsite/identify?c=R4Vkce",
                        headers: {
                            "Host": "a.klaviyo.com",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                            Accept: "*/*",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip,deflate",
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Origin": "https://www.dippindots.com",
                            "Referer": "https://www.dippindots.com/",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "cross-site",
                            Connection: "keep-alive"
                        },
                        data: {
                            "$exchange_id": cookieData,
                            "token": "R4Vkce",
                            "properties": {
                                "$referrer": {
                                    "ts": 1658523012,
                                    "value": "https://www.google.com/",
                                    "first_page": "https://www.dippindots.com/"
                                },
                                "$last_referrer": {
                                    "ts": 1658523268,
                                    "value": "https://www.google.com/",
                                    "first_page": "https://www.dippindots.com/"
                                },
                                "$source": "Dot Crazy! Sign up",
                                "Birth Month": `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`,
                                "$zip": credentials.zip,
                                "$organization": [
                                    "Yes"
                                ],
                                "$exchange_id": cookieData,
                                "$email": email
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
                    })
                    if (response.data['$exchange_id']) {
                        console.log("TASK STATUS: ".bold + "POSTING ACCOUNT".yellow.bold);
                        postAccount(response.data['$exchange_id'])
                    } else {
                        console.log("TASK STATUS: ".bold + "COOKIES NOT FOUND".red.bold);
                        setTimeout(() => {
                            return generateCookies();
                        }, 5000)
                    }
                } catch (e) {
                    console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                    setTimeout(() => {
                        return generateCookies();
                    }, 5000)
                }

            }

            async function postAccount(cookieData) {
                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://a.klaviyo.com/onsite/v1/subscriptions/?company_id=R4Vkce",
                        headers: {
                            "Host": "a.klaviyo.com",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                            Accept: "*/*",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip,deflate",
                            "Access-Control-Allow-Headers": "*",
                            "Content-Type": "application/json",
                            "Revision": "2022-02-16.pre",
                            "Origin": "https://www.dippindots.com",
                            "Referer": "https://www.dippindots.com/",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "cross-site",
                            "Dnt": 1,
                            Connection: "keep-alive"
                        },
                        data: {
                            "data": {
                                "type": "subscription",
                                "attributes": {
                                    "list_id": "QQWuYR",
                                    "custom_source": "Dot Crazy! Sign up",
                                    "email": email,
                                    "properties": {
                                        "Birth Month": `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`,
                                        "$zip": credentials.zip,
                                        "$organization": [
                                            "Yes"
                                        ],
                                        "$consent_method": "Klaviyo Form",
                                        "$consent_form_id": "Ugmfdh",
                                        "$consent_form_version": 5963734,
                                        "$timezone_offset": -7
                                    }
                                }
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
                    if (response.statusText == 'Accepted') {
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY GENERATED ACCOUNT".green.bold);
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🍦 Successfully Generated 🍦')
                            .addField('Site', 'Dippin Dots')
                            .addField('Email', '||' + email + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://www.foodbusinessnews.net/ext/resources/2022/05/19/DippinDotsLead.png?t=1652977618&width=1080')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);

                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    } else {
                        console.log("TASK STATUS: ".bold + "ERROR GENERATING ACCOUNT".red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }

                } catch (e) {
                    console.log(e);
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
            .setTitle('🍦Successfully Generated🍦')
            .addField('Site', 'Dippin Dots')
            .setColor(webhookColor)
            .setThumbnail('https://www.foodbusinessnews.net/ext/resources/2022/05/19/DippinDotsLead.png?t=1652977618&width=1080')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        await hook.send(embed);
    }
}

module.exports = {dippinDots}