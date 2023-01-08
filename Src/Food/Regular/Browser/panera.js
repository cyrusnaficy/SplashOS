const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function paneraBread(license, secretKey, hostHeader) {

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
                    await page.goto('https://www.panerabread.com/en-us/mypanera/sign-up-with-mypanera.html?intcmp=hero-con-a-meet-mypanera&overlay=sign-in', {
                        waitUntil: 'networkidle2'
                    });
                    await page.waitForSelector("button[aria-label='Click or tap to sign up for My Panera with an e-mail address.']");
                    console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                    await page.waitForTimeout(50);
                    await page.click("button[aria-label='Click or tap to sign up for My Panera with an e-mail address.']", elem => elem.click());
                    console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                    await page.waitForTimeout(50);
                    await page.waitForSelector("input[id='firstName']");
                    await page.type("input[id='firstName']", firstName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='lastName']", lastName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='phone']", JSON.stringify(fakerator.date.age(1111111111, 99999999999)), {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='email']", email, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[id='password']", password, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    if (JSON.stringify(d3) == '1' || JSON.stringify(d3) == '2' || JSON.stringify(d3) == '3' || JSON.stringify(d3) == '4' || JSON.stringify(d3) == '5' || JSON.stringify(d3) == '6' || JSON.stringify(d3) == '7' || JSON.stringify(d3) == '8' || JSON.stringify(d3) == '9') {
                        await page.type("input[id='birthday']", `${credentials.kkmonth}0${JSON.stringify(d3)}`, {
                            delay: 25
                        });
                    } else {
                        await page.type("input[id='birthday']", `${credentials.kkmonth}${JSON.stringify(d3)}`, {
                            delay: 25
                        });
                    }
                    await page.waitForTimeout(50);
                    console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                    await page.click("button[type='submit']", elem => elem.click());
                    await page.waitForTimeout(5000);
                    if (await page.$("input[id='birthday']") !== null) {
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                        await browser.close();
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
                            .setTitle('🍞 Successfully Generated 🍞')
                            .addField('Site', 'Panera Bread')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJj9IXYWsquyQz9pkRLrYOm-wn7nAtbXEa-A&usqp=CAU')
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
                .setTitle('🍞 Successfully Generated 🍞')
                .addField('Site', 'Panera Bread')
                .setColor(webhookColor)
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJj9IXYWsquyQz9pkRLrYOm-wn7nAtbXEa-A&usqp=CAU')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }

}

module.exports = {paneraBread}