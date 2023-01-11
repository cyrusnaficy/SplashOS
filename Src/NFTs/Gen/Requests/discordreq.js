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

async function discordRequests(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);
    let capType = ""
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
    const verifyTask = prompt("Phone or Email Verification (phone/email): ".cyan.bold);
    if(verifyTask == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }
    const smsType = prompt("SMS Country Code (https://sms-activate.org/en/api2#getRentListAr): ".cyan.bold);
    if(smsType == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }

    if(JSON.parse(threads) > 25 && license != "7ASX-AH6M-ARYW-TDHJ") {
        console.log("You can only run 25 threads!".red.bold);
        sleep(5000);
        process.exit();
    }

    if(JSON.parse(threads) > 100 && license == "7ASX-AH6M-ARYW-TDHJ") {
        console.log("You can only run 100 threads Slik!".red.bold);
        sleep(5000);
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
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
            const monthsz = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
            const dayz = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
            const yearz = ["1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1986", "1987", "1987", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1995"]
            const months = monthsz[Math.floor(Math.random() * monthsz.length)]
            const days = dayz[Math.floor(Math.random() * dayz.length)]
            const years = yearz[Math.floor(Math.random() * yearz.length)]
            var username = fakerator.lorem.word() + fakerator.lorem.word() + JSON.stringify(Math.floor((Math.random() * 800) + 130))

            console.log('TASK STATUS: '.bold + 'GENERATING COOKIES'.yellow.bold);

            generateCookies();
            async function generateCookies() {
                try {
                    const response = await axios({
                        method: "GET",
                        url: 'https://discord.com/register',
                        headers: {
                            "Host": "discord.com",
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Upgrade-Insecure-Requests": 1,
                            "Sec-Fetch-Dest": "document",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-User": "?1",
                            "Dnt": 1
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

                    if (response.headers['set-cookie']) {
                        const __dcfduid = response.headers['set-cookie'][0].slice(10, -98);
                        const __sdcfduid = response.headers['set-cookie'][1].slice(11, -98);
                        console.log('TASK STATUS: '.bold + 'GENERATING FINGERPRINT'.yellow.bold);
                        genFingerprint(__dcfduid, __sdcfduid);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING COOKIES'.red.bold);
                        setTimeout(() => {
                            return generateCookies();
                        }, 5000)
                    }
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return generateCookies();
                    }, 5000)
                }
            }

            async function genFingerprint(__dcfduid, __sdcfduid) {
                try {
                    const response = await axios({
                        method: "GET",
                        url: 'https://discord.com/api/v9/experiments',
                        headers: {
                            "Host": "discord.com",
                            "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}`,
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Upgrade-Insecure-Requests": 1,
                            "Sec-Fetch-Dest": "document",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-User": "?1",
                            "Dnt": 1
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

                    if (response.data.fingerprint) {
                        const fingerprint = response.data.fingerprint
                        console.log('TASK STATUS: '.bold + 'REQUESTING EMAIL'.magenta.bold)
                        getEmail(__dcfduid, __sdcfduid, fingerprint);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING FINGERPRINT'.red.bold);
                        setTimeout(() => {
                            return genFingerprint(__dcfduid, __sdcfduid);
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return genFingerprint(__dcfduid, __sdcfduid);
                    }, 5000)
                }
            }

            async function getEmail(__dcfduid, __sdcfduid, fingerprint) {
                try {
                    const response = await axios({
                        method: "GET",
                        url: `http://api.kopeechka.store/mailbox-get-email?site=discord.com&mail_type=OUTLOOK&sender=noreply@discord.com&token=${credentials.kopeechka}&soft=17355&type=$JSON&subject=Discord&api=2.0`,
                        headers: {
                            "Content-Type": "application/json",
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0"
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
                    if(response) {
                        const email = response.data.mail;
                        const id = response.data.id;
                        console.log('TASK STATUS: '.bold + 'SOLVING HCAPTCHA'.cyan.bold)
                        initialRegister(__dcfduid, __sdcfduid, fingerprint, email, id);
                    }
                } catch (e) {
                    console.log("TASK STATUS: ".bold + "ERR GETTING EMAIL".red.bold);
                    setTimeout(() => {
                        return getEmail(__dcfduid, __sdcfduid, fingerprint);
                    }, 5000)
                }
            }

            async function initialRegister(__dcfduid, __sdcfduid, fingerprint, email, id) {

                var captchaToken = "";


                if (capType == "2captcha") {
                
                    captchaToken = await solveTwoCap('hcaptcha', '4c672d35-0701-42b2-88c3-78380b0db560', 'https://discord.com/register');
                
                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                
                } else if (capType == "ai") {
                    captchaToken = await captchaAi('4c672d35-0701-42b2-88c3-78380b0db560', 'https://discord.com/register', 'HCaptchaTaskProxyless', license, secretKey);
                }

                try {
                    const response = await axios({
                        method: "POST",
                        url: 'https://discord.com/api/v9/auth/register',
                        headers: {
                            "Host": "discord.com",
                            "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}`,
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Content-Type": "application/json",
                            "X-Super-Properties": "eyJvcyI6Ik1hYyBPUyBYIiwiYnJvd3NlciI6IkZpcmVmb3giLCJkZXZpY2UiOiIiLCJzeXN0ZW1fbG9jYWxlIjoiZW4tVVMiLCJicm93c2VyX3VzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMC4xNTsgcnY6MTAxLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvMTAxLjAiLCJicm93c2VyX3ZlcnNpb24iOiIxMDEuMCIsIm9zX3ZlcnNpb24iOiIxMC4xNSIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxMzIzMjAsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
                            "X-Fingerprint": fingerprint,
                            "X-Discord-Locale": " en-US",
                            "X-Debug-Options": "bugReporterEnabled",
                            "Origin": "https://discord.com",
                            "Referer": "https://discord.com/register",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "same-origin",
                            "Dnt": 1,
                            "Te": "trailers"
                        },
                        data: {
                            "fingerprint": this.fingerprint,
                            "email": email,
                            "username": username,
                            "password": password,
                            "invite": null,
                            "consent": true,
                            "date_of_birth": `${years}-${months}-${days}`,
                            "gift_code_sku_id": null,
                            "captcha_key": captchaToken,
                            "promotional_email_opt_in": false
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
                    if (response.data.token) {
                        console.log('TASK STATUS: '.bold + 'VERIFYING EMAIL'.cyan.bold);
                        const discordToken = response.data.token
                        verifyEmail(__dcfduid, __sdcfduid, fingerprint, discordToken, email, id)
                    }
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return initialRegister(__dcfduid, __sdcfduid, fingerprint);
                    }, 5000)
                }
            }

            async function verifyEmail(__dcfduid, __sdcfduid, fingerprint, discordToken, email, id) {
                try {
                    const response = await axios({
                        method: 'GET',
                        url: `http://api.kopeechka.store/mailbox-get-message?id=${id}&token=${credentials.kopeechka}&type=$TYPE&api=2.0`,
                        headers: {
                            "Content-Type": "application/json",
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0"
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
                    if(response) {
                        if(response.data.value == 'WAIT_LINK') {
                            setTimeout(() => {
                                return verifyEmail(__dcfduid, __sdcfduid, fingerprint, discordToken, email, id);
                            }, 5000)
                        } else {
                            var verificationLink = response.data.value;
                            console.log('TASK STATUS: '.bold + 'GOT VERIFICATION LINK'.cyan.bold);
                            verifyEmailTwo(__dcfduid, __sdcfduid, fingerprint, discordToken, verificationLink);
                        }
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return verifyEmail(__dcfduid, __sdcfduid, fingerprint, discordToken, email, id);
                    }, 5000)
                }
                 
            }

            async function verifyEmailTwo(__dcfduid, __sdcfduid, fingerprint, discordToken, verificationLink) {
                try {
                    const repsonse = await axios({
                        method: 'GET',
                        url: verificationLink,
                        headers: {
                            "Host": "click.discord.com",
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Upgrade-Insecure-Requests": 1,
                            "Sec-Fetch-Dest": "document",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-User": "?1",
                            "Dnt": 1,
                            "Te": "trailers"
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
                    if(repsonse.request.res.responseUrl) {
                        let emailVerificationToken = repsonse.request.res.responseUrl;
                        const emailVerificationTokenForCaptcha = repsonse.request.res.responseUrl;
                        emailVerificationToken = emailVerificationToken.split("=");
                        emailVerificationToken = emailVerificationToken[1]
                        verifyEmailThree(__dcfduid, __sdcfduid, fingerprint, discordToken, emailVerificationToken, emailVerificationTokenForCaptcha);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR VERIFYING EMAIL'.red.bold);
                        setTimeout(() => {
                            return verifyEmailTwo(__dcfduid, __sdcfduid, fingerprint, discordToken, verificationLink);
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return verifyEmailTwo(__dcfduid, __sdcfduid, fingerprint, discordToken, verificationLink);
                    }, 5000)
                }
            }

            async function verifyEmailThree(__dcfduid, __sdcfduid, fingerprint, discordToken, emailVerificationToken, emailVerificationTokenForCaptcha) {

                var captchaToken = "";


                if (capType == "2captcha") {
                
                    captchaToken = await solveTwoCap('hcaptcha', 'f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34', 'https://discord.com/verify');
                
                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                
                } else if (capType == "ai") {
                    captchaToken = await captchaAi('f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34', 'https://discord.com/verify', 'HCaptchaTaskProxyless', license, secretKey);
                }

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://discord.com/api/v9/auth/verify',
                        headers: {
                            "Host": "discord.com",
                            "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}`,
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0",
                            "Accept": "*/*",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Content-Type": "application/json",
                            "Authorization": discordToken,
                            "X-Super-Properties": "eyJvcyI6Ik1hYyBPUyBYIiwiYnJvd3NlciI6IkZpcmVmb3giLCJkZXZpY2UiOiIiLCJzeXN0ZW1fbG9jYWxlIjoiZW4tVVMiLCJicm93c2VyX3VzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMC4xNTsgcnY6MTAxLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvMTAxLjAiLCJicm93c2VyX3ZlcnNpb24iOiIxMDEuMCIsIm9zX3ZlcnNpb24iOiIxMC4xNSIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxMzIzMjAsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
                            "X-Discord-Locale": "en-US",
                            "X-Debug-Options": "bugReporterEnabled",
                            "Origin": "https://discord.com",
                            "Referer": "https://discord.com/verify",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "same-origin",
                            "Dnt": 1,
                            "Te": "trailers"
                        },
                        data: {
                            "token": emailVerificationToken,
                            "captcha_key": captchaToken
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

                    if(response.data) {

                        if(verifyTask.charAt(0) == 'p' || verifyTask.charAt(0) == 'P' ) {
                            console.log('TASK STATUS: '.bold + 'VERIFIED EMAIL SUCCESS'.cyan.bold)
                            requestSMS(__dcfduid, __sdcfduid, fingerprint, discordToken, emailVerificationToken, emailVerificationTokenForCaptcha);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED TOKEN'.green.bold)
                            const hook = new Webhook(credentials.discordWebhook);
    
                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);
    
                            const embed = new MessageBuilder()
                                .addField('Site', '❓ Secret Module ❓', true)
                                .addField('Mode', 'Requests', true)
                                .addField('Verification', 'Email', true)
                                .addField('T0k@n', '||' + discordToken + '||', true)
                                .setColor(webhookColor)
                                .setThumbnail('https://media.discordapp.net/attachments/935556275696185454/987111237777231902/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934_1.jpg?width=1537&height=1025')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();
    
                            await hook.send(embed);
                            await masterLog(secretKey, "Email");
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(discordToken, "", null);
                            
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000) 

                        }
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return verifyEmailThree(__dcfduid, __sdcfduid, fingerprint, discordToken, emailVerificationToken, emailVerificationTokenForCaptcha)
                    }, 5000)
                }
            }

            async function requestSMS(__dcfduid, __sdcfduid, fingerprint, discordToken, emailVerificationToken, emailVerificationTokenForCaptcha) {

                var captchaToken = "";


                if (capType == "2captcha") {
                
                    captchaToken = await solveTwoCap('hcaptcha', 'f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34', 'https://discord.com/channels/@me');
                
                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                
                } else if (capType == "ai") {
                    captchaToken = await captchaAi('f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34', 'https://discord.com/channels/@me', 'HCaptchaTaskProxyless', license, secretKey);
                }
            
                try {
                    const balance = await smsActivate.getBalance();
                    if (balance > 0) {
                        const numberDetails = await smsActivate.getNumber('ds', JSON.parse(smsType));
                        console.log('TASK STATUS: '.bold + 'GOT PHONE NUMBER'.magenta.bold);
                        await smsActivate.setStatus(numberDetails.id, 6);
                        const numberid = JSON.stringify(numberDetails.number)
                        const response = await axios({
                            method: 'POST',
                            url: 'https://discord.com/api/v9/users/@me/phone',
                            headers: {
                                "Host": "discord.com",
                                "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}; OptanonConsent=isIABGlobal=false&datestamp=${Date.now()}&version=6.33.0&hosts=&landingPath=https://discord.com/&groups=C0001; locale=en-US`,
                                "Content-Length": "4692",
                                "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                                "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMy4wLjUwNjAuMTM0IFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIxMDMuMC41MDYwLjEzNCIsIm9zX3ZlcnNpb24iOiIxMCIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxMzg3MzQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
                                "X-Debug-Options": "bugReporterEnabled",
                                "Sec-Ch-Ua-Mobile": "?0",
                                "Authorization": discordToken,
                                "Content-Type": "application/json",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                                "X-Discord-Locale": "en-US",
                                "Sec-Ch-Ua-Platform": '"Windows"',
                                "Accept": "*/*",
                                "Origin": "https://discord.com",
                                "Sec-Fetch-Site": "same-origin",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Dest": "empty",
                                "Referer": "https://discord.com/channels/@me",
                                "Accept-Encoding": "gzip, deflate",
                                "Accept-Language": "en-US,en;q=0.9",
                            },
                            data: {
                                "phone": `+${numberid}`,
                                "captcha_key": captchaToken,
                                "change_phone_reason": "user_action_required"
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
                        if(response.status == 204) {
                            console.log('TASK STATUS: '.bold + 'WAITING FOR SMS CODE'.cyan.bold);
                            const waitForCode = setInterval(async () => {
                                const code = await smsActivate.getCode(numberDetails.id);
                                if (code) {
                                  clearInterval(waitForCode);
                                  await smsActivate.setStatus(numberDetails.id, 6);
                                  verifySMSCode(__dcfduid, __sdcfduid, fingerprint, discordToken, numberid, code);
                                }
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'INVALID REQUEST RESPONSE'.red.bold);
                            setTimeout(() => {
                                return requestSMS(__dcfduid, __sdcfduid, fingerprint, discordToken, emailVerificationToken, emailVerificationTokenForCaptcha);
                            }, 5000)
                        }
                    }
    
                } catch (e) {
                    console.log(e);
                    setTimeout(() => {
                        return requestSMS(__dcfduid, __sdcfduid, fingerprint, discordToken, emailVerificationToken, emailVerificationTokenForCaptcha);
                    }, 5000)
                }
            }

            async function verifySMSCode(__dcfduid, __sdcfduid, fingerprint, discordToken, numberid, code) {
                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://discord.com/api/v9/phone-verifications/verify',
                        headers: {
                            "Host": "discord.com",
                            "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}`,
                            "Content-Length": "4692",
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMy4wLjUwNjAuMTM0IFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIxMDMuMC41MDYwLjEzNCIsIm9zX3ZlcnNpb24iOiIxMCIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxMzg3MzQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
                            "X-Debug-Options": "bugReporterEnabled",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Authorization": discordToken,
                            "Content-Type": "application/json",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "X-Discord-Locale": "en-US",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Accept": "*/*",
                            "Origin": "https://discord.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://discord.com/channels/@me",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        data: {
                            "phone": `+${numberid}`,
                            "code": code
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
                    const dayta = response.data
                    const regex = /token/
                    const found = regex.test(dayta);
                    if(found) {

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED TOKEN'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .addField('Site', '❓ Secret Module ❓', true)
                            .addField('Mode', 'Requests', true)
                            .addField('Verification', 'Email and Phone', true)
                            .addField('T0k@n', '||' + discordToken + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://media.discordapp.net/attachments/935556275696185454/987111237777231902/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934_1.jpg?width=1537&height=1025')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey, "Email and Phone");
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await logFileCreds(discordToken, "", null);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000) 

                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                        setTimeout(() => {
                            return verifySMSCode(__dcfduid, __sdcfduid, fingerprint, discordToken, numberid, code);
                        }, 5000) 
                    }
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return verifySMSCode(__dcfduid, __sdcfduid, fingerprint, discordToken, numberid, code);
                    }, 5000) 
                }
            }
        }
    }
    async function masterLog(secretKey, type) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .addField('Site', '❓ Secret Module ❓', true)
            .addField('Mode', 'Requests', true)
            .addField('Verification', type)
            .setColor(webhookColor)
            .setThumbnail('https://media.discordapp.net/attachments/935556275696185454/987111237777231902/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934_1.jpg?width=1537&height=1025')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);
    }
}

module.exports = {discordRequests}