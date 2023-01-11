const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

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
                    await page.type("input[name='email']", '<RETRACTED>', {delay: 25});
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

module.exports = {thronePharmaceutical}