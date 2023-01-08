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

async function dalleAI(license, secretKey, hostHeader) {

    let capType = ""

    const captchaTypeRes = prompt("2Captcha, Capmonster, or AI: ".cyan.bold);
    if (captchaTypeRes.charAt(0) == '2' || captchaTypeRes.charAt(0) == 't' || captchaTypeRes.charAt(0) == 'T') {
        capType = "2captcha";
    } else if(captchaTypeRes.charAt(0) == 'c' || captchaTypeRes.charAt(0) == 'C') {
        capType = "capmonster";
    } else {
        capType = "ai";
    }
     
    const emailList = fs
    .readFileSync("./Storage/emails.txt", "utf8")
    .split("\n")
    .filter(String);

    await masterLog(secretKey);
    await masterLogAdmin(license, secretKey);

    for (let i = 0; i < emailList.length; i++) {

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
            let email = emailList[i]
            email = email.replace('\r', '');
            const firstName = fakerator.names.firstName()
            const lastName = fakerator.names.firstName()
            const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
            const personaList = ["artist", "developer", "researcher", "media", "other"]
            const persona = personaList[Math.floor(Math.random() * personaList.length)];

            var captchaToken = "";


            if (capType == "2captcha") {

                captchaToken = await solveTwoCap('recaptcha', '6LfXd98eAAAAANhmPaX0yBz4JMJUoNfBTjqcrzOL', `https://labs.openai.com/api/labs/public/forms/waitlist/submissions`);

                if (captchaToken == null) {
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }

            } else if (capType == "capmonster") {
            
                captchaToken = await solveCapmonster('recaptcha', '6LfXd98eAAAAANhmPaX0yBz4JMJUoNfBTjqcrzOL', `https://labs.openai.com/api/labs/public/forms/waitlist/submissions`);
                
                if (captchaToken == null) {
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);
                }
                

            } else if (capType == "ai") {
                captchaToken = await captchaAi('6LfXd98eAAAAANhmPaX0yBz4JMJUoNfBTjqcrzOL', 'https://labs.openai.com/api/labs/public/forms/waitlist/submissions', 'RecaptchaV2TaskProxyless', license, secretKey);
            }

            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://labs.openai.com/api/labs/public/forms/waitlist/submissions',
                    headers: {
                        "Host": "labs.openai.com",
                        "Sec-Ch-Ua": `".Not/A)Brand";v="99", "Chromium";v="103"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36",
                        "Accept": "*/*",
                        "Origin": "https://labs.openai.com",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Content-Type": "application/json",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: {
                        "email": email,
                        "first_name": firstName,
                        "last_name": lastName,
                        "twitter": null,
                        "instagram": null,
                        "linkedin" : null,
                        "persona" : persona,
                        "recaptcha": captchaToken
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
                if (response.data["id"] != null){
                    
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🤖 Successfully Entered DALL-E 2.0 Waitlist 🤖')
                        .addField('Site', 'OpenAI', true)
                        .addField('Mode', 'Requests', true)
                        .addField('Persona', persona.substring(0, 1).toUpperCase() + persona.substring(1))
                        .addField('Email', '||' + email + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://avatars.githubusercontent.com/u/14957082?s=200&v=4')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    await hook.send(embed);
                    await grabAnalytics(hostHeader, license, secretKey, "Add")

                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR JOINING WAITLIST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                }
            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                setTimeout(() => {
                    return runOfficial();
                }, 5000)
            }
        }
    }
    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🤖 Successfully Entered DALL-E 2.0 Waitlist 🤖')
            .addField('Site', 'OpenAI', true)
            .addField('Mode', 'Requests', true)
            .addField('Entries', JSON.stringify(emailList.length), true)
            .setColor(webhookColor)
            .setThumbnail('https://avatars.githubusercontent.com/u/14957082?s=200&v=4')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);
    }
}

module.exports = {dalleAI}