const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

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

module.exports = [redLobster]