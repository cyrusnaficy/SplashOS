const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();


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