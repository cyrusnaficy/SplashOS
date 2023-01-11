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

async function tomSachs(license, secretKey, hostHeader) {
    var capType = "";
    const releaseURL = prompt("Enter the URL of the release: ".cyan.bold);
    const captchaBoolean = prompt("Do you wish to run captcha bypass mode (y/n): ".cyan.bold);
    if(captchaBoolean == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    } else if(captchaBoolean.charAt(0) == 'n' || captchaBoolean.charAt(0) == 'N') {
        const captchaTypePrompt = prompt("Do you wish to use 2cap or ai: ".cyan.bold);
        if(captchaTypePrompt == null) {
            console.log("Make sure to enter correct info".red.bold);
            sleep(2000);
            process.exit();
        } else if(captchaTypePrompt.charAt(0) == '2' || captchaTypePrompt.charAt(0) == '2') {
            capType = "2captcha";
        } else {
            capType = "ai";
        }
    }
    const id = prompt('What is the Release ID:'.cyan.bold)

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
        const stateCode = zipState(credentials.zip);

        runScript();
        async function runScript() {

            console.log('TASK STATUS: '.bold + 'POSTING RAFFLE'.yellow.bold);

            const sizeArr = [
                "WMNS 5 / MENS 3.5 / EU 35.5 / 22.5 CM",
                "WMNS 5.5 / MENS 4 / EU 36 / 23 CM",
                "WMNS 6 / MENS 4.5 / EU 37 / 23.5 CM",
                "WMNS 6.5 / MENS 5 / EU 37.5 / 23.5 CM",
                "WMNS 7 / MENS 5.5 / EU 38 / 24 CM",
                "WMNS 7.5 / MENS 6 / EU 38.5 / 24 CM",
                "WMNS 8 / MENS 6.5 / EU 39 / 24.5 CM",
                "WMNS 8.5 / MENS 7 / EU 40 / 25 CM",
                "WMNS 9 / MENS 7.5 / EU 40.5 / 25.5 CM",
                "WMNS 9.5 / MENS 8 / EU 41 / 26 CM",
                "WMNS 10 / MENS 8.5 / EU 42 / 26.5 CM",
                "WMNS 10.5 / MENS 9 / EU 42.5 / 27 CM",
                "WMNS 11 / MENS 9.5 / EU 43 / 27.5 CM",
                "WMNS 11.5 / MENS 10 / EU 44 / 28 CM",
                "WMNS 12 / MENS 10.5/ EU 44.5 / 28.5 CM",
                "WMNS 12.5 / MENS 11 / EU 45 / 29 CM",
                "WMNS 13 / MENS 11.5 / EU 45.5 / 29.5 CM",
                "WMNS 13.5 / MENS 12 / EU 46 / 30 CM",
                "WMNS 14 / MENS 12.5 / EU 47 / 30.5 CM",
                "WMNS 14.5 / MENS 13 / EU 47.5 / 31 CM",
                "WMNS 15.5 / MENS 14 / EU 48.5 / 32 CM",
                "WMNS 16.5 / MENS 15 / EU 49.5 / 33 CM"
            ]

            const theRealSize = sizeArr[Math.floor(Math.random() * sizeArr.length)]

            if(captchaBoolean.charAt(0) == 'y' || captchaBoolean.charAt(0) == 'Y') {
            
                var captchaToken = "";


                if (capType == "2captcha") {

                    captchaToken = await solveTwoCap('hcaptcha', '36d74832-3ba5-4430-832f-ec54914a48e1', releaseURL);

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } else if (capType == "ai") {
                    captchaToken = await captchaAi('36d74832-3ba5-4430-832f-ec54914a48e1', releaseURL, 'HCaptchaTaskProxyless', license, secretKey);
                }
                

                payload = {
                    "id": id,
                    "firstName": firstname,
                    "lastName": lastname,
                    "email":email,
                    "countryCode":"US",
                    "tel": JSON.stringify(onephone) + JSON.stringify(twophone) + JSON.stringify(threephone),
                    "size": theRealSize,
                    "address":{
                        "address1": fakerator.address.street(),
                        "address2":"",
                        "city": fakerator.address.city()	,
                        "region": stateCode,
                        "zip": credentials.zip
                    },
                    "captcha": captchaToken,
                    "agreeTerms":true,
                    "ref":"0da13f0d896e61e71b8964740f5dbb6d9568294a32fd9e3e6c0ebb387572f718"
                }

            } else {
                payload = {
                    "id": id,
                    "firstName": firstname,
                    "lastName": lastname,
                    "email":email,
                    "countryCode":"US",
                    "tel": JSON.stringify(onephone) + JSON.stringify(twophone) + JSON.stringify(threephone),
                    "size": theRealSize,
                    "address":{
                        "address1": fakerator.address.street(),
                        "address2":"",
                        "city": fakerator.address.city()	,
                        "region": stateCode,
                        "zip": credentials.zip
                    },
                    "captcha": "",
                    "agreeTerms":true,
                    "ref":"0da13f0d896e61e71b8964740f5dbb6d9568294a32fd9e3e6c0ebb387572f718"
                }
            }

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://96a59tgyoe.execute-api.us-east-1.amazonaws.com/raffle/entry",
                    headers: {
                        "Host": "96a59tgyoe.execute-api.us-east-1.amazonaws.com",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
                        "Accept": "*/*",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Accept-Encoding": "gzip, deflate",
                        "Referer": "https://store.tomsachs.com/",
                        "Content-Type": "application/json",
                        "Origin": "https://store.tomsachs.com",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "cross-site",
                        "Dnt": 1,
                        "Te": "trailers"
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
                console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
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
            .addField('Site', 'Tom Sachs')
            .addField('Mode', 'Requests', true)
            .addField('Entry Count', JSON.stringify(emaiLCount.length))
            .setColor(webhookColor)
            .setThumbnail('https://sneakernews.com/wp-content/uploads/2022/05/tom-sachs-nike-general-purpose-shoe-da6672-200-6.jpg')
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
            .addField('Site', 'Tom Sachs')
            .addField('Mode', 'Requests', true)
            .addField('Entry Count', JSON.stringify(emaiLCount.length))
            .setColor(webhookColor)
            .setThumbnail('https://sneakernews.com/wp-content/uploads/2022/05/tom-sachs-nike-general-purpose-shoe-da6672-200-6.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

}

module.exports = {tomSachs}