const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function starbucksDrink(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);

    runOfficial();
    async function runOfficial() {

        for (let i = 0; i < threads; i++) {

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
            const d3 = d1 + 7
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"

            launchBrowser();
            async function launchBrowser() {
                const browser = await puppeteer.launch({
                    headless: false,
                    ignoreHTTPSErrors: true,
                    args: args,
                    ignoreDefaultArgs: ["--enable-automation"],
                    executablePath: chromePaths.chrome,
                    defaultViewport: null
                });
                try {
                    var [page] = await browser.pages();
                    await page.authenticate({
                        username: splitproxy[2],
                        password: splitproxy[3].replace('\r', '')
                    });
                    const cursor = createCursor(page);
                    await page.goto('https://www.starbucks.com/account/create');
                    console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                    console.log('TASK STATUS: '.bold + 'GENERATING SHAPE HEADERS'.magenta.bold);
                    await page.waitForSelector('#truste-consent-button');
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await cursor.click('#truste-consent-button')
                    await page.waitForSelector('#firstName');
                    console.log('TASK STATUS: '.bold + 'FILLING OUT FORM'.yellow.bold);
                    await cursor.click('#firstName');
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await page.keyboard.type(firstName, {
                        delay: Math.floor(Math.random() * 30) + 20
                    });
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await cursor.click("#lastName");
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await page.keyboard.type(lastName, {
                        delay: Math.floor(Math.random() * 30) + 20
                    });
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await cursor.click("#emailAddress");
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await page.keyboard.type(email, {
                        delay: Math.floor(Math.random() * 30) + 20
                    });
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await cursor.click("#password");
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    await page.keyboard.type(password, {
                        delay: Math.floor(Math.random() * 30) + 20
                    });
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    console.log('TASK STATUS: '.bold + "BYPASSING LINK DETERRENT".cyan.bold);
                    await page.evaluate(`
                        () => {
                        let dom = document.querySelector("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div:nth-child(5) > div:nth-child(2) > label > span > span.option__labelText > a:nth-child(1) > span:nth-child(1)")
                        dom.innerHTML = ""
                        let dom2 = document.querySelector("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div:nth-child(5) > div:nth-child(2) > label > span > span.option__labelText > a:nth-child(2) > span.sb-external-link--text")
                        dom2.innerHTML = ""
                        }`
                    );
                    await cursor.click("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div:nth-child(5) > div:nth-child(2) > label > span > span.flex-shrink-none > span");
                    await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                    for(var k = 0; k < 2; k++) {
                        await cursor.click("#content > div.sb-contentColumn.sb-global-gutters.mx-auto.sb-contentColumn--medium.column___3NIYn.mb7.sb-animator-fade-appear-done.sb-animator-fade-enter-done > div > div > form > div > div.flex.justify-end.mt6 > button");
                    }
                    console.log('TASK STATUS: '.bold + "POSTING ACCOUNT DATA".yellow.bold);
                    await page.waitForTimeout(Math.floor(Math.random() * 6250) + 6000);
                    if (await page.$("#firstName") !== null) {
                        console.log("TASK STATUS: ".bold + "ERROR SHAPE BAN".red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    } else {
                        console.log("TASK STATUS: ".bold + "ACCOUNT CREATED".green.bold);
                        await page.waitForTimeout(Math.floor(Math.random() * 700) + 500);
                        await page.goto('https://app.starbucks.com/account/personal', {
                            waitUntil: 'networkidle2'
                        });
                        await page.waitForSelector('#addressLine1');
                        console.log('TASK STATUS: '.bold + "GENERATING COUPON".cyan.bold);
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click("#addressLine1");
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type(fakerator.address.street(), {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        console.log('TASK STATUS: '.bold + "SETTING COUPON DATA".yellow.bold);
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click('#city');
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type('New York City', {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click('#countrySubdivision');
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type('New Y', {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await cursor.click('#postalCode');
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.type('10001', {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.type('#birthMonth', credentials.ihopmonth, {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.keyboard.press('Enter');
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        await page.type('#birthDay', JSON.stringify(d3), {
                            delay: Math.floor(Math.random() * 30) + 20
                        });
                        await page.waitForTimeout(Math.floor(Math.random() * 70) + 50);
                        console.log('TASK STATUS: '.bold + "POSTING COUPON DATA".yellow.bold);
                        for(var j = 0; j < 2; j++) {
                            await cursor.click('#content > div.sb-contentCrate.passOnFullHeight___3zGAo > div > div > form > div.invisible.sb-global-gutters.py3.lg-py5.base___3dWsJ > div > div > div > button');
                        }
                        var i = 0
                        checkForNoti();
                        async function checkForNoti() {
                            while (i < 10) {
                                if (await page.$("#notifications-target > div:nth-child(2) > div:nth-child(1) > div > div > div") !== null) {
                                    i = 100000000;
                                    console.log("TASK STATUS: ".bold + "SUCCESSFULLY GENERATED COUPON".green.bold);
                                    await browser.close();

                                    const hook = new Webhook(credentials.discordWebhook);
                                    const b_url = webhookIMG;

                                    hook.setUsername('SplashAIO');
                                    hook.setAvatar(b_url);

                                    const embed = new MessageBuilder()
                                        .setTitle('☕ Successfully Generated Coupon ☕')
                                        .addField('Site', 'Starbucks', true)
                                        .addField('Mode', 'Hybrid', true)
                                        .addField('Email', '||' + email + '||')
                                        .addField('Password', '||' + password + '||', true)
                                        .addField('Format', '||' + email + ':' + password + '||')
                                        .setColor(webhookColor)
                                        .setThumbnail('https://securecdn.pymnts.com/wp-content/uploads/2022/02/starbucks.jpg')
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
                                    await page.waitForTimeout(550);
                                    i++;
                                }
                            }
                            if (i == 100000000) {} else {
                                console.log('TASK STATUS: '.bold + "FAILED TO CREATE A COUPON".red.bold);
                                await browser.close();
                                setTimeout(() => {
                                    return runOfficial();
                                }, 5000);
                            }
                        }
                    }
                    //#notifications-target > div:nth-child(2) > div:nth-child(1) > div > div > div
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
            .setTitle('☕ Successfully Generated Coupon ☕')
            .addField('Site', 'Starbucks', true)
            .addField('Mode', 'Hybrid', true)
            .setColor(webhookColor)
            .setThumbnail('https://securecdn.pymnts.com/wp-content/uploads/2022/02/starbucks.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }
}

module.exports = {starbucksDrink}