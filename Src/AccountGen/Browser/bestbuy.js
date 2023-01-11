const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function bestBuy(license, secretKey, hostHeader) {

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
                    headless: false,
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
                    await page.goto('https://www.bestbuy.com/identity/global/createAccount', {
                        waitUntil: 'networkidle2'
                    });
                    await page.waitForSelector('#firstName');
                    console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                    await page.type('#firstName', firstName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                    await page.type('#lastName', lastName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type('#email', email, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='fld-p1']", password, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='reenterPassword']", password, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type('#phone', JSON.stringify(fakerator.date.age(1111111111, 9999999999)), {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    console.log("TASK STATUS: ".bold + "BYPASSING TMX".cyan.bold);
                    /* await page.deleteCookie({
                         name : "ZPLANK",
                         domain : ".bestbuy.com"
                     })
                     await page.waitForTimeout(50);
                     const cookies = [
                         {name: 'zplank', value: '', domain: '.bestbuy.com'},
                     ];
                     await page.setCookie(...cookies);
                     */
                    await page.waitForTimeout(50);
                    console.log("TASK STATUS: ".bold + "SUBMITTING FORM".yellow.bold);
                    await page.click("button[class='c-button c-button-secondary c-button-lg c-button-block c-button-icon c-button-icon-leading cia-form__controls__submit ']");
                    await page.waitForTimeout(7500);

                    if (await page.$('#firstName') !== null) {
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
                            .setTitle('🎮 Successfully Generated 🎮')
                            .addField('Site', 'BestBuy')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + ':' + raw + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F211123135412-best-buy-store-stock.jpg')
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
                    console.log('TASK STATUS: '.red.bold + 'ERROR DURING GEN PROCESS'.red.bold);
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
            .setTitle('🎮 Successfully Generated 🎮')
            .addField('Site', 'BestBuy', true)
            .addField('Mode', 'TMX-Bypass', true)
            .setColor(webhookColor)
            .setThumbnail('https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F211123135412-best-buy-store-stock.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);

    }

}

module.exports = {bestBuy}