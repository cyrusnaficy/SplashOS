const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

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