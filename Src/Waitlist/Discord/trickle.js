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

async function trickleBot(license, secretKey, hostHeader) {

    runOfficial();
    async function runOfficial() {

        const tokenList = fs
            .readFileSync("./Storage/Accounts/discordtokens.txt", "utf8")
            .split("\n")
            .filter(String);

        await masterLog(secretKey);
        await masterLogAdmin(license, secretKey);

        for (let i = 0; i < tokenList.length; i++) {

            console.log('TASK STATUS: '.bold + 'GENERATING DISCORD SESSION COOKIES'.yellow.bold);

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const list = fs
                .readFileSync("./Storage/proxies.txt", "utf8")
                .split("\n")
                .filter(String);
            const raw = random(list);
            const splitproxy = raw.split(":");

            const discordToken = tokenList[i];

            generateCookies();
            async function generateCookies() {
                try {
                    const response = await axios({
                        method: "GET",
                        url: "https://discord.com/register",
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
                        console.log('TASK STATUS: '.bold + 'GENERATING TRICKLE AUTH TOKEN '.yellow.bold);
                        loginToken(__sdcfduid, __dcfduid)
                    } else {
                        console.log("TASK STATUS: ".bold + "FAILED TO GENERATE COOKIES".red.bold);
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

            async function loginToken(__sdcfduid, __dcfduid) {
                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://discord.com/api/v9/oauth2/authorize?client_id=812484128376881153&response_type=code&redirect_uri=https%3A%2F%2Ftrickle.bot%2Fapi%2Fauth%2Fcallback&scope=identify%20email%20guilds%20guilds.join",
                        headers: {
                            "Host": "discord.com",
                            "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}`,
                            "Content-Length": "36",
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMy4wLjUwNjAuMTM0IFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIxMDMuMC41MDYwLjEzNCIsIm9zX3ZlcnNpb24iOiIxMCIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiJodHRwczovL3RyaWNrbGUuYm90LyIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6InRyaWNrbGUuYm90IiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTM4NzM0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
                            "X-Debug-Options": "bugReporterEnabled",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Authorization": discordToken.replace('\r', ''),
                            "Content-Type": "application/json",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "X-Discord-Locale": "en-US",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Accept": "*/*",
                            "Origin": "https://discord.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://discord.com/oauth2/authorize?client_id=812484128376881153&redirect_uri=https://trickle.bot/api/auth/callback&response_type=code&scope=identify%20email%20guilds%20guilds.join",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        data: {
                            "permissions": "0",
                            "authorize": true
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
                    if (response.data) {
                        var trickleToken = response.data.location
                        console.log("TASK STATUS: ".bold + "POSTING TRICKLE AUTH TOKEN".cyan.bold);
                        postToken(trickleToken);
                    } else {
                        console.log("TASK STATUS: ".bold + "FAILED TO GENERATE TOKEN".red.bold);
                        setTimeout(() => {
                            return loginToken(__sdcfduid, __dcfduid)
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return loginToken(__sdcfduid, __dcfduid)
                    }, 5000)
                }
            }

            async function postToken(trickleToken) {
                try {
                    const response = await axios({
                        method: "GET",
                        url: trickleToken,
                        headers: {
                            "Host": "trickle.bot",
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "cross-site",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-Dest": "document",
                            "Referer": "https://discord.com/",
                            "Accept-Encoding": "gzip, deflate",
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
                        maxRedirects: 0,
                        timeout: 10000
                    })

                    if (response) {
                        console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                        setTimeout(() => {
                            return postToken(trickleToken)
                        }, 5000)
                    }

                } catch (e) {
                    if (e.response.headers['set-cookie']) {
                        var theOfficialCookie = e.response.headers['set-cookie'][0].split(';')
                        theOfficialCookie = theOfficialCookie[0] + ';'
                        console.log("TASK STATUS: ".bold + "POSTING FORM DATA".yellow.bold);
                        joinWaitlist(theOfficialCookie);
                    }
                }

            }

            async function joinWaitlist(theOfficialCookie) {
                try {
                    const response = await axios({
                        method: "PUT",
                        url: "https://trickle.bot/api/release/join-waitlist",
                        headers: {
                            "Host": "trickle.bot",
                            "Cookie": theOfficialCookie,
                            "Content-Length": "0",
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "Accept": "application/json, text/plain, */*",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://trickle.bot",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://trickle.bot/",
                            "Accept-Encoding": "gzip, deflate",
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
                    })
                    if (response.status == 200) {

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🤖 Joined Waitlist 🤖')
                            .addField('Site', 'Trickle Bot', true)
                            .addField('Secret', '||' + discordToken + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://cop.guru/wp-content/uploads/2021/01/Trickle-Bot.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")

                    } else {
                        console.log("TASK STATUS: ".bold + "FAILED TO JOIN WAITLIST".red.bold);
                        setTimeout(() => {
                            return joinWaitlist(theOfficialCookie);
                        }, 5000)
                    }
                } catch (e) {
                    console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                    setTimeout(() => {
                        return joinWaitlist(theOfficialCookie);
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
                .setTitle('🤖 Joined Waitlist 🤖')
                .addField('Site', 'Trickle Bot', true)
                .addField('Entry Count', JSON.stringify(tokenList.length))
                .setColor(webhookColor)
                .setThumbnail('https://cop.guru/wp-content/uploads/2021/01/Trickle-Bot.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }
    }
}

module.exports = {trickleBot}