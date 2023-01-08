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

async function amazonGiftCard(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);
    let capType = "";
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
    } else {
        capType = "ai";
    }

    if(JSON.parse(threads) > 30 && license != "7ASX-AH6M-ARYW-TDHJ") {
        console.log("You can only run 30 threads!".red.bold);
        sleep(2000);
        process.exit();
    }

    if(JSON.parse(threads) > 100 && license == "7ASX-AH6M-ARYW-TDHJ") {
        console.log("You can only run 100 threads Slik!".red.bold);
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

            let gameCount = 0;
            const firstName = fakerator.names.firstName()
            const lastName = fakerator.names.firstName()
            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
            
            runPost();

            async function runPost() {

                console.log('TASK STATUS: '.bold + 'POSTING PROFILE'.yellow.bold);
                    
                var captchaToken = "";

                if (capType == "2captcha") {

                    captchaToken = await solveTwoCap('recaptcha', '6LdmAf0SAAAAABgHCfB3ey-HxXCupdgZiuhwN21F', 'https://wyndham-tap22.promo.eprize.com/?affiliate_id=vegas_oamoe#/register');

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } else if (capType == "capmonster") {
                
                    captchaToken = await solveCapmonster('recaptcha', '6LdmAf0SAAAAABgHCfB3ey-HxXCupdgZiuhwN21F', 'https://wyndham-tap22.promo.eprize.com/?affiliate_id=vegas_oamoe#/register');
                    
                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    

                } else if (capType == "ai") {
                    captchaToken = await captchaAi('6LdmAf0SAAAAABgHCfB3ey-HxXCupdgZiuhwN21F', 'https://wyndham-tap22.promo.eprize.com/?affiliate_id=vegas_oamoe#/register', 'RecaptchaV2TaskProxyless', license, secretKey);
                }
                
                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://wyndham-tap22.promo.eprize.com/api/profiles',
                        headers: {
                            "Host": "wyndham-tap22.promo.eprize.com",
                            "Cookie": "_tt_enable_cookie=1;",
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            "Accept-Language": "en-US",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://wyndham-tap22.promo.eprize.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://wyndham-tap22.promo.eprize.com/?affiliate_id=vegas_oamoe",
                            "Accept-Encoding": "gzip, deflate"
                        },
                        data: {
                            "token": null,
                            "is_limited": true,
                            "plays_remaining": 0,
                            "age": "",
                            "email": email,
                            "rules": true,
                            "country": "US",
                            "x_channel": "def",
                            "affiliate_id": "vegas_oamoe",
                            "locale": "en-US",
                            "isAutomatedTest": false,
                            "g-recaptcha-response": captchaToken,
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
                    if(response.data.result.profile.token) {
                        console.log('TASK STATUS: '.bold + 'GENERATING SNOWSHOW ID'.cyan.bold);
                        const hwToken = response.data.result.profile.token;
                        const profileID = response.data.result.profile.id;
                        snowShow(hwToken, profileID)
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR POSTING PROFILE'.red.bold);
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

            async function snowShow(hwToken, profileID) {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://wyndham-tap22.promo.eprize.com/api/keys/earn',
                        headers: {
                            "Host": "wyndham-tap22.promo.eprize.com",
                            "Cookie": "_tt_enable_cookie=1; @rocd/wyndham_tap22:registeredUser=yes; @rocd/wyndham_tap22:newUser=yes;",
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "Accept-Language": "en-US",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                            "Content-Type": "application/json",
                            "Accept": "application/json, text/plain, */*",
                            "X-Hw-Profile-Token": hwToken,
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://wyndham-tap22.promo.eprize.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://wyndham-tap22.promo.eprize.com/?affiliate_id=vegas_oamoe",
                        },
                        data: {
                            "snowshoeId": "OAMOE",
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

                    if(response.status != 403 || response.status != "403") {
                        console.log('TASK STATUS: '.bold + 'PLAYING GAME'.magenta.bold);
                        playGame(hwToken, profileID);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING SNOWSHOW ID'.red.bold);
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

            async function playGame(hwToken, profileID) {

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://wyndham-tap22.promo.eprize.com/api/game/play',
                        headers: {
                            "Host": "wyndham-tap22.promo.eprize.com",
                            "Cookie": "_tt_enable_cookie=1; @rocd/wyndham_tap22:registeredUser=yes; @rocd/wyndham_tap22:newUser=yes;",
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "Accept-Language": "en-US",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                            "Content-Type": "application/json",
                            "Accept": "application/json, text/plain, */*",
                            "X-Hw-Profile-Token": hwToken,
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://wyndham-tap22.promo.eprize.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://wyndham-tap22.promo.eprize.com/?affiliate_id=vegas_oamoe",
                        },
                        data: {
                            "id": profileID,
                            "associateId": null
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

                    if(response.data.prizeWon == false) {
                        console.log('TASK STATUS: '.bold + `LOST GAME ${JSON.stringify(gameCount)}`.red.bold);
                        gameCount++;
                        if(gameCount < 4) {
                            return playGame(hwToken, profileID);
                        } else {
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                    } else {
                        console.log('TASK STATUS: '.bold + `WON GAME ${JSON.stringify(gameCount)}`.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('💳 Successfully Won Free Gift Card 💳 ')
                            .addField('Site', 'Amazon Gift Card', true)
                            .addField('Mode', 'Requests', true)
                            .addField('Email', '||' + email + '||')
                            .addField('Proxy', '||' + raw + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gift-certificates/consumer/2021/GCLP/Support/2x/Desktop_pGC_670x490_1.png')
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
            .setTitle('💳 Successfully Won Free Gift Card 💳 ')
            .addField('Site', 'Amazon Gift Card', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gift-certificates/consumer/2021/GCLP/Support/2x/Desktop_pGC_670x490_1.png')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}

module.exports = {amazonGiftCard}