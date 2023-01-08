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
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

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

module.exports = {adafruit}