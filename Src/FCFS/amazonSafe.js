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

module.exports = {amazonSafe}