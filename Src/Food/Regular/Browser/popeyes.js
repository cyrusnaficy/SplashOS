const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function popeyes(license, secretKey, hostHeader) {


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

            const listz = fs
                .readFileSync("./Storage/emails.txt", "utf8")
                .split("\n")
                .filter(String);

            const firstName = fakerator.names.firstName()
            const lastName = fakerator.names.firstName()
            const d1 = new Date().getDate();
            const d3 = d1 + 1
            const email = random(listz);
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
            launchBrowser();
            async function launchBrowser() {
                const browser = await puppeteer.launch({
                    headless: true,
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
                    await page.goto('https://www.popeyes.com/signup', {
                        waitUntil: 'networkidle2'
                    });
                    await page.waitForSelector("input[aria-label='Name']");
                    console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                    await page.waitForTimeout(1000);
                    await page.type("input[aria-label='Name']", firstName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[aria-label='Email Address']", email, {
                        delay: 25
                    });
                    console.log("TASK STATUS: ".bold + "BYPASSING LINK DETERRENT".cyan.bold);
                    await page.waitForTimeout(50);
                    await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#label-17 > p > span > a:nth-child(1)");
                            dom.class = ""
                            let doma = document.querySelector("#label-17 > p > span > a:nth-child(2)")
                            doma.class = ""
                            let domb = document.querySelector("#label-17 > p > span > a:nth-child(3)")
                            domb.class = ""
                            }`);
                    await page.waitForTimeout(50);
                    await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#label-17 > p > span > a:nth-child(1)");
                            dom.innerHTML = ""
                            let doma = document.querySelector("#label-17 > p > span > a:nth-child(2)")
                            doma.innerHTML = ""
                            let domb = document.querySelector("#label-17 > p > span > a:nth-child(3)")
                            domb.innerHTML = ""
                            }`);
                    await page.waitForTimeout(50);
                    await page.click("div[id='label-17']", elem => elem.click());
                    await page.waitForTimeout(50);
                    console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                    await page.click("button[class='build__BaseButton1-b7zorw-15 hCwQsj']", elem => elem.click());
                    await page.waitForTimeout(7500);
                    if (await page.$("input[aria-label='Email Address']") !== null) {
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    } else {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);
                        await browser.close();

                        const hook = new Webhook(credentials.discordWebhook);
                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🐔 Successfully Generated 🐔')
                            .addField('Site', 'Popeyes')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.meatpoultry.com/ext/resources/MPImages/03-2021/031521/PopeyesMeal_Lead.jpg?t=1616159150&width=1080')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await logFileCreds(email, password, null);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }


                } catch (e) {
                    console.log('TASK STATUS: '.bold + 'ERR SENDING HTTP REQUEST'.red.bold);
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
                .setTitle('🐔 Successfully Generated 🐔')
                .addField('Site', 'Popeyes')
                .setColor(webhookColor)
                .setThumbnail('https://www.meatpoultry.com/ext/resources/MPImages/03-2021/031521/PopeyesMeal_Lead.jpg?t=1616159150&width=1080')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }

}

module.exports = {popeyes}