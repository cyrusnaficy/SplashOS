const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function iHopPancakes(license, secretKey, hostHeader) {

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
            const password = fakerator.random.string(8) + JSON.stringify(fakerator.date.age(111, 999)) + "A!"
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
                    await page.goto(`https://www.ihop.com/en/accounts/register`, {
                        waitUntil: 'networkidle2'
                    });
                    await page.waitForSelector("input[id='regEmail']");
                    console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                    await page.waitForTimeout(50);
                    await page.type("input[id='regEmail']", email, {
                        delay: 25
                    });
                    console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                    await page.waitForTimeout(50);
                    await page.type("input[id='regCreatePwd']", password, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='regFirstName']", firstName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='regLastName']", lastName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='regZip']", credentials.zip, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.click('#regLocations', elem => elem.click());
                    await page.waitForTimeout(250);
                    await page.keyboard.type('i', {
                        delay: 25
                    });
                    await page.waitForTimeout(250);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(50);
                    console.log('TASK STATUS: '.bold + 'BYPASSING RECAPTCHA'.cyan.bold);
                    //No payload
                    if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                        await page.type("input[id='regBirthday']", `${credentials.kkmonth}/0${d3}/1999`, {
                            delay: 25
                        });
                    } else {
                        await page.type("input[id='regBirthday']", `${credentials.kkmonth}/${d3}/1999`, {
                            delay: 25
                        });
                    }
                    await page.waitForTimeout(50);
                    await page.evaluate(`
                            () => {
                            let elements = document.getElementsByClassName('terms-label');
                            for (let element of elements)
                                element.click();
                            }
                        `);
                    await page.waitForTimeout(50);
                    console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                    await page.click("button[class='btn btn-lg w-100 sign-up']", elem => elem.click());
                    await page.waitForTimeout(15000);
                    if (await page.$("input[id='regCreatePwd']") !== null) {
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
                            .setTitle('🥞 Successfully Generated 🥞')
                            .addField('Site', 'iHop')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.nrn.com/sites/nrn.com/files/IHOP-storefront_0.jpg')
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
                .setTitle('🥞 Successfully Generated 🥞')
                .addField('Site', 'iHop')
                .setColor(webhookColor)
                .setThumbnail('https://www.nrn.com/sites/nrn.com/files/IHOP-storefront_0.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }
}