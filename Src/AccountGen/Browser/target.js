const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function target(license, secretKey, hostHeader) {

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

            let userAgents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.51',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 Edg/90.0.818.42',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.37',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Edg/91.0.864.48',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.100.0',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4456.0 Safari/537.36 Edg/91.0.845.2',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4544.0 Safari/537.36 Edg/93.0.933.1',
                'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
            ];

            userAgents = userAgents[Math.floor(Math.random() * userAgents.length)]

            const args = [
                '--no-sandbox',
                ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                `--user-agent="${userAgents}"`,
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
                    const cursor = createCursor(page);
                    await page.goto('https://www.target.com/', {
                        waitUntil: 'networkidle2'
                    });
                    await page.setExtraHTTPHeaders({
                        'Accept-Language': 'en'
                    });
                    await page.waitForSelector('#headerPrimary > a.styles__PrimaryHeaderLink-sc-srf2ow-1.styles__StyledLinkNamedIcon-sc-u2k6h-1.elbitu.daQAhe');
                    console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                    await page.waitForTimeout(fakerator.date.age(400, 500));
                    await cursor.click('#headerPrimary > a.styles__PrimaryHeaderLink-sc-srf2ow-1.styles__StyledLinkNamedIcon-sc-u2k6h-1.elbitu.daQAhe');
                    await page.waitForSelector('#listaccountNav-createAccount > a');
                    await page.waitForTimeout(fakerator.date.age(400, 500));
                    await cursor.click('#listaccountNav-createAccount > a');
                    await page.waitForSelector("input[id='username']");
                    console.log('TASK STATUS: '.bold + 'GENERATING COOKIES'.yellow.bold);
                    await page.waitForTimeout(fakerator.date.age(400, 500));
                    await cursor.click("input[id='username']");
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                    await page.keyboard.type(email, {
                        delay: fakerator.date.age(25, 90)
                    });
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    await cursor.click("input[id='firstname']");
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    await page.keyboard.type(firstName, {
                        delay: fakerator.date.age(25, 90)
                    });
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    await cursor.click("input[id='lastname']");
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    await page.keyboard.type(lastName, {
                        delay: fakerator.date.age(25, 90)
                    });
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    await cursor.click("input[id='password']");
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    await page.keyboard.type(password, {
                        delay: fakerator.date.age(25, 90)
                    });
                    await page.waitForTimeout(fakerator.date.age(25, 90));
                    console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                    await cursor.click("button[id='createAccount']");
                    await page.waitForTimeout(fakerator.date.age(4000, 5500));
                    if (await page.$("button[id='circle-join-free']") !== null) {
                        await page.click("button[id='circle-join-free']", elem => elem.click());
                    } else {
                        console.log("TASK STATUS: ".bold + "ERROR SHAPE BAN".red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }
                    await page.waitForTimeout(fakerator.date.age(6700, 8000));
                    if (await page.url().includes('https://www.target.com/circle/enroll/phoneentry')) {
                        console.log("TASK STATUS: ".bold + "SUCCESSFULLY CREATED AN ACCOUNT".green.bold);
                        await browser.close();

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🎯Successfully Generated🎯')
                            .addField('Site', 'Target', )
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||', true)
                            .addField('Format', '||' + email + ':' + password + ':' + raw + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.national-law.com/wp-content/uploads/2014/05/target-logo-reverse-wide.png')
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
                        console.log("TASK STATUS: ".bold + "FAILED TO CREATE AN ACCOUNT".red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
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
            .setTitle('🎯Successfully Generated🎯')
            .addField('Site', 'Target', true)
            .addField('Mode', 'Safe', true)
            .setColor(webhookColor)
            .setThumbnail('https://www.national-law.com/wp-content/uploads/2014/05/target-logo-reverse-wide.png')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);

    }
}

module.exports = {target}