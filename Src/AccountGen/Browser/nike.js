const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function nike(license, secretKey, hostHeader) {

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

            puppeteer.use(
                AdblockerPlugin({
                    // Optionally enable Cooperative Mode for several request interceptors
                    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
                })
            )

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
            const monthsz = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
            const dayz = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
            const yearz = ["1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1986", "1987", "1987", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1995"]
            const months = monthsz[Math.floor(Math.random() * monthsz.length)]
            const days = dayz[Math.floor(Math.random() * dayz.length)]
            const years = yearz[Math.floor(Math.random() * yearz.length)]
            const firstName = fakerator.names.firstName()
            const lastName = fakerator.names.firstName()
            const password = fakerator.random.string(6) + JSON.stringify(fakerator.date.age(111, 999)) + "!A"
            const email = firstName.toLowerCase() + lastName.toLowerCase() + `da12@${credentials.catchall}`
            userAgents = userAgents[Math.floor(Math.random() * userAgents.length)]

            const args = [
                `--window-size=1080,1080`,
                ` --proxy-server=https=${splitproxy[0]}:${splitproxy[1]}`,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
            ]


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
                    console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                    const cursor = createCursor(page);
                    await page.authenticate({
                        username: splitproxy[2],
                        password: splitproxy[3].replace('\r', '')
                    });
                    await page.setExtraHTTPHeaders({
                        'Accept-Language': 'en'
                    });
                    await page.setUserAgent(
                        userAgents
                    );
                    console.log('TASK STATUS: '.bold + 'SETTING HEADERS'.yellow.bold);
                    await page.goto('https://nike.com');
                    await page.setCookie(...[{
                        name: "sq",
                        value: "3",
                        domain: ".nike.com"
                    }]);
                    console.log('TASK STATUS: '.bold + 'SETTING COOKIES'.yellow.bold);
                    await page.waitForSelector("a[aria-label='Kids']");
                    let clickSel = [
                        "a[aria-label='Kids']",
                        "a[aria-label='Men']",
                        "a[aria-label='Sale']",
                        "a[aria-label='Back to School']"
                    ];
                    clickSel = clickSel[Math.floor(Math.random() * clickSel.length)]

                    await page.waitForTimeout(Math.random() * 1500) + 1200;
                    await cursor.move('#gen-nav-commerce-header-v2 > div.pre-l-header-container > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div');
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click(clickSel);
                    console.log('TASK STATUS: '.bold + 'GENERATING FINGERPRINT'.cyan.bold);
                    await page.waitForSelector('#gen-nav-commerce-header-v2 > div.pre-l-header-container._2q6dEXXq > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div');
                    await page.waitForTimeout(Math.random() * 3300) + 2800;
                    await cursor.move('#gen-nav-commerce-header-v2 > div.pre-l-header-container._2q6dEXXq > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div');
                    await page.waitForTimeout(Math.random() * 1500) + 1200;
                    await cursor.click('#gen-nav-commerce-header-v2 > div.pre-l-header-container._2q6dEXXq > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div > div > div:nth-child(3) > div > a');
                    await page.waitForTimeout(Math.random() * 1250) + 900;
                    await page.goto('https://www.nike.com/register')
                    console.log('TASK STATUS: '.bold + 'FILLING FORM INFO'.yellow.bold);
                    await page.waitForSelector("input[type='email']");
                    await page.waitForTimeout(Math.random() * 1250) + 900;
                    await cursor.click("input[type='email']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await page.keyboard.type(email, {
                        delay: Math.random() * 100 + 50
                    });
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click("input[type='password']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await page.keyboard.type(password, {
                        delay: Math.random() * 100 + 50
                    });
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click("input[name='firstName']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await page.keyboard.type(firstName, {
                        delay: Math.random() * 100 + 50
                    });
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click("input[name='lastName']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await page.keyboard.type(lastName, {
                        delay: Math.random() * 100 + 50
                    });
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click("input[type='date']");
                    await page.waitForTimeout(Math.random() * 650) + 450;

                    //Generating Birth Data

                    console.log('TASK STATUS: '.bold + 'GENERATING BIRTH DATE DETAILS'.yellow.bold);

                    //Resuiming 

                    await page.keyboard.type(months, {
                        delay: Math.random() * 100 + 50
                    });
                    await page.keyboard.type(days, {
                        delay: Math.random() * 100 + 50
                    });
                    await page.keyboard.type(years, {
                        delay: Math.random() * 100 + 50
                    });

                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click("div[class='nike-unite-gender-buttons gender nike-unite-component']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                    await cursor.click("input[value='JOIN US']");
                    await page.waitForTimeout(Math.random() * 15000) + 12000;
                    if (await page.$("input[name='firstName']") !== null) {
                        console.log('TASK STATUS: '.bold + 'ERROR 403 ACCESS DENIED'.red.bold);
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    }
                    console.log('TASK STATUS: '.bold + 'VERIFYING SMS'.cyan.bold);
                    await page.goto('https://www.nike.com/member/settings/');
                    await page.waitForSelector("button[aria-label='Add Mobile Number']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click("button[aria-label='Add Mobile Number']");
                    await page.waitForSelector("input[class='phoneNumber']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    await cursor.click("input[class='phoneNumber']");
                    await page.waitForTimeout(Math.random() * 650) + 450;
                    const balance = await smsActivate.getBalance();
                    if (balance > 0) {
                        console.log('TASK STATUS: '.bold + 'WAITING FOR SMS'.cyan.bold);
                        const numberDetails = await smsActivate.getNumber('ew', 187);
                        await smsActivate.setStatus(numberDetails.id, 1);
                        let numberid = JSON.stringify(numberDetails.number)
                        numberid = numberid.substr(1);
                        await page.keyboard.type(numberid, {
                            delay: Math.random() * 100 + 50
                        });
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        await cursor.click("input[class='sendCodeButton']");
                        await page.waitForTimeout(Math.random() * 650) + 450;
                        const waitForCode = setInterval(async () => {
                            const code = await smsActivate.getCode(numberDetails.id);
                            if (code) {
                                clearInterval(waitForCode);
                                console.log('TASK STATUS: '.bold + 'GOT SMS CODE'.magenta.bold);
                                await smsActivate.setStatus(numberDetails.id, 6);
                                await page.waitForTimeout(Math.random() * 320) + 40;
                                await page.keyboard.type(code, {
                                    delay: Math.random() * 100 + 50
                                });
                                await cursor.click("label[class='checkbox']")
                                await page.waitForTimeout(Math.floor((Math.random() * 150) + 40));
                                await cursor.click("input[value='CONTINUE']")
                                await page.waitForTimeout(Math.floor((Math.random() * 10000) + 8500));
                                if (await page.$("input[name='firstName']") !== null) {
                                    console.log('TASK STATUS: '.bold + 'ERROR 403 ACCESS DENIED'.red.bold);
                                    setTimeout(() => {
                                        return runOfficial();
                                    }, 5000)
                                } else {
                                    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED ACCOUNT'.green.bold);
                                    await browser.close();

                                    const hook = new Webhook(credentials.discordWebhook);
                                    hook.setUsername('SplashAIO');
                                    hook.setAvatar(webhookIMG);

                                    const embed = new MessageBuilder()
                                        .setTitle('👟 Successfully Generated 👟')
                                        .addField('Site', 'Nike', true)
                                        .addField('Mode', 'Rewrite', true)
                                        .addField('Email', '||' + email + '||')
                                        .addField('Password', '||' + password + '||', true)
                                        .addField('Format', '||' + email + ':' + password + '||')
                                        .setColor(webhookColor)
                                        .setThumbnail('https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg')
                                        .setDescription('')
                                        .setImage('')
                                        .setFooter('SplashAIO', webhookIMG)
                                        .setTimestamp();

                                    await hook.send(embed);
                                    await hook.send(embed);
                                    await masterLog(secretKey);
                                    await masterLogAdmin(license, secretKey);
                                    await grabAnalytics(hostHeader, license, secretKey, "Add")
                                    await logFileCreds(email, password, null);

                                }
                            }
                        }, 5000);

                    } else {
                        console.log('TASK STATUS: '.bold + 'ERROR OUT OF BALANCE'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
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
                .setTitle('👟 Successfully Generated 👟')
                .addField('Site', 'Nike', true)
                .addField('Mode', 'Rewrite', true)
                .setColor(webhookColor)
                .setThumbnail('https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }

}

module.exports = {nike}