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

async function discordSendMessage(license, secretKey, hostHeader) {
        
    const serverID = prompt("What is the Server ID you wish to send your message in: ".cyan.bold);
    const channelID = prompt("What is the Channel ID you wish to send your message in: ".cyan.bold);
    const messageContent = prompt("What message do you wish to send: ".cyan.bold);

    await masterLog(secretKey);
    await masterLogAdmin(license, secretKey);
    runOfficial();
    async function runOfficial() {

        const tokenList = fs
            .readFileSync("./Storage/Accounts/discordtokens.txt", "utf8")
            .split("\n")
            .filter(String);
        
        if(tokenList.length > 30) {
            console.log("Max tokens at a time is 30. Please update list!".red.bold);
            sleep(2000);
            process.exit();
        }

        for (let i = 0; i < tokenList.length; i++) {

            console.log('TASK STATUS: '.bold + 'GENERATING COOKIES'.yellow.bold);

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
                        sendMessage(__sdcfduid, __dcfduid)
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

            async function sendMessage(__sdcfduid, __dcfduid) {
                try {
                    const response = await axios({
                        method: "POST",
                        url: `https://discord.com/api/v9/channels/${channelID}/messages`,
                        headers: {
                            "Host": "discord.com",
                            "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}; OptanonConsent=isIABGlobal=false&datestamp=${Date.now()}&version=6.33.0&hosts=&landingPath=https://discord.com/&groups=C0001; locale=en-US;`,
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMy4wLjUwNjAuMTM0IFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIxMDMuMC41MDYwLjEzNCIsIm9zX3ZlcnNpb24iOiIxMCIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxMzg3MzQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
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
                            "Referer": `https://discord.com/channels/${serverID}/${channelID}`,
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        data: {
                            content: messageContent,
                            nonce: "",
                            tts: false,
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
                    if(response.data.content) {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY SENT MESSAGE'.green.bold);
                        await grabAnalytics(hostHeader, license, secretKey, "Add");
                    } else {
                        console.log('TASK STATUS: '.bold + 'FAILED TO SEND MESSAGE'.red.bold);
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
        }
    }
    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .addField('Site', '❓ Secret Module ❓', true)
            .addField('Mode', 'Whitelist', true)
            .addField('Type', 'Send Message')
            .setColor(webhookColor)
            .setThumbnail('https://media.discordapp.net/attachments/935556275696185454/987111237777231902/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934_1.jpg?width=1537&height=1025')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);
    }

}

module.exports = { discordSendMessage }