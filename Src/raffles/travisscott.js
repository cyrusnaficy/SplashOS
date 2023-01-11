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

async function travisScott(license, secretKey, hostHeader) {

    const captchaBoolean = prompt("Is this a captcha release (y/n): ".cyan.bold);
    if(captchaBoolean == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }
    let capType = ""
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
    }
    const id = prompt('What is the Release ID:'.cyan.bold)
    const size = prompt('What Size do you wish to Enter:'.cyan.bold)

    const emaiLCount = fs
    .readFileSync("./Storage/emails.txt", "utf8")
    .split("\n")
    .filter(String);


    let count = 0;
    await sendHooks();

    for (let i = 0; i < emaiLCount.length; i++) {

        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const list = fs
            .readFileSync("./Storage/proxies.txt", "utf8")
            .split("\n")
            .filter(String);
        const raw = random(list);
        const splitproxy = raw.split(":");

            
        var captchaToken = "";
        var payload = "";
        const firstname = fakerator.names.firstName()
        const lastname = fakerator.names.firstNameM()
        const onephone = Math.floor((Math.random() * 999) + 100)
        const twophone = Math.floor((Math.random() * 999) + 100)
        const threephone = Math.floor((Math.random() * 9999) + 1000)
        const email = emaiLCount[i];

        runScript();
        async function runScript() {

            if(captchaBoolean.charAt(0) == 'y' || captchaBoolean.charAt(0) == 'Y') {
            
                var captchaToken = "";


                if (capType == "2captcha") {

                    captchaToken = await solveTwoCap('hcaptcha', '36d74832-3ba5-4430-832f-ec54914a48e1', 'https://shop.travisscott.com');

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } else if (capType == "ai") {
                    captchaToken = await captchaAi('36d74832-3ba5-4430-832f-ec54914a48e1', 'https://shop.travisscott.com', 'HCaptchaTaskProxyless', license, secretKey);
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
                payload = {
                    "firstName": firstname,
                    "lastName": lastname,
                    "CountryCode": "US",
                    "tel": JSON.stringify(onephone) + JSON.stringify(twophone) + JSON.stringify(threephone),
                    "email": email,
                    "zip": credentials.zip,
                    "id": id,
                    "size": size
                }
            }

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://mq5ejfubh3.execute-api.us-east-1.amazonaws.com/raffle/entry",
                    headers: {
                        "Host": "mq5ejfubh3.execute-api.us-east-1.amazonaws.com",
                        "sec-ch-ua": `"(Not(A:Brand";v="8", "Chromium";v="101"`,
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json;charset=UTF-8",
                        "sec-ch-ua-mobile": '?0',
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
                        "Sec-Ch-Ua-Platform": `"macOS"`,
                        "Origin": "https://shop.travisscott.com",
                        "Sec-Fetch-Site": "cross-site",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://shop.travisscott.com/",
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

                if (response.data.message == 'success') {
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY ENTERED RAFFLE'.green.bold);
                    count++;
                  }
                  else{
                    console.log('TASK STATUS: '.bold + 'FAILED TO ENTER RAFFLE'.red.bold)
                    setTimeout(() => {
                        return runScript();
                    } , 5000);
                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + `ERR SENDING HTTP REQUEST`.red.bold);
                setTimeout(() => {
                    return runScript();
                } , 5000);
            }
        }

    }

    async function sendHooks() {

        const hook = new Webhook(credentials.discordWebhook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('👟 Successfully Entered Raffle 👟')
            .addField('Site', 'Travis Scott', true)
            .addField('Mode', 'Requests', true)
            .addField('Entry Count', JSON.stringify(emaiLCount.length))
            .setColor(webhookColor)
            .setThumbnail('https://www.gannett-cdn.com/presto/2021/11/06/USAT/284899c9-bcb4-4b56-b5df-59d75803d411-GTY_1351603671.jpg')
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
            .setTitle('👟 Successfully Entered Raffle 👟')
            .addField('Site', 'Travis Scott', true)
            .addField('Mode', 'Requests', true)
            .addField('Entry Count', JSON.stringify(emaiLCount.length))
            .setColor(webhookColor)
            .setThumbnail('https://www.gannett-cdn.com/presto/2021/11/06/USAT/284899c9-bcb4-4b56-b5df-59d75803d411-GTY_1351603671.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}

module.exports = { travisScott }