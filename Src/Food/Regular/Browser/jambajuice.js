const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

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

module.exports = {jambaJuice}