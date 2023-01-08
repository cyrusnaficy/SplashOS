const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

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

module.exports = {longhornSteakhouse}