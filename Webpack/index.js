const {
    createCursor
} = require("ghost-cursor");
const {
    processes: getProcesses, processes
} = require("systeminformation");
const path = require("path");
const bytenode = require('bytenode');
var colors = require('colors');
const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')
var ip = require('ip');
const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
const axios = require('axios-https-proxy-fix')
var CryptoJS = require("crypto-js");
const fs = require("fs");
const {
    getHWID
} = require("hwid");
const credentials = JSON.parse(fs.readFileSync('./Storage/configs.json', 'utf-8'));
const version = JSON.parse(fs.readFileSync('../app.json', 'utf-8'));
const puppeteer = require('puppeteer-extra')
require('puppeteer-extra-plugin-stealth/evasions/chrome.app')
require('puppeteer-extra-plugin-stealth/evasions/chrome.csi')
require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes')
require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime')
require('puppeteer-extra-plugin-stealth/evasions/defaultArgs') // pkg warned me this one was missing
require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow')
require('puppeteer-extra-plugin-stealth/evasions/media.codecs')
require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')
require('puppeteer-extra-plugin-stealth/evasions/navigator.languages')
require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions')
require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins')
require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')
require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver')
require('puppeteer-extra-plugin-stealth/evasions/sourceurl')
require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor')
require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const {parse: parseUrl} = require("url");
const {
    DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
} = require('puppeteer')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();
const states = require('us-state-converter')
const chromePaths = require('chrome-paths');
var prompt = require('prompt-sync')();
var HttpsProxyAgent = require('https-proxy-agent');
const cheerio = require('cheerio');
const qs = require('qs');
const moment = require('moment');
const Captcha = require("2captcha")
const solver = new Captcha.Solver(credentials.twocap);
const SMSActivate = require('sms-activate-new');
const smsActivate = new SMSActivate(credentials.smsactivate);
var Imap = require('imap'),
inspect = require('util').inspect;
const setTitle = require('node-bash-title');
setTitle('💧 SplashAIO');
let successCount = 0;
var emoji = require('node-emoji');
var urlencode = require('urlencode');
const ethers = require('ethers')
const editJsonFile = require("edit-json-file");
const capmonster = require('capmonster');
const { id } = require("ethers/lib/utils");
const captcha = new capmonster(credentials.capmonster);
const { v4: uuidv4, v4 } = require('uuid');
const zipState = require('zip-state');

const webhookIMG = 'https://pbs.twimg.com/profile_images/1561249282652483584/Lx54N8es_400x400.jpg'
const webhookColor = '#1c48a8'


process.title = `[200][Splash AIO] | Success Count: 0 | Server Connection: 200 | Total Proxies:  `;

puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: credentials.twocap // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
        },
        visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
)

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

/*
Listing all of the imports above. All of the imports which will be used in 
the program are included above before the first
function.
*/
async function runBot() {


    /*
    This function is in charge of all the security aspects of the program. 
    It will run upon starting the bot, and sniffing will repeat
    every other millisecond to assure safety. It will also filter 
    blacklisted IP's and HWID's .
    */
    async function securityCheck() {

        await checkForTerms();
        async function checkForTerms() {

            const theTermsFileOfficial = JSON.parse(fs.readFileSync(`./Storage/Accounts/Cookies/sessionStorage.json`, 'utf-8'));
            const theTermsFile = editJsonFile(`./Storage/Accounts/Cookies/sessionStorage.json`);

            if(theTermsFileOfficial.ndatos == false) {

                const browser = await puppeteer.launch({headless: false, args: ['--start-maximized', "--disable-blink-features"], executablePath: chromePaths.chrome});

                try {
                    var [page] = await browser.pages();
                    await page.goto("https://drive.google.com/file/d/1H-p8POIQHKfPXRiRECjePRU40C8-xs_E/view?usp=sharing");

                    const promptResponse = prompt("Do you agree to our NDA? (Y/N): ".yellow.bold);
                    if(promptResponse.charAt(0) == "Y" || promptResponse.charAt(0) == "y") {
                        await browser.close();
                        theTermsFile.set("ndatos", true);
                        theTermsFile.save();
                    } else {
                        console.log("Error: You must agree to our NDA to use this program.".red.bold);
                        sleep(2000);
                        process.exit();
                    }
                } catch(e) {
                    console.log("Error: You must keep the browser open until it automatically closes.".red.bold);
                    sleep(2000);
                    process.exit();
                }
            }
        }

        //Listing user IP and HWID
        const hardwareID = await getHWID();
        const userIP = ip.address();

        async function checkForBlacklist() {

            const blacklistip = [""]
            const blacklisthwid = [""]
            const securityType = "Blacklist";
            /*
            If statements to check if the HWID and IP being used matches
            any of the blacklisted HWID's or IP's. If it does, then the
            bot will send a hook to our security.
            */
            if (blacklistip.includes(userIP)) {
                await sendHook(securityType);
                console.log('You Are Terminated From Our Software Due to Misuse'.red.bold);
                sleep(2000);
                process.exit();
            }
            if (blacklisthwid.includes(hardwareID)) {
                await sendHook(securityType);
                console.log('You Are Terminated From Our Software Due to Misuse'.red.bold);
                sleep(2000);
                process.exit();
            }

        }

        async function sniffCheck() {

            /*
            This function is in charge of sniffing the network. It will
            repeat every other millisecond to assure safety.
            */

            const securityType = "Sniff";

            //List of prohibeted processes.
            const filter = [
                "fiddler.exe", "fiddler everywhere",
                "tcpview.exe", "smsniff.exe",
                "socketsniff.exe", "charles.exe",
                "mitmweb.exe", "mitmdump.exe",
                "burpsuite.exe", "burp.exe",
                "fiddle everywhere.exe", "ghidra.exe",
                "fiddle.exe", "wireshark.exe", "ilspy.exe",
            ];
            const processes = await getProcesses();
            //Grabbing all processes
            for (let i = 0; processes.list.length > i; i++) {
                if (filter.includes(processes.list[i].name.toLowerCase())) {
                    /*
                    For each illigal process, one webhook will be sent with the sniff 
                    parameter. When this happens, the user will be terminated. 
                    */
                    await sendHook(securityType);
                    if (credentials.license) {
                        await deleteKey(credentials.license)
                    }
                    sleep(2000);
                    process.exit();
                }
            }
            //Sleeping before retrying again
            setTimeout(function() {
                return sniffCheck();
            }, 2000);
        }

        async function deleteKey(key) {
            /*
            Encrypted Server URL. Once it is decrypted by key, it will be sent back to the function
            and authed.
            */
            let authURL = await stringDecryption('U2FsdGVkX1+eUvoDpMR52OAwgT4KNlUB5+tFNiGVbwCLVIRsSWKWYFZa1ljiTTuFZTduaS6ZX6Kn9rg/q0p0f3MS64SzizdZB2bc2i3wZug=');
            const hostHeader = await stringDecryption('U2FsdGVkX1/4PKB6YrQuRyeOM3x+sHnDZIFRIvGLq0CZmwGQi5XzOCe7E1dIeWpX')
            try {
                //Sending a POST request
                const response = await axios({
                    method: 'POST',
                    url: authURL,
                    headers: {
                        'Host': hostHeader,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Accept-Encoding": "gzip, deflate",
                        "Upgrade-Insecure-Requests": 1,
                        "Sec-Fetch-Dest": "document",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-User": "?1",
                        "Dnt": 1,
                        "Te": "Trailers",
                    },
                    data: {
                        "license": key
                    },
                });
                if (response.data) {}
            } catch (e) {}
        }

        async function authCheck() {

            /*
            Encrypted Server URL. Once it is decrypted by key, it will be sent back to the function
            and authed.
            */
            let authUrl = await stringDecryption('U2FsdGVkX1/HGq/M6Qd0uQznePQYBtb+K4fgV8tBQfVce1CA5GD/lZ5xr/w6oyLhKo9Wim0rodR+kmSFtKqR57lSJjQsQra6h7EZuwKQ/xM=');
            const hostHeader = await stringDecryption('U2FsdGVkX1/4PKB6YrQuRyeOM3x+sHnDZIFRIvGLq0CZmwGQi5XzOCe7E1dIeWpX')
            try {
                // Send a POST request
                const response = await axios({
                    method: 'POST',
                    url: authUrl,
                    headers: {
                        'Host': hostHeader,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Accept-Encoding": "gzip, deflate",
                        "Upgrade-Insecure-Requests": 1,
                        "Sec-Fetch-Dest": "document",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-User": "?1",
                        "Dnt": 1,
                        "Te": "Trailers",
                    },
                    data: {
                        //Payload is required
                        "license": credentials.license,
                        "hwid": hardwareID,
                    }
                });
                if (response.data && response.data.status != "error") {
                    let decryptedAuth = await stringDecryption(response.data)
                    decryptedAuth = JSON.parse(decryptedAuth);
                    if(decryptedAuth.data.discordUser) {
                        var discordUsername = decryptedAuth.data.discordUser
                        var authNode = decryptedAuth.data.node
                        console.log("Starting CLI... 🚀".bold);
                        decryptSecretKey(credentials.license, hostHeader, discordUsername, authNode);
                    } else {
                        console.log("Error Authenticating".red.bold);
                        sleep(2000);
                        process.exit();
                    }
                } else {
                    console.log("Error Authenticating".red.bold);
                    sleep(2000);
                    process.exit();
                }
            } catch (e) {
                console.log("Error Authenticating".red.bold);
                sleep(2000);
                process.exit();
            }
        }

        async function decryptSecretKey(license, hostHeader, discordUsername, authNode) {
            /*
            Recieves the license and host header from the function above. Then it applies it to the secret key. This
            allows to encrypt further methods.
            */
            const decryptionURL = await stringDecryption('U2FsdGVkX19CmEsUxZqLOG0BK5HONxIJFWCpy1bLc52eHkHweQmw4XLn+5HN/u5icduh5UzORI7+u+k4SaCZ5dx/dASVC3OZScHs9/yOVjA=')
            try {
                const response = await axios({
                    method: 'POST',
                    url: decryptionURL,
                    headers: {
                        //Same header passed as a parameter.
                        'Host': hostHeader,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Accept-Encoding": "gzip, deflate",
                        "Upgrade-Insecure-Requests": 1,
                        "Sec-Fetch-Dest": "document",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-User": "?1",
                        "Dnt": 1,
                        "Te": "Trailers",
                    },
                    data: {
                        "license": license,
                        "hwid": hardwareID,
                        "node": authNode
                    }
                });
                if (response.data.status == "success") {
                    var secretKey = response.data.key
                    launchCLI(secretKey, discordUsername, hostHeader, license);
                } else {
                    await sendHook("Decryption Failed In Bot");
                    sleep(2000);
                    process.exit();
                }
            } catch (e) {
                await sendHook("Decryption Failed In Bot");
                sleep(2000);
                process.exit();
            }
        }

        async function stringDecryption(encryptedMessage) {
            /*
            Decyrpts the string using the key. Then returns the string
            back to the function to get executed.
            */
            var bytes = CryptoJS.AES.decrypt(encryptedMessage, paramLength);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);

            return originalText;
        }

        await checkForBlacklist();
        sniffCheck();
        //Delay below is to allow the first security check to go through
        setTimeout(function() {
            authCheck();
        }, 2000);
    }

    async function secretStringDecryption(encryptedMessage, secretKey) {
        /*
        Decyrpts the string using the key. Then returns the string
        back to the function to get executed.
        */
        var bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        return originalText;
    }

    async function grabAnalytics(hostHeader, license, secretKey, type) {

        const proxyList = fs
        .readFileSync("./Storage/proxies.txt", "utf8")
        .split("\n")
        .filter(String);

        successCount = successCount + 1;
        process.title = `[200][Splash AIO] | Success Count: ${JSON.stringify(successCount)} | Server Connection: 200 | Total Proxies: ${proxyList.length}`;

        const decryptionURL = await secretStringDecryption('U2FsdGVkX1/0ZlV22C4nTrJnYWQYnj8ON7EWSHrtpEtZ4vXktfEzvsyN9ODnpFvx1KRWNbHzs8ybc19POYTZ52a7qvkB1lOnfZSuwPHOn/I=', secretKey)
        try {
            const response = await axios({
                method: 'POST',
                url: decryptionURL,
                headers: {
                    //Same header passed as a parameter.
                    'Host': hostHeader,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Accept-Encoding": "gzip, deflate",
                    "Upgrade-Insecure-Requests": 1,
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-User": "?1",
                    "Dnt": 1,
                    "Te": "Trailers",
                },
                data: {
                    "license": license,
                    "type": type
                }
            });
            if (response.data.status == "success") {
                var analyticsData = response.data.data
                return analyticsData;
            } else {
                await sendHook("ErrorAPI");
                sleep(2000);
                process.exit();
            }
        } catch (e) {
            await sendHook("ErrorAPI");
            sleep(2000);
            process.exit();
        }
    }

    async function launchCLI(secretKey, discordUsername, hostHeader, license) {
        /*
        Launches CLI with key and Node which verifies
        that the key has been authenticated.
        */
        console.clear();
        //Logging logo
        console.log(`

████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░█████████░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░░░▄▀░░░░█░░▄▀░░░░░░▄▀░░█
█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░░░░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░█░░░░░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█████████░░▄▀░░█░░▄▀░░█████████░░▄▀░░█████████░░▄▀░░██░░▄▀░░█████████░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░░░░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░█░░░░░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░░░▄▀░░░░█░░▄▀░░░░░░▄▀░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
█░░░░░░░░░░░░░░█░░░░░░█████████░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░█
████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
`.cyan.bold);
        //Grabbing analytics
        var type = "Log";
        const analyticsNumber = await grabAnalytics(hostHeader, license, secretKey, type);
        await logCLILoad(license, secretKey)
        /*
        Below, what is being logged is an intro or prior start to the CLI. This will be soma analytics and
        other shit too.
        */
        console.log('');
        console.log('###############################################################################'.yellow.bold);
        console.log('');
        sleep(250);
        console.log('Loading data files... 🔄'.bold);
        sleep(250);
        console.log('Loaded configs.json, proxies.txt, emails.txt, accounts, and cookies ✅'.bold);

        /*
        Logging the amount of data files in the bot. This is found in the
        configs files and txt files.
        */
        const proxyList = fs
            .readFileSync("./Storage/proxies.txt", "utf8")
            .split("\n")
            .filter(String);
        const emailList = fs
            .readFileSync("./Storage/emails.txt", "utf8")
            .split("\n")
            .filter(String);
        console.log(`You currently have ${proxyList.length} proxies and ${emailList.length} emails loaded 📬`.bold);
        process.title = `[200][Splash AIO] | Success Count: 0 | Server Connection: 200 | Total Proxies: ${proxyList.length}`;


        console.log('')
        //Logging the discord username passed as a param
        console.log(`Welcome ${discordUsername} 🎉`.bold)
        console.log(`You are running on SplashAIO Version ${version.version} 💧'.bold`);
        console.log('');
        console.log('###############################################################################'.cyan.bold);
        console.log('');
        sleep(250);
        console.log(` 
▄▀█ █▄░█ ▄▀█ █░░ █▄█ ▀█▀ █ █▀▀ █▀
█▀█ █░▀█ █▀█ █▄▄ ░█░ ░█░ █ █▄▄ ▄█
`)
        console.log('');
        //Logging analyticsNumber which is recieved as a return from the analytics function
        console.log(`SplashAIO users have achieved ${analyticsNumber} successful tasks in the last 30 minutes 🎉`.bold);
        console.log('More information about SplashAIO success logs can be found in the Discord 📝'.bold)
        console.log('');
        console.log('SERVER STATUS: '.bold + "CONNECTED".green.bold);
        //Logging captcha status
        if (credentials.captchaAi == "") {
            console.log('CAPTCHA AI: '.bold + "NOT CONNECTED".red.bold);
        } else {
            console.log('CAPTCHA AI: '.bold + "CONNECTED".green.bold);
        }
        //Logging timestamp
        console.log(`TIMESTAMP: ${new Date()}`.bold);
        console.log('');
        console.log('###############################################################################'.yellow.bold);
        console.log('');
        console.log('Use the ⬆️  and ⬇️  arrows to navigate the menu.'.bold);
        console.log('Press enter to make your selection 🖱️'.bold);
        console.log('');
        //Running actual the CLI
        cliCategories();
        async function cliCategories() {
            /*
            This function will contain the entire CLI and all of the function calls. Any external calls will be handled 
            in external functions
            */
            async function mainPrompt() {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Module Group'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Sneakers & Retail'.yellow.bold,
                        'Account Generator'.yellow.bold,
                        'Waitlist'.yellow.bold,
                        'NFTs'.yellow.bold,
                        'Food'.yellow.bold,
                        'Misc'.yellow.bold
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Food'.yellow.bold) {
                            FoodSub();
                        } else if (this.answer1 == 'Account Generator'.yellow.bold) {
                            accountGen(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Waitlist'.yellow.bold) {
                            Waitlist(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Sneakers & Retail'.yellow.bold) {
                            checkoutSub();
                        } else if (this.answer1 == 'Misc'.yellow.bold) {
                            Misc(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'NFTs'.yellow.bold) {
                            NFTs(license, secretKey, hostHeader);
                        }
                    })
                    .catch();
            }

            async function Misc(license, secretKey, hostHeader) {

                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Task Type'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Thorne Pharmaceutical'.yellow.bold,
                        'Shell Gas'.yellow.bold,
                        'Amazon Gift Card'.yellow.bold,
                        'Beast Slapper Game'.yellow.bold,
                        'Dot Trick'.yellow.bold,
                        'Proxy Tester'.yellow.bold
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if(this.answer1 == 'Thorne Pharmaceutical'.yellow.bold) {
                            thronePharmaceutical(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Dot Trick'.yellow.bold) {
                            dotTrick(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Proxy Tester'.yellow.bold) {
                            proxyTester(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Shell Gas'.yellow.bold) {
                            shellGas(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Amazon Gift Card'.yellow.bold) {
                            amazonGiftCard(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Beast Slapper Game'.yellow.bold) {
                            slapperGame(license, secretKey, hostHeader);
                        } 
                    })
                    .catch();

            }

            async function runOutlookSub(license, secretKey, hostHeader) {

                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Task Type'.cyan.bold,
                    limit: 3,
                    initial: 1,
                    choices: [
                        'Edu Gen Outlook V1'.yellow.bold,
                        'Edu Gen Outlook V2'.yellow.bold,
                        'EDU Gen Outlook V3'.yellow.bold,
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                    })
                    .catch();

            }
            

            async function checkoutSub() {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Checkout Type'.cyan.bold,
                    limit: 2,
                    initial: 1,
                    choices: [
                        'FCFS Modules'.yellow.bold,
                        'Raffle Modules'.yellow.bold
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Raffle Modules'.yellow.bold) {
                            Raffle();
                        } else if (this.answer1 == 'FCFS Modules'.yellow.bold) {
                            FCFS();
                        }
                    })
                    .catch();
            }

            async function Raffle() {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Raffle Type'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Custom Request'.yellow.bold,
                        'Launches AIO'.yellow.bold,
                        'Travis Scott'.yellow.bold,
                        'Tom Sachs'.yellow.bold,
                        'Playstation Direct'.yellow.bold,
                        'Amazon Raffles'.yellow.bold
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Custom Request'.yellow.bold) {
                            customRequest(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Launches AIO'.yellow.bold) {
                            console.log('Coming soon'.cyan.bold);
                            sleep(2000);
                            process.exit();
                        } else if(this.answer1 == 'Travis Scott'.yellow.bold) {
                            travisScott(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Tom Sachs'.yellow.bold) {
                            tomSachs(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Playstation Direct'.yellow.bold) {
                            playstationDirect(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Amazon Raffles'.yellow.bold) {
                            amazonRaffles(license, secretKey, hostHeader);
                        }
                    })
                    .catch();
            }

            async function FCFS() {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your FCFS Type'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Amazon US'.yellow.bold,
                        'Footsites'.yellow.bold,
                        'Supreme US'.yellow.bold,
                        'Adafruit US'.yellow.bold,
                   ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Supreme US'.yellow.bold) {
                            supremeUS(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Footsites'.yellow.bold) {
                            console.log('Coming soon'.cyan.bold);
                            sleep(2000);
                            process.exit();
                        } else if (this.answer1 == 'Amazon US'.yellow.bold) {
                            amazonSafe(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Adafruit US'.yellow.bold) {
                            adafruit(license, secretKey, hostHeader);
                        }
                    })
                    .catch();
            }


            async function FoodSub() {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Food Type'.cyan.bold,
                    limit: 2,
                    initial: 1,
                    choices: [
                        'Major Loops'.yellow.bold,
                        'Birthday/Referral Rewards'.yellow.bold
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Major Loops'.yellow.bold) {
                            majorLoops(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Birthday/Referral Rewards'.yellow.bold) {
                            Food(license, secretKey, hostHeader);
                        }
                    })
                    .catch();
            }

            async function majorLoops(license, secretKey, hostHeader) {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Task Options'.cyan.bold,
                    limit: 4,
                    initial: 1,
                    choices: [
                        'Starbucks Drink/Food'.yellow.bold,
                        'AMC Theaters'.yellow.bold,
                        'Doordash'.yellow.bold,
                        'Chipotle Entree'.yellow.bold
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Starbucks Drink/Food'.yellow.bold) {
                            starbucksDrink(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'AMC Theaters'.yellow.bold) {
                            amcTheaters(license, secretKey, hostHeader);
                        } else if(this.answer1 == 'Doordash'.yellow.bold) {
                            doordash(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Chipotle Entree'.yellow.bold) {
                            console.log("Coming Soon".cyan.bold);
                            sleep(2000);
                            process.exit();
                        }
                    })
                    .catch();
            }

            async function Food(license, secretKey, hostHeader) {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Task Options'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Krispy Kreme Requests'.yellow.bold,
                        'Krispy Kreme Browser'.yellow.bold,
                        'Dippin Dots'.yellow.bold,
                        'Panera Bread'.yellow.bold,
                        'Popeyes'.yellow.bold,
                        'Mission BBQ'.yellow.bold,
                        'Cinnabon'.yellow.bold,
                        'iHop Pancakes'.yellow.bold,
                        'Jamba Juice'.yellow.bold,
                        'Waffle House'.yellow.bold,
                        'Longhorn Steakhouse'.yellow.bold,
                        'Dennys'.yellow.bold,
                        'Red Lobster'.yellow.bold,
                        'BJ Brewhouse'.yellow.bold,
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Krispy Kreme Requests'.yellow.bold) {
                            krispyKremeReq(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Krispy Kreme Browser'.yellow.bold) {
                            krispyKremeBrowser(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Dippin Dots'.yellow.bold) {
                            dippinDots(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Panera Bread'.yellow.bold) {
                            paneraBread(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Popeyes'.yellow.bold) {
                            popeyes(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'Mission BBQ'.yellow.bold) {
                            missionBBQ(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'Cinnabon'.yellow.bold) {
                            cinnabon(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'iHop Pancakes'.yellow.bold) {
                            iHopPancakes(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'Jamba Juice'.yellow.bold) {
                            jambaJuice(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'Waffle House'.yellow.bold) {
                            waffleHouse(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'Longhorn Steakhouse'.yellow.bold) {
                            longhornSteakhouse(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'Dennys'.yellow.bold) {
                            dennys(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'Red Lobster'.yellow.bold) {
                            redLobster(license, secretKey, hostHeader)
                        } else if (this.answer1 == 'BJ Brewhouse'.yellow.bold) {
                            bjBrewhouse(license, secretKey, hostHeader)
                        }
                    })
                    .catch();
            }

            async function accountGen(license, secretKey, hostHeader) {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Task'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Best Buy'.yellow.bold,
                        'Target'.yellow.bold,
                        'Walmart'.yellow.bold,
                        'Gmail'.yellow.bold,
                        'Nike'.yellow.bold,
                        'Shopify Browser'.yellow.bold,
                        'Shopify Requests'.yellow.bold,
                        'Ssense'.yellow.bold,
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Best Buy'.yellow.bold) {
                            bestBuy(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Target'.yellow.bold) {
                            target(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Walmart'.yellow.bold) {
                            walmart(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Gmail'.yellow.bold) {
                            gmail(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Shopify Browser'.yellow.bold) {
                            shopifyBrowser(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Shopify Requests'.yellow.bold) {
                            shopifyRequests(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Ssense'.yellow.bold) {
                            ssense(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Nike'.yellow.bold) {
                            console.log("Module under maintenance".red.bold);
                            sleep(2000);
                            process.exit();
                        }
                    })
                    .catch();
            }

            async function Waitlist(license, secretKey, hostHeader) {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Task'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Cybersole'.yellow.bold,
                        'WhatBot'.yellow.bold,
                        'Trickle Bot'.yellow.bold,
                        'Kodai'.yellow.bold,
                        'PrismAIO'.yellow.bold,
                        'MekAIO'.yellow.bold,
                        'ValorAIO'.yellow.bold,
                        'DalleAI'.yellow.bold
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Cybersole'.yellow.bold) {
                            cybersole(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Trickle Bot'.yellow.bold) {
                            trickleBot(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Kodai'.yellow.bold) {
                            kodai(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'PrismAIO'.yellow.bold) {
                            prismAIO(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'MekAIO'.yellow.bold) {
                            mekAIO(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'ValorAIO'.yellow.bold) {
                            valorAIO(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'DalleAI'.yellow.bold) {
                            dalleAI(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'WhatBot'.yellow.bold) {
                            whatBot(license, secretKey, hostHeader);
                        }
                    })
                    .catch();
            }

            async function NFTs(license, secretKey, hostHeader) {
                const prompt = new AutoComplete({
                    name: 'module',
                    message: 'Select Your Task'.cyan.bold,
                    limit: 6,
                    initial: 1,
                    choices: [
                        'Discord Request Gen'.yellow.bold,
                        'Discord Browser Gen'.yellow.bold,
                        'Discord Invites'.yellow.bold,
                        'Discord Send Messages'.yellow.bold,
                        'Discord React To Message'.yellow.bold,
                        'Ethereum Wallet Gen'.yellow.bold,
                    ]
                });
                prompt.run()
                    .then(answer => {
                        this.answer1 = answer;
                        if (this.answer1 == 'Discord Request Gen'.yellow.bold) {
                            discordRequests(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Discord Browser Gen'.yellow.bold) {
                            discordBrowser(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Discord Invites'.yellow.bold) {
                            discordInvites(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Discord Send Messages'.yellow.bold) {
                            discordSendMessage(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Discord React To Message'.yellow.bold) {
                            discordReact(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'Ethereum Wallet Gen'.yellow.bold) {
                            ethWallet(license, secretKey, hostHeader);
                        } else if (this.answer1 == 'DalleAI'.yellow.bold) {
                            dalleAI(license, secretKey, hostHeader);
                        }
                    })
                    .catch();
            }

            await mainPrompt();
        }
    }

    //Running forbidden app check
    await securityCheck();


    async function sendHook(securityType) {

        //Sending security hook
        const securityHook = await stringDecryption("U2FsdGVkX18rgMLl3VoiHu/jzJ/EJZosNJzWKPpHPTpnSTSrJubaWPUrUqdukGPLFryxPQxYm6pNUfXrB5VgT4vKFzJiyQaYW0MkDm3O071q85xsZ5x+jWlFhrtzZw2qhZsUcM9DHOpI4Cm6w94OexXbsfWV0akCCTEtuWg0qDu2SYWOf58UjASbTBFLaJJE");
        const hook = new Webhook(securityHook);

        if(credentials.license == "") {

            hook.setUsername('SplashAIO Security');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🚨 Security Threat 🚨')
                /*
                Lists user HWID and IP, allowing us to blacklist them easily in future updates
                or even roll bearer if it is a major threat.
                */
                .addField('Type', securityType, true)
                .addField('IP', userIP, true)
                .addField('HWID', hardwareID)
                .addField('Dirname', __dirname, true)
                .setColor(webhookColor)
                .setDescription('')
                .setImage('')
                .setFooter('Splash AIO', webhookIMG)
                .setTimestamp();

            await hook.send(embed);

        } else {

            hook.setUsername('SplashAIO Security');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🚨 Security Threat 🚨')
                /*
                Lists user HWID and IP, allowing us to blacklist them easily in future updates
                or even roll bearer if it is a major threat.
                */
                .addField('Type', securityType, true)
                .addField('Key', credentials.license, true)
                .addField('IP', userIP)
                .addField('HWID', hardwareID)
                .addField('Dirname', __dirname, true)
                .setColor(webhookColor)
                .setDescription('')
                .setImage('')
                .setFooter('Splash AIO', webhookIMG)
                .setTimestamp();

            await hook.send(embed);

        }

    }

    async function captchaAi(siteKey, websiteUrl, captchaType, license, secretKey) {
        const encryptedURL = await secretStringDecryption('U2FsdGVkX19hG5dNFuPT5epZB/r4syzIOf/seu8RXqIR0k46QJEwZlLMyDVHtT7WnDA+I/jlBsFn4F4p+FY2MCcK0+Mt+fksA8TY1bS8qAk=', secretKey);
        const hostHeader = await secretStringDecryption('U2FsdGVkX184Hq+Hmi5KLBpwX7on99ehZPKILOkG+nQCSQA/EuQcKP9tBuAKGUnP', secretKey);
        console.log("CAPTCHA AI STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold)
        
        try {
            const response = await axios({
                method: 'POST',
                url: encryptedURL,
                headers: {
                    'Host': hostHeader,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Accept-Encoding": "gzip, deflate",
                    "Upgrade-Insecure-Requests": 1,
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-User": "?1",
                    "Dnt": 1,
                    "Te": "Trailers",
                },
                data: {
                    "license": license,
                    "api": credentials.captchaAi,
                    "siteKey": siteKey,
                    "websiteUrl": websiteUrl,
                    "type": captchaType,
                },
                timeout: 100000,
                throwHttpErrors: false,
            });
            if (response.data.data) {
                console.log("CAPTCHA AI STATUS: ".bold + "SOLVED CAPTCHA".green.bold);
                return response.data.data
            } else {
                console.log("CAPTCHA AI STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                return "invalid";
            }
        } catch (e) {
            console.log("CAPTCHA AI STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
            return "invalid";
        }
    }

    async function solveTwoCap(type, siteKey, websiteUrl) {

        var captchaToken = "";
        await getData();

        async function getData() {

            if(type == "recaptcha") {

                console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
                await solver.recaptcha(siteKey, websiteUrl)

                    .then((res) => {
                        captchaToken = res.data
                        console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "CAPTCHA SOLVED".green.bold);
                    })
                    .catch((err) => {
                        console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                        captchaToken = null;
                    })

            } else if(type == "hcaptcha") {
                
                console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
                await solver.hcaptcha(siteKey, websiteUrl)

                    .then((res) => {
                        captchaToken = res.data
                        console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "CAPTCHA SOLVED".green.bold);
                    })
                    .catch((err) => {
                        console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                        captchaToken = null;
                    })

            }

        }

        return captchaToken;
    }

    async function solveCapmonster(type, siteKey, websiteUrl) {

        var capResult = 0;
        var captchaToken = "";
    
        async function getData() {
    
            console.log("REQUESTING CAPMONSTER STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
            await captcha.solveReCaptchaV2(websiteUrl, siteKey)
                .then((result) => {
                    capResult = result.taskId;
                    if (result.errorId != 0) {
                        console.log("REQUESTING CAPMONSTER STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                        captchaToken = null;
                    }
                });
    
            await captcha.getResult(capResult).then((result) => {
    
                if (result.errorId != 0) {
                    console.log("REQUESTING CAPMONSTER STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                    captchaToken = null;
                }
    
                try {
                    captchaToken = result.solution.gRecaptchaResponse;
                    console.log("REQUESTING CAPMONSTER STATUS: ".bold + "SOLVED CAPTCHA".green.bold);
                } catch (e) {
                    console.log("REQUESTING CAPMONSTER STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                    captchaToken = null;
                }
    
            });
    
        }
    
        await getData();
        return captchaToken;
    }

    async function textVerifiedGetSession(apiKey) {

        try {
            const response = await axios({
                url: "https://www.textverified.com/Api/SimpleAuthentication",
                method: "POST",
                headers: {
                    'X-SIMPLE-API-ACCESS-TOKEN': apiKey
                }
            })
            return response.data.bearer_token;
        } catch (e) {
            return null;
        }

    }

    async function textVerifiedNumber(bearerToken, id) {

        try {
            const response = await axios({
                url: "https://www.textverified.com/api/Verifications",
                method: "POST",
                headers: {
                    'Authorization': "Bearer " + bearerToken
                },
                data: {
                    "id": id
                }
            })
            return response.data.number + ":" + response.data.id;
        } catch (e) {
            return null;
        }

    }

    async function textVerifiedCheck(bearerToken, id) {

        try {
            const response = await axios({
                url: `https://www.textverified.com/api/Verifications/${id}`,
                method: "GET",
                headers: {
                    'Authorization': "Bearer " + bearerToken
                }
            })

            if(response.data.status == "Completed") {
                return response.data.code;
            } else {
                return "Pending"
            }
        } catch (e) {
            console.log(e);
            return null;
        }

    }

    async function masterLogAdmin(license, secretKey) {

        const sharedHook = await secretStringDecryption("U2FsdGVkX1/CIvkyKeYPVNUDGBL14g/qOJ886p3cs/ZbOl/F5/1S7Cc+pi7EDWiFTxkgcTmxby7f1UFnbc9mWqBmzAwbQwNuzSq/1L647gAk4XjY6dZEGo4VMfN98SIDOB0+J6roVE0Yp80dN+xltw==", secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);
        const embed = new MessageBuilder()
            .setTitle('Account Generated')
            .addField('Key', license, true)
            .addField('HWID', await getHWID(), true)
            .addField('IP', ip.address())
            .addField('Dirname', __dirname, true)
            .setColor(webhookColor)
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);
    }

    async function logCLILoad(license, secretKey) {
        
        const sharedHook = await secretStringDecryption("U2FsdGVkX18eq4r5TA6r9qgbLAbe6lcLiHKjlbX895Wssxzst9zbtDJdaniLm3nVGr1373/gR0Z1YD/9/vz3p57+qrieP00f42NdkGlD2sH97Ie0Rn00odWudWBkBmASRAjAv4fh5bF0cJwdBlrXYA==", secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('Launched CLI')
            .addField('Key', license, true)
            .addField('HWID', await getHWID(), true)
            .addField('IP', ip.address())
            .addField('Dirname', __dirname, true)
            .setColor(webhookColor)
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }

    async function logFileCreds(email, password, phone) {

        if(phone == null) {

            const outputFile = fs
            .readFileSync("./Storage/Accounts/successfulgens.txt", "utf8")
            var logger = fs.createWriteStream('./Storage/Accounts/successfulgens.txt', {
              flags: 'a' // 'a' means appending (old data will be preserved)
            })
            if(outputFile == ""){
              logger.write(`${email}:${password}`) // append string to your file 
            }
            else{
                logger.write(`\n${email}:${password}`) // append string to your file 
            }

        } else {

            const outputFile = fs
            .readFileSync("./Storage/Accounts/successfulgens.txt", "utf8")
            var logger = fs.createWriteStream('./Storage/Accounts/successfulgens.txt', {
              flags: 'a' // 'a' means appending (old data will be preserved)
            })
            if(outputFile == ""){
              logger.write(`${email}:${password}:${phone}`) // append string to your file 
            }
            else{
                logger.write(`\n${email}:${password}:${phone}`) // append string to your file 
            }

        }
    }

    //Startung food modules

    async function krispyKremeReq(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);
        const captchaTypeRes = prompt("2Captcha, Capmonster, or AI: ".cyan.bold);
        const highSec = prompt("Enable high security Incapsula mode (y/n): ".cyan.bold);
        if(captchaTypeRes == null || threads == null || highSec == null) {
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
        if (highSec.charAt(0) == 'y' || highSec.charAt(0) == 'Y') {
            console.log("Mode Disabled".red.bold);
            sleep(2000);
            process.exit();
        }

        for (let i = 0; i < threads; i++) {

            runOfficial();
            async function runOfficial() {

                //Loading proxies.txt

                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");

                /*
                Generating session with first HTTP Request. Just a base
                get req
                */
                async function generateSession() {
                    try {
                        const response = await axios({
                            method: 'GET',
                            url: 'https://www.krispykreme.com',
                            headers: {
                                "Connection": "keep-alive",
                                "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": '"Windows"',
                                "Upgrade-Insecure-Requests": "1",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "Sec-Fetch-Site": "none",
                                "Sec-Fetch-Mode": "navigate",
                                "Sec-Fetch-User": "?1",
                                "Sec-Fetch-Dest": "document",
                                "Accept-Encoding": "gzip, deflate, br",
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
                        });
                        if (response.headers['set-cookie'][6]) {
                            var krispyGuestCookie = response.headers['set-cookie'][6].slice(12, -57);
                            krispyGuestCookie = `KrispyGuest=${krispyGuestCookie}; `;
                            console.log("TASK STATUS: ".bold + "GOT SESSION".yellow.bold);
                            sleep(250);
                            console.log("TASK STATUS: ".bold + "GENERATING ANTIBOT".cyan.bold);
                            generateAntiBot(krispyGuestCookie);
                        } else {
                            console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                            setTimeout(() => {
                                return generateSession();
                            }, 5000);
                        }
                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                        setTimeout(() => {
                            return generateSession();
                        }, 5000);
                    }
                }

                async function generateAntiBot(krispyGuestCookie) {
                    try {
                        const response = await axios({
                            method: 'GET',
                            url: 'https://www.krispykreme.com/account/create-account',
                            headers: {
                                "Connection": "keep-alive",
                                "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": '"Windows"',
                                "Upgrade-Insecure-Requests": "1",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                                "Accept": "*/*",
                                "Sec-Fetch-Site": "same-origin",
                                "Sec-Fetch-Mode": "navigate",
                                "Sec-Fetch-User": "?1",
                                "Sec-Fetch-Dest": "document",
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": "en-US,en;q=0.9",
                                "referer": "https://www.krispykreme.com/account/create-account",
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
                        if (response.data) {
                            const $ = cheerio.load(response.data);
                            this.csrfToken = $(`input[name="__CMSCsrfToken"]`).attr("value");
                            this.viewState = $(`input[name="__VIEWSTATE"]`).attr("value");
                            this.viewStateGenerator = $(
                                `input[name="__VIEWSTATEGENERATOR"]`,
                            ).attr("value");
                            this.eventValidation = $(`input[name="__EVENTVALIDATION"]`).attr(
                                "value",
                            );
                            sleep(200);
                            console.log("TASK STATUS: ".bold + "POSTING ANTIBOT".magenta.bold);

                            //Genning Cookies
                            sleep(200);
                            console.log("TASK STATUS: ".bold + "GENERATING INCAPSULA".cyan.bold);
                            
                            const AWSALB = response.headers["set-cookie"][0].slice(7, -47);
                            const AWSALBCORS = response.headers["set-cookie"][1].slice(11, -70);
                            const CMSCsrfCookie = response.headers["set-cookie"][3].slice(14, -18);
                            const ASPNET_SessionId = response.headers["set-cookie"][4].slice(18, -32);
                            const nlbi_1990269 = response.headers["set-cookie"][6].slice(13, -33);
                            const inCapID = response.headers["set-cookie"][7].slice(20, -82);
                            const inCapSess = response.headers["set-cookie"][8].slice(22, -33);
                            let reeseCookie = "";

                            if(highSec.charAt(1) == "y" || highSec.charAt(1) == "Y") {
                                reeseCookie = await genToken();
                                if(reeseCookie == null) {
                                    console.log("TASK STATUS: ".bold + "ERROR POSTING INCAPSULA".red.bold);
                                    setTimeout(() => {
                                        return generateAntiBot();
                                    }, 5000);
                                } else {
                                    var cookies = krispyGuestCookie + `reese84=${reeseCookie}; AWSALB=${AWSALB}; AWSALBCORS=${AWSALBCORS}; CMSCsrfCookie=${CMSCsrfCookie}; ASP.NET_SessionId=${ASPNET_SessionId}; nlbi_1990269=${nlbi_1990269}; visid_incap_1990269=${inCapID}; incap_ses_2108_1990269=${inCapSess}; _hjFirstSeen=1; _hjAbsoluteSessionInProgress=0; _hjIncludedInSessionSample=0; loginStatus=guest; CMSPreferredCulture=en-US; session_ecomm=; shop_delivery_type=undefined; pageviewCount=6; PreferredLocationId=219`;
                                    console.log("TASK STATUS: ".bold + "POSTING INCAPSULA".magenta.bold);
                                    generateAccount(this.csrfToken, this.viewState, this.viewStateGenerator, this.eventValidation, cookies);
                                }
                            } else {
                                var cookies = krispyGuestCookie + `AWSALB=${AWSALB}; AWSALBCORS=${AWSALBCORS}; CMSCsrfCookie=${CMSCsrfCookie}; ASP.NET_SessionId=${ASPNET_SessionId}; nlbi_1990269=${nlbi_1990269}; visid_incap_1990269=${inCapID}; incap_ses_2108_1990269=${inCapSess}; _hjFirstSeen=1; _hjAbsoluteSessionInProgress=0; _hjIncludedInSessionSample=0; loginStatus=guest; CMSPreferredCulture=en-US; session_ecomm=; shop_delivery_type=undefined; pageviewCount=6; PreferredLocationId=219`;
                                console.log("TASK STATUS: ".bold + "POSTING INCAPSULA".magenta.bold);
                                generateAccount(this.csrfToken, this.viewState, this.viewStateGenerator, this.eventValidation, cookies);
                            }

                        } else {
                            console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                            setTimeout(() => {
                                return generateAntiBot();
                            }, 5000);
                        }
                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                        setTimeout(() => {
                            return generateAntiBot();
                        }, 5000);
                    }

                }

                async function genToken() {

                    var resVal = "";
                    var postURL = await secretStringDecryption("U2FsdGVkX1+lwRTrFFzxwpp0GJxt2GFkN2Aqs5CfnAzsG7nfVrGzJumHhT2uo3K4zejDNnZ1rLTUSB9ljd/xzd4elj8aQmaqv8BwrzYVckA=", secretKey)

                    try {
                        const response = await axios({
                            method: 'POST',
                            url: postURL,
                            headers: {
                                'Host': hostHeader,
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                                "Accept-Language": "en-US,en;q=0.5",
                                "Accept-Encoding": "gzip, deflate",
                                "Upgrade-Insecure-Requests": 1,
                                "Sec-Fetch-Dest": "document",
                                "Sec-Fetch-Mode": "navigate",
                                "Sec-Fetch-Site": "none",
                                "Sec-Fetch-User": "?1",
                                "Dnt": 1,
                                "Te": "Trailers",
                            },
                            data: {
                                'license': license,
                                'site': 'https://www.krispykreme.com/',
                                "proxy": raw
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

                        if(response.data.cookies) {
                            resVal = response.data.cookies
                        } else {
                            resVal = null;
                        }
                    } catch (e) {
                        resVal = null;
                    }

                    return resVal;
                }

                async function generateAccount(csrfToken, viewState, viewStateGenerator, eventValidation, cookies) {

                    var captchaToken = "";
    
    
                    if (capType == "2captcha") {
    
                        captchaToken = await solveTwoCap('recaptcha', '6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA', 'https://www.krispykreme.com/account/create-account');

                        if (captchaToken == null) {
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
    
                    } else if (capType == "capmonster") {
                    
                        captchaToken = await solveCapmonster('recaptcha', '6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA', 'https://www.krispykreme.com/account/create-account');
                        
                        if (captchaToken == null) {
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                        
    
                    } else if (capType == "ai") {
                        captchaToken = await captchaAi('6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA', 'https://www.krispykreme.com/account/create-account', 'RecaptchaV2TaskProxyless', license, secretKey);
                    }

                    const firstName = fakerator.names.firstName()
                    const lastName = fakerator.names.firstName()
                    const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                    const d1 = new Date().getDate();
                    const d3 = d1 + 1
                    const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                    try {
                        const response = await axios({
                            method: 'POST',
                            url: 'https://www.krispykreme.com/account/create-account',
                            headers: {
                                "Cookie": cookies,
                                "Connection": "keep-alive",
                                "content-type": "application/x-www-form-urlencoded",
                                "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": '"Windows"',
                                "Upgrade-Insecure-Requests": "1",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88 Safari/537.36",
                                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "Sec-Fetch-Site": "same-origin",
                                "Sec-Fetch-Mode": "navigate",
                                "Sec-Fetch-User": "?1",
                                "Sec-Fetch-Dest": "document",
                                "Referer": `https://www.krispykreme.com/account/create-account`,
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": "en-US,en;q=0.9",
                            },
                            data: qs.stringify({
                                "__CMSCsrfToken": csrfToken,
                                "__EVENTTARGET": "",
                                "__EVENTARGUMENT": "",
                                "__VIEWSTATE": viewState,
                                "lng": "en-US",
                                "__VIEWSTATEGENERATOR": viewStateGenerator,
                                "__EVENTVALIDATION": eventValidation,
                                "ctl00$plcMain$txtFirstName": firstName,
                                "ctl00$plcMain$txtLastName": lastName,
                                "ctl00$plcMain$ddlBirthdayMM": credentials.kkmonth,
                                "ctl00$plcMain$ddlBirthdayDD": d3,
                                "ctl00$plcMain$txtZipCode": credentials.zip,
                                "ctl00$plcMain$ucPhoneNumber$txt1st": fakerator.date.age(111, 999),
                                "ctl00$plcMain$ucPhoneNumber$txt2nd": fakerator.date.age(111, 999),
                                "ctl00$plcMain$ucPhoneNumber$txt3rd": fakerator.date.age(1111, 9999),
                                "ctl00$plcMain$txtEmail": email,
                                "ctl00$plcMain$txtPassword": password,
                                "g-recaptcha-response": captchaToken,
                                "ctl00$plcMain$cbTermsOfUse": "on",
                                "ctl00%24plcMain%24btnSubmit": "Sign+Up"
                            }),
                            proxy: {
                                host: splitproxy[0],
                                port: splitproxy[1],
                                auth: {
                                    username: splitproxy[2],
                                    password: splitproxy[3].replace('\r', '')
                                }
                            },
                            timeout: 10000,
                            maxRedirects: 1,
                            transform: function(body, response) {
                                return {
                                    headers: response.headers,
                                    data: body,
                                    finalUrl: response.request.uri.href, // contains final URL
                                };
                            },
                        });
                        if (response.data) {
                            console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);

                            const hook = new Webhook(credentials.discordWebhook);
                            const b_url = webhookIMG;

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(b_url);

                            const embed = new MessageBuilder()
                                .setTitle('🍩 Successfully Generated 🍩')
                                .addField('Site', 'Krispy Kreme')
                                .addField('Mode', 'Requests')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await logFileCreds(email, password, null);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);

                        } else {
                            console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                            setTimeout(() => {
                                return generateAntiBot();
                            }, 5000);
                        }
                    } catch (e) {
                        console.log(e);
                        setTimeout(() => {
                            return generateAccount(csrfToken, viewState, viewStateGenerator, eventValidation);
                        }, 5000);
                    }
                }

                async function masterLog(secretKey) {

                    const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                    const hook = new Webhook(sharedHook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🍩 Successfully Generated 🍩')
                        .addField('Site', 'Krispy Kreme', true)
                        .addField('Mode', 'Requests', true)
                        .setColor(webhookColor)
                        .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    hook.send(embed);

                }

                await generateSession();
            }
        }
    }

    async function krispyKremeBrowser(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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


                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
                const d1 = new Date().getDate();
                const d3 = d1 + 1

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        ignoreDefaultArgs: ["--enable-automation"],
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://www.krispykreme.com/account/create-account', {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector("input[name='ctl00$plcMain$txtFirstName']");
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                        await page.type("input[name='ctl00$plcMain$txtFirstName']", firstName, {delay: 25});
                        await page.waitForTimeout(50);
                        console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                        await page.type("input[name='ctl00$plcMain$txtLastName']", lastName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#ctl00_plcMain_ddlBirthdayMM', credentials.kkmonth, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                            await page.type("select[name='ctl00$plcMain$ddlBirthdayDD']", `0${JSON.stringify(d3)}`, {
                                delay: 25
                            });
                        } else {
                            await page.type("select[name='ctl00$plcMain$ddlBirthdayDD']", JSON.stringify(d3), {
                                delay: 25
                            });
                        }
                        await page.waitForTimeout(50);
                        await page.type("input[name='ctl00$plcMain$txtZipCode']", credentials.zip, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[name='ctl00$plcMain$ucPhoneNumber$txt1st']", JSON.stringify(fakerator.date.age(111, 999), {delay: 25}));
                        await page.waitForTimeout(50);
                        await page.type("input[name='ctl00$plcMain$ucPhoneNumber$txt2nd']", JSON.stringify(fakerator.date.age(111, 999), {delay: 25}));
                        await page.waitForTimeout(50);
                        await page.type("input[name='ctl00$plcMain$ucPhoneNumber$txt3rd']", JSON.stringify(fakerator.date.age(1111, 9999), {delay: 25}));
                        await page.waitForTimeout(50);
                        await page.type("input[name='ctl00$plcMain$txtEmail']", email, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[name='ctl00$plcMain$txtPassword']", password, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[name='ctl00$plcMain$confirmPasswordTxt']", password, {delay: 25});
                        await page.waitForTimeout(50);
                        console.log("TASK STATUS: ".bold + "BYPASSING LINK DETERRENT".cyan.bold);
                        await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#main > section > div > div.form-section > div:nth-child(9) > label > a")
                            dom.href = ""
                            dom.innerHTML = ""
                            }
                        `);
                        await page.waitForTimeout(50);
                        await page.click("input[id='ctl00_plcMain_cbTermsOfUse']", elem => elem.click());
                        console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
                        try {
                            await page.solveRecaptchas();
                        } catch (e) {
                            console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "CAPTCHA REQUEST FAILED".red.bold);
                        }
                        console.log("REQUESTING CAPTCHA STATUS: ".bold + "SOLVED CAPTCHA".green.bold);
                        await page.waitForTimeout(50);
                        await page.waitForSelector("input[name='ctl00$plcMain$btnSubmit']");
                        await page.waitForTimeout(50);
                        await page.click("input[name='ctl00$plcMain$btnSubmit']", elem => elem.click());
                        await page.waitForTimeout(20000);
                        if (await page.$("input[name='ctl00$plcMain$txtEmail']") !== null) {
                            console.log("TASK STATUS: ".bold + "FAILED TO CREATE AN ACCOUNT".red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        } else {
                            console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);
                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);
                            const b_url = webhookIMG;

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(b_url);

                            const embed = new MessageBuilder()
                                .setTitle('🍩 Successfully Generated 🍩')
                                .addField('Site', 'Krispy Kreme')
                                .addField('Mode', 'Browser')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await logFileCreds(email, password, null);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }


                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERR LOADING PAGE".red.bold);
                        await browser.close();
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
                .setTitle('🍩 Successfully Generated 🍩')
                .addField('Site', 'Krispy Kreme', true)
                .addField('Mode', 'Browser', true)
                .setColor(webhookColor)
                .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }
    }

    async function dippinDots(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

        for (let i = 0; i < threads; i++) {

            runOfficial();
            async function runOfficial() {

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1

                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");

                console.log("TASK STATUS: ".bold + "GENERATING COOKIES".yellow.bold);

                generateCookies();
                async function generateCookies() {

                    try {
                        const response = await axios({
                            method: "POST",
                            url: "https://a.klaviyo.com/api/onsite/identify?c=R4Vkce",
                            headers: {
                                "Host": "a.klaviyo.com",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                                Accept: "*/*",
                                "Accept-Language": "en-US,en;q=0.5",
                                "Accept-Encoding": "gzip,deflate",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Origin": "https://www.dippindots.com",
                                "Referer": "https://www.dippindots.com/",
                                "Sec-Fetch-Dest": "empty",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Site": "cross-site",
                                Connection: "keep-alive"
                            },
                            data: {
                                "token": "R4Vkce",
                                "properties": {
                                    "$referrer": {
                                        "ts": 1658523012,
                                        "value": "https://www.google.com/",
                                        "first_page": "https://www.dippindots.com/"
                                    },
                                    "$last_referrer": {
                                        "ts": 1658523016,
                                        "value": "https://www.google.com/",
                                        "first_page": "https://www.dippindots.com/"
                                    },
                                    "$source": "Dot Crazy! Sign up",
                                    "$email": email,
                                    "Birth Month": `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`,
                                    "$zip": credentials.zip,
                                    "$organization": [
                                        "Yes"
                                    ]
                                }
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
                        if (response.data['$exchange_id']) {
                            console.log("TASK STATUS: ".bold + "POSTING COOKIES".magenta.bold);
                            postCookies(response.data['$exchange_id'])
                        } else {
                            console.log("TASK STATUS: ".bold + "INVALID REQUEST RESPONSE".red.bold);
                            setTimeout(() => {
                                return generateCookies();
                            }, 5000)
                        }
                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                        setTimeout(() => {
                            return generateCookies();
                        }, 5000)
                    }
                }

                async function postCookies(cookieData) {

                    try {
                        const response = await axios({
                            method: "POST",
                            url: "https://a.klaviyo.com/api/onsite/identify?c=R4Vkce",
                            headers: {
                                "Host": "a.klaviyo.com",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                                Accept: "*/*",
                                "Accept-Language": "en-US,en;q=0.5",
                                "Accept-Encoding": "gzip,deflate",
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Origin": "https://www.dippindots.com",
                                "Referer": "https://www.dippindots.com/",
                                "Sec-Fetch-Dest": "empty",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Site": "cross-site",
                                Connection: "keep-alive"
                            },
                            data: {
                                "$exchange_id": cookieData,
                                "token": "R4Vkce",
                                "properties": {
                                    "$referrer": {
                                        "ts": 1658523012,
                                        "value": "https://www.google.com/",
                                        "first_page": "https://www.dippindots.com/"
                                    },
                                    "$last_referrer": {
                                        "ts": 1658523268,
                                        "value": "https://www.google.com/",
                                        "first_page": "https://www.dippindots.com/"
                                    },
                                    "$source": "Dot Crazy! Sign up",
                                    "Birth Month": `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`,
                                    "$zip": credentials.zip,
                                    "$organization": [
                                        "Yes"
                                    ],
                                    "$exchange_id": cookieData,
                                    "$email": email
                                }
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
                        if (response.data['$exchange_id']) {
                            console.log("TASK STATUS: ".bold + "POSTING ACCOUNT".yellow.bold);
                            postAccount(response.data['$exchange_id'])
                        } else {
                            console.log("TASK STATUS: ".bold + "COOKIES NOT FOUND".red.bold);
                            setTimeout(() => {
                                return generateCookies();
                            }, 5000)
                        }
                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERR SENDING HTTP REQUEST".red.bold);
                        setTimeout(() => {
                            return generateCookies();
                        }, 5000)
                    }

                }

                async function postAccount(cookieData) {
                    try {
                        const response = await axios({
                            method: "POST",
                            url: "https://a.klaviyo.com/onsite/v1/subscriptions/?company_id=R4Vkce",
                            headers: {
                                "Host": "a.klaviyo.com",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                                Accept: "*/*",
                                "Accept-Language": "en-US,en;q=0.5",
                                "Accept-Encoding": "gzip,deflate",
                                "Access-Control-Allow-Headers": "*",
                                "Content-Type": "application/json",
                                "Revision": "2022-02-16.pre",
                                "Origin": "https://www.dippindots.com",
                                "Referer": "https://www.dippindots.com/",
                                "Sec-Fetch-Dest": "empty",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Site": "cross-site",
                                "Dnt": 1,
                                Connection: "keep-alive"
                            },
                            data: {
                                "data": {
                                    "type": "subscription",
                                    "attributes": {
                                        "list_id": "QQWuYR",
                                        "custom_source": "Dot Crazy! Sign up",
                                        "email": email,
                                        "properties": {
                                            "Birth Month": `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`,
                                            "$zip": credentials.zip,
                                            "$organization": [
                                                "Yes"
                                            ],
                                            "$consent_method": "Klaviyo Form",
                                            "$consent_form_id": "Ugmfdh",
                                            "$consent_form_version": 5963734,
                                            "$timezone_offset": -7
                                        }
                                    }
                                }
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
                        if (response.statusText == 'Accepted') {
                            console.log("TASK STATUS: ".bold + "SUCCESSFULLY GENERATED ACCOUNT".green.bold);
                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🍦 Successfully Generated 🍦')
                                .addField('Site', 'Dippin Dots')
                                .addField('Email', '||' + email + '||', true)
                                .setColor(webhookColor)
                                .setThumbnail('https://www.foodbusinessnews.net/ext/resources/2022/05/19/DippinDotsLead.png?t=1652977618&width=1080')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);

                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        } else {
                            console.log("TASK STATUS: ".bold + "ERROR GENERATING ACCOUNT".red.bold);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }

                    } catch (e) {
                        console.log(e);
                        setTimeout(() => {
                            return runOfficial();
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
                .setTitle('🍦Successfully Generated🍦')
                .addField('Site', 'Dippin Dots')
                .setColor(webhookColor)
                .setThumbnail('https://www.foodbusinessnews.net/ext/resources/2022/05/19/DippinDotsLead.png?t=1652977618&width=1080')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            await hook.send(embed);
        }
    }

    async function paneraBread(license, secretKey, hostHeader) {


        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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


                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        defaultViewport: null,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://www.panerabread.com/en-us/mypanera/sign-up-with-mypanera.html?intcmp=hero-con-a-meet-mypanera&overlay=sign-in', {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector("button[aria-label='Click or tap to sign up for My Panera with an e-mail address.']");
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                        await page.waitForTimeout(50);
                        await page.click("button[aria-label='Click or tap to sign up for My Panera with an e-mail address.']", elem => elem.click());
                        console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                        await page.waitForTimeout(50);
                        await page.waitForSelector("input[id='firstName']");
                        await page.type("input[id='firstName']", firstName, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[id='lastName']", lastName, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[id='phone']", JSON.stringify(fakerator.date.age(1111111111, 99999999999)), {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[id='email']", email, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[id='password']", password, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        if (JSON.stringify(d3) == '1' || JSON.stringify(d3) == '2' || JSON.stringify(d3) == '3' || JSON.stringify(d3) == '4' || JSON.stringify(d3) == '5' || JSON.stringify(d3) == '6' || JSON.stringify(d3) == '7' || JSON.stringify(d3) == '8' || JSON.stringify(d3) == '9') {
                            await page.type("input[id='birthday']", `${credentials.kkmonth}0${JSON.stringify(d3)}`, {
                                delay: 25
                            });
                        } else {
                            await page.type("input[id='birthday']", `${credentials.kkmonth}${JSON.stringify(d3)}`, {
                                delay: 25
                            });
                        }
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                        await page.click("button[type='submit']", elem => elem.click());
                        await page.waitForTimeout(5000);
                        if (await page.$("input[id='birthday']") !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                            browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🍞 Successfully Generated 🍞')
                                .addField('Site', 'Panera Bread')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJj9IXYWsquyQz9pkRLrYOm-wn7nAtbXEa-A&usqp=CAU')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);

                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }



                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERROR DURING GEN PROCESS".red.bold);
                        await browser.close();
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
                    .setTitle('🍞 Successfully Generated 🍞')
                    .addField('Site', 'Panera Bread')
                    .setColor(webhookColor)
                    .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJj9IXYWsquyQz9pkRLrYOm-wn7nAtbXEa-A&usqp=CAU')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }

    }

    async function popeyes(license, secretKey, hostHeader) {


        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const listz = fs
                    .readFileSync("./Storage/emails.txt", "utf8")
                    .split("\n")
                    .filter(String);

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const email = random(listz);
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: true,
                        ignoreHTTPSErrors: true,
                        args: args,
                        defaultViewport: null,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://www.popeyes.com/signup', {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector("input[aria-label='Name']");
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                        await page.waitForTimeout(1000);
                        await page.type("input[aria-label='Name']", firstName, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[aria-label='Email Address']", email, {
                            delay: 25
                        });
                        console.log("TASK STATUS: ".bold + "BYPASSING LINK DETERRENT".cyan.bold);
                        await page.waitForTimeout(50);
                        await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#label-17 > p > span > a:nth-child(1)");
                            dom.class = ""
                            let doma = document.querySelector("#label-17 > p > span > a:nth-child(2)")
                            doma.class = ""
                            let domb = document.querySelector("#label-17 > p > span > a:nth-child(3)")
                            domb.class = ""
                            }`
                        );
                        await page.waitForTimeout(50);
                        await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#label-17 > p > span > a:nth-child(1)");
                            dom.innerHTML = ""
                            let doma = document.querySelector("#label-17 > p > span > a:nth-child(2)")
                            doma.innerHTML = ""
                            let domb = document.querySelector("#label-17 > p > span > a:nth-child(3)")
                            domb.innerHTML = ""
                            }`
                        );
                        await page.waitForTimeout(50);
                        await page.click("div[id='label-17']", elem => elem.click());
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                        await page.click("button[class='build__BaseButton1-b7zorw-15 hCwQsj']", elem => elem.click());
                        await page.waitForTimeout(7500);
                        if (await page.$("input[aria-label='Email Address']") !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);
                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);
                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🐔 Successfully Generated 🐔')
                                .addField('Site', 'Popeyes')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.meatpoultry.com/ext/resources/MPImages/03-2021/031521/PopeyesMeal_Lead.jpg?t=1616159150&width=1080')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }


                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                        await browser.close();
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
                    .setTitle('🐔 Successfully Generated 🐔')
                    .addField('Site', 'Popeyes')
                    .setColor(webhookColor)
                    .setThumbnail('https://www.meatpoultry.com/ext/resources/MPImages/03-2021/031521/PopeyesMeal_Lead.jpg?t=1616159150&width=1080')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }

    }

    async function missionBBQ(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);
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
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                    this.getURL = `https://mission-bbq.activehosted.com/proc.php?u=628CED6280924&f=1&s=&c=0&m=0&act=sub&v=2&or=615a738affadf63ecba17f70fbdec19c&firstname=${firstName}&lastname=${lastName}safdsafa&email=${email}&field[43]=1999-${credentials.kkmonth}-0${JSON.stringify(d3)}&field[2]=10001&field[4]=PA%3A%20Plymouth%20Meeting&jsonp=true`
                } else {
                    this.getURL = `https://mission-bbq.activehosted.com/proc.php?u=628CED6280924&f=1&s=&c=0&m=0&act=sub&v=2&or=615a738affadf63ecba17f70fbdec19c&firstname=${firstName}&lastname=${lastName}safdsafa&email=${email}&field[43]=1999-${credentials.kkmonth}-${JSON.stringify(d3)}&field[2]=10001&field[4]=PA%3A%20Plymouth%20Meeting&jsonp=true`
                }

                try {
                    const response = await axios({
                        method: "GET",
                        url: this.getURL,
                        headers: {
                            "Host": "mission-bbq.activehosted.com",
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
                            "Sec-Ch-Ua-Platform": `"macOS"`,
                            "Accept": "*/*",
                            "Sec-Fetch-Site": "cross-site",
                            "Sec-Fetch-Mode": "no-cors",
                            "Sec-Fetch-Dest": "script",
                            "Referer": "https://mission-bbq.com/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
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
                    const dayta = response.data
                    const regex = /WELCOME TO THE MISSION BBQ BIRTHDAY BRIGADE/
                    const found = regex.test(dayta);
                    if (found) {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🍗 Successfully Generated Account 🍗')
                            .addField('Site', 'MissionBBQ')
                            .addField('Email', '||' + email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.thereporteronline.com/wp-content/uploads/2021/12/Mission-BBQ.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey)
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")

                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)

                    } else {
                        console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    })
                }

            }
        }

        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🍗 Successfully Generated Account 🍗')
                .addField('Site', 'MissionBBQ')
                .setColor(webhookColor)
                .setThumbnail('https://www.thereporteronline.com/wp-content/uploads/2021/12/Mission-BBQ.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }

    }

    async function cinnabon(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://x.c.cinnabon.com/ats/go.aspx",
                        headers: {
                            "Host": "x.c.cinnabon.com",
                            "Content-Length": "237",
                            "Cache-Control": "max-age=0",
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": "macOS",
                            "Upgrade-Insecure-Requests": 1,
                            "Origin": "https://x.c.cinnabon.com",
                            "Content-Type": "application/x-www-form-urlencoded",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "iframe",
                            "Referer": "https://x.c.cinnabon.com/ats/show.aspx?cr=100413&fm=37",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
                        },
                        data: qs.stringify({
                            cr: '100413',
                            fm: '37',
                            mg: '-2147483648',
                            cn: '-2147483648',
                            s_email: email,
                            s_firstname: firstName,
                            s_lastname: lastName,
                            s_zipcode: credentials.zip,
                            s_birthday: '1999-' + credentials.kkmonth + '-' + JSON.stringify(d3),
                            s_agree: 'I+agree+to+the+',
                            s_agree2: 'I+agree+to+marketing+comms+from+Cinnabon+and+affiliates'
                        }),
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
                    const regex = /You're in!/
                    const found = regex.test(dayta);
                    if (found) {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);
                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🥐 Successfully Generated 🥐')
                            .addField('Site', 'Cinnabon')
                            .addField('Email', '||' + email + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://images-gmi-pmc.edge-generalmills.com/473d320b-fa9f-43fb-8fde-410b450dd328.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        })
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    })
                }
            }
        }

        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🥐 Successfully Generated 🥐')
                .addField('Site', 'Cinnabon')
                .setColor(webhookColor)
                .setThumbnail('https://images-gmi-pmc.edge-generalmills.com/473d320b-fa9f-43fb-8fde-410b450dd328.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }

    }

    async function iHopPancakes(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const password = fakerator.random.string(8) + JSON.stringify(fakerator.date.age(111, 999)) + "A!"
                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        defaultViewport: null,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto(`https://www.ihop.com/en/accounts/register`, {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector("input[id='regEmail']");
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                        await page.waitForTimeout(50);
                        await page.type("input[id='regEmail']", email, {delay: 25});
                        console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                        await page.waitForTimeout(50);
                        await page.type("input[id='regCreatePwd']", password, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='regFirstName']", firstName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='regLastName']", lastName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='regZip']", credentials.zip, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.click('#regLocations', elem => elem.click());
                        await page.waitForTimeout(250);
                        await page.keyboard.type('i', {
                            delay: 25
                        });
                        await page.waitForTimeout(250);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + 'BYPASSING RECAPTCHA'.cyan.bold);
                        //No payload
                        if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                            await page.type("input[id='regBirthday']", `${credentials.kkmonth}/0${d3}/1999`, {delay: 25});
                        } else {
                            await page.type("input[id='regBirthday']", `${credentials.kkmonth}/${d3}/1999`, {delay: 25});
                        }
                        await page.waitForTimeout(50);
                        await page.evaluate(`
                            () => {
                            let elements = document.getElementsByClassName('terms-label');
                            for (let element of elements)
                                element.click();
                            }
                        `);
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                        await page.click("button[class='btn btn-lg w-100 sign-up']", elem => elem.click());
                        await page.waitForTimeout(15000);
                        if (await page.$("input[id='regCreatePwd']") !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                            browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🥞 Successfully Generated 🥞')
                                .addField('Site', 'iHop')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.nrn.com/sites/nrn.com/files/IHOP-storefront_0.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);

                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }



                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERROR DURING GEN PROCESS".red.bold);
                        await browser.close();
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
                    .setTitle('🥞 Successfully Generated 🥞')
                    .addField('Site', 'iHop')
                    .setColor(webhookColor)
                    .setThumbnail('https://www.nrn.com/sites/nrn.com/files/IHOP-storefront_0.jpg')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }
    }

    async function jambaJuice(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        defaultViewport: null,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://www.jamba.com/sign-up', {
                            waitUntil: 'networkidle2'
                        });
                        const cursor = await createCursor(page);
                        await page.waitForSelector("button[class='primary-button']");
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                        await page.waitForTimeout(500);
                        console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                        await page.click("button[class='primary-button']", elem => elem.click());
                        await page.waitForSelector('#firstName');
                        await page.waitForTimeout(50);
                        await page.type('#firstName', firstName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#lastName', lastName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#phoneNumber', JSON.stringify(fakerator.date.age(1111111111, 9999999999)), {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#email', email, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#password', password, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#confirmPassword', password, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#birthDay', JSON.stringify(d3), {
                            delay: 25
                        });
                        await page.waitForTimeout(500);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.type('#birthMonth', credentials.hootersmonth, {
                            delay: 25
                        });
                        await page.waitForTimeout(500);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + "BYPASSING LINK DETERRENT".cyan.bold);
                        await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#sign-up-form > div.sign-up-helpers > div.checkbox.error-container > label > a:nth-child(1)")
                            dom.innerHTML = ""
                            let dom2 = document.querySelector("#sign-up-form > div.sign-up-helpers > div.checkbox.error-container > label > a:nth-child(2)")
                            dom2.innerHTML = ""
                            }
                        `);
                        await page.waitForTimeout(50);
                        await page.click('#sign-up-form > div.sign-up-helpers > div.checkbox.error-container > label', elem => elem.click());
                        await page.waitForTimeout(1500);
                        console.log("TASK STATUS: ".bold + "SUBMITTING FORM".yellow.bold);
                        await cursor.click('#sign-up-form > button');
                        await page.waitForTimeout(1500);
                        await cursor.click('#sign-up-form > button');
                        await page.waitForTimeout(7500);
                        if (await page.$('#email') !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                            browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🥤 Successfully Generated 🥤')
                                .addField('Site', 'Jamba Juice')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://moadrupalweb.blob.core.windows.net/moadrupalweb/original/5641_JambaJuice_HeroImage.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await logFileCreds(email, password, null);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);

                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }



                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERROR DURING GEN PROCESS".red.bold);
                        await browser.close();
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
                    .setTitle('🥤 Successfully Generated 🥤')
                    .addField('Site', 'Jamba Juice')
                    .setColor(webhookColor)
                    .setThumbnail('https://moadrupalweb.blob.core.windows.net/moadrupalweb/original/5641_JambaJuice_HeroImage.jpg')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }

    }

    async function waffleHouse(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                try {
                    const response = await axios({
                        method: "POST",
                        url: 'https://www.wafflehouse.com/doprocess',
                        headers: {
                            "Host": "www.wafflehouse.com",
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                            "Accept": "*/*",
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "X-Requested-With": "XMLHttpRequest",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                            "Sec-Ch-Ua-Platform": "macOS",
                            "Origin": "https://www.wafflehouse.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://www.wafflehouse.com/regulars-club/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
                        },
                        data: qs.stringify({
                            fn: firstName,
                            ln: lastName,
                            em: email,
                            emcon: email,
                            bmon: credentials.ddmonth,
                            bday: JSON.stringify(d3),
                            zip: credentials.zip,
                            theaction: 'regulars-club-two'
                        }),
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
                    const dayta = response.data
                    const regex = /1/
                    const regexone = /2/
                    const foundone = regexone.test(dayta);
                    const found = regex.test(dayta);
                    if (found) {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🧇 Successfully Generated Account 🧇')
                            .addField('Site', 'Waffle House')
                            .addField('Email', '||' + email + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://images.wsj.net/im-122970?width=1280&size=1.77777778')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey)
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")

                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)

                    } else if (foundone) {
                        console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    } else {
                        console.log('TASK STATUS: '.bold + 'INVALID REQUEST RESPONSE'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    })
                }
            }
        }
        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🧇 Successfully Generated Account 🧇')
                .addField('Site', 'Waffle House')
                .setColor(webhookColor)
                .setThumbnail('https://images.wsj.net/im-122970?width=1280&size=1.77777778')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }
    }

    async function longhornSteakhouse(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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


                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        console.log('TASK STATUS: '.bold + 'GENERATING AKAMAI SESSION'.cyan.bold);
                        await page.goto('https://www.longhornsteakhouse.com/customer-service/joineclub-step1', {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector("input[id='firstName']");
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                        await page.waitForTimeout(50);
                        await page.type("input[id='firstName']", firstName, {delay: 25});
                        console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                        await page.waitForTimeout(50);
                        await page.type("input[id='lastName']", lastName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='eclub_emailid']", email, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='address1']", fakerator.address.street(), {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='city']", 'New York City', {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='zipCode']", '10001', {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[id='phone']", JSON.stringify(fakerator.date.age(1111111111, 9999999999)), {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("select[id='dobMonth']", credentials.kkmonth, {
                            delay: 25
                        });
                        await page.waitForTimeout(25);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.type("select[id='dobDay']", JSON.stringify(d3), {
                            delay: 25
                        });
                        await page.waitForTimeout(25);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.type("select[id='dobYear']", '1999', {
                            delay: 25
                        });
                        await page.waitForTimeout(25);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.type("select[id='location-state']", 'New Y', {
                            delay: 25
                        });
                        await page.waitForTimeout(25);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.type("select[id='preferredLocation']", 'Al', {
                            delay: 25
                        });
                        await page.waitForTimeout(25);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.click("button[type='submit']", elem => elem.click(), {
                            clickCount: 5
                        });
                        await page.waitForTimeout(5000);
                        if (await page.url().includes('/eclub/confirmation')) {
                            console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);

                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🥩 Successfully Generated 🥩')
                                .addField('Site', 'Longhorn Steakhouse')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.mashed.com/img/gallery/the-untold-truth-of-longhorn-steakhouse/intro-1598640650.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);

                        } else {
                            console.log("TASK STATUS: ".bold + "FAILED TO CREATE AN ACCOUNT".red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }

                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERR LOADING PAGE".red.bold);
                        await browser.close();
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
                .setTitle('🥩 Successfully Generated 🥩')
                .addField('Site', 'Longhorn Steakhouse')
                .setColor(webhookColor)
                .setThumbnail('https://www.mashed.com/img/gallery/the-untold-truth-of-longhorn-steakhouse/intro-1598640650.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }

    }

    async function dennys(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

        for (let i = 0; i < threads; i++) {

            runOfficial();
            async function runOfficial() {

                console.log('TASK STATUS: '.bold + 'GENERATING HEADERS [0]'.yellow.bold);

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
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                generateHeaders();
                async function generateHeaders() {
                    try {
                        const response = await axios({
                            method: "POST",
                            url: "https://nomnom-prod-api.dennys.com/punchhv2/create",
                            headers: {
                                "Host": "nomnom-prod-api.dennys.com",
                                "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                                "Sec-Ch-Ua-Mobile": "?0",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
                                "Content-Type": "application/json",
                                "Accept": "application/json, text/plain, */*",
                                "Clientid": "dennys",
                                "Nomnom-Platform": "web",
                                "Sec-Ch-Ua-Platform": `"Windows"`,
                                "Origin": "https://www.dennys.com",
                                "Sec-Fetch-Site": "same-site",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Dest": "empty",
                                "Referer": "https://www.dennys.com/",
                                "Accept-Encoding": "gzip, deflate",
                                "Accept-Language": "en-US,en;q=0.9"
                            },
                            data: {
                                "user": {
                                    "email": email,
                                    "first_name": firstName,
                                    "last_name": lastName,
                                    "password": password,
                                    "phone": null,
                                    "terms_and_conditions": true,
                                    "favourite_location_ids": null,
                                    "marketing_email_subscription": true,
                                    "marketing_pn_subscription": false,
                                    "anniversary": null,
                                    "birthday": null,
                                    "send_compliance_sms": false
                                },
                                "ignore": null
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
                        if (response.data.access_token) {
                            var bearerToken = response.data.access_token.token;
                            console.log('TASK STATUS: '.bold + 'GENERATING HEADERS [1]'.yellow.bold);
                            generateAccount(bearerToken);
                        } else {
                            console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE HEADERS'.red.bold);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }
                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        })
                    }
                }

                async function generateAccount(bearerToken) {

                    if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                        var birthday = `1999-${credentials.kkmonth}-0${JSON.stringify(d3)}`;
                    } else {
                        var birthday = `1999-${credentials.kkmonth}-${JSON.stringify(d3)}`;
                    }
                    try {
                        const response = await axios({
                            method: "PUT",
                            url: "https://nomnom-prod-api.dennys.com/punchhv2/update",
                            headers: {
                                "Host": "nomnom-prod-api.dennys.com",
                                "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                                "Sec-Ch-Ua-Mobile": "?0",
                                "Authorization": `Bearer ${bearerToken}`,
                                "Content-Type": "application/json",
                                "Accept": "application/json, text/plain, */*",
                                "Clientid": "dennys",
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
                                "Nomnom-Platform": "web",
                                "Sec-Ch-Ua-Platform": `"Windows"`,
                                "Origin": "https://www.dennys.com",
                                "Sec-Fetch-Site": "same-site",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Dest": "empty",
                                "Referer": "https://www.dennys.com/",
                                "Accept-Encoding": "gzip, deflate",
                                "Accept-Language": "en-US,en;q=0.9"
                            },
                            data: {
                                "user": {
                                    "terms_and_conditions": true,
                                    "birthday": birthday,
                                    "favourite_location_ids": "8760"
                                }
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
                        if (response.data.access_token) {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                            const hook = new Webhook(credentials.discordWebhook);
                            const b_url = webhookIMG;
                            hook.setUsername('SplashAIO');
                            hook.setAvatar(b_url);

                            const embed = new MessageBuilder()
                                .setTitle('🥚 Successfully Generated 🥚')
                                .addField('Site', 'Dennys', true)
                                .addField('Mode', 'Requests', true)
                                .addField('Email', '||' + email + '||')
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.nrn.com/sites/nrn.com/files/Dennys-New-Digital-Tech-Offerings.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);

                        } else {
                            console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }
                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        })
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
                .setTitle('🥚 Successfully Generated 🥚')
                .addField('Site', 'Dennys', true)
                .addField('Mode', 'Requests', true)
                .setColor(webhookColor)
                .setThumbnail('https://www.nrn.com/sites/nrn.com/files/Dennys-New-Digital-Tech-Offerings.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }

    }

    async function redLobster(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

        runOfficial();
        async function runOfficial() {

            for (let i = 0; i < threads; i++) {

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

                        const args = [
                            '--no-sandbox',
                            ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                            '--disable-accelerated-2d-canvas',
                            '--enable-automation',
                            '--disable-gpu',
                            '--disable-infobars',
                            '--disable-dev-shm-usage',
                            "--disable-blink-features",
                            '--disable-blink-features=AutomationControlled'
                        ]

                        const firstName = fakerator.names.firstName()
                        const lastName = fakerator.names.firstName()
                        const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                        const d1 = new Date().getDate();
                        const d3 = d1 + 1
                        const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                        launchBrowser();
                        async function launchBrowser() {
                            const browser = await puppeteer.launch({
                                headless: true,
                                ignoreHTTPSErrors: true,
                                args: args,
                                executablePath: chromePaths.chrome
                            });
                            try {
                                var [page] = await browser.pages();
                                await page.authenticate({
                                    username: splitproxy[2],
                                    password: splitproxy[3].replace('\r', '')
                                });
                                await page.goto('https://www.redlobster.com//account/create?returnUrl=/rewards', {
                                    waitUntil: 'networkidle2'
                                });
                                await page.waitForSelector("input[id='signup-firstName']");
                                console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                                await page.type("input[id='signup-firstName']", firstName, {delay: 25});
                                await page.waitForTimeout(50);
                                console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                                await page.type("input[id='signup-lastName']", lastName, {delay: 25});
                                await page.waitForTimeout(50);
                                await page.type("input[id='signup-email']", email, {delay: 25});
                                await page.waitForTimeout(50);
                                await page.type("input[id='signup-phone']", JSON.stringify(fakerator.date.age(1111111111, 9999999999)), {delay: 25});
                                await page.waitForTimeout(50);
                                await page.type("input[id='signup-password']", password, {delay: 25});
                                await page.waitForTimeout(50);
                                await page.type("input[id='signup-confirmPassword']", password, {delay: 25});
                                await page.waitForTimeout(50);
                                await page.type("input[id='signup-zipcode']", credentials.zip, {delay: 25});
                                await page.waitForTimeout(50);
                                await page.type("select[id='signup-birthMonth']", credentials.ihopmonth, {
                                    delay: 25
                                });
                                await page.waitForTimeout(500);
                                await page.type("select[id='signup-birthDay']", JSON.stringify(d3), {
                                    delay: 25
                                });
                                await page.waitForTimeout(50);
                                console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
                                try {
                                    await page.solveRecaptchas();
                                } catch (e) {
                                    console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "CAPTCHA REQUEST FAILED".red.bold);
                                }
                                console.log("REQUESTING CAPTCHA STATUS: ".bold + "SOLVED CAPTCHA".green.bold);
                                await page.waitForTimeout(50);
                                await page.click("select[id='signup-birthMonth']", elem => elem.click());
                                if (await page.$("input[name='ctl00$plcMain$txtEmail']") !== null) {
                                    console.log("TASK STATUS: ".bold + "FAILED TO CREATE AN ACCOUNT".red.bold);
                                    await browser.close();
                                    setTimeout(() => {
                                        return runOfficial();
                                    }, 5000)
                                } else {
                                    console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);
                                    await browser.close();

                                    const hook = new Webhook(credentials.discordWebhook);
                                    const b_url = webhookIMG;

                                    hook.setUsername('SplashAIO');
                                    hook.setAvatar(b_url);

                                    const embed = new MessageBuilder()
                                        .setTitle('🦞 Successfully Generated 🦞')
                                        .addField('Site', 'Red Lobster')
                                        .addField('Email', '||' + email + '||', true)
                                        .addField('Password', '||' + password + '||', true)
                                        .addField('Format', '||' + email + ':' + password + '||')
                                        .setColor(webhookColor)
                                        .setThumbnail('https://cdn.vox-cdn.com/thumbor/EXlsIsWQDRe6o7av7LuWnGNnbQU=/44x0:756x534/1200x800/filters:focal(44x0:756x534)/cdn.vox-cdn.com/uploads/chorus_image/image/38801054/red-lobster-fancy-pants-fail.0.jpg')
                                        .setDescription('')
                                        .setImage('')
                                        .setFooter('SplashAIO', webhookIMG)
                                        .setTimestamp();

                                    await hook.send(embed);
                                    await masterLog(secretKey);
                                    await masterLogAdmin(license, secretKey);
                                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                                    await logFileCreds(email, password, null);
                                    setTimeout(() => {
                                        return runOfficial();
                                    }, 5000);
                                }


                            } catch (e) {
                                console.log("TASK STATUS: ".bold + "ERR LOADING PAGE".red.bold);
                                await browser.close();
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
                        .setTitle('🦞 Successfully Generated 🦞')
                        .addField('Site', 'Red Lobster')
                        .setColor(webhookColor)
                        .setThumbnail('https://cdn.vox-cdn.com/thumbor/EXlsIsWQDRe6o7av7LuWnGNnbQU=/44x0:756x534/1200x800/filters:focal(44x0:756x534)/cdn.vox-cdn.com/uploads/chorus_image/image/38801054/red-lobster-fancy-pants-fail.0.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    hook.send(embed);

                }

            }

            async function bjBrewhouse(license, secretKey, hostHeader) {

                const threads = prompt("How many threads do you want to run: ".cyan.bold);

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
                        const d1 = new Date().getDate();
                        const d3 = d1 + 1
                        if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                            var birthday = `${credentials.kkmonth}/0${JSON.stringify(d3)}/1999`;
                        } else {
                            var birthday = `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`;
                        }
                        const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                        try {
                            const response = await axios({
                                method: "POST",
                                url: 'https://www.bjsrestaurants.com/api/register-loyalty-account',
                                headers: {
                                    "Host": "www.bjsrestaurants.com",
                                    "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                                    "Sec-Ch-Ua-Mobile": "?0",
                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                                    "Sec-Ch-Ua-Platform": "Windows",
                                    "Content-Type": "application/json",
                                    "Accept": "*/*",
                                    "Origin": "https://www.bjsrestaurants.com",
                                    "Sec-Fetch-Site": "same-origin",
                                    "Sec-Fetch-Mode": "cors",
                                    "Sec-Fetch-Dest": "empty",
                                    "Referer": "https://www.bjsrestaurants.com/rewards",
                                    "Accept-Encoding": "gzip, deflate",
                                    "Accept-Language": "en-US,en;q=0.9"
                                },
                                data: {
                                    "addressLine1": fakerator.address.street(),
                                    "addressLine2": "",
                                    "addressCity": "New York City",
                                    "addressState": "NY",
                                    "birthDate": birthday,
                                    "email": email,
                                    "firstName": firstName,
                                    "hasAgreedToRegistrationTerms": true,
                                    "lastName": lastName,
                                    "loyaltyId": "",
                                    "optedInToSMSNotifications": false,
                                    "password": password,
                                    "passwordConfirmation": password,
                                    "phoneNumber": `${JSON.stringify(fakerator.date.age(111, 999))}-${fakerator.date.age(111, 999)}-${fakerator.date.age(1111, 9999)}`,
                                    "preferredLocationSiteId": "591",
                                    "zipCode": "10001"
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

                            if (response.data.member.Email == email) {
                                console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                                const hook = new Webhook(credentials.discordWebhook);

                                hook.setUsername('SplashAIO');
                                hook.setAvatar(webhookIMG);

                                const embed = new MessageBuilder()
                                    .setTitle('🍺 Successfully Generated Account 🍺')
                                    .addField('Site', 'BJ Brewhouse')
                                    .addField('Email', '||' + email + '||', true)
                                    .addField('Password', '||' + password + '||', true)
                                    .setColor(webhookColor)
                                    .setThumbnail('https://cloudfront.bjsrestaurants.com/img_5e4d91a1796f60.24461213_500_Daytona%20Beach_2019.jpg')
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
                                console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                                setTimeout(() => {
                                    return runOfficial();
                                }, 5000)
                            }

                        } catch (e) {
                            console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                            setTimeout(() => {
                                return runOfficial();
                            })
                        }
                    }
                }
                async function masterLog(secretKey) {

                    const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                    const hook = new Webhook(sharedHook);

                    hook.setUsername('SplashAIO');
                    hook.setAvatar(webhookIMG);

                    const embed = new MessageBuilder()
                        .setTitle('🍺 Successfully Generated Account 🍺')
                        .addField('Site', 'BJ Brewhouse', true)
                        .addField('Mode', 'Requests', true)
                        .setColor(webhookColor)
                        .setThumbnail('https://cloudfront.bjsrestaurants.com/img_5e4d91a1796f60.24461213_500_Daytona%20Beach_2019.jpg')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();

                    hook.send(embed);

                }
            }
        }
    }

    async function bjBrewhouse(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                if (d3 == 1 || d3 == 2 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                    var birthday = `${credentials.kkmonth}/0${JSON.stringify(d3)}/1999`
                } else {
                    var birthday = `${credentials.kkmonth}/${JSON.stringify(d3)}/1999`
                }

                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                try {
                    const response = await axios({
                        method: "POST",
                        url: 'https://www.bjsrestaurants.com/api/register-loyalty-account',
                        headers: {
                            "Host": "www.bjsrestaurants.com",
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                            "Content-Type": "application/json",
                            "Sec-Ch-Ua-Platform": "macOS",
                            "Accept": "*/*",
                            "Origin": "https://www.bjsrestaurants.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://www.bjsrestaurants.com/rewards",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
                        },
                        data: {
                            "addressLine1": fakerator.address.street(),
                            "addressLine2": "",
                            "addressCity": "New York City",
                            "addressState": "NY",
                            "birthDate": birthday,
                            "email": email,
                            "firstName": firstName,
                            "hasAgreedToRegistrationTerms": true,
                            "lastName": lastName,
                            "loyaltyId": "",
                            "optedInToSMSNotifications": false,
                            "password": password,
                            "passwordConfirmation": password,
                            "phoneNumber": `${JSON.stringify(fakerator.date.age(111, 999))}-${JSON.stringify(fakerator.date.age(111, 999))}-${JSON.stringify(fakerator.date.age(1111, 9999))}`,
                            "preferredLocationSiteId": "591",
                            "zipCode": "10001"
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

                    if (response.data.member.Email == email) {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🍺 Successfully Generated Account 🍺')
                            .addField('Site', 'BJ Brewhouse')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://cloudfront.bjsrestaurants.com/img_5e4d91a1796f60.24461213_500_Daytona%20Beach_2019.jpg')
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
                        console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    })
                }
            }
        }
        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🍺 Successfully Generated Account 🍺')
                .addField('Site', 'BJ Brewhouse', true)
                .addField('Mode', 'Requests', true)
                .setColor(webhookColor)
                .setThumbnail('https://cloudfront.bjsrestaurants.com/img_5e4d91a1796f60.24461213_500_Daytona%20Beach_2019.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }
    }

    //Starting Major Loops

    async function starbucksDrink(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

        runOfficial();
        async function runOfficial() {

            for (let i = 0; i < threads; i++) {

                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");


                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 7
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        ignoreDefaultArgs: ["--enable-automation"],
                        executablePath: chromePaths.chrome,
                        defaultViewport: null
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        const cursor = createCursor(page);
                        await page.goto('https://www.starbucks.com/account/create');
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        console.log('TASK STATUS: '.bold + 'GENERATING SHAPE HEADERS'.magenta.bold);
                        await page.waitForSelector('#truste-consent-button');
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click('#truste-consent-button')
                        await page.waitForSelector('#firstName');
                        console.log('TASK STATUS: '.bold + 'FILLING OUT FORM'.yellow.bold);
                        await cursor.click('#firstName');
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type(firstName, {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click("#lastName");
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type(lastName, {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click("#emailAddress");
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type(email, {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click("#password");
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type(password, {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        console.log('TASK STATUS: '.bold + "BYPASSING LINK DETERRENT".cyan.bold);
                        await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div:nth-child(5) > div:nth-child(2) > label > span > span.option__labelText > a:nth-child(1) > span:nth-child(1)")
                            dom.innerHTML = ""
                            let dom2 = document.querySelector("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div:nth-child(5) > div:nth-child(2) > label > span > span.option__labelText > a:nth-child(2) > span.sb-external-link--text")
                            dom2.innerHTML = ""
                            }`
                        );
                        await cursor.click("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div:nth-child(5) > div:nth-child(2) > label > span > span.flex-shrink-none > span");
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        for(var k = 0; k < 2; k++) {
                            await cursor.click("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div.flex.justify-end.mt6 > button");
                        }
                        console.log('TASK STATUS: '.bold + "POSTING ACCOUNT DATA".yellow.bold);
                        await page.waitForTimeout(Math.floor(Math.random() * 6250) + 6000);
                        if (await page.$("#firstName") !== null) {
                            console.log("TASK STATUS: ".bold + "ERROR SHAPE BAN".red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        } else {
                            console.log("TASK STATUS: ".bold + "ACCOUNT CREATED".green.bold);
                            await page.waitForTimeout(Math.floor(Math.random() * 700) + 500);
                            await page.goto('https://app.starbucks.com/account/personal', {
                                waitUntil: 'networkidle2'
                            });
                            await page.waitForSelector('#addressLine1');
                            console.log('TASK STATUS: '.bold + "GENERATING COUPON".cyan.bold);
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await cursor.click("#addressLine1");
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.keyboard.type(fakerator.address.street(), {
                                delay: Math.floor(Math.random() * 30) + 20
                            });
                            console.log('TASK STATUS: '.bold + "SETTING COUPON DATA".yellow.bold);
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await cursor.click('#city');
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.keyboard.type('New York City', {
                                delay: Math.floor(Math.random() * 30) + 20
                            });
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await cursor.click('#countrySubdivision');
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.keyboard.type('New Y', {
                                delay: Math.floor(Math.random() * 30) + 20
                            });
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.keyboard.press('Enter');
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await cursor.click('#postalCode');
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.keyboard.type('10001', {
                                delay: Math.floor(Math.random() * 30) + 20
                            });
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.type('#birthMonth', credentials.ihopmonth, {
                                delay: Math.floor(Math.random() * 30) + 20
                            });
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.keyboard.press('Enter');
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            await page.type('#birthDay', JSON.stringify(d3), {
                                delay: Math.floor(Math.random() * 30) + 20
                            });
                            await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                            console.log('TASK STATUS: '.bold + "POSTING COUPON DATA".yellow.bold);
                            for(var j = 0; j < 2; j++) {
                                await cursor.click('#content > div.sb-contentCrate.passOnFullHeight___3zGAo > div > div > form > div.invisible.sb-global-gutters.py3.lg-py5.base___3dWsJ > div > div > div > button');
                            }
                            var i = 0
                            checkForNoti();
                            async function checkForNoti() {
                                while (i < 10) {
                                    if (await page.$("#notifications-target > div:nth-child(2) > div:nth-child(1) > div > div > div") !== null) {
                                        i = 100000000;
                                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY GENERATED COUPON".green.bold);
                                        await browser.close();

                                        const hook = new Webhook(credentials.discordWebhook);
                                        const b_url = webhookIMG;

                                        hook.setUsername('SplashAIO');
                                        hook.setAvatar(b_url);

                                        const embed = new MessageBuilder()
                                            .setTitle('☕ Successfully Generated Coupon ☕')
                                            .addField('Site', 'Starbucks', true)
                                            .addField('Mode', 'Hybrid', true)
                                            .addField('Email', '||' + email + '||')
                                            .addField('Password', '||' + password + '||', true)
                                            .addField('Format', '||' + email + ':' + password + '||')
                                            .setColor(webhookColor)
                                            .setThumbnail('https://securecdn.pymnts.com/wp-content/uploads/2022/02/starbucks.jpg')
                                            .setDescription('')
                                            .setImage('')
                                            .setFooter('SplashAIO', webhookIMG)
                                            .setTimestamp();

                                        await hook.send(embed);
                                        await masterLog(secretKey);
                                        await masterLogAdmin(license, secretKey);
                                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                                        await logFileCreds(email, password, null);
                                        setTimeout(() => {
                                            return runOfficial();
                                        }, 5000);
                                    } else {
                                        await page.waitForTimeout(550);
                                        i++;
                                    }
                                }
                                if (i == 100000000) {} else {
                                    console.log('TASK STATUS: '.bold + "FAILED TO CREATE A COUPON".red.bold);
                                    await browser.close();
                                    setTimeout(() => {
                                        return runOfficial();
                                    }, 5000);
                                }
                            }
                        }
                        //#notifications-target > div:nth-child(2) > div:nth-child(1) > div > div > div
                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERR LOADING PAGE".red.bold);
                        await browser.close();
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
                .setTitle('☕ Successfully Generated Coupon ☕')
                .addField('Site', 'Starbucks', true)
                .addField('Mode', 'Hybrid', true)
                .setColor(webhookColor)
                .setThumbnail('https://securecdn.pymnts.com/wp-content/uploads/2022/02/starbucks.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);

        }
    }

    async function amcTheaters(license, secretKey, hostHeader) {
        
        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        defaultViewport: null,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto(`https://www.amctheatres.com/amcstubs/insider?modalName=InsiderSignUpModal&stockholders_loy_stockholders_hero`, {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(2) > div > div > input[type=email]');
                        console.log('TASK STATUS: '.bold + "LOADED BROWSER".yellow.bold);
                        await page.waitForTimeout(500);
                        await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(2) > div > div > input[type=email]', email, {delay: 25});
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + "INJECTING PAYLOAD".yellow.bold);
                        await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > input[type=text]', firstName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div > input[type=text]', lastName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.click('#birthdate-month');
                        await page.waitForTimeout(50);
                        await page.type('#birthdate-month', credentials.ihopmonth, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.click('#birthdate-day');
                        await page.waitForTimeout(50);
                        await page.type('#birthdate-day', JSON.stringify(d3), {delay: 25});
                        await page.waitForTimeout(50);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        await page.click('#birthdate-year');
                        await page.waitForTimeout(50);
                        await page.type('#birthdate-year', '1999', {delay: 25});
                        await page.waitForTimeout(50);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(50);
                        var password = fakerator.random.string(6)+ "!2C";
                        await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(4) > div > input[type=password]', password, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(5) > div > div:nth-child(2) > div > div:nth-child(1) > div > div > input[type=text]', '10001', {delay: 25});
                        await page.waitForTimeout(50);
                        await page.click("i[aria-label='Submit Search']");
                        await page.waitForTimeout(50);
                        await page.waitForSelector("label[class='theatre-result radio-masking']");
                        await page.waitForTimeout(50);
                        await page.click("label[class='theatre-result radio-masking']");
                        await page.waitForTimeout(50);
                        await page.waitForSelector('#accept-stubs-terms-and-conditions');
                        await page.waitForTimeout(500);
                        await page.click('#accept-stubs-terms-and-conditions');
                        await page.waitForTimeout(50);
                        await page.click("button[type='submit']");
                        await page.waitForTimeout(10000);
                        if (await page.$('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(2) > div > div > input[type=email]') !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                            browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🎥 Successfully Generated 🎥')
                                .addField('Site', 'AMC')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://deadline.com/wp-content/uploads/2019/05/amc.jpg') 
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);

                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }



                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERROR DURING GEN PROCESS".red.bold);
                        await browser.close();
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
                    .setTitle('🎥 Successfully Generated 🎥')
                    .addField('Site', 'AMC')
                    .setColor(webhookColor)
                    .setThumbnail('https://deadline.com/wp-content/uploads/2019/05/amc.jpg') 
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }
    }

    async function doordash(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);
        const checkForProf = prompt("Do you want to add address and card info? (y/n): ".cyan.bold);
        if(checkForProf == null || threads == null) {
            console.log("Make sure to enter correct info".red.bold);
            sleep(2000);
            process.exit();
        }
        let currentProf = {};
        if (checkForProf.charAt(0) == 'y' || checkForProf.charAt(0) == 'Y') {
            const profiles = JSON.parse(fs.readFileSync('./Storage/Profiles/aycd.json', 'utf-8'));

            try {
        
                currentProf.address = profiles.billingAddress.line1;
                currentProf.cardNumber = profiles.paymentDetails.cardNumber;
                currentProf.cardExpMonth = profiles.paymentDetails.cardExpMonth;
                currentProf.cardExpYear = profiles.paymentDetails.cardExpYear;
                currentProf.cardCvv = profiles.paymentDetails.cardCvv;

            } catch (e) {
                console.log("Make sure to add a profile first".red.bold);
                sleep(2000);
                process.exit();
            }
        
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
    
                const args = [
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]
    
                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const emailList = fs
                    .readFileSync("./Storage/emails.txt", "utf8")
                    .split("\n")
                    .filter(String);
                if(emailList.length == 0 || emailList.length == null) {
                    console.log('Please make sure you have a valid email list!'.red.bold);
                    sleep(2000);
                    process.exit();
                }
                const email = random(emailList);
                const phoneNumber = JSON.stringify(fakerator.date.age(1111111, 9999999));
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "A!"
    
                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        defaultViewport: null,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://drd.sh/sxGA7qh2oWYKBMuT', {
                            waitUntil: 'networkidle2'
                        });
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        await page.waitForSelector("input[data-anchor-id='IdentitySignupFirstNameField']");
                        await page.waitForTimeout(1250);
                        console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                        await page.type("input[data-anchor-id='IdentitySignupFirstNameField']", firstName, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[data-anchor-id='IdentitySignupLastNameField']", lastName, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[data-anchor-id='IdentitySignupEmailField']", email, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);

                        console.log('TASK STATUS: '.bold + 'REQUESTING SMS NUMBER'.cyan.bold);
                        const bearerToken = await textVerifiedGetSession(credentials.textverified);
                        if(bearerToken == null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GETTING SMS NUMBER'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        } else {
                            
                            let numberidSplit = await textVerifiedNumber(bearerToken, 20);
                            
                            numberidSplit = numberidSplit.split(':');
                            const numberid = numberidSplit[0];
                            const smsID = numberidSplit[1];
                            
                            if(numberid == null) {
                                console.log('TASK STATUS: '.bold + 'ERROR GETTING SMS NUMBER'.red.bold);
                                await browser.close();
                                setTimeout(() => {
                                    return runOfficial();
                                }, 5000)

                            } else {

                                await page.type("input[data-anchor-id='IdentitySignupPhoneField']", numberid, {
                                    delay: 25
                                });
                                await page.waitForTimeout(50);
                                await page.type("input[data-anchor-id='IdentitySignupPasswordField']", password, {
                                    delay: 25
                                });
                                await page.waitForTimeout(50);
                                console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                                await page.click("button[id='sign-up-submit-button']");
                                await page.waitForTimeout(10000);

                                if (await page.$("input[data-anchor-id='IdentitySignupPasswordField']") !== null) {
                                    console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING FORM'.red.bold);
                                    await browser.close();
                                    setTimeout(() => {
                                        return runOfficial();
                                    }, 5000)
                                } else {
                                    console.log('TASK STATUS: '.bold + 'WAITING FOR SMS CODE'.cyan.bold);
                                    await page.waitForSelector("input[type='number']");
                                    await page.waitForTimeout(5000);
                                    let code = await textVerifiedCheck(bearerToken, smsID);
                                    while(code == "Pending") {
                                        setTimeout(() => {}, 5000);
                                        code = await textVerifiedCheck(bearerToken, smsID);
                                    }
                                    if(code == null) {
                                        console.log('TASK STATUS: '.bold + 'ERROR GETTING SMS CODE'.red.bold);
                                        await browser.close();
                                        setTimeout(() => {
                                            return runOfficial();
                                    }, 5000)
                                    } else {
                                        console.log('TASK STATUS: '.bold + 'GOT SMS CODE'.magenta.bold);
                                        await page.waitForTimeout(500);
                                        await page.type("input[type='number']", code, {
                                            delay: 25
                                        });
                                        await page.waitForTimeout(500);
                                        await page.click("button[kind='BUTTON/PRIMARY']");
                                        await page.waitForTimeout(12500);
                                        if (await page.url().includes('https://www.doordash.com/')) {

                                            if (checkForProf.charAt(0) == 'y' || checkForProf.charAt(0) == 'Y') {
                                                console.log('TASK STATUS: '.bold + 'SUBMITTING SHIPPING'.cyan.bold);
                                                await page.goto('https://www.doordash.com/home');
                                                await page.waitForSelector("input[aria-label='Your delivery address']");
                                                await page.waitForTimeout(500);
                                                await page.type("input[aria-label='Your delivery address']", currentProf.address, {
                                                    delay: 25
                                                });
                                                await page.waitForTimeout(50);
                                                await page.click("button[kind='BUTTON/PLAIN']", {clickCount: 2})
                                                await page.waitForTimeout(500);
                                                await page.click("button[kind='BUTTON/PLAIN']", {clickCount: 2})
                                                await page.waitForTimeout(2500);
                                                await page.goto('https://www.doordash.com/consumer/payment/');
                                                try {
                                                    await page.waitForSelector("button[data-anchor-id='PaymentMethodAdd']");
                                                } catch (e) {
                                                    console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING SHIPPING'.red.bold);
                                                    await browser.close();
                                                    setTimeout(() => {
                                                        return runOfficial();
                                                    }, 5000)
                                                }
                                                await page.waitForTimeout(5000);
                                                if (await page.$("input[aria-label='Card expiration date']") !== null) {
                                                    console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING BILLING'.red.bold);
                                                    await browser.close();
                                                    setTimeout(() => {
                                                        return runOfficial();
                                                    }, 5000)
                                                } else {
                
                                                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED REFERRAL'.green.bold);
                
                                                    await browser.close();
                
                                                    const hook = new Webhook(credentials.discordWebhook);
                
                                                    hook.setUsername('SplashAIO');
                                                    hook.setAvatar(webhookIMG);
                
                                                    const embed = new MessageBuilder()
                                                        .setTitle('🛍️ Successfully Generated 🛍️')
                                                        .addField('Site', 'Doordash', true)
                                                        .addField('Mode', 'Chain and Bill', true)
                                                        .addField('Email', '||' + email + '||')
                                                        .addField('Password', '||' + password + '||', true)
                                                        .addField('Phone', '||' + '206' + phoneNumber + '||', true)
                                                        .addField('Format', '||' + email + ':' + password + '||')
                                                        .setColor(webhookColor)
                                                        .setThumbnail('https://doordash.news/wp-content/uploads/2021/08/Screen-Shot-2021-08-30-at-11.39.16-AM-e1630348880898.png')
                                                        .setDescription('')
                                                        .setImage('')
                                                        .setFooter('SplashAIO', webhookIMG)
                                                        .setTimestamp();
                
                                                    await hook.send(embed);
                                                    await masterLog(secretKey, "Chain and Bill");
                                                    await masterLogAdmin(license, secretKey);
                                                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                                                    await logFileCreds(email, password, null);
                
                                                    setTimeout(() => {
                                                        return runOfficial();
                                                    }, 5000);
                
                                                }
                
                
                
                                            } else {
                
                                                console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED REFERRAL'.green.bold);
                
                                                await browser.close();
                
                                                const hook = new Webhook(credentials.discordWebhook);
                
                                                hook.setUsername('SplashAIO');
                                                hook.setAvatar(webhookIMG);
                
                                                const embed = new MessageBuilder()
                                                    .setTitle('🛍️ Successfully Generated 🛍️')
                                                    .addField('Site', 'Doordash', true)
                                                    .addField('Mode', 'Chain', true)
                                                    .addField('Email', '||' + email + '||')
                                                    .addField('Password', '||' + password + '||', true)
                                                    .addField('Phone', '||' + phoneNumber + '||', true)
                                                    .addField('Format', '||' + email + ':' + password + '||')
                                                    .setColor(webhookColor)
                                                    .setThumbnail('https://doordash.news/wp-content/uploads/2021/08/Screen-Shot-2021-08-30-at-11.39.16-AM-e1630348880898.png')
                                                    .setDescription('')
                                                    .setImage('')
                                                    .setFooter('SplashAIO', webhookIMG)
                                                    .setTimestamp();
                
                                                await hook.send(embed);
                                                await masterLog(secretKey, "Chain");
                                                await masterLogAdmin(license, secretKey);
                                                await grabAnalytics(hostHeader, license, secretKey, "Add")
                                                await logFileCreds(email, password, phoneNumber);
                
                                                setTimeout(() => {
                                                    return runOfficial();
                                                }, 5000);
                
                                            }
                
                                        } else {
                                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                                            await browser.close();
                                            setTimeout(() => {
                                                return runOfficial();
                                            }, 5000);
                                        }
                                    }
                                } 
                            }
                        }
    
                    } catch (e) {
                        console.log(e);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }
    
                }
    
            }
            async function masterLog(secretKey, taskMode) {
    
                const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                const hook = new Webhook(sharedHook);
    
                hook.setUsername('SplashAIO');
                hook.setAvatar(webhookIMG);
    
                const embed = new MessageBuilder()
                    .setTitle('🛍️ Successfully Generated 🛍️')
                    .addField('Site', 'Doordash', true)
                    .addField('Mode', taskMode, true)
                    .setColor(webhookColor)
                    .setThumbnail('https://doordash.news/wp-content/uploads/2021/08/Screen-Shot-2021-08-30-at-11.39.16-AM-e1630348880898.png')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();
    
                hook.send(embed);
            }
        }
    
    }

    //Starting Acc Gen Modules

    async function bestBuy(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        executablePath: chromePaths.chrome,
                        defaultViewport: null
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://www.bestbuy.com/identity/global/createAccount', {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector('#firstName');
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                        await page.type('#firstName', firstName, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                        await page.type('#lastName', lastName, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type('#email', email, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[id='fld-p1']", password, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type("input[id='reenterPassword']", password, {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        await page.type('#phone', JSON.stringify(fakerator.date.age(1111111111, 9999999999)), {
                            delay: 25
                        });
                        await page.waitForTimeout(50);
                        console.log("TASK STATUS: ".bold + "BYPASSING TMX".cyan.bold);
                        /* await page.deleteCookie({
                             name : "ZPLANK",
                             domain : ".bestbuy.com"
                         })
                         await page.waitForTimeout(50);
                         const cookies = [
                             {name: 'zplank', value: '', domain: '.bestbuy.com'},
                         ];
                         await page.setCookie(...cookies);
                         */
                        await page.waitForTimeout(50);
                        console.log("TASK STATUS: ".bold + "SUBMITTING FORM".yellow.bold);
                        await page.click("button[class='c-button c-button-secondary c-button-lg c-button-block c-button-icon c-button-icon-leading cia-form__controls__submit ']");
                        await page.waitForTimeout(7500);

                        if (await page.$('#firstName') !== null) {
                            console.log("TASK STATUS: ".bold + "FAILED TO CREATE AN ACCOUNT".red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        } else {
                            console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);
                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);
                            const b_url = webhookIMG;

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(b_url);

                            const embed = new MessageBuilder()
                                .setTitle('🎮 Successfully Generated 🎮')
                                .addField('Site', 'BestBuy')
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + ':' + raw + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F211123135412-best-buy-store-stock.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }


                    } catch (e) {
                        console.log('TASK STATUS: '.red.bold + 'ERROR DURING GEN PROCESS'.red.bold);
                        await browser.close();
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
                .setTitle('🎮 Successfully Generated 🎮')
                .addField('Site', 'BestBuy', true)
                .addField('Mode', 'TMX-Bypass', true)
                .setColor(webhookColor)
                .setThumbnail('https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F211123135412-best-buy-store-stock.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }

    }

    async function target(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                let userAgents = [
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 Edg/90.0.818.42',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.37',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Edg/91.0.864.48',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.100.0',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4456.0 Safari/537.36 Edg/91.0.845.2',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4544.0 Safari/537.36 Edg/93.0.933.1',
                    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
                ];

                userAgents = userAgents[Math.floor(Math.random() * userAgents.length)]

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--window-position=0,0',
                    '--ignore-certifcate-errors',
                    '--ignore-certifcate-errors-spki-list',
                    `--user-agent="${userAgents}"`,
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        ignoreDefaultArgs: ["--enable-automation"],
                        args: args,
                        executablePath: chromePaths.chrome,
                        defaultViewport: null
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        const cursor = createCursor(page);
                        await page.goto('https://www.target.com/', {
                            waitUntil: 'networkidle2'
                        });
                        await page.setExtraHTTPHeaders({
                            'Accept-Language': 'en'
                        });
                        await page.waitForSelector('#headerPrimary > a.styles__PrimaryHeaderLink-sc-srf2ow-1.styles__StyledLinkNamedIcon-sc-u2k6h-1.elbitu.daQAhe');
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        await page.waitForTimeout(fakerator.date.age(400, 500));
                        await cursor.click('#headerPrimary > a.styles__PrimaryHeaderLink-sc-srf2ow-1.styles__StyledLinkNamedIcon-sc-u2k6h-1.elbitu.daQAhe');
                        await page.waitForSelector('#listaccountNav-createAccount > a');
                        await page.waitForTimeout(fakerator.date.age(400, 500));
                        await cursor.click('#listaccountNav-createAccount > a');
                        await page.waitForSelector("input[id='username']");
                        console.log('TASK STATUS: '.bold + 'GENERATING COOKIES'.yellow.bold);
                        await page.waitForTimeout(fakerator.date.age(400, 500));
                        await cursor.click("input[id='username']");
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                        await page.keyboard.type(email, {
                            delay: fakerator.date.age(25, 90)
                        });
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        await cursor.click("input[id='firstname']");
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        await page.keyboard.type(firstName, {
                            delay: fakerator.date.age(25, 90)
                        });
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        await cursor.click("input[id='lastname']");
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        await page.keyboard.type(lastName, {
                            delay: fakerator.date.age(25, 90)
                        });
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        await cursor.click("input[id='password']");
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        await page.keyboard.type(password, {
                            delay: fakerator.date.age(25, 90)
                        });
                        await page.waitForTimeout(fakerator.date.age(25, 90));
                        console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                        await cursor.click("button[id='createAccount']");
                        await page.waitForTimeout(fakerator.date.age(4000, 5500));
                        if (await page.$("button[id='circle-join-free']") !== null) {
                            await page.click("button[id='circle-join-free']", elem => elem.click());
                        } else {
                            console.log("TASK STATUS: ".bold + "ERROR SHAPE BAN".red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }
                        await page.waitForTimeout(fakerator.date.age(6700, 8000));
                        if (await page.url().includes('https://www.target.com/circle/enroll/phoneentry')) {
                            console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);
                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🎯Successfully Generated🎯')
                                .addField('Site', 'Target', )
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + ':' + raw + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.national-law.com/wp-content/uploads/2014/05/target-logo-reverse-wide.png')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log("TASK STATUS: ".bold + "FAILED TO CREATE AN ACCOUNT".red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }


                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                        await browser.close();
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
                .setTitle('🎯Successfully Generated🎯')
                .addField('Site', 'Target', true)
                .addField('Mode', 'Safe', true)
                .setColor(webhookColor)
                .setThumbnail('https://www.national-law.com/wp-content/uploads/2014/05/target-logo-reverse-wide.png')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }
    }

    async function walmart(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                generateCookies();
                async function generateCookies() {

                    console.log('TASK STATUS: '.bold + 'GENERATING COOKIES'.yellow.bold);

                    try {
                        const response = await axios({
                            method: 'GET',
                            url: 'https://www.walmart.com/account/signup',
                            headers: {
                                "Host": "www.walmart.com",
                                "Connection": "keep-alive",
                                "sec-ch-ua": '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
                                "sec-ch-ua-mobile": "?0",
                                "sec-ch-ua-platform": '"Windows"',
                                "Upgrade-Insecure-Requests": "1",
                                "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "Sec-Fetch-Site": "none",
                                "Sec-Fetch-Mode": "navigate",
                                "Sec-Fetch-User": "?1",
                                "Sec-Fetch-Dest": "document",
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": 'en-US,en;q=0.9'
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
                        const dayta = response.data
                        const regex = /Robot or human/
                        const found = regex.test(dayta);
                        if (found) {
                            console.log("TASK STATUS: ".bold + "ERROR SOLVING PERIMITERX".red.bold);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'POSTING ACCOUNT'.yellow.bold);
                            generateAccount();
                        }
                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                }

                async function generateAccount() {
                    try {
                        const response = await axios({
                            method: 'POST',
                            url: 'https://www.walmart.com/account/electrode/api/signup?vid=oaoh',
                            headers: {
                                "Host": "www.walmart.com",
                                "Connection": "keep-alive",
                                "sec-ch-ua": `"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"`,
                                "sec-ch-ua-mobile": "?0",
                                "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                                "sec-ch-ua-platform": `"Windows"`,
                                "content-type": "application/json",
                                "Accept": "*/*",
                                "Origin": "https://www.walmart.com",
                                "Sec-Fetch-Site": "same-origin",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Dest": "empty",
                                "Referer": "https://www.walmart.com/account/signup",
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": 'en-US,en;q=0.9'
                            },
                            data: {
                                "personName": {
                                    "firstName": firstName,
                                    "lastName": lastName
                                },
                                "email": email,
                                "password": password,
                                "rememberme": true,
                                "emailNotificationAccepted": true,
                                "captcha": {
                                    "sensorData": ""
                                }
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
                        if (response.data.cid) {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🛒Successfully Generated🛒')
                                .addField('Site', 'Walmart', true)
                                .addField('Mode', 'Requests', true)
                                .addField('Email', '||' + email + '||')
                                .addField('Password', '||' + password + '||', true)
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://cdn.corporate.walmart.com/dims4/WMT/31f79e1/2147483647/strip/true/crop/2400x1260+0+170/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2Fb6%2Fc6%2F5e1cb86e49f6948b3298e76c1123%2Fpress-hero-1.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log("TASK STATUS: ".bold + "ERROR SOLVING PERIMITERX".red.bold);
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
                .setTitle('🛒Successfully Generated🛒')
                .addField('Site', 'Walmart', true)
                .addField('Mode', 'Requests', true)
                .setColor(webhookColor)
                .setThumbnail('https://cdn.corporate.walmart.com/dims4/WMT/31f79e1/2147483647/strip/true/crop/2400x1260+0+170/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcdn.corporate.walmart.com%2Fb6%2Fc6%2F5e1cb86e49f6948b3298e76c1123%2Fpress-hero-1.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }
    }

    async function gmail(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                //new HttpsProxyAgent.HttpsProxyAgent(`${splitproxy[2]}:${splitproxy[3]}@${splitproxy[0]}:${splitproxy[1]}`),

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const moArray = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
                const monthType = moArray[Math.floor(Math.random() * moArray.length)]

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        executablePath: chromePaths.chrome,
                        defaultViewport: null,
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        var [page] = await browser.pages();
                        await page.goto('https://www.google.com/gmail/about/', {
                            waitUntil: 'networkidle2'
                        });
                        const cursor = createCursor(page);
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        await page.waitForSelector("div[class='feature__chapter']")
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await cursor.move("a[data-action='create an account']");
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.click("a[data-action='create an account']");
                        console.log('TASK STATUS: '.bold + 'GENERATING ACCOUNT SESSION'.cyan.bold);
                        await page.waitForSelector("input[id='firstName']");
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        console.log('TASK STATUS: '.bold + 'SIMULATING KEYBOARD TYPING'.cyan.bold);
                        await cursor.move("input[id='firstName']");
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.type("input[id='firstName']", firstName, {
                            delay: Math.floor((Math.random() * 150) + 100)
                        });
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await cursor.move("input[id='lastName']");
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.type("input[id='lastName']", lastName, {
                            delay: Math.floor((Math.random() * 150) + 100)
                        });
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        const fullCreds = fakerator.lorem.word() + fakerator.lorem.word() + `${JSON.stringify(Math.floor((Math.random() * 60) + 40))}a`
                        await cursor.move("input[type='email']");
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.type("input[type='email']", fullCreds, {
                            delay: Math.floor((Math.random() * 150) + 100)
                        });
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await cursor.move("input[name='Passwd']");
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.type("input[name='Passwd']", password, {
                            delay: Math.floor((Math.random() * 150) + 100)
                        });
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await cursor.move("input[name='ConfirmPasswd']");
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.type("input[name='ConfirmPasswd']", password, {
                            delay: Math.floor((Math.random() * 150) + 100)
                        });
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await cursor.move('#accountDetailsNext > div > button');
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.click('#accountDetailsNext > div > button', elem => elem.click());
                        console.log('TASK STATUS: '.bold + 'SUBMITTING INITIAL CREDENTIALS'.yellow.bold);
                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                        await page.waitForSelector("input[id='phoneNumberId']");
                        const balance = await smsActivate.getBalance();
                        if (balance > 0) {
                            const numberDetails = await smsActivate.getNumber('go', 187);
                            await smsActivate.setStatus(numberDetails.id, 1);
                            console.log('TASK STATUS: '.bold + 'REQUESTING SMS NUMBER'.cyan.bold);
                            let numberid = JSON.stringify(numberDetails.number)
                            numberid = numberid.substr(1);
                            await page.waitForTimeout(Math.floor((Math.random() * 500) + 400));
                            await cursor.move("input[id='phoneNumberId']");
                            await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                            await page.type("input[id='phoneNumberId']", numberid, {
                                delay: Math.floor((Math.random() * 150) + 100)
                            });
                            await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                            await cursor.move('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button');
                            await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button', elem => elem.click());
                            await page.waitForTimeout(5000);
                            if (await page.$("input[aria-label='Enter verification code']") !== null) {
                                try {
                                    await page.waitForSelector("input[aria-label='Enter verification code']");
                                } catch (e) {
                                    console.log('TASK STATUS: '.bold + 'ERROR LOADING SMS'.red.bold);
                                    await browser.close();
                                    setTimeout(() => {
                                        return runOfficial();
                                    }, 5000)
                                }
                                const waitForCode = setInterval(async () => {
                                    const code = await smsActivate.getCode(numberDetails.id);
                                    if (code) {
                                        clearInterval(waitForCode);
                                        await smsActivate.setStatus(numberDetails.id, 6);
                                        await cursor.move("input[aria-label='Enter verification code']");
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.type("input[aria-label='Enter verification code']", code, {
                                            delay: Math.floor((Math.random() * 150) + 100)
                                        });
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await cursor.move('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.qhFLie > div > div > button');
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.qhFLie > div > div > button', elem => elem.click());
                                        console.log('TASK STATUS: '.bold + 'SOLVED SMS CHALLENGE'.magenta.bold);
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.waitForSelector("select[id='month']");
                                        await page.waitForTimeout(1500);
                                        const phone = "input[id='phoneNumberId']"
                                        await cursor.move("input[id='phoneNumberId']");
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.click(phone, {
                                            clickCount: 5
                                        })
                                        await page.waitForTimeout(1500);
                                        await page.keyboard.press('Backspace');
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await cursor.move("input[name='recoveryEmail']");
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.type("input[name='recoveryEmail']", email, {delay: 25});
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await cursor.move("select[id='month']");
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.type("select[id='month']", monthType, {
                                            delay: Math.floor((Math.random() * 150) + 100)
                                        });
                                        await page.keyboard.press('Enter');
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await cursor.move("input[aria-label='Day']");
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.type("input[aria-label='Day']", JSON.stringify(fakerator.date.age(10, 27)), {
                                            delay: Math.floor((Math.random() * 150) + 100)
                                        });
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await cursor.move("input[aria-label='Year']");
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.type("input[aria-label='Year']", JSON.stringify(fakerator.date.age(1980, 1999)), {
                                            delay: Math.floor((Math.random() * 150) + 100)
                                        });
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await cursor.move("select[id='gender']");
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.type("select[id='gender']", 'ma', {
                                            delay: Math.floor((Math.random() * 150) + 100)
                                        });
                                        await page.keyboard.press('Enter');
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await cursor.move('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button');
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button', elem => elem.click());
                                        await page.waitForTimeout(5000);
                                        await page.waitForSelector('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button');
                                        await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                        await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button')
                                        await page.waitForTimeout(7500);
                                        if (await page.url().includes('mail.google.com')) {
                                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);
                                            await browser.close();

                                            const hook = new Webhook(credentials.discordWebhook);
                                            hook.setUsername('SplashAIO');
                                            hook.setAvatar(webhookIMG);

                                            const embed = new MessageBuilder()
                                                .setTitle('📧 Successfully Generated 📧')
                                                .addField('Site', 'Gmail ', true)
                                                .addField('Mode', 'Browser', true)
                                                .addField('Email', '||' + fullCreds + '@gmail.com' + '||')
                                                .addField('Password', '||' + password + '||')
                                                .addField('Recovery', '||' + email + '||')
                                                .addField('Format (AYCD)', '||' + fullCreds + '@gmail.com' + ':::' + password + ':::' + email + '||')
                                                .setColor(webhookColor)
                                                .setThumbnail('https://cdn.vox-cdn.com/thumbor/8fWz6qpiMYMsZhY4vrc9Vhl5yL8=/0x110:1320x770/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21939811/newgmaillogo.jpg')
                                                .setDescription('')
                                                .setImage('')
                                                .setFooter('SplashAIO', webhookIMG)
                                                .setTimestamp();

                                            await hook.send(embed);
                                            await masterLog(secretKey);
                                            await masterLogAdmin(license, secretKey);
                                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                                            await logFileCreds(`${fullCreds}@gmail.com::`, `${password}:::${email}`, null);
                                            setTimeout(() => {
                                                return runOfficial();
                                            }, 5000)
                                        } else {
                                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                                            await browser.close();
                                            setTimeout(() => {
                                                return runOfficial();
                                            }, 5000)
                                        }
                                    }
                                }, 1500);
                            } else {
                                console.log('TASK STATUS: '.bold + 'INVALID SMS REQUEST'.red.bold);
                                await browser.close();
                                setTimeout(() => {
                                    return runOfficial();
                                }, 5000)
                            }
                        } else {
                            console.log('TASK STATUS: '.bold + 'INVALID SMS CODE'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }
                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERROR LOADING PAGE'.red.bold);
                        await browser.close();
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
                .setTitle('📧 Successfully Generated 📧')
                .addField('Site', 'Gmail', true)
                .addField('Mode', 'Browser', true)
                .setColor(webhookColor)
                .setThumbnail('https://cdn.vox-cdn.com/thumbor/8fWz6qpiMYMsZhY4vrc9Vhl5yL8=/0x110:1320x770/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21939811/newgmaillogo.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }
    }

    async function shopifyBrowser(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);
        const shopifydomain = prompt('Base Shopify URL: '.cyan.bold)

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--window-position=0,0',
                    '--ignore-certifcate-errors',
                    '--ignore-certifcate-errors-spki-list',
                    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        ignoreDefaultArgs: ["--enable-automation"],
                        args: args,
                        executablePath: chromePaths.chrome,
                        defaultViewport: null
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto(`https://${shopifydomain}/account/register`, {
                            waitUntil: 'networkidle2'
                        });
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        await page.waitForTimeout(1500);
                        if (await page.url().includes('atmos')) {
                            await page.waitForTimeout(3000);
                            await page.click("button[class='needsclick klaviyo-close-form kl-private-reset-css-Xuajs1']", elem => elem.click());
                            await page.waitForTimeout(1000);
                            await page.waitForSelector("button[class='NewsletterPopup__Close']");
                            await page.click("button[class='NewsletterPopup__Close']", elem => elem.click());
                        } else if (await page.url().includes('kith')) {
                            await page.waitForTimeout(50);
                            await page.click("button[class='needsclick klaviyo-close-form kl-private-reset-css-Xuajs1']", elem => elem.click());
                        }
                        await page.waitForTimeout(500);
                        console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                        await page.waitForSelector("input[name='customer[first_name]']")
                        await page.type("input[name='customer[first_name]']", firstName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[name='customer[last_name]']", lastName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[name='customer[email]']", email, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[name='customer[password]']", password, {delay: 25});
                        if (await page.url().includes('kith.com')) {
                            await page.waitForTimeout(50);
                            await page.click("input[type='checkbox']", elem => elem.click());
                        }
                        console.log('TASK STATUS: '.bold + 'SENDING REQUEST TO 2CAPTCHA [0]'.cyan.bold);
                        await page.solveRecaptchas();
                        console.log('TASK STATUS: '.bold + 'SOLVED CAPTCHA [0]'.green.bold);
                        await page.waitForTimeout(1000);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(5000);
                        if (await page.url().includes('challenge')) {
                            console.log('TASK STATUS: '.bold + 'SENDING REQUEST TO 2CAPTCHA [1]'.cyan.bold);
                            await page.solveRecaptchas();
                            console.log('TASK STATUS: '.bold + 'SOLVED CAPTCHA [1]'.green.bold);
                            await page.click("input[type='submit']", elem => elem.click());
                            await page.waitForTimeout(5000);
                        }
                        if (await page.$("input[id='FirstName']") !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold)
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        } else {
                            console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);
                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🛍️ Successfully Generated 🛍️')
                                .addField('Site', 'Shopify', true)
                                .addField('Mode', 'Browser', true)
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
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);

                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                        await browser.close();
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
                .setTitle('🛍️ Successfully Generated 🛍️')
                .addField('Site', 'Shopify', true)
                .addField('Mode', 'Browser', true)
                .addField('Substore', shopifydomain)
                .setColor(webhookColor)
                .setThumbnail('https://www.joykal.com/wp-content/uploads/2019/09/s-1.png')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }
    }

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

    async function ssense(license, secretKey, hostHeader) {
        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                console.log('TASK STATUS: '.bold + 'POSTING FORM DATA'.yellow.bold);
                try {
                    const response = await axios({
                        method: 'POST',
                        url: `https://www.ssense.com/en-us/account/register`,
                        headers: {
                            "Host": "www.ssense.com",
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0",
                            "Accept": "application/json",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Referer": "https://www.ssense.com/en-us/account/login",
                            "Content-Type": "application/json",
                            "Cache-Control": "no-store",
                            "Origin": "https://www.ssense.com",
                            "Content-Length": "29",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "same-origin"
                        },
                        data: {
                            "email": email,
                            "password": password,
                            "confirmpassword": password,
                            "gender": "men",
                            "source": "SSENSE_EN_SIGNUP"
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
                    if (response) {

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('👟 Successfully Generated Account 👟')
                            .addField('Site', 'SSENSE', true)
                            .addField('Mode', 'Requests', true)
                            .addField('Email', '||' + email + '||')
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://pbs.twimg.com/profile_images/1280220166731767808/tin9VBJ5_400x400.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await logFileCreds(email, password, null);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);

                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR PERIMITERX BAN'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000);

                }
            }
        }

        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('👟 Successfully Generated Account 👟')
                .addField('Site', 'SSENSE', true)
                .addField('Mode', 'Requests', true)
                .setColor(webhookColor)
                .setThumbnail('https://pbs.twimg.com/profile_images/1280220166731767808/tin9VBJ5_400x400.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }
    }

    async function nike(license, secretKey, hostHeader) {


        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                puppeteer.use(
                    AdblockerPlugin({
                        // Optionally enable Cooperative Mode for several request interceptors
                        interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
                    })
                )

                let userAgents = [
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 Edg/90.0.818.42',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.37',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Edg/91.0.864.48',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.100.0',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4456.0 Safari/537.36 Edg/91.0.845.2',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4544.0 Safari/537.36 Edg/93.0.933.1',
                    'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
                ];
                const monthsz = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                const dayz = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
                const yearz = ["1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1986", "1987", "1987", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1995"]
                const months = monthsz[Math.floor(Math.random() * monthsz.length)]
                const days = dayz[Math.floor(Math.random() * dayz.length)]
                const years = yearz[Math.floor(Math.random() * yearz.length)]
                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                userAgents = userAgents[Math.floor(Math.random() * userAgents.length)]

                const args = [
                    `--window-size=1080,1080`,
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--window-position=0,0',
                    '--ignore-certifcate-errors',
                    '--ignore-certifcate-errors-spki-list',
                ]


                launchBrowser();
                async function launchBrowser() {
                        const browser = await puppeteer.launch({
                            headless: false,
                            ignoreHTTPSErrors: true,
                            ignoreDefaultArgs: ["--enable-automation"],
                            args: args,
                            executablePath: chromePaths.chrome,
                            defaultViewport: null
                        });
                    try {
                        var [page] = await browser.pages();
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        const cursor = createCursor(page);
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.setExtraHTTPHeaders({
                            'Accept-Language': 'en'
                        });
                        await page.setUserAgent(
                            userAgents
                        );
                        console.log('TASK STATUS: '.bold + 'SETTING HEADERS'.yellow.bold);
                        await page.goto('https://nike.com');
                        await page.setCookie(...[{
                            name: "sq",
                            value: "3",
                            domain: ".nike.com"
                        }]);
                        console.log('TASK STATUS: '.bold + 'SETTING COOKIES'.yellow.bold);
                        await page.waitForSelector("a[aria-label='Kids']");
                        let clickSel = [
                            "a[aria-label='Kids']",
                            "a[aria-label='Men']",
                            "a[aria-label='Sale']",
                            "a[aria-label='Back to School']"
                        ];
                        clickSel = clickSel[Math.floor(Math.random() * clickSel.length)]

                        await page.waitForTimeout(Math.random() * 1500) + 1200;
                        await cursor.move('#gen-nav-commerce-header-v2 > div.pre-l-header-container > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div');
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click(clickSel);
                        console.log('TASK STATUS: '.bold + 'GENERATING FINGERPRINT'.cyan.bold);
                        await page.waitForSelector('#gen-nav-commerce-header-v2 > div.pre-l-header-container._2q6dEXXq > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div');
                        await page.waitForTimeout(Math.random() * 3300) + 2800;
                        await cursor.move('#gen-nav-commerce-header-v2 > div.pre-l-header-container._2q6dEXXq > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div');
                        await page.waitForTimeout(Math.random() * 1500) + 1200;
                        await cursor.click('#gen-nav-commerce-header-v2 > div.pre-l-header-container._2q6dEXXq > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div > div > div:nth-child(3) > div > a');
                        await page.waitForTimeout(Math.random() * 1250) + 900;
                        await page.goto('https://www.nike.com/register')
                        console.log('TASK STATUS: '.bold + 'FILLING FORM INFO'.yellow.bold);
                        await page.waitForSelector("input[type='email']");
                        await page.waitForTimeout(Math.random() * 1250) + 900;
                        await cursor.click("input[type='email']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await page.keyboard.type(email, {
                            delay: Math.random() * 100 + 50
                        });
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("input[type='password']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await page.keyboard.type(password, {
                            delay: Math.random() * 100 + 50
                        });
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("input[name='firstName']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await page.keyboard.type(firstName, {
                            delay: Math.random() * 100 + 50
                        });
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("input[name='lastName']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await page.keyboard.type(lastName, {
                            delay: Math.random() * 100 + 50
                        });
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("input[type='date']");
                        await page.waitForTimeout(Math.random() * 650) + 450;

                        //Generating Birth Data

                        console.log('TASK STATUS: '.bold + 'GENERATING BIRTH DATE DETAILS'.yellow.bold);

                        //Resuiming 

                        await page.keyboard.type(months, {
                            delay: Math.random() * 100 + 50
                        });
                        await page.keyboard.type(days, {
                            delay: Math.random() * 100 + 50
                        });
                        await page.keyboard.type(years, {
                            delay: Math.random() * 100 + 50
                        });

                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("div[class='nike-unite-gender-buttons gender nike-unite-component']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                        await cursor.click("input[value='JOIN US']");
                        await page.waitForTimeout(Math.random() * 15000) + 12000;
                        if (await page.$("input[name='firstName']") !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR 403 ACCESS DENIED'.red.bold);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }
                        console.log('TASK STATUS: '.bold + 'VERIFYING SMS'.cyan.bold);
                        await page.goto('https://www.nike.com/member/settings/');
                        await page.waitForSelector("button[aria-label='Add Mobile Number']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("button[aria-label='Add Mobile Number']");
                        await page.waitForSelector("input[class='phoneNumber']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("input[class='phoneNumber']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        const balance = await smsActivate.getBalance();
                        if (balance > 0) {
                            console.log('TASK STATUS: '.bold + 'WAITING FOR SMS'.cyan.bold);
                            const numberDetails = await smsActivate.getNumber('ew', 187);
                            await smsActivate.setStatus(numberDetails.id, 1);
                            let numberid = JSON.stringify(numberDetails.number)
                            numberid = numberid.substr(1);
                            await page.keyboard.type(numberid, {
                                delay: Math.random() * 100 + 50
                            });
                            await page.waitForTimeout(Math.random() * 650) + 450;
                            await cursor.click("input[class='sendCodeButton']");
                            await page.waitForTimeout(Math.random() * 650) + 450;
                            const waitForCode = setInterval(async () => {
                                const code = await smsActivate.getCode(numberDetails.id);
                                if (code) {
                                    clearInterval(waitForCode);
                                    console.log('TASK STATUS: '.bold + 'GOT SMS CODE'.magenta.bold);
                                    await smsActivate.setStatus(numberDetails.id, 6);
                                    await page.waitForTimeout(Math.random() * 320) + 40;
                                    await page.keyboard.type(code, {
                                        delay: Math.random() * 100 + 50
                                    });
                                    await cursor.click("label[class='checkbox']")
                                    await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                    await cursor.click("input[value='CONTINUE']")
                                    await page.waitForTimeout(Math.floor((Math.random() * 10000) + 8500));
                                    if (await page.$("input[name='firstName']") !== null) {
                                        console.log('TASK STATUS: '.bold + 'ERROR 403 ACCESS DENIED'.red.bold);
                                        setTimeout(() => {
                                            return runOfficial();
                                        }, 5000)
                                    } else {
                                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);
                                        await browser.close();

                                        const hook = new Webhook(credentials.discordWebhook);
                                        hook.setUsername('SplashAIO');
                                        hook.setAvatar(webhookIMG);

                                        const embed = new MessageBuilder()
                                            .setTitle('👟 Successfully Generated 👟')
                                            .addField('Site', 'Nike', true)
                                            .addField('Mode', 'Rewrite', true)
                                            .addField('Email', '||' + email + '||')
                                            .addField('Password', '||' + password + '||', true)
                                            .addField('Format', '||' + email + ':' + password + '||')
                                            .setColor(webhookColor)
                                            .setThumbnail('https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg')
                                            .setDescription('')
                                            .setImage('')
                                            .setFooter('SplashAIO', webhookIMG)
                                            .setTimestamp();

                                        await hook.send(embed);
                                        await hook.send(embed);
                                        await masterLog(secretKey);
                                        await masterLogAdmin(license, secretKey);
                                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                                        await logFileCreds(email, password, null);

                                    }
                                }
                            }, 5000);

                        } else {
                            console.log('TASK STATUS: '.bold + 'ERROR OUT OF BALANCE'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        }
                    } catch (e) {
                        console.log("TASK STATUS: ".bold + "ERROR DURING GEN PROCESS".red.bold);
                        await browser.close();
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
                    .setTitle('👟 Successfully Generated 👟')
                    .addField('Site', 'Nike', true)
                    .addField('Mode', 'Rewrite', true)
                    .setColor(webhookColor)
                    .setThumbnail('https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }

    }

    //Starting Waitlist Modules

    async function cybersole(license, secretKey, hostHeader) {

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
                email = email.slice(0, -1)

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://cybersole.io/api/marketing/signup',
                        headers: {
                            "Host": "cybersole.io",
                            "Cookie": `cookieyesID=bypass; cky-active-check=yes; cookieyes-necessary=yes; cky-action=yes; cky-consent=yes; cookieyes-analytics=yes; cookieyes-functional=yes;`,
                            "Content-Length": "38",
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="100"`,
                            "Sec-Ch-Ua-Mobile": '0?',
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Content-Type": "application/json",
                            "Accept": "*/*",
                            "Origin": "https://cybersole.io",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://cybersole.io/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
                        },
                        data: {
                            "email": email
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
                    if (response.data.success) {

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🤖 Joined Waitlist 🤖')
                            .addField('Site', 'Cybersole', true)
                            .addField('Email', '||' + email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://pbs.twimg.com/profile_images/1443640433473642499/1PFOD83L_400x400.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                    } else {
                        console.log("TASK STATUS: ".bold + "FAILED TO GENERATE ACCOUNT".red.bold);
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
                .setTitle('🤖 Joined Waitlist 🤖')
                .addField('Site', 'Cybersole', true)
                .addField('Entry Count', JSON.stringify(emailList.length))
                .setColor(webhookColor)
                .setThumbnail('https://pbs.twimg.com/profile_images/1443640433473642499/1PFOD83L_400x400.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }

    async function whatBot(license, secretKey, hostHeader) {

        let capType = ""

        const captchaTypeRes = prompt("2Captcha or AI: ".cyan.bold);
        if (captchaTypeRes.charAt(0) == '2' || captchaTypeRes.charAt(0) == 't' || captchaTypeRes.charAt(0) == 'T') {
            capType = "2captcha";
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

                if (capType == "2captcha") {

                    captchaToken = await solveTwoCap('recaptcha', '6LdQMdYbAAAAAEZ1cFq3w-iccwIZVeT9_kVfUUEz', `https://waitlist.whatbotisthis.com/`);

                    if (captchaToken == null) {
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }

                }  else {
                    captchaToken = await captchaAi('6LdQMdYbAAAAAEZ1cFq3w-iccwIZVeT9_kVfUUEz', 'https://waitlist.whatbotisthis.com/', 'RecaptchaV3TaskProxyless', license, secretKey);
                }

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://wl.whatbotisthis.com/api/waitlist/join',
                        headers: {
                            "Host": "wl.whatbotisthis.com",
                            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:105.0) Gecko/20100101 Firefox/105.0",
                            "Accept": "*/*",
                            "Accept-Language": "en-US,en;q=0.5",
                            "Accept-Encoding": "gzip, deflate",
                            "Referer": "https://waitlist.whatbotisthis.com/",
                            "Content-Type": "text/plain;charset=UTF-8",
                            "Origin": "https://waitlist.whatbotisthis.com",
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "same-site",
                            "Dnt": "1",
                            "Te": "trailers",
                        },
                        data: {
                            "email": email,
                            "token": captchaToken
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

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🤖 Joined Waitlist 🤖')
                            .addField('Site', 'WhatBot', true)
                            .addField('Email', '||' + email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://pbs.twimg.com/profile_images/1562257871034691584/z9tllqoj_400x400.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                    } else {
                        console.log("TASK STATUS: ".bold + "FAILED TO ENTER WAITLIST".red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }

                } catch (e) {
                    console.log("TASK STATUS: ".bold + "ERR (SUBNET BANNED)".red.bold);
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
                .setTitle('🤖 Joined Waitlist 🤖')
                .addField('Site', 'WhatBot', true)
                .setColor(webhookColor)
                .setThumbnail('https://pbs.twimg.com/profile_images/1562257871034691584/z9tllqoj_400x400.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }

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

    async function kodai(license, secretKey, hostHeader) {

        runOfficial();
        async function runOfficial() {

            const emailList = fs
                .readFileSync("./Storage/emails.txt", "utf8")
                .split("\n")
                .filter(String);

            await masterLog(secretKey);
            await masterLogAdmin(license, secretKey);

            for (let i = 0; i < emailList.length; i++) {

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

                let email = emailList[i];
                email = email.replace('\r', '');

                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://kodai.io/api/waitlist/enter",
                        headers: {
                            "Host": "kodai.io",
                            "Content-Length": 40,
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="8", "Chromium";v="99"`,
                            "Accept": "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                            "Sec-Ch-Ua-Platform": "macOS",
                            "Origin": "https://kodai.io",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": 'empty',
                            "Referer": "https://kodai.io/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9"
                        },
                        data: {
                            'email_address': email
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

                    if (response.data.success) {

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🤖 Successfully Entered Waitlist 🤖')
                            .addField('Site', 'Kodai')
                            .addField('Email', '||' + email + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://pbs.twimg.com/profile_images/1241542362121166852/0hQnV9lV_400x400.png')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")

                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR ENTERING WAITLIST'.red.bold);
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
            async function masterLog(secretKey) {

                const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                const hook = new Webhook(sharedHook);

                hook.setUsername('SplashAIO');
                hook.setAvatar(webhookIMG);

                const embed = new MessageBuilder()
                    .setTitle('🤖 Successfully Entered Waitlist 🤖')
                    .addField('Site', 'Kodai', true)
                    .addField('Entry Count', JSON.stringify(emailList.length), true)
                    .setColor(webhookColor)
                    .setThumbnail('https://pbs.twimg.com/profile_images/1241542362121166852/0hQnV9lV_400x400.png')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }

    }

    async function prismAIO(license, secretKey, hostHeader) {


        runOfficial();
        async function runOfficial() {

            const emailList = fs
                .readFileSync("./Storage/emails.txt", "utf8")
                .split("\n")
                .filter(String);

            await masterLog(secretKey);
            await masterLogAdmin(license, secretKey);

            for (let i = 0; i < emailList.length; i++) {

                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");

                let email = emailList[i];
                email = email.replace('\r', '');

                console.log('TASK STATUS: '.bold + 'POSTING FORM DATA'.yellow.bold);

                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://api.lancero.app/leads/create",
                        headers: {
                            "Host": "api.lancero.app",
                            "Accept": "*/*",
                            "Access-Control-Request-Method": "POST",
                            "Access-Control-Request-Headers": "authorization,content-type",
                            "Origin": "https://prismaio.com",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "cross-site",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://prismaio.com/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                            "Authorization": "Bearer pk_48017c19b65457ba76c8dfe0f680d053d197d77db6b5e2f9"
                        },
                        data: {
                            email,
                            waitlist: true
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

                    if (response.data.success) {

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🤖 Joined Waitlist 🤖')
                            .addField('Site', 'Prism Technologies')
                            .addField('Email', '||' + email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://pbs.twimg.com/profile_images/1330634645835280384/vaR0meKr_400x400.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")

                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR ENTERING WAITLIST'.red.bold);
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
            async function masterLog(secretKey) {

                const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                const hook = new Webhook(sharedHook);

                hook.setUsername('SplashAIO');
                hook.setAvatar(webhookIMG);

                const embed = new MessageBuilder()
                    .setTitle('🤖 Joined Waitlist 🤖')
                    .addField('Site', 'Prism Technologies', true)
                    .addField('Entry Count', JSON.stringify(emailList.length), true)
                    .setColor(webhookColor)
                    .setThumbnail('https://pbs.twimg.com/profile_images/1330634645835280384/vaR0meKr_400x400.jpg')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }
        }
    }

    async function mekAIO(license, secretKey, hostHeader) {
        
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
                const email = emailList[i]

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://release.mekrobotics.com/enterWaitList/',
                        headers: {
                            "Host": "release.mekrobotics.com",
                            "Sec-Ch-Ua": `"Chromium";v="103", ".Not/A)Brand";v="99"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36`,
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Accept": "*/*",
                            "Origin": "https://waitlist.mekrobotics.com",
                            "Sec-Fetch-Site": "same-site",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://waitlist.mekrobotics.com/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                            "Connection": "keep-alive"
                        },
                        data: qs.stringify({
                            "email": email.replace(/(\r\n|\n|\r)/gm, ""),
                            "token": "mfsdontcheck"
                        }),
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

                    if (response.data.error == false) {

                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🤖 Joined Waitlist 🤖')
                            .addField('Site', 'MekAIO', true)
                            .addField('Mode', 'Captcha-Bypass', true)
                            .addField('Email', '||' + email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://pbs.twimg.com/profile_images/1518777030237913088/tRyubJAp_400x400.jpg')
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
            async function masterLog(secretKey) {

                const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                const hook = new Webhook(sharedHook);

                hook.setUsername('SplashAIO');
                hook.setAvatar(webhookIMG);

                const embed = new MessageBuilder()
                    .setTitle('🤖 Joined Waitlist 🤖')
                    .addField('Site', 'MekAIO', true)
                    .addField('Mode', 'Captcha-Bypass', true)
                    .addField('Entry Count', JSON.stringify(emailList.length))
                    .setColor(webhookColor)
                    .setThumbnail('https://pbs.twimg.com/profile_images/1518777030237913088/tRyubJAp_400x400.jpg')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();

                hook.send(embed);
            }

        }

    }

    async function valorAIO(license, secretKey, hostHeader) {
     
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
                const twitterHandle = fakerator.internet.userName();

                try {
                    const response = await axios({
                        method: "POST",
                        url: "https://analytics.valoraio.com/waiting",
                        headers: {
                            "Host": "analytics.valoraio.com",
                            "Cache-Control": "max-age=0",
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Upgrade-Insecure-Requests": 1,
                            "Origin": "https://valoraio.com",
                            "Content-Type": "application/x-www-form-urlencoded",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "same-site",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Referer": "https://valoraio.com/",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        data: qs.stringify({
                            "email": email,
                            "twitterHandle": twitterHandle
                        }),
                        proxy: {
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        timeout: 10000,
                        maxRedirects: 1
                    })
                    if (response.status) {
                        console.log('TASK STATUS: '.bold + 'ERROR JOINING WAITLIST'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    } 
                } catch (e) {
                    if(e.message == 'Request failed with status code 400') {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED WAITLIST'.green.bold)
                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🤖 Joined Waitlist 🤖')
                            .addField('Site', 'ValorAIO', true)
                            .addField('Mode', 'Brute-Redirect', true)
                            .addField('Email', '||' + email + '||')
                            .addField('Twitter Handle', '||' + twitterHandle + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://pbs.twimg.com/profile_images/1300176473442127875/GYSIS70T_400x400.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR SENDING HTTP REQUEST'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
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
                .setTitle('🤖 Joined Waitlist 🤖')
                .addField('Site', 'ValorAIO', true)
                .addField('Mode', 'Brute-Redirect', true)
                .addField('Entry Count', JSON.stringify(emailList.length))
                .setColor(webhookColor)
                .setThumbnail('https://pbs.twimg.com/profile_images/1300176473442127875/GYSIS70T_400x400.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }

    }

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

    
    //Starting NFT Modules

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

    async function discordBrowser(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);
    
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
    
                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]
    
                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
    
                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        executablePath: chromePaths.chrome,
                        defaultViewport: null
                    });
                    try {
                        var [page] = await browser.pages();
                        console.log('TASK STATUS: '.bold + 'BROWSER LAUNCHED'.yellow.bold);
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        let theReturnNum = await getEmail();
                        theReturnNum = theReturnNum.split(':');
                        const officialNumId = theReturnNum[1];
                        const theRealEmail = theReturnNum[0];
                        async function getEmail() {
                            console.log('TASK STATUS: '.bold + 'GETTING EMAIL'.magenta.bold);
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
                                if (response) {
                                    const email = response.data.mail;
                                    const id = response.data.id;
                                    const returnID = `${email}:${id}`;
                                    await page.goto('https://discord.com/register', {
                                        waitUntil: 'networkidle2'
                                    });
                                    await page.waitForSelector("input[name='email']");
                                    await page.waitForTimeout(500);
                                    console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                                    await page.type("input[name='email']", email, {
                                        delay: (Math.random() * 30) + 20
                                    });
                                    return returnID;
                                }
                            } catch (e) {
                                console.log("TASK STATUS: ".bold + 'ERR GETTING EMAIL'.red.bold);
                                await browser.close();
                                setTimeout(() => {
                                    return getEmail();
                                }, 5000)
                            }
                        }
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.type("input[name='username']", fakerator.names.firstName() + fakerator.lorem.word(), {
                            delay: (Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.type("input[name='password']", password, {
                            delay: (Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.random() * 75) + 50;
    
                        const monthsz = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                        const dayz = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
                        const yearz = ["1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1986", "1987", "1987", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1995"]
                        const months = monthsz[Math.floor(Math.random() * monthsz.length)]
                        const days = dayz[Math.floor(Math.random() * dayz.length)]
                        const years = yearz[Math.floor(Math.random() * yearz.length)]
    
                        await page.click("div[class='month-1Z2bRu']");
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.keyboard.type(months, {
                            delay: (Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.click("div[class='day-1uOKpp']");
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.keyboard.type(days, {
                            delay: (Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.click("div[class='year-3_SRuv']");
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.keyboard.type(years, {
                            delay: (Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.click("button[type='submit']");
                        await page.waitForTimeout(Math.random() * 75) + 50;
                        await page.waitForSelector("iframe[title='widget containing checkbox for hCaptcha security challenge']");
                        await page.waitForTimeout(Math.random() * 3000) + 2000;
                        console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
                        await page.solveRecaptchas();
                        await page.waitForTimeout(Math.random() * 5000) + 4000;
                        if (await page.$("iframe[title='widget containing checkbox for hCaptcha security challenge']") !== null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING PROFILE'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)
                        } else {
                            await verifyEmail();
                            async function verifyEmail() {
                                try {
                                    const response = await axios({
                                        method: 'GET',
                                        url: `http://api.kopeechka.store/mailbox-get-message?id=${officialNumId}&token=${credentials.kopeechka}&type=$TYPE&api=2.0`,
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
                                    if (response) {
                                        if (response.data.value == 'WAIT_LINK') {
                                            setTimeout(() => {
                                                return verifyEmail();
                                            }, 5000)
                                        } else {
                                            var verificationLink = response.data.value;
                                            console.log('TASK STATUS: '.bold + 'GOT VERIFICATION LINK'.cyan.bold);
                                            await page.goto(verificationLink, {
                                                waitUntil: 'networkidle2'
                                            });
                                            await page.waitForSelector("iframe[title='widget containing checkbox for hCaptcha security challenge']");
                                            await page.waitForTimeout(Math.random() * 3000) + 2000;
                                            console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
                                            await page.solveRecaptchas();
                                            await page.waitForTimeout(Math.random() * 5000) + 4000;
                                            if (await page.$("iframe[title='widget containing checkbox for hCaptcha security challenge']") !== null) {
                                                console.log("TASK STATUS: ".bold + 'ERROR VERIFYING EMAIL'.red.bold);
                                                await browser.close();
                                                setTimeout(() => {
                                                    return runOfficial();
                                                }, 5000)
                                            } else {
    
                                                console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED TOKEN'.green.bold);
                                                await browser.close();
                                                const hook = new Webhook(credentials.discordWebhook);
    
                                                hook.setUsername('SplashAIO');
                                                hook.setAvatar(webhookIMG);
    
                                                const embed = new MessageBuilder()
                                                    .addField('Site', '❓ Secret Module ❓', true)
                                                    .addField('Mode', 'Browser', true)
                                                    .addField('Verification', 'Email', true)
                                                    .addField('Email', '||' + theRealEmail + '||')
                                                    .addField('Password', '||' + password + '||')
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
                                                await logFileCreds(theRealEmail, password, null);
                                                setTimeout(() => {
                                                    return runOfficial();
                                                }, 5000)
                                            }
                                        }
                                    }
    
                                } catch (e) {
                                    console.log("TASK STATUS: ".bold + 'ERR GETTING DATA'.red.bold);
                                    await browser.close();
                                    setTimeout(() => {
                                        return runOfficial();
                                    }, 5000)
                                }
                            }
                        }
                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                        await browser.close();
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
                .addField('Site', '❓ Secret Module ❓', true)
                .addField('Mode', 'Browser', true)
                .addField('Verification', 'Email')
                .setColor(webhookColor)
                .setThumbnail('https://media.discordapp.net/attachments/935556275696185454/987111237777231902/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934_1.jpg?width=1537&height=1025')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();
    
    
            hook.send(embed);
    
        }
    }

    async function discordInvites(license, secretKey, hostHeader) {

        const inviteCode = prompt("What is the invite code (ex. hello): ".cyan.bold);
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
                            joinGuild(__sdcfduid, __dcfduid)
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
    
                    async function joinGuild(__sdcfduid, __dcfduid) {
                        try {
                            const response = await axios({
                                method: "POST",
                                url: `https://discord.com/api/v9/invites/${inviteCode}`,
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
                                    "Referer": "https://discord.com/channels/@me",
                                    "Accept-Encoding": "gzip, deflate",
                                    "Accept-Language": "en-US,en;q=0.9",
                                },
                                data: {},
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
                            if (response.data.code == inviteCode) {
                                console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED GUILD'.green.bold);
                                await grabAnalytics(hostHeader, license, secretKey, "Add");
                            } else {
                                console.log('TASK STATUS: '.bold + 'ERROR JOINING GUILD'.red.bold);
                                setTimeout(() => {
                                    return generateCookies();
                                }, 5000)
                            }
    
                        } catch (e) {
                            if (e.response.data.captcha_sitekey) {
                                var siteKey = e.response.data.captcha_sitekey;
                                var rqtkn = e.response.data.captcha_rqtoken;
                                solveCaptcha(siteKey, rqtkn, __sdcfduid, __dcfduid)
                            } else {
                                console.log("TASK STATUS: ".bold + 'ERR SENDING REQUEST'.red.bold);
                                setTimeout(() => {
                                    return generateCookies();
                                }, 5000)
                            }
                        }
                    }
    
                    async function solveCaptcha(siteKey, rqtkn, __sdcfduid, __dcfduid) {
    
                        var captchaToken = "";


                        if (capType == "2captcha") {
                        
                            captchaToken = await solveTwoCap('hcaptcha', siteKey, 'https://discord.com/channels/@me/');
                        
                            if (captchaToken == null) {
                                setTimeout(() => {
                                    return runOfficial();
                                }, 5000);
                            }
                        
                        } else if (capType == "ai") {
                            captchaToken = await captchaAi(siteKey, 'https://discord.com/channels/@me/', 'HCaptchaTaskProxyless', license, secretKey);
                        }
    
                        try {
                            const response = await axios({
                                method: "POST",
                                url: `https://discord.com/api/v9/invites/${inviteCode}`,
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
                                    "Referer": "https://discord.com/channels/@me",
                                    "Accept-Encoding": "gzip, deflate",
                                    "Accept-Language": "en-US,en;q=0.9",
                                },
                                data: {
                                    "captcha_key": captchaToken,
                                    "captcha_rqtoken": rqtkn
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
                            if (response.data.code == inviteCode) {
                                console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JOINED GUILD'.green.bold);
                                await grabAnalytics(hostHeader, license, secretKey, "Add");
                            } else {
                                console.log('TASK STATUS: '.bold + 'ERROR JOINING GUILD'.red.bold);
                                setTimeout(() => {
                                    return generateCookies();
                                }, 5000)
                            }
                        } catch (e) {
                            console.log("TASK STATUS: ".bold + 'ERR SENDING REQUEST'.red.bold);
                            setTimeout(() => {
                                return generateCookies();
                            }, 5000)
                        }
    
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
                .addField('Type', 'Invites')
                .setColor(webhookColor)
                .setThumbnail('https://media.discordapp.net/attachments/935556275696185454/987111237777231902/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934_1.jpg?width=1537&height=1025')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();
    
    
            hook.send(embed);
        }
    
    }

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

    async function discordReact(license, secretKey, hostHeader) {
            
        const messageURL = prompt("What is the message link you wish to react to: ".cyan.bold);
        const emojiType = prompt("What is the emoji you wish to react with (ex. fire): ".cyan.bold);
    
        masterLog(secretKey);
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
                            reactMessage(__sdcfduid, __dcfduid)
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

                async function reactMessage(__sdcfduid, __dcfduid) {
                    let theRealURL = messageURL.split('channels');
                    theRealURL = theRealURL[1].split('/');  
                    const channelID = theRealURL[2]
                    const messageID = theRealURL[3];
                    const emojiDef = emoji.get(emojiType)
                    const theEncodedEmoji = urlencode.encode(emojiDef); 

                    try {
                        const response = await axios({
                            method: "PUT",
                            url: `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}/reactions/${theEncodedEmoji}/%40me?location=Message`,
                            headers: {
                                "Host": "discord.com",
                                "Cookie": `__dcfduid=${__dcfduid}; __sdcfduid=${__sdcfduid}; OptanonConsent=isIABGlobal=false&datestamp=${Date.now()}&version=6.33.0&hosts=&landingPath=https://discord.com/&groups=C0001; locale=en-US;`,
                                "Content-Length": "0",
                                "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                                "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwMy4wLjUwNjAuMTM0IFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIxMDMuMC41MDYwLjEzNCIsIm9zX3ZlcnNpb24iOiIxMCIsInJlZmVycmVyIjoiIiwicmVmZXJyaW5nX2RvbWFpbiI6IiIsInJlZmVycmVyX2N1cnJlbnQiOiIiLCJyZWZlcnJpbmdfZG9tYWluX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjoxMzg3MzQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGx9",
                                "X-Debug-Options": "bugReporterEnabled",
                                "Sec-Ch-Ua-Mobile": "?0",
                                "Authorization": discordToken.replace('\r', ''),
                                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                                "X-Discord-Locale": "en-US",
                                "Sec-Ch-Ua-Platform": '"Windows"',
                                "Accept": "*/*",
                                "Origin": "https://discord.com",
                                "Sec-Fetch-Site": "same-origin",
                                "Sec-Fetch-Mode": "cors",
                                "Sec-Fetch-Dest": "empty",
                                "Referer": messageURL,
                                "Accept-Encoding": "gzip, deflate",
                                "Accept-Language": "en-US,en;q=0.9"
                            }
                        });

                        if(response.status == 204) {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY REACTED TO MESSAGE'.green.bold);
                            await grabAnalytics(hostHeader, license, secretKey, "Add");
                        } else {
                            console.log('TASK STATUS: '.bold + 'FAILED TO SEND MESSAGE'.red.bold);
                            setTimeout(() => {
                                return generateCookies();
                            }, 5000)
                        }

                    } catch (e) {
                        console.log(e);
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
                .addField('Type', 'React to Message')
                .setColor(webhookColor)
                .setThumbnail('https://media.discordapp.net/attachments/935556275696185454/987111237777231902/question-mark-icon-on-white-puzzle-royalty-free-image-917901148-1558452934_1.jpg?width=1537&height=1025')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();
    
    
            hook.send(embed);
        }

    }

    async function ethWallet(license, secretKey, hostHeader) {

        const threads = prompt('How Many Wallets Do You Want: '.cyan.bold);

        if(threads > 100) {
            console.log('TASK STATUS: '.bold + 'MAXIMUM 100 AT A TIME'.red.bold);
            sleep(2000);
            process.exit();
        }

        let walletAddress = 'Eth Address'
        let walletMnemonic = 'Eth Seed Phrase'
        let privateKey = 'Eth Private Key'
        let instances = 0

        await grabAnalytics(hostHeader, license, secretKey, "Add");

        for(let i = 0; i < threads; i++) {

            const wallet = ethers.Wallet.createRandom()

                walletAddress = walletAddress + ':' + wallet.address
                walletMnemonic = walletMnemonic + ':' + wallet.mnemonic.phrase
                privateKey = privateKey + ':' + wallet.privateKey
        
            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED WALLET'.green.bold);
            instances = instances + 1

        }

        const hook = new Webhook(credentials.discordWebhook);
        const b_url = webhookIMG;
        hook.setUsername('SplashAIO');
        hook.setAvatar(b_url);
      
        const embed = new MessageBuilder()
          .setTitle('💸 Successfully Generated 💸')
          .addField('Site', 'Ethereum', true)
          .addField('Mode', 'Wallet Gen', true)
          .addField('Wallet', walletAddress)
          .addField('Private Key', '||' + privateKey + '||', true)
          .addField('Seed Phrase', '||' + walletMnemonic + '||')
          .setColor(webhookColor)
          .setThumbnail('https://img-0.journaldunet.com/Hz8ENkFlT-vCQmW-NBLNim0NtfU=/1500x/smart/2fd6cdb0106140c487e3b484e86a3e86/ccmcms-jdn/26944777.png')
          .setDescription('')
          .setImage('')
          .setFooter('SplashAIO', webhookIMG)
          .setTimestamp();
      
        await hook.send(embed);
        await masterLog(secretKey);
        await masterLogAdmin(license, secretKey);

        async function masterLog(secretKey) {
    
            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);
    
            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);
    
            const embed = new MessageBuilder()
                .setTitle('💸 Successfully Generated 💸')
                .addField('Site', 'Ethereum', true)
                .addField('Mode', 'Wallet Gen', true)
                .setColor(webhookColor)
                .setThumbnail('https://img-0.journaldunet.com/Hz8ENkFlT-vCQmW-NBLNim0NtfU=/1500x/smart/2fd6cdb0106140c487e3b484e86a3e86/ccmcms-jdn/26944777.png')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();
        
    
            hook.send(embed);
        }


    }

    //Starting checkout modules

    async function adafruit(license, secretKey, hostHeader) {

        subPrompt();
        async function subPrompt() {
            const prompt = new AutoComplete({
                name: 'module',
                message: 'Select Your Module Group'.cyan.bold,
                limit: 6,
                initial: 1,
                choices: [
                    'Checkout'.yellow.bold,
                    'Login'.yellow.bold
                ]
            });
            prompt.run()
                .then(answer => {
                    this.answer1 = answer;
                    if (this.answer1 == 'Checkout'.yellow.bold) {
                        checkout();
                    } else if (this.answer1 == 'Login'.yellow.bold) {
                        login();
                    } 
                })
            .catch();
        }

        async function login() {

            const adafruitAccounts = fs
            .readFileSync("./Storage/Accounts/adafruitaccounts.txt", "utf8")
            .split("\n")
            .filter(String);

            for(var i = 0; i < adafruitAccounts.length; i++) {

                officialRun();
                async function officialRun() {

                    function random(arr) {
                        return arr[Math.floor(Math.random() * arr.length)];
                    }

                    const list = fs
                        .readFileSync("./Storage/proxies.txt", "utf8")
                        .split("\n")
                        .filter(String);
                    const raw = random(list);
                    const splitproxy = raw.split(":");


                    const email = adafruitAccounts[i].split(':')[0];
                    const password = adafruitAccounts[i].split(':')[1];

                    const args = [
                        //Browser Args
                        ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    ]

                    const browser = await puppeteer.launch({headless: false, executablePath: chromePaths.chrome, ignoreHTTPSErrors: true, args, defaultViewport: null});
                    var [page] = await browser.pages();
                    try {
                    await page.authenticate({
                        username: splitproxy[2],
                        password: splitproxy[3].replace('\r', '')
                    });
                    await page.goto('https://accounts.adafruit.com/users/sign_in');
                    await page.waitForSelector('#user_login');
                    console.log('TASK STATUS: '.bold + 'LAUCNHED BROWSER'.yellow.bold);
                    await page.waitForTimeout(500);
                    console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                    await page.type("#user_login", email, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.type("#user_password", password, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.click("input[class='sign-in-button']");
                    await page.waitForTimeout(500);
                    console.log('TASK STATUS: '.bold + 'WAITING FOR 2FA'.yellow.bold);
                    await page.waitForSelector('#user_otp_attempt');
                    await page.waitForTimeout(500);
                    const authCode = prompt(`Enter the 2fa code for ${email}: `.cyan.bold);
                    console.log('TASK STATUS: '.bold + 'SUBMITTING 2FA'.magenta.bold);
                    await page.type("#user_otp_attempt", authCode, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.click("input[class='sign-in-button']");
                    await page.waitForTimeout(500);
                    await page.goto('https://www.adafruit.com/shopping_cart');
                    console.log('TASK STATUS: '.bold + 'GENERATING APAY'.yellow.bold);
                    await page.waitForTimeout(500);
                    var cookies = await page._client.send('Network.getAllCookies');
                    await browser.close();
                    let theRealCookies = "";
                    for(var lines = 0; lines < cookies.cookies.length; lines++) {
                        if(cookies.cookies[lines].name == "language") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if(cookies.cookies[lines].name == "amazon-pay-connectedAuth") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if(cookies.cookies[lines].name == "apay-session-set") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if(cookies.cookies[lines].name == "logged_in") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if (cookies.cookies[lines].name == "accounts_remember_user_token") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if(cookies.cookies[lines].name == "_accounts_session_id") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if(cookies.cookies[lines].name == "_adafruit_accounts_session") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if(cookies.cookies[lines].name == "zenid" ) {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        } else if(cookies.cookies[lines].name == "cart_count") {
                            theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                        }
                    }
                    fs.writeFileSync(`./Storage/Accounts/Cookies/adafruit${email}.txt`, theRealCookies);
                    console.log('TASK STATUS: '.bold + 'LOGGED IN'.green.bold);

                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR LOADING PAGE'.red.bold);
                        setTimeout(() => {
                            return officialRun();
                        }, 5000)
                    }
                }

            }

        }

        async function checkout() {

            const skuID = prompt("What SKU do you wish to check out: ".cyan.bold);
            const taskDelay = prompt("What monitor delay do you wish to run: ".cyan.bold);

            getSession();
            async function getSession() {

                
                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");


                console.log('TASK STATUS: '.bold + 'GETTING SESSION'.yellow.bold);
                try {
                    const response = await axios({
                        method: 'GET',
                        url: `https://www.adafruit.com/`,
                        headers: {
                            "Host": "www.adafruit.com",
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
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
                    if (response.headers['set-cookie']) {
                        const zenID = response.headers['set-cookie'][0].slice(6, -110);
                        monitorSku(zenID);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERR GETTING SESSION'.red.bold);
                        setTimeout(() => {
                            return getSession();
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return getSession();
                    }, 5000)
                }
            }

            async function monitorSku(zenID) {

                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");

                try {
                    const response = await axios({
                        method: 'GET',
                        url: `https://www.adafruit.com/product/${skuID}`,
                        headers: {
                            "Host": "www.adafruit.com",
                            "Cookie": `zenid=${zenID}; cart_count=0;`,
                            "Cache-Control": "max-age=0",
                            "Sec-Ch-Ua": '"Chromium";v="103", ".Not/A)Brand";v="99"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
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

                    const dayta = response.data
                    const regex = /oos-header/
                    const found = regex.test(dayta);

                    const regextwo = /blue-button addToCart add_to_cart_ec_multi/
                    const foundtwo = regextwo.test(dayta);

                    if(found) {
                        console.log('TASK STATUS: '.bold + 'OUT OF STOCK'.red.bold);
                        setTimeout(() => {
                            return monitorSku(zenID);
                        }, JSON.parse(taskDelay))
                    } else if(foundtwo) {
                        console.log('TASK STATUS: '.bold + 'PRODUCT IN STOCK'.cyan.bold);
                        parseSession();
                    } else {
                        console.log('TASK STATUS: '.bold + 'INVALID REQUEST RESPONSE'.red.bold);
                        setTimeout(() => {
                            return monitorSku(zenID);
                        }, JSON.parse(taskDelay))
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST: '.bold.bold);
                    setTimeout(() => {
                        return getSession();
                    }, 5000)
                }

            }

            async function parseSession() { 
                console.log('TASK STATUS: '.bold + 'PARSING SESSION'.yellow.bold);

                const accData = fs
                //Loading in amazon accounts
                .readFileSync("./Storage/Accounts/adafruitaccounts.txt", "utf8")
                .split("\n")
                .filter(String);
                for (let accountLoop = 0; accountLoop < accData.length ; accountLoop++){
                    try {
                        var realAdafruitAccount = accData[accountLoop].split(':');

                        var adafruitCookies = fs
                        .readFileSync(`./Storage/Accounts/Cookies/adafruit${realAdafruitAccount[0]}.txt`, "utf8")
                        .split("\n")
                        .filter(String);

                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'INVALID SESSION COOKIES (MAKE SURE ALL ACCOUNTS HAVE A SESSION)'.red.bold);
                        sleep(2000);
                        process.exit();
                    }
                    
                    var theRealCookies = adafruitCookies[0];

                    generateToken(theRealCookies);
                }
            }

            async function generateToken(theRealCookies) {
                
                console.log('TASK STATUS: '.bold + 'GENERATING TOKEN'.yellow.bold);

                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");

                try {
                    const response = await axios({
                        method: 'GET',
                        url: `https://www.adafruit.com/shopping_cart`,
                        headers: {
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'DNT': '1',
                            'Upgrade-Insecure-Requests': '1',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'host': 'www.adafruit.com',
                            'Cookie': theRealCookies
                        },
                        proxy: {
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        timeout: 1000
                    })

                    let statusCodeNum = await String(response.status)[0];

                    if (statusCodeNum == 2 || statusCodeNum == 3) {
                        const $ = cheerio.load(response.data);
                        const securityToken = $(`input[name="securityToken"]`).attr("value");
                        addToCart(securityToken, theRealCookies, raw);
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return getSession();
                    }, 5000)
                }
            }

            async function addToCart(securityToken, theRealCookies, raw) {

                const splitproxy = raw.split(":");

                console.log('TASK STATUS: '.bold + 'ADDING TO CART'.yellow.bold);

                let form = {
                    'action': 'add_product',
                    'pid': skuID,
                    'qty': '1',
                    'securityToken': securityToken,
                    'source_id': skuID,
                    'source_page': 'product'
                };

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.adafruit.com/added',
                        data: new URLSearchParams(form),
                        headers: {
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'host': 'www.adafruit.com',
                            'Cookie': theRealCookies
                        },
                        proxy: {
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        timeout: 1000,
                        maxRedirects: 1
                    })

                    const dayta = response.data
                    const regex = /Added to Adafruit Shopping Cart/
                    const found = regex.test(dayta);

                    if(found) {
                        console.log('TASK STATUS: '.bold + 'ADDED TO CART'.cyan.bold);
                        getCSRF(theRealCookies, raw);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR ADDING TO CART'.red.bold);
                        setTimeout(() => {
                            return addToCart(securityToken, theRealCookies, raw);
                        }, 5000)
                    }
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ADDED TO CART'.cyan.bold);
                    getCSRF(theRealCookies, raw);
                }
            }

            async function getCSRF(theRealCookies, raw) {

                console.log('TASK STATUS: '.bold + 'GETTING CSRF'.yellow.bold);

                const splitproxy = raw.split(":");

                let checkoutCookie = theRealCookies.replace('cart_count=0', 'cart_count=1');

                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.adafruit.com/checkout?step=2',
                        headers: {
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
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

                    const dayta = response.data
                    const regex = /csrf/
                    const found = regex.test(dayta);

                    if(found) {
                        const $ = cheerio.load(response.data);
                        const securityToken = $(`input[name="csrf_token"]`).attr("value");
                        submitInfo(checkoutCookie, raw, securityToken);

                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GENNING CSRF TOKEN'.red.bold);
                        setTimeout(() => {
                            return getSession();
                        }, 5000)
                    }


                } catch (e) {
                    console.log(e);
                    setTimeout(() => {
                        return getSession();
                    }, 5000)
                }
            }

            async function submitInfo(checkoutCookie, raw, securityToken) {

                console.log('TASK STATUS: '.bold + 'SUBMITTING INFO [1]'.yellow.bold);

                const splitproxy = raw.split(":");
                const profiles = JSON.parse(fs.readFileSync('./Storage/Profiles/aycd.json', 'utf-8'));
                
                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.adafruit.com/checkout',
                        headers: {
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
                        },
                        data: qs.stringify({
                            csrf_token: securityToken,
                            delivery_use_anyway: 0,
                            delivery_name: profiles[0].name,
                            delivery_company: "",
                            delivery_address1: profiles[0].billingAddress.line1,
                            delivery_address2: profiles[0].billingAddress.line2,
                            delivery_city: profiles[0].billingAddress.city,
                            delivery_state: '62',
                            delivery_postcode: profiles[0].billingAddress.postCode,
                            delivery_country: 223,
                            delivery_phone: profiles[0].billingAddress.phone,
                            billing_use_anyway: 0,
                            billing_name: profiles[0].name,
                            billing_company: "",
                            billing_address1: "",
                            billing_address2: "",
                            billing_city: "",
                            billing_state: 0,
                            billing_postcode: "",
                            billing_country: 223,
                            billing_phone: "",
                            action: "save_two"
                        }),
                        proxy: {
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        timeout: 1000
                    });

                    if(JSON.stringify(response.status).charAt(0) == '2' || JSON.stringify(response.status).charAt(0) == '3') {
                        console.log('TASK STATUS: '.bold + 'SUBMITTING INFO [2]'.yellow.bold);
                        submitInfo2(checkoutCookie, raw, securityToken);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING INFO [2]'.red.bold);
                        setTimeout(() => {
                            return submitInfo(theRealCookies, raw, securityToken);
                        }, 5000)
                    }

                } catch(e) {
                    console.log('TASK STATUS: '.bold + 'SUBMITTING INFO [2]'.yellow.bold);
                    submitInfo2(checkoutCookie, raw, securityToken);
                }
            }

            async function submitInfo2(checkoutCookie, raw, securityToken) {

                const splitproxy = raw.split(":");

                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.adafruit.com/checkout?step=3',
                        headers: {
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
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
                    const dayta = response.data
                    const regex = /countries_zones/
                    const found = regex.test(dayta);

                    if(found) {
                        console.log('TASK STATUS: '.bold + 'SUBMITTING INFO [3]'.yellow.bold);
                        submitInfo3(checkoutCookie, raw, securityToken);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING INFO [3]'.red.bold);
                        setTimeout(() => {
                            return submitInfo(theRealCookies, raw, securityToken);
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return submitInfo(theRealCookies, raw, securityToken);
                    }, 5000)
                }

            }

            async function submitInfo3(checkoutCookie, raw, securityToken) {

                const splitproxy = raw.split(":");

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.adafruit.com/checkout',
                        headers: {
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
                        },
                        data: qs.stringify({
                            'action': 'save_three',
                            'csrf_token': securityToken,
                            'shipping': 'usps_First-Class Package Service - Retail&lt;sup&gt;&#8482;&lt;/sup&gt;'
                        }),
                        proxy: {
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        timeout: 1000
                    });
                   
                    if(JSON.stringify(response.status).charAt(0) == '2' || JSON.stringify(response.status).charAt(0) == '3') {
                        console.log('TASK STATUS: '.bold + 'SUBMITTING INFO [4]'.yellow.bold);
                        submitInfo4(checkoutCookie, raw, securityToken);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING INFO [3]'.red.bold);
                        setTimeout(() => {
                            return submitInfo3(theRealCookies, raw, securityToken);
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'SUBMITTING INFO [4]'.yellow.bold);
                    submitInfo4(checkoutCookie, raw, securityToken);
                }
            }

            async function submitInfo4(checkoutCookie, raw, securityToken) {

                const splitproxy = raw.split(":");

                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.adafruit.com/checkout?step=4',
                        headers: {
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
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

                    const dayta = response.data
                    const regex = /United States/
                    const found = regex.test(dayta);
                    
                    if(found) {
                        console.log('TASK STATUS: '.bold + 'SUBMITTING BILLING [1]'.magenta.bold);
                        submitBilling1(checkoutCookie, raw, securityToken);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING INFO [4]'.red.bold);
                        setTimeout(() => {
                            return submitInfo4(theRealCookies, raw, securityToken);
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                    setTimeout(() => {
                        return submitInfo4(theRealCookies, raw, securityToken);
                    }, 5000)
                }
            }

            async function submitBilling1(checkoutCookie, raw, securityToken) {

                const splitproxy = raw.split(":");
                const profiles = JSON.parse(fs.readFileSync('./Storage/Profiles/aycd.json', 'utf-8'));

                const cardType = profiles[0].paymentDetails.cardType;

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.adafruit.com/checkout',
                        headers: {
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
                        },
                        data: qs.stringify({
                            'action': 'save_four',
                            'authorizenet_aim_cc_cvv': profiles[0].paymentDetails.cardCvv,
                            'authorizenet_aim_cc_expires_month': profiles[0].paymentDetails.cardExpMonth,
                            'authorizenet_aim_cc_expires_year': profiles[0].paymentDetails.cardExpYear,
                            'authorizenet_aim_cc_nickname': '',
                            'authorizenet_aim_cc_number': profiles[0].paymentDetails.cardNumber,
                            'authorizenet_aim_cc_owner': profiles[0].paymentDetails.nameOnCard,
                            'card-type': cardType.toLowerCase(),
                            'csrf_token': securityToken,
                            'payment': 'authorizenet_aim',
                            'po_payment_type': 'replacement'
                        }),
                        proxy: {
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        timeout: 1000
                    })

                    if(JSON.stringify(response.status).charAt(0) == '2' || JSON.stringify(response.status).charAt(0) == '3') {
                        console.log('TASK STATUS: '.bold + 'SUBMITTING BILLING [2]'.magenta.bold);
                        submitOrder1(checkoutCookie, raw, securityToken, cardType);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING BILLING [1]'.red.bold);
                        setTimeout(() => {
                            return submitBilling1(theRealCookies, raw, securityToken);
                        }, 5000)
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'SUBMITTING BILLING [2]'.magenta.bold);
                    submitOrder1(checkoutCookie, raw, securityToken, cardType);
                }
            }

            async function submitOrder1(checkoutCookie, raw, securityToken, cardType) {

                const splitproxy = raw.split(":");
                let zenId = checkoutCookie.split('zenid=').pop().split(';')[0];
                const profiles = JSON.parse(fs.readFileSync('./Storage/Profiles/aycd.json', 'utf-8'));


                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.adafruit.com/index.php?main_page=checkout_process',
                        headers: {
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
                        },
                        data: qs.stringify({
                            'cc_cvv': profiles.paymentDetails.cardCvv,
                            'cc_expires': profiles.paymentDetails.cardExpMonth + profiles.paymentDetails.cardExpYear,
                            'cc_nickname': '',
                            'cc_number': profiles.paymentDetails.cardNumber.replace(/\s/g, ''),
                            'cc_owner': profiles.paymentDetails.nameOnCard,
                            'cc_type': cardType.toLowerCase(),
                            'csrf_token': securityToken,
                            'zenid': zenId
                        }),
                        proxy: {
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        timeout: 1000
                    });

                    if(JSON.stringify(response.status).charAt(0) == '2' || JSON.stringify(response.status).charAt(0) == '3') {
                        console.log('TASK STATUS: '.bold + 'SUBMITTING ORDER'.yellow.bold);
                        submitOrder2(checkoutCookie, raw, securityToken);
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING BILLING [1]'.red.bold);
                        setTimeout(() => {
                            return submitOrder1(checkoutCookie, raw, securityToken, cardType);
                        }, 5000)
                    }
                } 
                catch (e) { 
                    console.log('TASK STATUS: '.bold + 'SUBMITTING ORDER'.yellow.bold);
                    submitOrder2(checkoutCookie, raw, securityToken);
                }
            }

            async function submitOrder2(checkoutCookie, raw, securityToken) {

                const splitproxy = raw.split(":");

                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.adafruit.com/index.php?main_page=checkout_success',
                        headers: {
                            'Upgrade-Insecure-Requests': '1',
                            'DNT': '1',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-User': '?1',
                            'Sec-Fetch-Dest': 'document',
                            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'host': 'www.adafruit.com',
                            'Cookie': checkoutCookie
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

                    if(response.data) {
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY CHECKED OUT".green.bold);

                        const hook = new Webhook(credentials.discordWebhook);
                        const b_url = webhookIMG;

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(b_url);

                        const embed = new MessageBuilder()
                            .setTitle('🎉 Successfully Checked Out 🎉')
                            .addField('Site', 'Adafruit', true)
                            .addField('Mode', 'Safe', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://cdn-shop.adafruit.com/970x728/3405-06.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING ORDER'.red.bold);
                    setTimeout(() => {
                        return getSession();
                    }, 5000)
                }

            }
            async function masterLog(secretKey) {
                const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                const hook = new Webhook(sharedHook);
    
                hook.setUsername('SplashAIO');
                hook.setAvatar(webhookIMG);
    
                const embed = new MessageBuilder()
                .setTitle('🎉 Successfully Checked Out 🎉')
                .addField('Site', 'Adafruit', true)
                .addField('Mode', 'Safe', true)
                .setColor(webhookColor)
                .setThumbnail('https://cdn-shop.adafruit.com/970x728/3405-06.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();
    
                hook.send(embed);
            }
        }
    
    }

    async function amazonSafe(license, secretKey, hostHeader) {

        subPrompt();
        async function subPrompt() {
            const prompt = new AutoComplete({
                name: 'module',
                message: 'Select Your Module Group'.cyan.bold,
                limit: 6,
                initial: 1,
                choices: [
                    'Checkout'.yellow.bold,
                    'Login'.yellow.bold
                ]
            });
            prompt.run()
                .then(answer => {
                    this.answer1 = answer;
                    if (this.answer1 == 'Checkout'.yellow.bold) {
                        checkout();
                    } else if (this.answer1 == 'Login'.yellow.bold) {
                        login();
                    } 
                })
            .catch();
        }

        async function login() {

            const amazonAccounts = fs
            .readFileSync("./Storage/Accounts/amazonaccounts.txt", "utf8")
            .split("\n")
            .filter(String);

            for(var i = 0; i < amazonAccounts.length; i++) {

                officialRun();
                async function officialRun() {

                    const email = amazonAccounts[i].split(':')[0];
                    const password = amazonAccounts[i].split(':')[1];

                    const args = [
                        //Browser Args
                        '--no-sandbox',
                    ]

                    const browser = await puppeteer.launch({headless: false, executablePath: chromePaths.chrome, ignoreHTTPSErrors: true, args, defaultViewport: null});
                    var [page] = await browser.pages();
                    try {
                    await page.goto('https://www.amazon.com/');
                    await page.waitForTimeout(1000);
                    await page.waitForSelector("a[id='nav-link-accountList']");
                    console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                    await page.click("a[id='nav-link-accountList']", elem => elem.click());   
                    await page.waitForTimeout(100);
                    await page.waitForSelector("input[type='email']");
                    console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                    await page.type("input[type='email']", email, {delay: 100});
                    await page.waitForTimeout(100);
                    await page.click("input[id='continue']",  elem => elem.click());   
                    await page.waitForTimeout(100);
                    await page.waitForSelector("input[type='password']");
                    await page.waitForTimeout(100);
                    await page.type("input[type='password']", password, {delay: 100});
                    await page.waitForTimeout(100);
                    await page.click("input[id='signInSubmit']", elem => elem.click());   
                    await page.waitForNavigation();
                    await page.waitForTimeout(1000);
                    if (await page.$("a[id='ap-account-fixup-phone-skip-link']") !== null){
                        await page.click("a[id='ap-account-fixup-phone-skip-link']", elem => elem.click());   
                    }
                    await page.waitForTimeout(1000);
                    if (await page.$("a[id='nav-cart']") !== null){
                        console.log('TASK STATUS: '.bold + 'HARVESTING COOKIES'.yellow.bold);
                    }
                    else{
                        console.log('TASK STATUS: '.bold + 'ERROR LOGGING IN'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    var sessionIDCookies = await page.cookies();
                    await page.goto('https://www.amazon.com//dp/B08HL8RJ47');
                    await page.waitForSelector('#atc-declarative');
                    await page.waitForTimeout(500);
                    await page.click('#atc-declarative', {clickCount: 2});
                    await page.waitForTimeout(500);
                    await page.goto('https://www.amazon.com/gp/cart/view.html');
                    await page.waitForSelector('#sc-active-cart > div > div > div > h1');
                    await page.waitForTimeout(250);
                    var cookies = await page._client.send('Network.getAllCookies');
                    await page.waitForTimeout(250);
                    await page.click("input[value='Delete']");
                    await page.waitForTimeout(1000);
                    await browser.close();
                    var theRealCookies = "";
                    for(var lines = 0; lines < cookies.cookies.length; lines++) {
                      theRealCookies = theRealCookies + cookies.cookies[lines].name + '=' + cookies.cookies[lines].value + '; ';
                    }
                    fs.writeFileSync(`./Storage/Accounts/Cookies/amazon${email}.txt`, theRealCookies);
                    fs.writeFileSync(`./Storage/Accounts/Cookies/amazonsessionid${email}.txt`, sessionIDCookies[7].value);
                    console.log('TASK STATUS: '.bold + 'LOGGED IN'.green.bold);

                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'ERR LOADING PAGE'.red.bold);
                        setTimeout(() => {
                            return officialRun();
                        }, 5000)
                    }
                }

            }

        }

        async function checkout() {
            let product = prompt('What SKU would you like to monitor? Please list SKUS in format (SKU:OID, SKU:OID, ...): '.cyan.bold);
            let price = prompt('What is the Max Price of Your Product: '.cyan.bold);
            let delay = prompt('What Monitor Delay Do You Wish to Use: '.cyan.bold);

            /*
            Taking user input for product id. Down below it will parse the info and then use it to
            monitor the product.
            */
            product = product.split(',');

            for (let i = 0; i < product.length; i++) {
                //Looping per array
                var productDetails = product[i].split(':');
                var offerID = productDetails[1];
                var sku = productDetails[0];
                //Calling actual monitor function
                amazonMonitor(offerID, sku);
            }

            async function amazonMonitor(offerID, sku) {

                //Defining proxies

                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                const raw = random(list);
                const splitproxy = raw.split(":");

                //Splitting proxy to be used in request 

                try {
                    let result = await axios({
                        /*
                        Make sure to keep method as get even though there are url parameters. The response will be 100% cache when using the POST method. You do not 
                        need to swap out the CID, it is constant in every request. No offerid is needed here, but it is imported in the function because it is used in
                        the ATC function.
                        */
                        url: `https://www.amazon.com/S?k=${sku}&dataVersion=v0.1&cid=34e221e4bbc90f0b74ef485250396f3e1ff0d5600fb507ddededc9f16d2b7036&format=json`,
                        method: "GET",
                        headers: {
                            "Host": "www.amazon.com",
                            "Cookie": "", //Monitor does not need login cookies to get a valid response
                            "Cache-Control": "max-age=0",
                            "Device-Memory": "8",
                            "Sec-Ch-Device-Memory": "8",
                            "Dpr": "1",
                            "Sec-Ch-Dpr": "1",
                            "Viewport-Width": "1920",
                            "Sec-Ch-Viewport-Width": "1920",
                            "Rtt": 100,
                            "Downlink": 1.35,
                            "Ect": "4g",
                            "Sec-Ch-Ua": `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Upgrade-Insecure-Requests": 1,
                            //UA can cause cache, make sure to not use default burpsuite UA. Also, don't use a mobile UA because of the app. 
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`,
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        proxy: {
                            protocol: "https",
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        //Timeout will wait for 5 seconds. If no response is received, it will throw an error and retry. Only bad proxies will throw frequent errors.
                        timeout: 5000
                    })
                    //Parsing response
                    if (JSON.stringify(result.data.results.sections[0].items[0].prices.editions[0].price)) {
                        var productName = result.data.results.sections[0].items[0].title;
                        console.log(`Monitoring ${productName}`.magenta.bold);
                        var theRealPrice = JSON.parse(JSON.stringify(result.data.results.sections[0].items[0].prices.editions[0].price));
                        theRealPrice = theRealPrice.slice(1);
                        theRealPrice = JSON.parse(theRealPrice)
                        if(theRealPrice < JSON.parse(price)){
                            var theProductURL = JSON.stringify(result.data.results.sections[0].items[0].link.url);
                            theProductURL = JSON.parse(theProductURL)
                            /*
                            Checking a parsed price response to the price input. If it is greater the monitor will continue at the rate of the delay. Else if
                            the price is less than the price input the monitor will add the product to the cart and then transfer to the delay of 0 due to an
                            endpoint cache bypass.
                            */
                            console.log('Product In Stock!'.cyan.bold);
                            parseCookies(offerID, sku, theProductURL, productName, theRealPrice);
                        }
                        //Returning monitor if price too high
                        else{
                        setTimeout(() => {
                            return amazonMonitor(offerID, sku)
                        }, JSON.parse(delay));
                    }
                    } 
                    else {
                        console.log("Cache Detected".red.bold);
                        //In the small unlikelyhood of a cache boot, the monitor will keep resuming at the regular delay.
                        setTimeout(() => {
                            return amazonMonitor(offerID, sku)
                        }, JSON.parse(delay));
                    }
                }
                catch (e) {
                    console.log('Invalid Request Response'.red.bold);
                    //99% of errors are due to slow proxies and the timeout stopping.
                    setTimeout(() => {
                        return amazonMonitor(offerID, sku);
                    }, JSON.parse(delay))
                }
            }

            //Initiating atc with cookies.
            async function parseCookies (offerID, sku, theProductURL, productName, theRealPrice) {
                const acc = fs
                //Loading in amazon accounts
                .readFileSync("./Storage/Accounts/amazonaccounts.txt", "utf8")
                .split("\n")
                .filter(String);
                for (let i = 0; i < acc.length ; i++){
                try{
                var realAmazonAccount = acc[i].split(':');
                //Checking for valid cookies
                var amazonAccount = fs
                .readFileSync(`./Storage/Accounts/Cookies/amazon${realAmazonAccount[0]}.txt`, "utf8")
                .split("\n")
                .filter(String);
                }
                catch(e){
                    //If no cookies, bot will go in blank loop
                    console.log(`${realAmazonAccount[0]} does not have valid cookies`.red.bold);
                    setTimeout(() => {
                        return amazonMonitor(offerID, sku);
                    }, 100000);
                }
                //Logging cookies
                var theRealCookies = amazonAccount[0]
                //Logging SesssionID
                try{
                    var sessionID = fs
                    .readFileSync(`./Storage/Accounts/Cookies/amazonsessionid${realAmazonAccount[0]}.txt`, "utf8")
                    .split("\n")
                    .filter(String);
                }
                catch(e){
                    console.log(`${realAmazonAccount[0]} does not have valid cookies`.red.bold);
                    setTimeout(() => {
                        return amazonMonitor(offerID, sku);
                    }, 100000);
                }
                var theRealSessionID = sessionID[0];
                //Calling real ATC function
                const amazonAccountWebhook = realAmazonAccount[0];
                addToCart(offerID, sku, theRealCookies, theRealSessionID, theProductURL, productName, amazonAccountWebhook);
                }
            }

            //Initiating the real add to cart function with EP.
            async function addToCart(offerID, sku, theRealCookies, theRealSessionID, theProductURL, productName, amazonAccountWebhook) {

                
                function random(arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }

                const list = fs
                    .readFileSync("./Storage/proxies.txt", "utf8")
                    .split("\n")
                    .filter(String);
                var raw = random(list);
                const splitproxy = raw.split(":");

                var parameterURL = `https://www.amazon.com/gp/aws/cart/add.html?ASIN.1=${sku}&OfferListingId.1=${offerID}&Quantity.1=1`

                try {
                    let result = await axios({
                        /*
                        This is a GET URL. This endpoint will not actually cart thje item, but respond with a csrf which will allow the next function to cart. This request
                        has a lot of cache but can be fast if there is none. Make sure to use good proxies, it helps. The endpoint is a windows endpoint, not mobile. This 
                        is not a mobile ep.
                        */
                        url: parameterURL,
                        method: "GET",
                        headers: {
                            "Host": "www.amazon.com",
                            "Cookie": theRealCookies,
                            "Cache-Control": "max-age=0",
                            "Device-Memory": "8",
                            "Sec-Ch-Device-Memory": "8",
                            "Dpr": "1",
                            "Sec-Ch-Dpr": "1",
                            "Viewport-Width": "1920",
                            "Sec-Ch-Viewport-Width": "1920",
                            "Rtt": 100,
                            "Downlink": 1.35,
                            "Ect": "4g",
                            "Sec-Ch-Ua": `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Upgrade-Insecure-Requests": 1,
                            //UA can cause cache, make sure to not use default burpsuite UA. Also, don't use a mobile UA because of the app. 
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`,
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        proxy: {
                            protocol: "https",
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        //Timeout will wait for 5 seconds. If no response is received, it will throw an error and retry. Only bad proxies will throw frequent errors.
                        timeout: 5000
                    })
                    //Parsing response
                    if(result.data.split('No, thank you. Please take me back to')[1].split('"')[18].slice(207, -219)) {
                    var CSRF_TOKEN = result.data.split('No, thank you. Please take me back to')[1].split('"')[18].slice(207, -219);
                    confirmCSRF(offerID, sku, theRealCookies, theRealSessionID, theProductURL, CSRF_TOKEN, raw, parameterURL, productName, amazonAccountWebhook);
                    } 
                    else {
                        console.log('Cache Detected'.red.bold);
                        setTimeout(() => {
                            return addToCart(offerID, sku, theRealCookies, theRealSessionID, theProductURL);
                        }, JSON.parse(delay));
                    }
                }
                catch (e) {
                    console.log('Invalid Request Response'.red.bold);
                    setTimeout(() => {
                        return addToCart(offerID, sku, theRealCookies, theRealSessionID, theProductURL);
                    }, JSON.parse(delay));
                }
                
            }

            async function confirmCSRF(offerID, sku, theRealCookies, theRealSessionID, theProductURL, CSRF_TOKEN, raw, parameterURL, productName, amazonAccountWebhook) {

                const splitproxy = raw.split(':');

                var data = {
                    "OfferListingId.1": offerID,
                    "ASIN.1": sku,
                    "Quantity.1": 1,
                    "anti-csrftoken-a2z": CSRF_TOKEN,
                }
                
                try {
                    let result = await axios({
                        /*
                        Make sure to post to this URL, you need to import sessionid to put in payload to verify that the account
                        exists. 302 found means the item has been carted. Double check account before pushing tough. Also ensure valid
                        cookies.
                        */
                        url: `https://www.amazon.com/associates/addtocart`,
                        method: "POST",
                        headers: {
                            "Host": "www.amazon.com",
                            "Cookie": theRealCookies,
                            "Cache-Control": "max-age=0",
                            "Device-Memory": "8",
                            "Sec-Ch-Device-Memory": "8",
                            "Dpr": "1",
                            "Sec-Ch-Dpr": "1",
                            "Viewport-Width": "1920",
                            "Sec-Ch-Viewport-Width": "1920",
                            "Rtt": 100,
                            "Downlink": 1.35,
                            "Ect": "4g",
                            "Sec-Ch-Ua": `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Upgrade-Insecure-Requests": 1,
                            "Origin": "https://www.amazon.com",
                            //UA can cause cache, make sure to not use default burpsuite UA. Also, don't use a mobile UA because of the app. 
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`,
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            //Imported from previous function
                            "Referer": parameterURL,
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        data: qs.stringify(data),
                        proxy: {
                            protocol: "https",
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        //Timeout will wait for 5 seconds. If no response is received, it will throw an error and retry. Only bad proxies will throw frequent errors.
                        timeout: 5000
                    })
                    //Parsing response
                    const dayta = result.data
                    const regex = /ShoppingCart/
                    const found = regex.test(dayta);
                    if(found) {
                        console.log('Added to Cart'.yellow.bold);
                        checkoutEndpoint(theRealCookies, sku, offerID, productName, raw, amazonAccountWebhook);
                    } 
                    else {
                        console.log("Error Adding to Cart".red.bold);
                        setTimeout(() => {
                            return confirmCSRF(offerID, sku, theRealCookies, theRealSessionID, theProductURL, CSRF_TOKEN, raw, parameterURL);
                        }, JSON.parse(delay));
                    }
                }
                catch (e) {
                    console.log("Invalid Request Response".red.bold);
                    setTimeout(() => {
                        return confirmCSRF(offerID, sku, theRealCookies, theRealSessionID, theProductURL, CSRF_TOKEN, raw, parameterURL);
                    }, JSON.parse(delay));
                }
                
            }

            async function checkoutEndpoint(theRealCookies, sku, offerID, productName, raw, amazonAccountWebhook) {

                const splitproxy = raw.split(':');
                let cartBrute = 0;

                try {
                    let result = await axios({
                        /*
                        This is a GET URL. This endpoint will not actually cart thje item, but respond with a csrf which will allow the next function to cart. This request
                        has a lot of cache but can be fast if there is none. Make sure to use good proxies, it helps. The endpoint is a windows endpoint, not mobile. This 
                        is not a mobile ep.
                        */
                        url: "https://www.amazon.com/gp/buy/spc/handlers/place-your-decoupled-order.html",
                        method: "GET",
                        headers: {
                            "Host": "www.amazon.com",
                            "Cookie": theRealCookies,
                            "Cache-Control": "max-age=0",
                            "Device-Memory": "8",
                            "Sec-Ch-Device-Memory": "8",
                            "Dpr": "1",
                            "Sec-Ch-Dpr": "1",
                            "Viewport-Width": "1920",
                            "Sec-Ch-Viewport-Width": "1920",
                            "Rtt": 100,
                            "Downlink": 1.35,
                            "Ect": "4g",
                            "Sec-Ch-Ua": `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": `"Windows"`,
                            "Upgrade-Insecure-Requests": 1,
                            //UA can cause cache, make sure to not use default burpsuite UA. Also, don't use a mobile UA because of the app. 
                            "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36`,
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                        },
                        proxy: {
                            protocol: "https",
                            host: splitproxy[0],
                            port: splitproxy[1],
                            auth: {
                                username: splitproxy[2],
                                password: splitproxy[3].replace('\r', '')
                            }
                        },
                        //Timeout will wait for 5 seconds. If no response is received, it will throw an error and retry. Only bad proxies will throw frequent errors.
                        timeout: 5000,
                        maxRedirects: 0
                    })
                    //Parsing response
                    if(result.data.asins) {
                        console.log('Successfully Checked Out'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);
                        const b_url = webhookIMG;
                        hook.setUsername('SplashAIO');
                        hook.setAvatar(b_url);
                
                        const embed = new MessageBuilder()
                        .setTitle('🎉 Successful Checkout 🎉')
                        .addField('Site', 'Amazon US', true)
                        .addField('Mode', 'Safe', true)
                        .addField('Email', '||' + amazonAccountWebhook + '||', true)
                        .addField('Sku', sku)
                        .addField('OfferID', offerID, true)
                        .setColor(webhookColor)
                        .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png')
                        .setDescription('')
                        .setImage('')
                        .setFooter('SplashAIO', webhookIMG)
                        .setTimestamp();
                
                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                    } 
                    else {
                        console.log("Metadata Error".red.bold);
                        setTimeout(() => {
                            return checkoutEndpoint(theRealCookies, sku, offerID, productName, raw);
                        }, JSON.parse(delay));
                    }
                }
                catch (e) {
                    console.log('Error Submitting Order'.red.bold);
                    cartBrute = cartBrute + 1;
                    if(JSON.stringify(cartBrute) > '2') {
                        console.log("Product OOS".red.bold);
                        return amazonMonitor(offerID, sku);
                    }
                    else {
                    setTimeout(() => {
                    return checkoutEndpoint(theRealCookies, sku, offerID, productName, raw);
                }, JSON.parse(delay));
                }
                }
                
            }
            async function masterLog(secretKey) {

                const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
                const hook = new Webhook(sharedHook);
    
                hook.setUsername('SplashAIO');
                hook.setAvatar(webhookIMG);
    
                const embed = new MessageBuilder()
                    .setTitle('🎉 Successful Checkout 🎉')
                    .addField('Site', 'Amazon US', true)
                    .addField('Mode', 'Safe', true)
                    .addField('Sku', sku)
                    .addField('OfferID', offerID, true)
                    .setColor(webhookColor)
                    .setThumbnail('https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png')
                    .setDescription('')
                    .setImage('')
                    .setFooter('SplashAIO', webhookIMG)
                    .setTimestamp();
    
                hook.send(embed);
            }
        }
        

    }

    async function supremeUS(license, secretKey, hostHeader) {

        var mode, category;

        const auto1 = new AutoComplete({
            name: 'mode',
            message: 'Select The Mode You Would Like To Run'.cyan.bold,
            limit: 4,
            initial: 0,
            choices: [
                'Bypass'.yellow.bold,
                'Bypass Safe'.yellow.bold,
                'Safe'.yellow.bold,
                'Super Safe'.yellow.bold
            ]
        });
        await auto1.run()
        .then(answer => {
            mode = answer.strip;
        })
        .catch();

        
        var keywords = prompt('Enter the keywords for the product you wish to checkout (Ex. box,logo,shirt,-hoodie): '.cyan.bold);
        var styles = prompt('Enter the style/colour that you would like to checkout: '.cyan.bold);
        // var sizes = prompt('Enter the sizes you would like to checkout in order of preference (Ex. M,L,S): '.cyan.bold);

        const auto2 = new AutoComplete({
            name: 'category',
            message: `Select The Category In Which ${keywords} Is In`.cyan.bold,
            limit: 12,
            initial: 0,
            choices: [
                'Accessories'.yellow.bold,
                'Bags'.yellow.bold,
                'Skate'.yellow.bold,
                'Shoes'.yellow.bold,
                'Hats'.yellow.bold,
                'Shirts'.yellow.bold,
                'T-Shirts'.yellow.bold,
                'Pants'.yellow.bold,
                'Jackets'.yellow.bold,
                'Shorts'.yellow.bold,
                'Tops/Sweaters'.yellow.bold,
                'Sweatshirts'.yellow.bold
            ]
        });
        await auto2.run()
        .then(answer => {
            category = answer.strip;
        })
        .catch();
        var confirm = prompt(`Y or N, you want to start tasks for ${keywords}? `.cyan.bold);
        if (confirm == "Y" || confirm == "y") {
            keywords = keywords.replace(/\s/g, '');
            keywords = keywords.toLowerCase();
            keywords = keywords.split(',');
    
            styles = styles.toLowerCase();
            styles = styles.replace(/\s/g, '');
            styles = styles.split(',');
    
            //sizes = sizes.toLowerCase();
            //sizes = sizes.replace(/\s/g, '');
            //sizes = sizes.split(',');
    
            var negativeKeywords = [];
            var positiveKeywords = [];
            for (var i = 0; i < keywords.length; i++){
                if (keywords[i].charAt(0) == '-'){
                    negativeKeywords[negativeKeywords.length] = keywords[i].substring(1);
                } else {
                    positiveKeywords[positiveKeywords.length] = keywords[i];
                }
            }
            keywords = positiveKeywords;

            var profiles = "";

            try {
                profiles = JSON.parse(fs.readFileSync('./Storage/Profiles/aycd.json', 'utf-8'));
            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR READING PROFILES'.red.bold);
                sleep(2000);
                process.exit();
            }

            if(profiles.length == null) {
                console.log('TASK STATUS: '.bold + 'ERROR READING PROFILES LENGTH'.red.bold);
                sleep(2000);
                process.exit();
            } else {
                for(var loop = 0; loop < profiles.length; loop++) {
                    runOfficial(negativeKeywords, positiveKeywords, profiles);
                }
            }
        } else {
            sleep(2000);
            process.exit();
        }

        async function runOfficial(negativeKeywords, positiveKeywords, profiles) {

            let monitorCount = 0;

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const list = fs
                .readFileSync("./Storage/proxies.txt", "utf8")
                .split("\n")
                .filter(String);
            const raw = random(list);
            const splitproxy = raw.split(":");

            console.log('TASK STATUS: '.bold + 'GETTING HOMEPAGE'.yellow.bold);
            getHome();

            async function getHome() {

                var headerList = "";

                if(mode == "Bypass" || mode == "Bypass Safe") {
                    headerList = {
                        "Host": "www.supremenewyork.com",
                        "Upgrade-Insecure-Requests": 1,
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Referer": "https://www.supremenewyork.com/mobile/",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8"
                    }
                } else {
                    headerList = {
                        "Host": "www.supremenewyork.com",
                        "Upgrade-Insecure-Requests": "1",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9",
                        "Referer": "http://www.supremenewyork.com/",
                    }
                }

                try {
                    const response = await axios({
                        method: 'GET',
                        url: "https://www.supremenewyork.com/shop",
                        headers: headerList,
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
                    if(response.headers) {
                        let cookies = response.headers['set-cookie'];
                        cookies = cookies[0].slice(0, -47) + cookies[1].slice(0, -47) + cookies[2].slice(0, -8) + cookies[3].slice(0, -8) + " "
                        monitorStock(cookies)
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GETTING HOMEPAGE'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 1000);
                    }
                    
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING HOMEPAGE'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 1000);
                }
            }

            async function monitorStock(cookies) {

                var headerList = "";

                if(mode == "Bypass" || mode == "Bypass Safe") {

                    headerList = {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Upgrade-Insecure-Requests": 1,
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Referer": "https://www.supremenewyork.com/mobile/",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8"
                    }
                
                } else {

                    headerList = {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": '"Windows"',
                        "Upgrade-Insecure-Requests": "1",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Accept-Encoding": "gzip, deflate",
                    }
                    
                }

                try {
                    const response = await axios({
                        url: "https://www.supremenewyork.com/mobile_stock.json",
                        method: "GET",
                        headers: headerList,
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

                    const data = await response.data;
                    if(data) {
                        monitorCount++;
                        if(monitorCount > 20) {
                            return getHome()
                        } else {
                            const products_and_categories = data['products_and_categories'][category];
                            // console.log(products_and_categories);
                            for (var j = 0; j < products_and_categories.length; j++) {
                                var item = products_and_categories[j]['name'].toLowerCase();
                                // console.log("Item: " + item);
                                var tempKeywords = keywords.slice();
                                var tempNegativeKeywords = negativeKeywords.slice();
                                for (var i = 0; i < keywords.length; i++){
                                    if (item.includes(keywords[i])){
                                        tempKeywords = tempKeywords.filter(e => e !== keywords[i]);
                                    } else {
                                        tempKeywords = keywords.slice();
                                        break;
                                    }
                                }
                                if (tempKeywords.length == 0){
                                    for (var i = 0; i < negativeKeywords.length; i++){
                                        if (!item.includes(negativeKeywords[i])){
                                            tempNegativeKeywords = tempNegativeKeywords.filter(e => e !== negativeKeywords[i]);
                                        } else{
                                            tempNegativeKeywords = negativeKeywords.slice();
                                            tempKeywords = keywords.slice();
                                            break;
                                        }
                                    }
                                    if (tempNegativeKeywords.length == 0){
                                        console.log('TASK STATUS: '.bold + `ITEM FOUND ${item}`.cyan.bold);
                                        var productID = products_and_categories[j]['id'];
                                        if(mode == "Bypass" || mode == "Bypass Safe") {
                                            runBypass(cookies, productID)
                                        } else {
                                            getProduct(cookies, productID);
                                        }
                                        break;
                                    }
                                }
                                if (j + 1 == products_and_categories.length){
                                    console.log('TASK STATUS: '.bold + 'MONITORING...'.magenta.bold);
                                    setTimeout(function(){
                                        monitorStock(cookies);
                                    }, 3500);  // Maybe add an error delay here that the user can change
                                }
                            }
                        }
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GETTING STOCK'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 1000);
                    }

                } catch (e) {
                    console.log(e);
                    setTimeout(() => {
                        return runOfficial();
                    }, 1000);
                }
                

            }
            
            async function getProduct(cookies, productID) {

                console.log('TASK STATUS: '.bold + 'GETTING PRODUCT PAGE'.yellow.bold);

                let urlGet = "";

                if(mode == "Safe" || mode == "Super Safe") {category
                    urlGet = `https://www.supremenewyork.com/shop/${category}/${productID}`;
                } else {
                    urlGet = `https://www.supremenewyork.com/shop/new/${productID}`;
                }

                try {
                    const response = await axios({
                        method: 'GET',
                        url: urlGet,
                        headers: {
                            "Host": "www.supremenewyork.com",
                            "Cookie": cookies,
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Accept-Encoding": "gzip, deflate",
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
                        const $ = cheerio.load(response.data);
                        const csrfToken = $(`meta[name="csrf-token"]`).attr("content");
                        const chk = $(`input[name="chk"]`).attr("value");
                        let theCartStyle = styles[0].charAt(0).toUpperCase() + styles[0].slice(1);
                        theCartStyle = $(`button[data-style-name="${theCartStyle}"]`).attr("data-style-id");
                        let cartSize = $(`#size > option:nth-child(${JSON.stringify(fakerator.date.age(1, 2))})`).attr("value");

                        cookies = cookies + response.headers['set-cookie'][2].slice(0, -8)

                        addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize);


                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GETTING PRODUCT'.red.bold);
                        return getProduct(cookies, productID);
                    }
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING PRODUCT'.red.bold);
                    return getProduct(cookies, productID)
                }
            }

            async function runBypass(cookies, productID) {

                console.log('TASK STATUS: '.bold + 'GETTING PRODUCT PAGE'.yellow.bold);

                try {
                    const response = await axios({
                        url: `https://www.supremenewyork.com/shop/${productID}.json`,
                        method: "GET",
                        headers: {
                            "Host": "www.supremenewyork.com",
                            "Cookie": cookies,
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": "macOS",
                            "Upgrade-Insecure-Requests": 1,
                            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Referer": "https://www.supremenewyork.com/mobile/",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8"
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
                        const data = await response.data;
                        const stylesData = data['styles'];
                        const sizesAr = ["s", "m", "l", "xl"];
                        let sizes = sizesAr[Math.floor(Math.random() * sizesAr.length)]
                        sizes = [sizes]
                        if (sizes.length != 0){
                            sizes = await convertSizes(sizes);
                        } else {
                            sizes = ["N/A"];
                        }
                        for (var i = 0; i < stylesData.length; i++){
                            for (var j = 0; j < styles.length; j++){
                                if (stylesData[i]['name'].toLowerCase() == styles[j]){
                                    // console.log("Found Color " + String(stylesData[i]['id']));
                                    var styleID = stylesData[i]['id'];
                                    var styleCHK = stylesData[i]['chk'];
                                    // console.log(sizes);
                                    // console.log(stylesData[i]['sizes']);
                                    for (var t = 0; t < sizes.length; t++){  // This one on top is prioritizing the order the user entered the sizes.
                                        for (var k = 0; k < stylesData[i]['sizes'].length; k++){  // Change the order of these for loops depending on if we want to go prefered size first or smallest size first.
                                            if (stylesData[i]['sizes'][k]['name'] == sizes[t]){  // Could check stock here but other bots may grab it after we have checked.
                                                var sizeID = stylesData[i]['sizes'][k]['id'];
                                                // console.log(String(styleID));
                                                // console.log(String(sizeID));
                                                // console.log(String(productID));
                                                bypassCart(styleID, sizeID, productID, styleCHK, cookies);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING PRODUCT'.red.bold);
                    return runBypass(cookies, productID)
                }

            }

            const convertSizes = async (sizes) => {
                for (var i = 0; i < sizes.length; i++){
                    if (sizes[i] == 'xs'){
                        sizes[i] = "XSmall";
                    } else if (sizes[i] == 's'){
                        sizes[i] = "Small";
                    } else if (sizes[i] == 'm'){
                        sizes[i] = "Medium";
                    } else if (sizes[i] == 'l'){
                        sizes[i] = "Large";
                    } else if (sizes[i] == 'xl'){
                        sizes[i] = "XLarge";
                    } else if (sizes[i] == 'xxl'){
                        sizes[i] = "XXL";
                    } else if (sizes[i] == 's'){
                        sizes[i] = "Small";
                    } else if (sizes[i] == 's/m'){
                        sizes[i] = "S/M";
                    } else if (sizes[i] == 'm/l'){
                        sizes[i] = "M/L";
                    } else {
                        sizes[i] = String(sizes[i]);
                    }
                }
                return sizes;
            };

            async function bypassCart(styleID, sizeID, productID, styleCHK, cookies) {
                console.log('TASK STATUS: '.bold + 'ADDING TO CART'.cyan.bold);

                var sov = styleCHK.split("").reverse().join("").substring(0, 9) + "50131360511513011514860418324546139";

                try {
                    const response = await axios({
                        url: `https://www.supremenewyork.com/shop/${productID}/atc.json`,
                        method: "POST",
                        headers: {
                            "Host": "www.supremenewyork.com",
                            "Cookie": cookies,
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": "macOS",
                            "Upgrade-Insecure-Requests": 1,
                            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Referer": "https://www.supremenewyork.com/mobile/",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8",
                            "Content-Type": "application/x-www-form-urlencoded"
                        }, 
                        data: qs.stringify({
                            size: sizeID,
                            style: styleID,
                            qty: 1,
                            chk: styleCHK,
                            sov: sov
                        }),
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

                    const data = await response.data;
                    if (data['success'] == true){
                        cookies = cookies + response.headers['set-cookie'][1].slice(0, -56) + response.headers['set-cookie'][2].slice(0, -56) + response.headers['set-cookie'][3].slice(0, -94);
                        runBypassCheckout(cookies, sizeID)
                    }
                
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR ADDING TO CART'.red.bold);
                    return bypassCart(styleID, sizeID, productID, styleCHK, cookies);
                }
            }
            
            async function addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize) {

                console.log('TASK STATUS: '.bold + 'ADDING TO CART'.yellow.bold);

                var sov = chk.split("").reverse().join("").substring(0, 9) + "5010064645373610405112102537368324546116";
                
                try {
                    const response = await axios({
                        method: 'POST',
                        url: `https://www.supremenewyork.com/shop/${productID}/atc`,
                        headers: {
                            "Host": "www.supremenewyork.com",
                            "Cookie": cookies,
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "X-Csrf-Token": csrfToken,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "Accept": "*/*",
                            "X-Requested-With": "XMLHttpRequest",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://www.supremenewyork.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://www.supremenewyork.com/shop/accessories/a608cfjws",
                            "Accept-Encoding": "gzip, deflate",
                        },
                        data: qs.stringify({
                            "utf8": "%E2%9C%93",
                            "authenticity_token": csrfToken,
                            "size": cartSize,
                            "style": theCartStyle,
                            "qty": "1",
                            "chk": chk,
                            "sov": sov
                        }),
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
            
                    if(response.data.success == true) {
                        cookies = cookies + response.headers['set-cookie'][1].slice(0, -56) + response.headers['set-cookie'][2].slice(0, -56) + response.headers['set-cookie'][3].slice(0, -94);
                        getCheckout(cookies)
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR ADDING TO CART'.red.bold);
                        return addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize);
                    }
            
                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR ADDING TO CART'.red.bold);
                    return addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize)
                }
            }

            async function getCheckout(cookies) {
                
                console.log('TASK STATUS: '.bold + 'GETTING CHECKOUT'.yellow.bold);

                try {
                    const response = await axios({
                        method: 'GET',
                        url: 'https://www.supremenewyork.com/checkout',
                        headers: {
                            "Host": "www.supremenewyork.com",
                            "Cookie": cookies,
                            "Cache-Control": "max-age=0",
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
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
                    });

                    if(response.headers) {
                        cookies = cookies + response.headers['set-cookie'][0].slice(0, -15)
                        const $ = cheerio.load(response.data);
                        const csrfToken = $(`meta[name="csrf-token"]`).attr("content");
                        submitCheckout(cookies, csrfToken)
                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR GETTING CHECKOUT'.red.bold);
                        return getCheckout(cookies);
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING CHECKOUT'.red.bold);
                    return getCheckout(cookies)
                }
            }

            async function runBypassCheckout(cookies, sizeID) {

                console.log('TASK STATUS: '.bold + 'SUBMITTING CHECKOUT'.magenta.bold);

                let captchaResCheckout = "";

                if(mode == "Bypass Safe") {
                    captchaResCheckout = await solveTwoCap('hcaptcha', '9c1f7658-2de8-43d2-abca-6660f344ea1c', 'https://www.supremenewyork.com/checkout');
                }

                const loopTwo = loop - 1;

                const timestamp = Date.now();
                const theRealState = states.abbr(profiles[loopTwo].billingAddress.state);
                var urlEncoded = encodeURIComponent(`{"${sizeID}":1}`);
                var phoneConverted = profiles[loopTwo].billingAddress.phone.substring(0, 3) + "-" + profiles[loopTwo].billingAddress.phone.substring(3, 6) + "-" + profiles[loopTwo].billingAddress.phone.substring(6, 10);
                var convertedCardNumber = profiles[loopTwo].paymentDetails.cardNumber.strip.match(/.{1,4}/g).join(' ');

                try {
                    const response = await axios({
                        url: `https://www.supremenewyork.com/checkout.json`,
                        method: "POST",
                        headers: {
                            "Host": "www.supremenewyork.com",
                            "Cookie": cookies,
                            "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": "macOS",
                            "Upgrade-Insecure-Requests": 1,
                            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1",
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "Sec-Fetch-Site": "none",
                            "Sec-Fetch-Mode": "navigate",
                            "Sec-Fetch-User": "?1",
                            "Sec-Fetch-Dest": "document",
                            "Referer": "https://www.supremenewyork.com/mobile/",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8",
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: qs.stringify({
                            'from_mobile': 1,
                            'cookie-sub': urlEncoded,
                            'current_time': timestamp,
                            'same_as_billing_address' : 1,
                            'order': {
                                'billing_name' : profiles[loopTwo].billingAddress.name,
                                'email' : profiles[loopTwo].billingAddress.email,
                                'tel' : phoneConverted,
                                'billing_address' : profiles[loopTwo].billingAddress.line1,
                                'billing_address_2' : profiles[loopTwo].billingAddress.line2,
                                'billing_zip' : profiles[loopTwo].billingAddress.postCode,
                                'billing_city' : profiles[loopTwo].billingAddress.city,
                                'billing_state' : theRealState,
                                'billing_country' : "USA",
                                'terms' : 1,
                            },
                            'credit_card' : {
                                'type' : "credit card",
                                'number' : convertedCardNumber,
                                'month' : profiles[loopTwo].paymentDetails.cardExpMonth,
                                'year' : profiles[loopTwo].paymentDetails.cardExpYear,
                                'verification_value' : profiles[loopTwo].paymentDetails.cardCvv,
                            },
                            'h-captcha-response' : captchaResCheckout
                        }),
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
                        if(response.data.status == 'failed' && response.data.page) {
                            const dayta = response.data.page
                            const regex = /unable to process your order/
                            const found = regex.test(dayta);
                            if(found) {
                                console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (TRAFFIC ERROR)'.red.bold);
                                return runOfficial(negativeKeywords, positiveKeywords, profiles);
                            } else {
                                console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (UNKNOWN ERROR)'.red.bold);
                                return runOfficial(negativeKeywords, positiveKeywords, profiles);
                            }
                        } else if(response.data.status == "queued") {
                            console.log('TASK STATUS: '.bold + 'WAITING IN SPLASH...'.cyan.bold);
                            console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT (MAYBE GHOST)'.green.bold);

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🎉 Successful Checkout 🎉')
                                .addField('Site', 'Supreme', true)
                                .addField('Mode', mode, true)
                                .addField('Captcha Bypass', 'true')
                                .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")

                        } else if(response.data.status == 'failed') {
                            if(response.data.info.email) {
                                console.log('TASK STATUS: '.bold + 'ERROR CHECKING OUT (ADDRESS BAN)'.red.bold);
                                return runOfficial(negativeKeywords, positiveKeywords, profiles);
                            } else {
                                console.log('TASK STATUS: '.bold + 'ERROR CHECKING OUT'.red.bold);
                                return runOfficial(negativeKeywords, positiveKeywords, profiles);
                            }
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT'.green.bold);

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🎉 Successful Checkout 🎉')
                                .addField('Site', 'Supreme', true)
                                .addField('Mode', mode, true)
                                .addField('Captcha Bypass', 'true')
                                .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                        }
                        
                    }

                } catch (e) {
                    console.log(e)
                }
            }

            async function submitCheckout(cookies, csrfToken) {

                console.log('TASK STATUS: '.bold + 'SUBMITTING CHECKOUT'.magenta.bold);

                let captchaResCheckout = "";

                if(mode == "Super Safe") {
                    captchaResCheckout = await solveTwoCap('hcaptcha', '9c1f7658-2de8-43d2-abca-6660f344ea1c', 'https://www.supremenewyork.com/checkout');
                }

                //loop
                const loopTwo = loop - 1;

                const timestamp = Date.now();
                const theRealState = states.abbr(profiles[loopTwo].billingAddress.state);
                var phoneConverted = profiles[loopTwo].billingAddress.phone.substring(0, 3) + "-" + profiles[loopTwo].billingAddress.phone.substring(3, 6) + "-" + profiles[loopTwo].billingAddress.phone.substring(6, 10);
                var convertedCardNumber = profiles[loopTwo].paymentDetails.cardNumber.strip.match(/.{1,4}/g).join(' ');

                try {
                    const response = await axios({
                        method: 'POST',
                        url: 'https://www.supremenewyork.com/checkout.json',
                        headers: {
                            "Host": "www.supremenewyork.com",
                            "Cookie": cookies,
                            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                            "X-Csrf-Token": csrfToken,
                            "Sec-Ch-Ua-Mobile": "?0",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            "Accept": "*/*",
                            "X-Requested-With": "XMLHttpRequest",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Origin": "https://www.supremenewyork.com",
                            "Sec-Fetch-Site": "same-origin",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Dest": "empty",
                            "Referer": "https://www.supremenewyork.com/checkout",
                            "Accept-Encoding": "gzip, deflate",
                        },
                        data: qs.stringify({
                            "authenticity_token": csrfToken,
                            "credit_card[month]": profiles[loopTwo].paymentDetails.cardExpMonth,
                            "credit_card[number]": convertedCardNumber,
                            "credit_card[type]": "credit card",
                            "credit_card[verification_value]": profiles[loopTwo].paymentDetails.cardCvv,
                            "credit_card[year]": profiles[loopTwo].paymentDetails.cardExpYear,
                            "current_time": timestamp,
                            "h-captcha-response": captchaResCheckout,
                            "order[billing_address]": profiles[loopTwo].billingAddress.line1,
                            "order[billing_address_2]": profiles[loopTwo].billingAddress.line2,
                            "order[billing_city]": profiles[loopTwo].billingAddress.city,
                            "order[billing_country]": "USA",
                            "order[billing_name]": profiles[loopTwo].billingAddress.name,
                            "order[billing_state]": theRealState,
                            "order[billing_zip]": profiles[loopTwo].billingAddress.postCode,
                            "order[email]": profiles[loopTwo].billingAddress.email,
                            "order[tel]": phoneConverted,
                            "order[terms]": '1',
                            "same_as_billing_address": "1",
                            "store_credit_id": "",
                            "utf8": "✓"
                          }),
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
                        if(response.data.status == 'failed' && response.data.page) {
                            const dayta = response.data.page
                            const regex = /unable to process your order/
                            const found = regex.test(dayta);
                            if(found) {
                                console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (TRAFFIC ERROR)'.red.bold);
                                return runOfficial(negativeKeywords, positiveKeywords, profiles);
                            } else {
                                console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (UNKNOWN ERROR)'.red.bold);
                                return runOfficial(negativeKeywords, positiveKeywords, profiles);
                            }
                        } else if(response.data.status == "queued") {
                            console.log('TASK STATUS: '.bold + 'WAITING IN SPLASH...'.cyan.bold);
                            console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT (MAYBE GHOST)'.green.bold);

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🎉 Successful Checkout 🎉')
                                .addField('Site', 'Supreme', true)
                                .addField('Mode', mode, true)
                                .addField('Captcha Bypass', 'true')
                                .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")

                        } else if(response.data.status == 'failed') {
                            console.log('TASK STATUS: '.bold + 'ERROR CHECKING OUT'.red.bold);
                            return runOfficial(negativeKeywords, positiveKeywords, profiles);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT'.green.bold);

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);

                            const embed = new MessageBuilder()
                                .setTitle('🎉 Successful Checkout 🎉')
                                .addField('Site', 'Supreme', true)
                                .addField('Mode', mode, true)
                                .addField('Captcha Bypass', 'true')
                                .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();

                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                        }
                        
                    }

                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING CHECKOUT'.red.bold);
                    return runOfficial(negativeKeywords, positiveKeywords, profiles)
                }
            }
        }

        async function masterLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🎉 Successful Checkout 🎉')
                .addField('Site', 'Supreme', true)
                .addField('Mode', mode, true)
                .addField('Captcha Bypass', 'true')
                .setColor(webhookColor)
                .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }
        
    }

    //Starting raffle modules

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
                        "email":"fasdfsddaf@gmail.com",
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
                        "email":"fasdfsddaf@gmail.com",
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

    async function playstationDirect(license, secretKey, hostHeader) {
        
        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: false,
                        ignoreHTTPSErrors: true,
                        args: args,
                        executablePath: chromePaths.chrome,
                        defaultViewport: null
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://www.playstation.com/en-us/ps5/register-to-buy/?', {
                            waitUntil: 'networkidle2'
                        });
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        await page.waitForSelector('#sb-social-toolbar-root > div > div > button');
                        await page.waitForTimeout(1000);
                        await page.click('#sb-social-toolbar-root > div > div > button', elem => elem.click());  
                        await page.waitForSelector('#ember27 > button');
                        await page.waitForTimeout(1000);
                        await page.click('#ember27 > button', elem => elem.click());  
                        await page.waitForSelector('#ember19 > button');
                        await page.waitForTimeout(1000);
                        await page.click('#ember19 > button', elem => elem.click());
                        console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                        await page.waitForSelector('#ember51 > div > select');
                        await page.waitForTimeout(1000);
                        await page.type('#ember51 > div > select', '1', {delay: 25});
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(250);
                        await page.type('#ember52 > div > select', '1', {delay: 25});
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(250);
                        await page.type('#ember53 > div > select', '1999', {delay: 25});
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(250);
                        await page.click('#ember56 > button', elem => elem.click());
                        await page.waitForTimeout(1000);
                        await page.waitForSelector('#ember66 > select');
                        await page.waitForTimeout(1000);
                        await page.click('#ember71 > button', elem => elem.click());
                        console.log('TASK STATUS: '.bold + 'SUBMITTING INITIAL PAYLOAD'.yellow.bold);
                        await page.waitForSelector('#ember86'); 
                        await page.waitForTimeout(1000);
                        await page.type('#ember86', email, {delay: 25});
                        const password = fakerator.random.string(8)	+ 'fa!2A';
                        await page.waitForTimeout(50);
                        await page.type('#ember90', password, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type('#ember93', password, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.click("button[class='next-button text-button']", elem => elem.click());
                        await page.waitForSelector("input[name='address-level2']");
                        await page.type("input[name='address-level2']", 'New York City', {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("select[title='State or Province']", 'new y', {delay: 25});
                        await page.waitForTimeout(250);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(250);
                        await page.type("input[name='postal-code']", '10001', {delay: 25});
                        await page.waitForTimeout(50);
                        await page.click("button[class='next-button text-button']", elem => elem.click());
                        await page.waitForSelector("input[title='Online ID']");
                        await page.waitForTimeout(4500);
                        console.log('TASK STATUS: '.bold + 'SUBMITTING ONLINE DETAILS'.yellow.bold);
                        await page.type("input[title='Online ID']", fakerator.random.string(8) + '2' , {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[title='First Name']", fakerator.names.firstName(), {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[title='Last Name']", fakerator.names.lastName(), {delay: 25});
                        await page.waitForTimeout(50);
                        await page.click("button[class='next-button text-button']", elem => elem.click());
                        await page.waitForSelector("button[class='primary-button row-button text-button']");
                        await page.waitForTimeout(3000);
                        await page.click("button[class='primary-button row-button text-button']", elem => elem.click());
                        try{
                            await page.waitForSelector("div[class='icon-succeed']");
                            console.log('TASK STATUS: '.bold + 'STARTING EMAIL VERIFICATION'.cyan.bold);
                        }
                        catch(e){
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }   
                        await page.waitForTimeout(2000);
                        await page.waitForSelector("button[class='primary-button row-button text-button']");
                        await page.waitForTimeout(1000);
                        await page.click("button[class='primary-button row-button text-button']", elem => elem.click());
                        try{
                            await page.waitForSelector("div[class='icon-upgrade']");
                        }
                        catch(e){
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } 
                        await page.waitForTimeout(2000);
                        await page.goto('https://www.playstation.com/en-us/ps5/register-to-buy/?');
                        await page.waitForSelector('#sb-social-toolbar-root > div > div > button');
                        await page.waitForTimeout(1000);
                        await page.click('#sb-social-toolbar-root > div > div > button', elem => elem.click());
                        try{
                            await page.waitForSelector("input[placeholder='Email Address']");
                        }
                        catch(e){
                            console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                        console.log('TASK STATUS: '.bold + 'PENDING MANUAL EMAIL VERIFICATION'.magenta.bold);
                        const verificationUrl = await prompt('Please Paste The Verification Link: '.cyan.bold);
                        await page.goto(verificationUrl);
                        try{
                            await page.waitForSelector("div[class='icon-succeed']");
                            console.log('TASK STATUS: '.bold + 'VERIFIED EMAIL'.green.bold);
                            await page.waitForTimeout(1000);
                        }
                        catch(e){
                            console.log('TASK STATUS: '.bold + 'FAILED TO VERIFY EMAIL'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
                        await page.waitForTimeout(5000);
                        await page.goto('https://www.playstation.com/en-us/ps5/register-to-buy/?');
                        await page.waitForSelector('#sb-social-toolbar-root > div > div > button');
                        await page.waitForTimeout(1000);
                        await page.click('#sb-social-toolbar-root > div > div > button', elem => elem.click());
                        try{
                            await page.waitForSelector("button[data-dtm-label='Register Now']");
                            await page.waitForTimeout(3000);
                        }
                        catch(e){
                            console.log('TASK STATUS: '.bold + 'FAILED TO VERIFY EMAIL'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                        await page.waitForTimeout(5000);
                        await page.click("button[data-dtm-label='Register Now']", elem => elem.click());
                        try{
                            await page.waitForSelector("div[class='form__message form__message--success']");
                            await page.waitForTimeout(5000);

                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);

                            hook.setUsername('SplashAIO');
                            hook.setAvatar(webhookIMG);
                
                            const embed = new MessageBuilder()
                                .setTitle('🎮 Successfully Entered Raffle 🎮')
                                .addField('Site', 'Playstation Direct', true)
                                .addField('Email', '||' + email + '||', true)
                                .addField('Password', '||' + password + '||')
                                .addField('Format', '||' + email + ':' + password + '||')
                                .setColor(webhookColor)
                                .setThumbnail('https://assets-prd.ignimgs.com/2020/06/12/playstation-5-button-02-1591933908407.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();
                
                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            await logFileCreds(email, password, null);
                        } catch (e) {
                            console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }

                    } catch (e) {
                        console.log('TASK STATUS: '.red.bold + 'ERROR DURING GEN PROCESS'.red.bold);
                        await browser.close();
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
                .setTitle('🎮 Successfully Entered Raffle 🎮')
                .addField('Site', 'Playstation Direct ', true)
                .setColor(webhookColor)
                .setThumbnail('https://assets-prd.ignimgs.com/2020/06/12/playstation-5-button-02-1591933908407.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }

    }

    async function amazonRaffles(license, secretKey, hostHeader) {

        const url = prompt('What Is The Raffle URL:'.cyan.bold)

        const amazonAccts = fs
        .readFileSync("./Storage/Accounts/amazonaccounts.txt", "utf8")
        .split("\n")
        .filter(String);

        for (let i = 0; i < amazonAccts.length ; i++){

            const akz = amazonAccts[i]

            const splitaccount = akz.split(":");

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
                const d1 = new Date().getDate();
                const d3 = d1 + 1
                const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: true,
                        ignoreHTTPSErrors: true,
                        args: args,
                        defaultViewport: null,
                        executablePath: chromePaths.chrome
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        })
                        await page.goto('https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fdp%2FB0B16656Z2%3Fref_%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&');
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        await page.waitForTimeout(1000);
                        await page.waitForSelector("input[type='email']");
                        await page.waitForTimeout(500);
                        console.log('TASK STATUS: '.bold + 'LOGGING IN'.yellow.bold);
                        await page.type("input[type='email']", splitaccount[0], {delay: 100});
                        await page.waitForTimeout(100);
                        await page.click("input[id='continue']",  elem => elem.click());   
                        await page.waitForTimeout(100);
                        await page.waitForSelector("input[type='password']");
                        await page.waitForTimeout(100);
                        await page.type("input[type='password']", splitaccount[1], {delay: 100});
                        await page.waitForTimeout(100);
                        await page.click("input[id='signInSubmit']", elem => elem.click()); 
                        await page.waitForNavigation();  
                        await page.waitForTimeout(1000);
                        if (await page.$("a[id='ap-account-fixup-phone-skip-link']") !== null){
                            await page.click("a[id='ap-account-fixup-phone-skip-link']", elem => elem.click());   
                        }
                        await page.waitForTimeout(1000);
                        if (await page.$("a[id='nav-cart']") !== null){
                        }
                        else{
                            console.log('TASK STATUS: '.bold + 'ERROR LOGGING IN'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                        await page.goto(url);
                        await page.waitForTimeout(2500);
                        if (await page.$("input[value='Request invitation']") !== null){
                        }
                        else{
                            console.log('TASK STATUS: '.bold + 'FAILED TO LOAD RAFFLE'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                        await page.click("span[data-action='invite-button']", elem => elem.click(), {clickCount: 3});
                        await page.waitForTimeout(7500);
                        if (await page.$("div[id='hdp-detail-requested-id']") !== null){
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY ENTERED RAFFLE'.green.bold);
                            await browser.close();
                    
                            const hook = new Webhook(credentials.discordWebhook);
                            const b_url = webhookIMG;
                            hook.setUsername('SplashAIO');
                            hook.setAvatar(b_url);
                        
                            const embed = new MessageBuilder()
                                .setTitle('📦 Successfully Entered Raffle 📦')
                                .addField('Site', 'Amazon US')
                                .addField('Email', '||' + splitaccount[0] + '||', true)
                                .addField('Password', '||' + splitaccount[1] + '||', true)
                                .setColor(webhookColor)
                                .setThumbnail('https://m.economictimes.com/thumb/msid-91166059,width-1280,height-720,resizemode-4,imgsize-19856/amazon.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();
                        
                                await hook.send(embed);
                                await masterLog(secretKey);
                                await masterLogAdmin(license, secretKey);
                                await grabAnalytics(hostHeader, license, secretKey, "Add")

                        } else {
                            console.log('TASK STATUS: '.bold + 'FAILED TO ENTER RAFFLE'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }
                    } catch (e) {
                        console.log(e);
                        await browser.close();
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
                .setTitle('📦 Successfully Entered Raffle 📦')
                .addField('Site', 'Amazon US', true)
                .setColor(webhookColor)
                .setThumbnail('https://m.economictimes.com/thumb/msid-91166059,width-1280,height-720,resizemode-4,imgsize-19856/amazon.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);
        }

    }

    //Starting misc modules
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

    async function slapperGame(license, secretKey, hostHeader) {

        const threads = prompt("How many threads do you want to run: ".cyan.bold);

        if(JSON.parse(threads) > 5) {
            console.log('TASK STATUS: '.bold + 'MAX THREADS IS 5'.red.bold);
            sleep(2000);
            process.exit();
        }

        var couponType = "";

        const checkForType = new AutoComplete({
            name: 'mode',
            message: 'Select The Points You Wish To Redeem'.cyan.bold,
            limit: 4,
            initial: 0,
            choices: [
                '500'.yellow.bold,
                '2000'.yellow.bold,
                '5000'.yellow.bold
            ]
        });
        await checkForType.run()
        .then(answer => {
            couponType = answer.strip;
            masterLog(secretKey)
            for(let i = 0; i < threads; i++) {
                runSlapperGame(couponType)
            }
        })
        .catch();

        async function runSlapperGame(couponType) {

            function random(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            const list = fs
                .readFileSync("./Storage/proxies.txt", "utf8")
                .split("\n")
                .filter(String);
            const raw = random(list);
            const splitproxy = raw.split(":");

            let encryptedPoints = "";
            let productLink = "";

            if(couponType == "500") {
                encryptedPoints = "U2FsdGVkX1+lgNqeXtP0MDjQLK8=";
                productLink = "gid://shopify/Product/6774877093939"
            } else if(couponType == "2000") {
                encryptedPoints = "U2FsdGVkX1+lgNqeXtP0MDjQLK8=";
                productLink = "gid://shopify/Product/6774124740659"
            } else {
                encryptedPoints = "U2FsdGVkX1+lgNqeXtP0MDjQLK8=";
                productLink = "gid://shopify/Product/6774111535155"
            }


            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://shopmrbeast.com/api/slapper',
                    headers : {
                        "Host": "shopmrbeast.com",
                        "Cookie": "",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0",
                        "Accept": "*/*",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Accept-Encoding": "gzip, deflate",
                        "Referer": "https://shopmrbeast.com/slap-to-win",
                        "Content-Type": "application/json",
                        "Content-Length": "95",
                        "Origin": "https://shopmrbeast.com",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin",
                        "Dnt": "1",
                    },
                    data: {
                        "score": encryptedPoints,
                        "redeemedItemId": productLink
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

                if(response.data.discountCode) {
                    console.log(`Successfully Generated Code: ${response.data.discountCode}`.green.bold);
                    await logFileCreds(response.data.discountCode, productLink, null);
                    setTimeout(() => {
                        return runSlapperGame(couponType);
                    }, 5000);
                } else {
                    console.log('TASK STATUS: '.bold + 'ERR GENERATING CODE'.red.bold);
                    setTimeout(() => {
                        return runSlapperGame(couponType);
                    }, 5000);
                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
                setTimeout(() => {
                    return runSlapperGame(couponType);
                }, 5000);
            }
        }

        async function masterLog(secretKey) {
    
            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);
    
            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);
    
            const embed = new MessageBuilder()
                .setTitle('🎁 Successfully Generated Coupon 🎁')
                .addField('Site', 'Shop Mr Beast', true)
                .addField('Mode', 'Requests', true)
                .setColor(webhookColor)
                .setThumbnail('https://art.pixilart.com/9283ec98a2aefdf.png')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();
    
            hook.send(embed);
    
        }

    }

    async function thronePharmaceutical(license, secretKey, hostHeader) {
        
        const threads = prompt("How many threads do you want to run: ".cyan.bold);

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

                const args = [
                    '--no-sandbox',
                    ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                    '--disable-accelerated-2d-canvas',
                    '--enable-automation',
                    '--disable-gpu',
                    '--disable-infobars',
                    '--disable-dev-shm-usage',
                    "--disable-blink-features",
                    '--disable-blink-features=AutomationControlled'
                ]

                const firstName = fakerator.names.firstName()
                const lastName = fakerator.names.firstName()
                const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
                const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`

                launchBrowser();
                async function launchBrowser() {
                    const browser = await puppeteer.launch({
                        headless: true,
                        ignoreHTTPSErrors: true,
                        args: args,
                        executablePath: chromePaths.chrome,
                        defaultViewport: null
                    });
                    try {
                        var [page] = await browser.pages();
                        await page.authenticate({
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        });
                        await page.goto('https://www.thorne.com/account/referrals', { waitUntil: 'networkidle2' });
                        await page.waitForSelector("input[name='email']");
                        console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                        await page.waitForTimeout(300);
                        console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD [1]'.yellow.bold);
                        await page.type("input[name='email']", '<RETRACTED>>', {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[name='password']", '<RETRACTED>', {delay: 25});
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + 'POSTING LOGIN'.yellow.bold);
                        await page.click("button[type='submit']", elem => elem.click());
                        await page.waitForTimeout(1000);
                        await page.waitForSelector("input[aria-labelledby='email']");
                        console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD [2]'.yellow.bold);
                        await page.waitForTimeout(300);
                        await page.type("input[aria-labelledby='email']", email, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[aria-labelledby='firstName']", firstName, {delay: 25});
                        await page.waitForTimeout(50);
                        await page.type("input[aria-labelledby='lastName']", lastName, {delay: 25});
                        await page.waitForTimeout(50);
                        console.log('TASK STATUS: '.bold + 'SUBMITTING CREDITS'.magenta.bold);
                        await page.click("button[type='submit']", elem => elem.click());
                        await page.waitForTimeout(7500);
                        if (await page.$("input[name='email']") !== null) {
                            console.log('TASK STATUS: '.bold + 'FAILED TO SUBMIT CREDITS'.red.bold);
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        } else {
                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY SUBMITTED CREDITS'.green.bold);
                            await browser.close();

                            const hook = new Webhook(credentials.discordWebhook);
                            const b_url = webhookIMG;
                            hook.setUsername('SplashAIO');
                            hook.setAvatar(b_url);
                        
                            const embed = new MessageBuilder()
                                .setTitle('💊 Coupon Sent To Email 💊')
                                .addField('Site', 'Thorne Pharmaceutical')
                                .addField('Email', '||' + email + '||', true)
                                .setColor(webhookColor)
                                .setThumbnail('https://www.commercialsearch.com/news/wp-content/uploads/sites/46/2017/10/thorne.jpg')
                                .setDescription('')
                                .setImage('')
                                .setFooter('SplashAIO', webhookIMG)
                                .setTimestamp();
                        
                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000);
                        }

                    } catch (e) {
                        console.log(e);
                        await browser.close();
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
                .setTitle('💊 Coupon Sent To Email 💊')
                .addField('Site', 'Thorne Pharmaceutical')
                .setColor(webhookColor)
                .setThumbnail('https://www.commercialsearch.com/news/wp-content/uploads/sites/46/2017/10/thorne.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            hook.send(embed);

        }
    }

    async function dotTrick(license, secretKey, hostHeader) {

        const emailList = fs
            .readFileSync("./Storage/emails.txt", "utf8")
            .split("\n")
            .filter(String);

        fs.writeFileSync("./Storage/trickedGmails.txt", "");
        fs.unlink("./Storage/trickedGmails.txt", (err) => {if (err) throw err;})
        for (let i = 0; i < emailList.length; i ++){
            let currentEmail = emailList[i];
            let prefix = currentEmail.split('@')[0];
            let domain = currentEmail.split('@')[1];
            if (domain == "gmail.com" && emailList.includes(currentEmail)){
                if (i == 0){
                    firstLine = true;
                } else{
                    firstLine = false;
                }
                trickEmail(prefix, firstLine);
            }
        }
        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JIGGED EMAILS'.green.bold);
        sendWebhookLog(secretKey);

        async function trickEmail(prefix, firstLine){
            if (firstLine){
                newEmail = prefix + "@gmail.com";
            } else{
                newEmail = "\n" + prefix + "@gmail.com";
            }
            fs.appendFileSync("./Storage/trickedGmails.txt", newEmail, "utf8");
            generate(prefix, 0);
        }

        function stringInsert($str,$pos){
            $str = $str.substring(0, $pos) + "." + $str.substring($pos);
            return $str;
        }

        function generate($var, $i){
            $length = $var.length;

            while ($i+1 < $length) {
                $i++;
                $new = stringInsert($var,$i);
                if ($new.substring($new.length - 1) != "." && $new.substring(0, 1) != "."){
                    let newEmail = "\n" + $new + "@gmail.com";
                    fs.appendFileSync("./Storage/trickedGmails.txt", newEmail, "utf8");
                }
                generate($new,$i+1);
            }
        }

        async function sendWebhookLog(secretKey) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)

            const hook = new Webhook(sharedHook);
            const hook2 = new Webhook(credentials.discordWebhook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            hook2.setUsername('SplashAIO');
            hook2.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('📧 Successfully J!gg@d Emails 📧')
                .addField('Site', 'DotTrick', true)
                .addField('Amount', JSON.stringify(emailList.length), true)
                .setColor(webhookColor)
                .setThumbnail('https://i.gadgets360cdn.com/large/gmail_logo_main_1625048464864.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();


            await hook.send(embed);
            await hook2.send(embed);
        }

    }

    async function proxyTester(license, secretKey, hostHeader) {

        const proxyList = fs
            .readFileSync("./Storage/proxies.txt", "utf8")
            .split("\n")
            .filter(String);

        const site = prompt('Site you want to test your proxies on (no input for Google): '.cyan.bold);

        for (let i = 0; i < proxyList.length; i++) {
            proxy = proxyList[i];
            let speed = await testProxy(proxy, site);
    
            if (speed == "Error") {
                console.log(proxy.red);
                console.log("Error, Bad Proxy\n".red);
            } else {
                console.log(proxy.green);
                console.log(`Good Proxy, Speed: ${speed}ms\n`.green);
            }
        }

        async function testProxy(proxy, site){
            if (!site.includes("https://") && !site == ""){
                site = "https://" + site;
            }
            var start = Date.now();
            let speed;
    
            const splitproxy = proxy.split(":");
    
            try {
                let res = await axios({
                    url: site ? site : "http://www.google.com",
                    method: "GET",
                    headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
                    },
                    timeout: 10000,
                    proxy: {
                        protocol: "https",
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                }).then(res => {
                    if (res.status == 200) {
                        speed = Date.now() - start;
                    }
                });
            } catch (err) {
            speed = "Error";
            }
    
            return speed;
        }

    }



}

runBot();