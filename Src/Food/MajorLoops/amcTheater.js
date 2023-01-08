const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function amcTheaters(license, secretKey, hostHeader) {
        
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
                    await page.goto(`https://www.amctheatres.com/amcstubs/insider?modalName=InsiderSignUpModal&stockholders_loy_stockholders_hero`, {
                        waitUntil: 'networkidle2'
                    });
                    await page.waitForSelector('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(2) > div > div > input[type=email]');
                    console.log('TASK STATUS: '.bold + "LOADED BROWSER".yellow.bold);
                    await page.waitForTimeout(500);
                    await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(2) > div > div > input[type=email]', email, {delay: 25});
                    await page.waitForTimeout(50);
                    console.log('TASK STATUS: '.bold + "INJECTING PAYLOAD".yellow.bold);
                    await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div > input[type=text]', firstName, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div > input[type=text]', lastName, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.click('#birthdate-month');
                    await page.waitForTimeout(50);
                    await page.type('#birthdate-month', credentials.ihopmonth, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(50);
                    await page.click('#birthdate-day');
                    await page.waitForTimeout(50);
                    await page.type('#birthdate-day', JSON.stringify(d3), {delay: 25});
                    await page.waitForTimeout(50);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(50);
                    await page.click('#birthdate-year');
                    await page.waitForTimeout(50);
                    await page.type('#birthdate-year', '1999', {delay: 25});
                    await page.waitForTimeout(50);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(50);
                    var password = fakerator.random.string(6)+ "!2C";
                    await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(4) > div > input[type=password]', password, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.type('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(5) > div > div:nth-child(2) > div > div:nth-child(1) > div > div > input[type=text]', '10001', {delay: 25});
                    await page.waitForTimeout(50);
                    await page.click("i[aria-label='Submit Search']");
                    await page.waitForTimeout(50);
                    await page.waitForSelector("label[class='theatre-result radio-masking']");
                    await page.waitForTimeout(50);
                    await page.click("label[class='theatre-result radio-masking']");
                    await page.waitForTimeout(50);
                    await page.waitForSelector('#accept-stubs-terms-and-conditions');
                    await page.waitForTimeout(500);
                    await page.click('#accept-stubs-terms-and-conditions');
                    await page.waitForTimeout(50);
                    await page.click("button[type='submit']");
                    await page.waitForTimeout(10000);
                    if (await page.$('#modal-body > div.Modal-BodyWrapper > div > div > div > div > div:nth-child(2) > div > div > form > div:nth-child(2) > div > div:nth-child(2) > div > div > input[type=email]') !== null) {
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
                            .setTitle('🎥 Successfully Generated 🎥')
                            .addField('Site', 'AMC')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://deadline.com/wp-content/uploads/2019/05/amc.jpg') 
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
                .setTitle('🎥 Successfully Generated 🎥')
                .addField('Site', 'AMC')
                .setColor(webhookColor)
                .setThumbnail('https://deadline.com/wp-content/uploads/2019/05/amc.jpg') 
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }
}

module.exports = {amcTheaters}