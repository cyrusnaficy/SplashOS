const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function krispyKremeBrowser(license, secretKey, hostHeader) {

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
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "!"
            const d1 = new Date().getDate();
            const d3 = d1 + 1

            launchBrowser();
            async function launchBrowser() {
                const browser = await puppeteer.launch({
                    headless: false,
                    ignoreHTTPSErrors: true,
                    args: args,
                    ignoreDefaultArgs: ["--enable-automation"],
                    executablePath: chromePaths.chrome
                });
                try {
                    var [page] = await browser.pages();
                    await page.authenticate({
                        username: splitproxy[2],
                        password: splitproxy[3].replace('\r', '')
                    });
                    await page.goto('https://www.krispykreme.com/account/create-account', {
                        waitUntil: 'networkidle2'
                    });
                    await page.waitForSelector("input[name='ctl00$plcMain$txtFirstName']");
                    console.log("TASK STATUS: ".bold + "SUCCESSFULLY LAUNCHED BROWSER".yellow.bold);
                    await page.type("input[name='ctl00$plcMain$txtFirstName']", firstName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    console.log("TASK STATUS: ".bold + "INJECTING PAYLOAD".yellow.bold);
                    await page.type("input[name='ctl00$plcMain$txtLastName']", lastName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type('#ctl00_plcMain_ddlBirthdayMM', credentials.kkmonth, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(50);
                    if (d3 == 1 || d3 == 2 || d3 == 3 || d3 == 4 || d3 == 5 || d3 == 6 || d3 == 7 || d3 == 8 || d3 == 9) {
                        await page.type("select[name='ctl00$plcMain$ddlBirthdayDD']", `0${JSON.stringify(d3)}`, {
                            delay: 25
                        });
                    } else {
                        await page.type("select[name='ctl00$plcMain$ddlBirthdayDD']", JSON.stringify(d3), {
                            delay: 25
                        });
                    }
                    await page.waitForTimeout(50);
                    await page.type("input[name='ctl00$plcMain$txtZipCode']", credentials.zip, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[name='ctl00$plcMain$ucPhoneNumber$txt1st']", JSON.stringify(fakerator.date.age(111, 999), {
                        delay: 25
                    }));
                    await page.waitForTimeout(50);
                    await page.type("input[name='ctl00$plcMain$ucPhoneNumber$txt2nd']", JSON.stringify(fakerator.date.age(111, 999), {
                        delay: 25
                    }));
                    await page.waitForTimeout(50);
                    await page.type("input[name='ctl00$plcMain$ucPhoneNumber$txt3rd']", JSON.stringify(fakerator.date.age(1111, 9999), {
                        delay: 25
                    }));
                    await page.waitForTimeout(50);
                    await page.type("input[name='ctl00$plcMain$txtEmail']", email, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[name='ctl00$plcMain$txtPassword']", password, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[name='ctl00$plcMain$confirmPasswordTxt']", password, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    console.log("TASK STATUS: ".bold + "BYPASSING LINK DETERRENT".cyan.bold);
                    await page.evaluate(`
                            () => {
                            let dom = document.querySelector("#main > section > div > div.form-section > div:nth-child(9) > label > a")
                            dom.href = ""
                            dom.innerHTML = ""
                            }
                        `);
                    await page.waitForTimeout(50);
                    await page.click("input[id='ctl00_plcMain_cbTermsOfUse']", elem => elem.click());
                    console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
                    try {
                        await page.solveRecaptchas();
                    } catch (e) {
                        console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "CAPTCHA REQUEST FAILED".red.bold);
                    }
                    console.log("REQUESTING CAPTCHA STATUS: ".bold + "SOLVED CAPTCHA".green.bold);
                    await page.waitForTimeout(50);
                    await page.waitForSelector("input[name='ctl00$plcMain$btnSubmit']");
                    await page.waitForTimeout(50);
                    await page.click("input[name='ctl00$plcMain$btnSubmit']", elem => elem.click());
                    await page.waitForTimeout(20000);
                    if (await page.$("input[name='ctl00$plcMain$txtEmail']") !== null) {
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
                            .setTitle('🍩 Successfully Generated 🍩')
                            .addField('Site', 'Krispy Kreme')
                            .addField('Mode', 'Browser')
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await logFileCreds(email, password, null);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
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
            .setTitle('🍩 Successfully Generated 🍩')
            .addField('Site', 'Krispy Kreme', true)
            .addField('Mode', 'Browser', true)
            .setColor(webhookColor)
            .setThumbnail('https://www.bakemag.com/ext/resources/images/2020/12/KrispyKreme_GlazedDozen.jpg?t=1609258989&width=1080')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();

        hook.send(embed);

    }
}

module.exports = {krispyKremeBrowser}