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

async function shellGas(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);
    let capType = "";
    let capTypeMonster = "";
    const captchaTypeRes = prompt("2Captcha, Capmonster, or AI For V2: ".cyan.bold);
    if(captchaTypeRes == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }
    if (captchaTypeRes.charAt(0) == '2' || captchaTypeRes.charAt(0) == 't' || captchaTypeRes.charAt(0) == 'T') {
        capType = "2captcha";
    } else if(captchaTypeRes.charAt(0) == 'c' || captchaTypeRes.charAt(0) == 'C') {
        capType = "capmonster";
        const captchaType3 = prompt("Capmonster Doesn't Work For V3 ATM (2Captcha or AI for V3): ".cyan.bold);
        if(captchaType3 == null) {
            console.log("Make sure to enter correct info".red.bold);
            sleep(2000);
            process.exit();
        }
        if(captchaType3.charAt(0) == '2' || captchaType3.charAt(0) == 't' || captchaType3.charAt(0) == 'T') {
            capTypeMonster = "2captcha";
        } else {
            capTypeMonster = "ai";
        }
    } else {
        capType = "ai";
    }

    if (JSON.parse(threads) > 20) {
        console.log('TASK STATUS: '.bold + 'YOU CAN ONLY RUN 20 THREADS AT A TIME'.red.bold);
        sleep(2000);
        process.exit();
    }

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
            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

            postSignup();
            async function postSignup() {

                console.log('TASK STATUS: '.bold + 'GENERATING AKAMAI'.yellow.bold)

                var captchaToken = "";
                var captchaToken3 = "";


                if (capType == "2captcha") {

                    captchaToken = await solveTwoCap('recaptcha', '6LfFX0UhAAAAADz0yc6rc18_9kCy0JEvhvn8MW-0', 'https://shell-10year.promo.eprize.com/#/register');
                    captchaToken3 = await solveTwoCap('recaptcha', '6LfFX0UhAAAAADz0yc6rc18_9kCy0JEvhvn8MW-0', 'https://shell-10year.promo.eprize.com/#/register');

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } else if (capType == "capmonster") {
                
                    captchaToken = await solveCapmonster('recaptcha', '6LfFX0UhAAAAADz0yc6rc18_9kCy0JEvhvn8MW-0', 'https://shell-10year.promo.eprize.com/#/register');
                    if(capTypeMonster == "2captcha") {
                        captchaToken3 = await solveTwoCap('recaptcha', '6LfFX0UhAAAAADz0yc6rc18_9kCy0JEvhvn8MW-0', 'https://shell-10year.promo.eprize.com/#/register');
                    } else {
                        captchaToken3 = await captchaAi('6LfFX0UhAAAAADz0yc6rc18_9kCy0JEvhvn8MW-0', 'https://shell-10year.promo.eprize.com/#/register', 'RecaptchaV3TaskProxyless', license, secretKey);
                    }
                    
                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    

                } else if (capType == "ai") {
                    captchaToken = await captchaAi('6LfFX0UhAAAAADz0yc6rc18_9kCy0JEvhvn8MW-0', 'https://shell-10year.promo.eprize.com/#/register', 'RecaptchaV2TaskProxyless', license, secretKey);
                    captchaToken3 = await captchaAi('6LfFX0UhAAAAADz0yc6rc18_9kCy0JEvhvn8MW-0', 'https://shell-10year.promo.eprize.com/#/register', 'RecaptchaV3TaskProxyless', license, secretKey);
                }


                console.log('TASK STATUS: '.bold + 'POSTING SIGNUP'.yellow.bold);

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://shell-10year.promo.eprize.com/api/profiles',
                        headers: {
                            "Host": "shell-10year.promo.eprize.com",
                            "Cookie": "viewedCookieDisclaimer=true;",
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            "Accept-Language": "en-US",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://shell-10year.promo.eprize.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://shell-10year.promo.eprize.com/",
                            "Accept-Encoding": "gzip, deflate",
                        },
                        data: {
                            "is_limited": true,
                            "plays_remaining": 0,
                            "age": "",
                            "primary_opt_in": true,
                            "rules": true,
                            "first_name": firstName,
                            "last_name": lastName,
                            "email": email,
                            "country": "US",
                            "x_channel": "def",
                            "locale": "en-US",
                            "isAutomatedTest": false,
                            "g-recaptcha-response": captchaToken,
                            "g-recaptcha-response-v3": captchaToken3,
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

                    if (response.data.result.profile) {
                        console.log('TASK STATUS: '.bold + 'CHECKING GAME STATUS'.cyan.bold);
                        playGame(response.data.result.profile.id, response.data.result.profile.token);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR IP HARDBAN'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR IP HARDBAN'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }
            }

            async function playGame(payloadID, headerToken) {

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://shell-10year.promo.eprize.com/api/game/play',
                        headers: {
                            "Host": "shell-10year.promo.eprize.com",
                            "Cookie": "viewedCookieDisclaimer=true; @rocd/shell_10year:firstTimePlayer=1;",
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            "Accept-Language": "en-US",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36",
                            'X-HW-Profile-Token': headerToken,
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://shell-10year.promo.eprize.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://shell-10year.promo.eprize.com/",
                            "Accept-Encoding": "gzip, deflate",
                        },
                        data: {
                            "id": payloadID
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

                    if (response.data.prizeWon == false) {
                        console.log('TASK STATUS: '.bold + 'LOST GAME'.magenta.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    } else {
                        console.log('TASK STATUS: '.bold + 'WON GAME'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('⛽️ Successfully Won Free Gas ⛽️ ')
                            .addField('Site', 'Shell', true)
                            .addField('Mode', 'Requests', true)
                            .addField('Email', '||' + email + '||')
                            .addField('Proxy', '||' + raw + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://southeastpetro.com/wp-content/uploads/2016/03/shutterstock_136420172.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add");
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
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
            .setTitle('⛽️ Successfully Won Free Gas ⛽️ ')
            .addField('Site', 'Shell', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://southeastpetro.com/wp-content/uploads/2016/03/shutterstock_136420172.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}

module.exports = {shellGas}