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

async function shopifyRequests(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);
    const shopifydomain = prompt('Base Shopify URL: '.cyan.bold)
    const captchaBypass = prompt("Captcha Bypass (yes/no): ".cyan.bold);
    if(captchaBypass == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }
    var capType = "";
    if(captchaBypass.charAt(0) == 'n' || captchaBypass.charAt(0) == 'N') {
        const captchaTypeRes = prompt("2Captcha or AI: ".cyan.bold);
        if (captchaTypeRes.charAt(0) == '2' || captchaTypeRes.charAt(0) == 't' || captchaTypeRes.charAt(0) == 'T') {
            capType = "2captcha";
        } else {
            capType = "ai";
        }
    }

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
            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

            if (captchaBypass.charAt(0) == 'y' || captchaBypass.charAt(0) == 'Y') {
                var data = {
                    "form_type": "create_customer",
                    "utf8": "✓",
                    "customer[first_name]": firstName,
                    "customer[last_name]": lastName,
                    "customer[email]": email,
                    "customer[password]": password,
                }
            } else {

                var captchaToken = "";


                if (capType == "2captcha") {

                    captchaToken = await solveTwoCap('recaptcha', '6LcCR2cUAAAAANS1Gpq_mDIJ2pQuJphsSQaUEuc9', `https://${shopifydomain}/account/register`);

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                } else if (capType == "ai") {
                    captchaToken = await captchaAi('6LcCR2cUAAAAANS1Gpq_mDIJ2pQuJphsSQaUEuc9', `https://${shopifydomain}/account/register`, 'RecaptchaV3TaskProxyless', license, secretKey);
                }

                var data = {
                    "form_type": "create_customer",
                    "utf8": "✓",
                    "customer[first_name]": firstName,
                    "customer[last_name]": lastName,
                    "customer[email]": email,
                    "customer[password]": password,
                    "recaptcha-v3-token": captchaToken
                }
            }
            try {
                const response = await axios({
                    method: "POST",
                    url: `https://${shopifydomain}/account`,
                    headers: {
                        "Host": shopifydomain,
                        "Cache-Control": "max-age=0",
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="101"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": `"macOS"`,
                        "Upgrade-Insecure-Requests": 1,
                        "Origin": `https://${shopifydomain}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Referer": `https://${shopifydomain}/account/register`,
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9"
                    },
                    data: qs.stringify(data),
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

                if (response.request.res.responseUrl == 'https://kith.com/') {
                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                    const hook = new Webhook(credentials.discordWebhook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🛍️ Successfully Generated 🛍️')
                        .addField('Site', 'Shopify', true)
                        .addField('Mode', 'Requests-Bypass', true)
                        .addField('Email', '||' + email + '||')
                        .addField('Password', '||' + password + '||', true)
                        .addField('Substore', shopifydomain)
                        .addField('Format', '||' + email + ':' + password + '||')
                        .setColor(webhookColor)
                        .setThumbnail('https://www.joykal.com/wp-content/uploads/2019/09/s-1.png')
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
                    console.log("TASK STATUS: ".bold + "FAILED TO GENERATE ACCOUNT".red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                }
            } catch (e) {
                console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
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
            .setTitle('🛍️ Successfully Generated 🛍️')
            .addField('Site', 'Shopify', true)
            .addField('Mode', 'Requests-Bypass', true)
            .addField('Substore', shopifydomain)
            .setColor(webhookColor)
            .setThumbnail('https://www.joykal.com/wp-content/uploads/2019/09/s-1.png')
            .setDescription('')
            .setImage('')
            .setTimestamp();

        hook.send(embed);

    }
}

module.export = {shopifyRequests}