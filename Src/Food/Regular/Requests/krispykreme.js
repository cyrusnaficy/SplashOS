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


async function krispyKremeReq(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);
    const captchaTypeRes = prompt("2Captcha, Capmonster, or AI: ".cyan.bold);
    const highSec = prompt("Enable high security Incapsula mode (y/n): ".cyan.bold);
    if (captchaTypeRes == null || threads == null || highSec == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }
    if (captchaTypeRes.charAt(0) == '2' || captchaTypeRes.charAt(0) == 't' || captchaTypeRes.charAt(0) == 'T') {
        capType = "2captcha";
    } else if (captchaTypeRes.charAt(0) == 'c' || captchaTypeRes.charAt(0) == 'C') {
        capType = "capmonster";
    } else {
        capType = "ai";
    }
    if (highSec.charAt(0) == 'y' || highSec.charAt(0) == 'Y') {
        console.log("Mode Disabled".red.bold);
        sleep(2000);
        process.exit();
    }

    for (let i = 0; i < threads; i++) {

        runOfficial();
        async function runOfficial() {

            //Loading proxies.txt

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const list = fs
                .readFileSync("./Storage/proxies.txt", "utf8")
                .split("\n")
                .filter(String);
            const raw = random(list);
            const splitproxy = raw.split(":");

            /*
            Generating session with first HTTP Request. Just a base
            get req
            */
            async function generateSession() {
                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.krispykreme.com',
                        headers: {
                            "Connection": "keep-alive",
                            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "en-US,en;q=0.9",
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
                    if (response.headers['set-cookie'][6]) {
                        var krispyGuestCookie = response.headers['set-cookie'][6].slice(12, -57);
                        krispyGuestCookie = `KrispyGuest=${krispyGuestCookie}; `;
                        console.log("TASK STATUS: ".bold + "GOT SESSION".yellow.bold);
                        sleep(250);
                        console.log("TASK STATUS: ".bold + "GENERATING ANTIBOT".cyan.bold);
                        generateAntiBot(krispyGuestCookie);
                    } else {
                        console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                        setTimeout(() => {
                            return generateSession();
                        }, 5000);
                    }
                } catch (e) {
                    console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                    setTimeout(() => {
                        return generateSession();
                    }, 5000);
                }
            }

            async function generateAntiBot(krispyGuestCookie) {
                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.krispykreme.com/account/create-account',
                        headers: {
                            "Connection": "keep-alive",
                            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                            "Accept": "*/*",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "en-US,en;q=0.9",
                            "referer": "https://www.krispykreme.com/account/create-account",
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
                    if (response.data) {
                        const $ = cheerio.load(response.data);
                        this.csrfToken = $(`input[name="__CMSCsrfToken"]`).attr("value");
                        this.viewState = $(`input[name="__VIEWSTATE"]`).attr("value");
                        this.viewStateGenerator = $(
                            `input[name="__VIEWSTATEGENERATOR"]`,
                        ).attr("value");
                        this.eventValidation = $(`input[name="__EVENTVALIDATION"]`).attr(
                            "value",
                        );
                        sleep(200);
                        console.log("TASK STATUS: ".bold + "POSTING ANTIBOT".magenta.bold);

                        //Genning Cookies
                        sleep(200);
                        console.log("TASK STATUS: ".bold + "GENERATING INCAPSULA".cyan.bold);

                        const AWSALB = response.headers["set-cookie"][0].slice(7, -47);
                        const AWSALBCORS = response.headers["set-cookie"][1].slice(11, -70);
                        const CMSCsrfCookie = response.headers["set-cookie"][3].slice(14, -18);
                        const ASPNET_SessionId = response.headers["set-cookie"][4].slice(18, -32);
                        const nlbi_1990269 = response.headers["set-cookie"][6].slice(13, -33);
                        const inCapID = response.headers["set-cookie"][7].slice(20, -82);
                        const inCapSess = response.headers["set-cookie"][8].slice(22, -33);
                        let reeseCookie = "";

                        if (highSec.charAt(1) == "y" || highSec.charAt(1) == "Y") {
                            reeseCookie = await genToken();
                            if (reeseCookie == null) {
                                console.log("TASK STATUS: ".bold + "ERROR POSTING INCAPSULA".red.bold);
                                setTimeout(() => {
                                    return generateAntiBot();
                                }, 5000);
                            } else {
                                var cookies = krispyGuestCookie + `reese84=${reeseCookie}; AWSALB=${AWSALB}; AWSALBCORS=${AWSALBCORS}; CMSCsrfCookie=${CMSCsrfCookie}; ASP.NET_SessionId=${ASPNET_SessionId}; nlbi_1990269=${nlbi_1990269}; visid_incap_1990269=${inCapID}; incap_ses_2108_1990269=${inCapSess}; _hjFirstSeen=1; _hjAbsoluteSessionInProgress=0; _hjIncludedInSessionSample=0; loginStatus=guest; CMSPreferredCulture=en-US; session_ecomm=; shop_delivery_type=undefined; pageviewCount=6; PreferredLocationId=219`;
                                console.log("TASK STATUS: ".bold + "POSTING INCAPSULA".magenta.bold);
                                generateAccount(this.csrfToken, this.viewState, this.viewStateGenerator, this.eventValidation, cookies);
                            }
                        } else {
                            var cookies = krispyGuestCookie + `AWSALB=${AWSALB}; AWSALBCORS=${AWSALBCORS}; CMSCsrfCookie=${CMSCsrfCookie}; ASP.NET_SessionId=${ASPNET_SessionId}; nlbi_1990269=${nlbi_1990269}; visid_incap_1990269=${inCapID}; incap_ses_2108_1990269=${inCapSess}; _hjFirstSeen=1; _hjAbsoluteSessionInProgress=0; _hjIncludedInSessionSample=0; loginStatus=guest; CMSPreferredCulture=en-US; session_ecomm=; shop_delivery_type=undefined; pageviewCount=6; PreferredLocationId=219`;
                            console.log("TASK STATUS: ".bold + "POSTING INCAPSULA".magenta.bold);
                            generateAccount(this.csrfToken, this.viewState, this.viewStateGenerator, this.eventValidation, cookies);
                        }

                    } else {
                        console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                        setTimeout(() => {
                            return generateAntiBot();
                        }, 5000);
                    }
                } catch (e) {
                    console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                    setTimeout(() => {
                        return generateAntiBot();
                    }, 5000);
                }

            }

            async function genToken() {

                var resVal = "";
                var postURL = await secretStringDecryption("U2FsdGVkX1+lwRTrFFzxwpp0GJxt2GFkN2Aqs5CfnAzsG7nfVrGzJumHhT2uo3K4zejDNnZ1rLTUSB9ljd/xzd4elj8aQmaqv8BwrzYVckA=", secretKey)

                try {
                    const response = await axios({
                        method: 'POST',
                        url: postURL,
                        headers: {
                            'Host': hostHeader,
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Upgrade-Insecure-Requests": 1,
                            "Sec-Fetch-Dest": "document",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-User": "?1",
                            "Dnt": 1,
                            "Te": "Trailers",
                        },
                        data: {
                            'license': license,
                            'site': 'https://www.krispykreme.com/',
                            "proxy": raw
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

                    if (response.data.cookies) {
                        resVal = response.data.cookies
                    } else {
                        resVal = null;
                    }
                } catch (e) {
                    resVal = null;
                }

                return resVal;
            }

            async function generateAccount(csrfToken, viewState, viewStateGenerator, eventValidation, cookies) {

                var captchaToken = "";


                if (capType == "2captcha") {

                    captchaToken = await solveTwoCap('recaptcha', '6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA', 'https://www.krispykreme.com/account/create-account');

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } else if (capType == "capmonster") {

                    captchaToken = await solveCapmonster('recaptcha', '6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA', 'https://www.krispykreme.com/account/create-account');

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }


                } else if (capType == "ai") {
                    captchaToken = await captchaAi('6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA', 'https://www.krispykreme.com/account/create-account', 'RecaptchaV2TaskProxyless', license, secretKey);
                }

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.krispykreme.com/account/create-account',
                        headers: {
                            "Cookie": cookies,
                            "Connection": "keep-alive",
                            "content-type": "application/x-www-form-urlencoded",
                            "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Referer": `https://www.krispykreme.com/account/create-account`,
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        data: qs.stringify({
                            "__CMSCsrfToken": csrfToken,
                            "__EVENTTARGET": "",
                            "__EVENTARGUMENT": "",
                            "__VIEWSTATE": viewState,
                            "lng": "en-US",
                            "__VIEWSTATEGENERATOR": viewStateGenerator,
                            "__EVENTVALIDATION": eventValidation,
                            "ctl00$plcMain$txtFirstName": firstName,
                            "ctl00$plcMain$txtLastName": lastName,
                            "ctl00$plcMain$ddlBirthdayMM": credentials.kkmonth,
                            "ctl00$plcMain$ddlBirthdayDD": d3,
                            "ctl00$plcMain$txtZipCode": credentials.zip,
                            "ctl00$plcMain$ucPhoneNumber$txt1st": fakerator.date.age(111, 999),
                            "ctl00$plcMain$ucPhoneNumber$txt2nd": fakerator.date.age(111, 999),
                            "ctl00$plcMain$ucPhoneNumber$txt3rd": fakerator.date.age(1111, 9999),
                            "ctl00$plcMain$txtEmail": email,
                            "ctl00$plcMain$txtPassword": password,
                            "g-recaptcha-response": captchaToken,
                            "ctl00$plcMain$cbTermsOfUse": "on",
                            "ctl00%24plcMain%24btnSubmit": "Sign+Up"
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
                        maxRedirects: 1,
                        transform: function(body, response) {
                            return {
                                headers: response.headers,
                                data: body,
                                finalUrl: response.request.uri.href, // contains final URL
                            };
                        },
                    });
                    if (response.data) {
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);

                        const hook = new Webhook(credentials.discordWebhook);
                        const b_url = webhookIMG;

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(b_url);

                        const embed = new MessageBuilder()
                            .setTitle('🍩 Successfully Generated 🍩')
                            .addField('Site', 'Krispy Kreme')
                            .addField('Mode', 'Requests')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await logFileCreds(email, password, null);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);

                    } else {
                        console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                        setTimeout(() => {
                            return generateAntiBot();
                        }, 5000);
                    }
                } catch (e) {
                    console.log(e);
                    setTimeout(() => {
                        return generateAccount(csrfToken, viewState, viewStateGenerator, eventValidation);
                    }, 5000);
                }
            }

            async function masterLog(secretKey) {

                const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                const hook = new Webhook(sharedHook);

                hook.setUsername('SplashAIO');
                hook.setAvatar(webhookIMG);

                const embed = new MessageBuilder()
                    .setTitle('🍩 Successfully Generated 🍩')
                    .addField('Site', 'Krispy Kreme', true)
                    .addField('Mode', 'Requests', true)
                    .setColor(webhookColor)
                    .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);

            }

            await generateSession();
        }
    }
}

module.exports = {krispyKremeReq}