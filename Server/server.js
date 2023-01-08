const express = require('express')
const app = express();
const fs = require('fs');
const cheerio = require('cheerio');
const {
    getHWID
} = require("hwid");
const axios = require("axios-https-proxy-fix");
let port = process.env.PORT || 3000;
const pin = '2929';
const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node');
const { request } = require('http');
const e = require('express');
const qs = require('qs');
const splashAioLogo = "https://pbs.twimg.com/profile_images/1561249282652483584/Lx54N8es_400x400.jpg"
const webhookColor = '#1c48a8'
const dad = require('dad-tool');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var CryptoJS = require("crypto-js");
var Fakerator = require("fakerator");

var fakerator = Fakerator();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.post(`/encryptionAPI-${pin}`, (req, res) => {
    var requestParams = req.body
    const encryptionCredentials = JSON.parse(fs.readFileSync('./JSON/encryption.json', 'utf-8'));
    const licenseError = JSON.parse(fs.readFileSync('./JSON/licenseError.json', 'utf-8'));
    if (requestParams.license && requestParams.hwid && requestParams.node) {
        runEncryption();
        async function runEncryption() {
            const checkAuth = await getLicense(requestParams.license);
            if(checkAuth == null) {
                res.status(403).send({
                    "status": "403",
                    "message": "Error Invalid Auth"
                });
            } else { 

                let encryptBoolean = false;

                const authNodeList = fs
                    .readFileSync("./JSON/Analytics/authNode.txt", "utf-8")
                    .split("\n");

                for(var i = 0; i < authNodeList.length; i++) {
                    if(authNodeList[i] == requestParams.license + ':' + requestParams.hwid + ':' + requestParams.node) {
                        encryptBoolean = true;
                    }
                }

                if(encryptBoolean == true) {
                    const hook = new Webhook("");
                    hook.setUsername('SplashAIO Logs');
                    hook.setAvatar(splashAioLogo);
    
                    const embed = new MessageBuilder()
                        .setTitle('Decryption Logs')
                        .addField('Type', 'Decryption Key', true)
                        .addField('License', requestParams.license, true)
                        .setColor(webhookColor)
                        .setFooter('SplashAIO', splashAioLogo)
                        .setTimestamp();
    
                    hook.send(embed);
    
                    res.send(encryptionCredentials);

                } else {
                    const hook = new Webhook("");
                    hook.setUsername('SplashAIO Logs');
                    hook.setAvatar(splashAioLogo);
            
                    const embed = new MessageBuilder()
                        .setTitle('Security Logs')
                        .addField('Type', 'Error Verifying Token (Crack Attempt)', true)
                        .setColor(webhookColor)
                        .setFooter('SplashAIO', splashAioLogo)
                        .setTimestamp();
            
                    hook.send(embed);

                    res.send(licenseError);
                }
            }

        }
    } else {
        const hook = new Webhook("");
        hook.setUsername('SplashAIO Logs');
        hook.setAvatar(splashAioLogo);

        const embed = new MessageBuilder()
            .setTitle('Security Logs')
            .addField('Type', 'Decryption Key Failed (Crack Attempt)', true)
            .setColor(webhookColor)
            .setFooter('SplashAIO', splashAioLogo)
            .setTimestamp();

        hook.send(embed);

        res.send(licenseError)
    }
});

app.post(`/authAPI7-${pin}`, (req, res) => {
    var requestParams = req.body
    const errorMessage = JSON.parse(fs.readFileSync('./JSON/licenseError.json', 'utf-8'));
    if (requestParams.license && requestParams.hwid) {
        authCheck();
        async function authCheck() {
            //Defining bearer and license
            const API_KEY = ""
            const license = requestParams.license
            /*
            The first function will check if the licnese is valid. If the license is valid, 
            it will move tonext steps
            */
            async function getLicense() {
                try {
                    const response = await axios(
                        `https://api.hyper.co/v4/licenses/${license}`, {
                            headers: {
                                Authorization: `Bearer ${API_KEY}`
                            },
                        }
                    );
                    return response.data;
                } catch (e) {
                    return null;
                }
            }
            const hwid = requestParams.hwid
            /*
            Updating license metadata to bind hardware ID to the system. This will make
            sure that the user cannot activate the key on mulitple systems.
            */
            async function updateLicense() {
                try {
                    const hwid = requestParams.hwid
                    const response = await axios.patch(
                        `https://api.hyper.co/v4/licenses/${license}`, {
                            metadata: {
                                hwid
                            },
                        }, {
                            headers: {
                                Authorization: `Bearer ${API_KEY}`
                            },
                        }
                    );
                    return response.data;
                } catch (e) {
                    return null;
                }
            }
            // log("Checking license...");
            const licenseData = await getLicense(license);
            if (!licenseData) {
                res.send(errorMessage)
            } else if(licenseData.plan.name != "SplashAIO Renewal" && licenseData.plan.name != "SplashAIO Lifetime (Free)" && licenseData.plan.name != "SplashAIO Free Weekly") {
                res.send(errorMessage)
            } else if (!licenseData.user) {
                res.send(errorMessage)
            } else if (hwid === licenseData.metadata.hwid) {
                const nodeType = Math.random() * (9999999 - 1111111) + 1111111;
                let successJSON = {
                    "status": "success",
                    "data": {
                        "discordUser": licenseData.user.discord.username,
                        "node": JSON.stringify(nodeType)
                    }
                }
                successJSON = CryptoJS.AES.encrypt(JSON.stringify(successJSON), '').toString();
                const authNode = `${requestParams.license}:${requestParams.hwid}:${JSON.stringify(nodeType)}`
                const authNodeList = fs
                .readFileSync("./JSON/Analytics/authNode.txt", "utf8")
                var logger = fs.createWriteStream('./JSON/Analytics/authNode.txt', {
                  flags: 'a' 
                })
                if(authNodeList == ""){
                    logger.write(authNode)
                } else{
                    logger.write(`\n${authNode}`)
                }
                res.send(successJSON)
            } else if (Object.keys(licenseData.metadata.length === 0)) {
                if(licenseData.metadata.hwid == undefined) {
                    const resp = await updateLicense();
                    if(resp == null) {
                        res.send(errorMessage)
                    } else {
                        const nodeType = Math.random() * (9999999 - 1111111) + 1111111;
                        let successJSON = {
                            "status": "success",
                            "data": {
                                "discordUser": licenseData.user.discord.username,
                                "node": JSON.stringify(nodeType)
                            }
                        }
                        successJSON = CryptoJS.AES.encrypt(JSON.stringify(successJSON), '').toString();
                        const authNode = `${requestParams.license}:${requestParams.hwid}:${JSON.stringify(nodeType)}`
                        const authNodeList = fs
                        .readFileSync("./JSON/Analytics/authNode.txt", "utf8")
                        var logger = fs.createWriteStream('./JSON/Analytics/authNode.txt', {
                          flags: 'a' 
                        })
                        if(authNodeList == ""){
                            logger.write(authNode)
                        } else{
                            logger.write(`\n${authNode}`)
                        }
                        res.send(successJSON)
                    }
                } else {
                    res.send(errorMessage)
                }

            }
             else {
                res.send(errorMessage);
            }
        }
    } else {
        res.send(errorMessage);
    }
});

app.post(`/analyticsAPI-${pin}`, (req, res) => {
    var licenseKey = req.body.license;
    var typeData = req.body.type;
    const errorMessage = JSON.parse(fs.readFileSync('./JSON/licenseError.json', 'utf-8'));

    checkAnalytics();
    async function checkAnalytics() {

        const checkAuth = await getLicense(licenseKey);

        if(checkAuth == null) {
            res.status(403).send({
                "status": "403",
                "message": "Error Invalid Auth"
            });
        } else {

            if (licenseKey && typeData == "Add") {
                
                const analyticsAPI = fs
                    .readFileSync(`./JSON/Analytics/main.txt`, "utf8")

                fs.writeFileSync(`./JSON/Analytics/main.txt`, JSON.stringify(JSON.parse(analyticsAPI) + 1));
                res.send({
                    "status": "success",
                    "data": JSON.stringify(JSON.parse(analyticsAPI) + 1)
                });
            } else if (typeData == "Log") {
                const analyticsAPI = fs
                    .readFileSync(`./JSON/Analytics/main.txt`, "utf8")

                res.send({
                    "status": "success",
                    "data": analyticsAPI
                });
            } else {
                const hook = new Webhook("");

                hook.setUsername('SplashAIO Logs');
                hook.setAvatar(splashAioLogo);

                const embed = new MessageBuilder()
                    .setTitle('Security Logs')
                    .addField('Type', 'Analytics Failed (Crack Attempt)', true)
                    .setColor(webhookColor)
                    .setFooter('SplashAIO', splashAioLogo)
                    .setTimestamp();

                hook.send(embed);
                res.send(errorMessage);
            }
        }
    }
});

app.post(`/captchaAI-${pin}`, (req, res) => {   
    solveCaptcha();
    async function solveCaptcha() {
        const errorMessage = JSON.parse(fs.readFileSync('./JSON/licenseError.json', 'utf-8'));
        const apiKey = req.body.api
        const captchaType = req.body.type
        const siteKey = req.body.siteKey
        const websiteUrl = req.body.websiteUrl

        if (req.body.license && req.body.api && req.body.type && req.body.siteKey && req.body.websiteUrl) {

            async function checkBalance() {
                try {
                    // Send a GET request
                    const response = await axios({
                        method: 'POST',
                        url: `https://api.captchaai.io/getBalance`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            clientKey: apiKey
                        }
                    });
                    if (response.data.data.balance > 0) {

                    } else {
                        res.send({
                            "status": "error",
                            "data": "Insufficient funds"
                        })
                    }
                } catch (e) {
                    setTimeout(() => {
                        return checkBalance();
                    }, 5000);
                }
            }

            async function solveCaptcha() {
                try {
                    // Send a GET request
                    const response = await axios({
                        method: 'POST',
                        url: `https://api.captchaai.io/createTask`,
                        headers: {
                            'Host': 'api.captchaai.io',
                            'Content-Type': 'application/json'
                        },
                        data: {
                            "clientKey":apiKey,
                            "task":{
                                "type": captchaType,
                                "websiteURL":websiteUrl,
                                "websiteKey":siteKey
                            },
                        }
                    });
                    if (response.data.taskId) {
                        const captchaId = response.data.taskId;
                        await checkForSolve(captchaId);
                    } else {
                        setTimeout(() => {
                            return solveCaptcha();
                        }, 5000);
                    }
                } catch (e) {
                    setTimeout(() => {
                        return solveCaptcha();
                    }, 5000);
                }
            }

            async function checkForSolve(captchaId) {
                try {
                    // Send a GET request
                    const response = await axios({
                        method: 'POST',
                        url: `https://api.captchaai.io/getTaskResult`,
                        headers: {
                            'Host': 'api.captchaai.io',
                            'Content-Type': 'application/json'
                        },
                        data: {
                            "clientKey":apiKey,
                            "taskId": captchaId
                        }
                    });
                    if (response.data.status == "ready") {
                        res.send({
                            "status": "success",
                            "data": response.data.solution.gRecaptchaResponse
                        })
                    } else if(response.data.status == "processing") {
                        setTimeout(() => {
                            return checkForSolve(captchaId);
                        }, 5000);
                    } else {
                        setTimeout(() => {
                            return checkForSolve(captchaId);
                        }, 5000);
                    }
                } catch (e) {
                    setTimeout(() => {
                        return checkForSolve(captchaId);
                    }, 5000);

                }
            }
            await checkBalance();
            await solveCaptcha();
        } else {
            res.send(errorMessage);
        }
    }
});

app.post(`/clipKey-${pin}`, (req, res) => {
    var requestBody = req.body;
    clipKey();
    async function clipKey() {
        const errorMessage = JSON.parse(fs.readFileSync('./JSON/licenseError.json', 'utf-8'));
        if (requestBody.license) {
            try {
                const response = await axios({
                    method: 'DELETE',
                    url: `https://api.hyper.co/v6/licenses/${requestBody.license}`,
                    headers: {
                        Authorization: 'Bearer'
                    }
                });
                if (response.status == 202) {
                    res.send({
                        "status": "success",
                        "data": "License Deleted"
                    })
                } else {
                    res.send({
                        "status": "error",
                        "data": "License Not Deleted"
                    })
                }
            } catch (e) {
                res.send({
                    "status": "error",
                    "data": "API Key Not Found"
                })
            }

        } else {
            const hook = new Webhook("");

            hook.setUsername('SplashAIO Logs');
            hook.setAvatar(splashAioLogo);

            const embed = new MessageBuilder()
                .setTitle('Security Logs')
                .addField('Type', 'Key Clipper (Crack Attempt)', true)
                .setColor(webhookColor)
                .setFooter('SplashAIO', splashAioLogo)
                .setTimestamp();

            await hook.send(embed);
            res.send(errorMessage);
        }
    }

});

app.post(`/incapsulaAPI-${pin}`, (req, res) => {

    var requestBody = req.body;

        if(requestBody.license && requestBody.site && requestBody.proxy) {

        launchBrowser();
        async function launchBrowser() {

            const raw = requestBody.proxy
            const splitproxy = raw.split(":");

            const checkAuth = await getLicense(requestBody.license);
            if(checkAuth == null) {
                res.status(403).send({
                    "status": "403",
                    "message": "Error Invalid Auth"
                });
            } else { 
                const browser = await puppeteer.launch({
                    headless: true,
                    args: [
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
                });
                try {
                    var [page] = await browser.pages();       
                    await page.authenticate({
                        username: splitproxy[2],
                        password: splitproxy[3].replace('\r', '')
                    });         
                    await page.goto(requestBody.site);
                    await page.waitForTimeout(1000);   
                    if(await page.url().includes(requestBody.site)) {      
                        var cookies = await page.cookies();   
                        var cookieRes = "";
                        for(var i = 0; i < cookies.length; i++) {
                            if(cookies[i].name == "reese84" || cookies[i].name  == "nlbi_1990269_2147483392") {
                                cookieRes = cookieRes + cookies[i].name + "=" + cookies[i].value + "; ";
                            }
                        }  
                        await browser.close();    
                        res.send({
                            "status": "200",
                            "cookies": cookieRes
                        })
                    } else {
                        await browser.close();
                        res.status(400).send({
                            "status": "400",
                            "message": "Error Incapsula Error"
                        });
                    }
                } catch (e) {
                    await browser.close();

                    const hook = new Webhook("");

                    hook.setUsername('SplashAIO Logs');
                    hook.setAvatar(splashAioLogo);
            
                    const embed = new MessageBuilder()
                        .setTitle('Incapsula Error Log')
                        .addField('Type', 'Incapsula Failed (Browser Error)', true)
                        .addField('Error', e)
                        .setColor(webhookColor)
                        .setFooter('SplashAIO', splashAioLogo)
                        .setTimestamp();
            
                    hook.send(embed);

                    res.status(400).send({
                        "status": "400",
                        "message": e
                    });
                }
            }

        } 

    } else {
        const hook = new Webhook("");

        hook.setUsername('SplashAIO Logs');
        hook.setAvatar(splashAioLogo);

        const embed = new MessageBuilder()
            .setTitle('Security Logs')
            .addField('Type', 'Incapsula Failed (Crack Attempt)', true)
            .setColor(webhookColor)
            .setFooter('SplashAIO', splashAioLogo)
            .setTimestamp();

        hook.send(embed);
        res.send({
            "status": "error",
            "data": "Invalid License"
        });
    }
});

app.get(`/dadtool-${pin}`, (req, res) => {
    
    const state = ["US_AZ", "US_CA", "US_ID", "US_KS", "US_NV", "US_NY", "US_OR", "US_TX", "US_UT", "US_WA"];
    const stateWord = ["Arizona", "California", "Idaho", "Kansas", "Nevada", "New York", "Oregon", "Texas", "Utah", "Washington"];
    var number = Math.floor(Math.random() * 10);
    var address = dad.random(state[number]);
    res.send(address);
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    //Listening
});

async function getLicense(license) {
    try {
        const response = await axios(
            `https://api.hyper.co/v4/licenses/${license}`, {
                headers: {
                    Authorization: `Bearer`
                },
            }
        );
        return response.data;
    } catch (e) {
        return null;
    }
}