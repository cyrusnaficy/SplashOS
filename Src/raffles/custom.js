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

async function customRequest(license, secretKey, hostHeader) {

    let capType = ""
    const hostURL = prompt("What is the URL Endpoint of your Request: ".cyan.bold);
    const hostHeaderReq = prompt("What is the Host Header of your Request: ".cyan.bold);
    const originHeader = prompt("What is the Origin Header of your Request: ".cyan.bold);
    const captchaBoolean = prompt("Does your request have a captcha (y/n): ".cyan.bold);
    if(captchaBoolean == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }
    if(captchaBoolean.charAt(0) == 'y' || captchaBoolean.charAt(0) == 'Y') {
        const captchaTypeRes = prompt("2Captcha or AI: ".cyan.bold);
        if(captchaTypeRes == null) {
            console.log("Make sure to enter correct info".red.bold);
            sleep(2000);
            process.exit();
        }
        if (captchaTypeRes.charAt(0) == '2' || captchaTypeRes.charAt(0) == 't' || captchaTypeRes.charAt(0) == 'T') {
            capType = "2captcha";
        } else {
            capType = "ai";
        }
        var captchaType = prompt("What Type of Captcha (recaptcha/hcaptcha): ".cyan.bold);
        if(captchaType == null) {
            console.log("Make sure to enter correct info".red.bold);
            sleep(2000);
            process.exit();
        }
        var captchaKey = prompt("What is the Captcha SiteKey: ".cyan.bold);
    }
    const size = prompt('What Size: '.cyan.bold);
    const id = prompt('What Release ID:'.cyan.bold);

    const emaiLCount = fs
    .readFileSync("./Storage/emails.txt", "utf8")
    .split("\n")
    .filter(String);

    let count = 0;
    await sendHooks();

    for (let i = 0; i < emaiLCount.length; i++) {

        var captchaToken = "";
        var payload = "";

        const firstname = fakerator.names.firstName()
        const lastname = fakerator.names.firstNameM()
        const onephone = Math.floor((Math.random() * 999) + 100)
        const twophone = Math.floor((Math.random() * 999) + 100)
        const threephone = Math.floor((Math.random() * 9999) + 1000)

        const email = emaiLCount[i];

        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const list = fs
            .readFileSync("./Storage/proxies.txt", "utf8")
            .split("\n")
            .filter(String);
        const raw = random(list);
        const splitproxy = raw.split(":");

        if(captchaBoolean.charAt(0) == 'y' || captchaBoolean.charAt(0) == 'Y') {

            if(captchaType.charAt(0) == 'r' || captchaType.charAt(0) == 'R') {


            if (capType == "2captcha") {

                captchaToken = await solveTwoCap('recaptcha', captchaKey, hostURL);

                if (captchaToken == null) {
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }

            } else if (capType == "capmonster") {
            
                captchaToken = await solveCapmonster('recaptcha', captchaKey, hostURL);
                
                if (captchaToken == null) {
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }
                

            } else if (capType == "ai") {
                captchaToken = await captchaAi(captchaKey, hostURL, 'RecaptchaV2TaskProxyless', license, secretKey);
            }

            } else if(captchaType.charAt(0) == 'h' || captchaType.charAt(0) == 'H') {

                var captchaToken = "";


                if (capType == "2captcha") {
                
                    captchaToken = await solveTwoCap('hcaptcha', captchaKey, hostURL);
                
                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                
                } else if (capType == "ai") {
                    captchaToken = await captchaAi(captchaKey, hostURL, 'HCaptchaTaskProxyless', license, secretKey);
                }

                payload = {
                    "firstName": firstname,
                    "lastName": lastname,
                    "CountryCode": "US",
                    "tel": JSON.stringify(onephone) + JSON.stringify(twophone) + JSON.stringify(threephone),
                    "email": email,
                    "zip": credentials.zip,
                    "id": id,
                    "size": size,
                    "captcha": captchaToken
                }

            } else {
                console.log("Invalid captcha type".red.bold);
                sleep(2000);
                process.exit();
            }
        } else {
            payload = {
                "firstName": firstname,
                "lastName": lastname,
                "CountryCode": "US",
                "tel": JSON.stringify(onephone) + JSON.stringify(twophone) + JSON.stringify(threephone),
                "email": email,
                "zip": credentials.zip,
                "id": id,
                "size": size,
            }
        }

        runOfficial();
        async function runOfficial() {

            try {
                const response = await axios({
                    method: 'POST',
                    url: hostURL,
                    headers: {
                        "Host": hostHeaderReq,
                        "sec-ch-ua": `"(Not(A:Brand";v="8", "Chromium";v="101"`,
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json;charset=UTF-8",
                        "sec-ch-ua-mobile": '?0',
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
                        "Sec-Ch-Ua-Platform": `"macOS"`,
                        "Origin": originHeader,
                        "Sec-Fetch-Site": "cross-site",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": originHeader,
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: payload,
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

                if(response.status) {
                    console.log("REQUEST STATUS: ".bold + `REQUEST COMPLETED WITH ${response.status}`.green.bold);
                    count++;
                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + `ERROR ${e.message.toUpperCase()}`.red.bold);
                setTimeout(() => {
                    return runOfficial();
                }, 5000);
            }

        }

        async function sendHooks() {
            
            const hook = new Webhook(credentials.discordWebhook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('📝 Successfully Entered Raffle 📝')
                .addField('Site', 'Custom Request', true)
                .addField('Mode', 'Requests', true)
                .addField('Email', '||' + email + '||')
                .setColor(webhookColor)
                .setThumbnail('https://www.johnsflaherty.com/i/1635189876166/x1168/uploads/content_files/images/raffle_tickets.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            await hook.send(embed);
            await masterLog(secretKey);
            await masterLogAdmin(license, secretKey);
            await grabAnalytics(hostHeader, license, secretKey, "Add")

        }

        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
            .setTitle('📝 Successfully Entered Raffle 📝')
            .addField('Site', 'Custom Request', true)
            .addField('Mode', 'Requests', true)
            .setColor(webhookColor)
            .setThumbnail('https://www.johnsflaherty.com/i/1635189876166/x1168/uploads/content_files/images/raffle_tickets.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

            hook.send(embed);
        }
    }

}

module.exports = {customRequest}