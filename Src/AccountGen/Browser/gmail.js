const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

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

module.exports = {gmail}