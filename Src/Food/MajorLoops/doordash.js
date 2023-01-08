const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function doordash(license, secretKey, hostHeader) {

    const threads = prompt("How many threads do you want to run: ".cyan.bold);
    const checkForProf = prompt("Do you want to add address and card info? (y/n): ".cyan.bold);
    if(checkForProf == null || threads == null) {
        console.log("Make sure to enter correct info".red.bold);
        sleep(2000);
        process.exit();
    }
    let currentProf = {};
    if (checkForProf.charAt(0) == 'y' || checkForProf.charAt(0) == 'Y') {
        const profiles = JSON.parse(fs.readFileSync('./Storage/Profiles/aycd.json', 'utf-8'));

        try {
    
            currentProf.address = profiles.billingAddress.line1;
            currentProf.cardNumber = profiles.paymentDetails.cardNumber;
            currentProf.cardExpMonth = profiles.paymentDetails.cardExpMonth;
            currentProf.cardExpYear = profiles.paymentDetails.cardExpYear;
            currentProf.cardCvv = profiles.paymentDetails.cardCvv;

        } catch (e) {
            console.log("Make sure to add a profile first".red.bold);
            sleep(2000);
            process.exit();
        }
    
    }

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
            const emailList = fs
                .readFileSync("./Storage/emails.txt", "utf8")
                .split("\n")
                .filter(String);
            if(emailList.length == 0 || emailList.length == null) {
                console.log('Please make sure you have a valid email list!'.red.bold);
                sleep(2000);
                process.exit();
            }
            const email = random(emailList);
            const phoneNumber = JSON.stringify(fakerator.date.age(1111111, 9999999));
            const password = fakerator.random.string(5) + JSON.stringify(fakerator.date.age(111, 999)) + "A!"

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
                    await page.goto('https://drd.sh/sxGA7qh2oWYKBMuT', {
                        waitUntil: 'networkidle2'
                    });
                    console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                    await page.waitForSelector("input[data-anchor-id='IdentitySignupFirstNameField']");
                    await page.waitForTimeout(1250);
                    console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                    await page.type("input[data-anchor-id='IdentitySignupFirstNameField']", firstName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[data-anchor-id='IdentitySignupLastNameField']", lastName, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);
                    await page.type("input[data-anchor-id='IdentitySignupEmailField']", email, {
                        delay: 25
                    });
                    await page.waitForTimeout(50);

                    console.log('TASK STATUS: '.bold + 'REQUESTING SMS NUMBER'.cyan.bold);
                    const bearerToken = await textVerifiedGetSession(credentials.textverified);
                    if(bearerToken == null) {
                        console.log('TASK STATUS: '.bold + 'ERROR GETTING SMS NUMBER'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000)
                    } else {
                        
                        let numberidSplit = await textVerifiedNumber(bearerToken, 20);
                        
                        numberidSplit = numberidSplit.split(':');
                        const numberid = numberidSplit[0];
                        const smsID = numberidSplit[1];
                        
                        if(numberid == null) {
                            console.log('TASK STATUS: '.bold + 'ERROR GETTING SMS NUMBER'.red.bold);
                            await browser.close();
                            setTimeout(() => {
                                return runOfficial();
                            }, 5000)

                        } else {

                            await page.type("input[data-anchor-id='IdentitySignupPhoneField']", numberid, {
                                delay: 25
                            });
                            await page.waitForTimeout(50);
                            await page.type("input[data-anchor-id='IdentitySignupPasswordField']", password, {
                                delay: 25
                            });
                            await page.waitForTimeout(50);
                            console.log('TASK STATUS: '.bold + 'SUBMITTING FORM'.yellow.bold);
                            await page.click("button[id='sign-up-submit-button']");
                            await page.waitForTimeout(10000);

                            if (await page.$("input[data-anchor-id='IdentitySignupPasswordField']") !== null) {
                                console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING FORM'.red.bold);
                                await browser.close();
                                setTimeout(() => {
                                    return runOfficial();
                                }, 5000)
                            } else {
                                console.log('TASK STATUS: '.bold + 'WAITING FOR SMS CODE'.cyan.bold);
                                await page.waitForSelector("input[type='number']");
                                await page.waitForTimeout(5000);
                                let code = await textVerifiedCheck(bearerToken, smsID);
                                while(code == "Pending") {
                                    setTimeout(() => {}, 5000);
                                    code = await textVerifiedCheck(bearerToken, smsID);
                                }
                                if(code == null) {
                                    console.log('TASK STATUS: '.bold + 'ERROR GETTING SMS CODE'.red.bold);
                                    await browser.close();
                                    setTimeout(() => {
                                        return runOfficial();
                                }, 5000)
                                } else {
                                    console.log('TASK STATUS: '.bold + 'GOT SMS CODE'.magenta.bold);
                                    await page.waitForTimeout(500);
                                    await page.type("input[type='number']", code, {
                                        delay: 25
                                    });
                                    await page.waitForTimeout(500);
                                    await page.click("button[kind='BUTTON/PRIMARY']");
                                    await page.waitForTimeout(12500);
                                    if (await page.url().includes('https://www.doordash.com/')) {

                                        if (checkForProf.charAt(0) == 'y' || checkForProf.charAt(0) == 'Y') {
                                            console.log('TASK STATUS: '.bold + 'SUBMITTING SHIPPING'.cyan.bold);
                                            await page.goto('https://www.doordash.com/home');
                                            await page.waitForSelector("input[aria-label='Your delivery address']");
                                            await page.waitForTimeout(500);
                                            await page.type("input[aria-label='Your delivery address']", currentProf.address, {
                                                delay: 25
                                            });
                                            await page.waitForTimeout(50);
                                            await page.click("button[kind='BUTTON/PLAIN']", {clickCount: 2})
                                            await page.waitForTimeout(500);
                                            await page.click("button[kind='BUTTON/PLAIN']", {clickCount: 2})
                                            await page.waitForTimeout(2500);
                                            await page.goto('https://www.doordash.com/consumer/payment/');
                                            try {
                                                await page.waitForSelector("button[data-anchor-id='PaymentMethodAdd']");
                                            } catch (e) {
                                                console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING SHIPPING'.red.bold);
                                                await browser.close();
                                                setTimeout(() => {
                                                    return runOfficial();
                                                }, 5000)
                                            }
                                            await page.waitForTimeout(5000);
                                            if (await page.$("input[aria-label='Card expiration date']") !== null) {
                                                console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING BILLING'.red.bold);
                                                await browser.close();
                                                setTimeout(() => {
                                                    return runOfficial();
                                                }, 5000)
                                            } else {
            
                                                console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED REFERRAL'.green.bold);
            
                                                await browser.close();
            
                                                const hook = new Webhook(credentials.discordWebhook);
            
                                                hook.setUsername('SplashAIO');
                                                hook.setAvatar(webhookIMG);
            
                                                const embed = new MessageBuilder()
                                                    .setTitle('🛍️ Successfully Generated 🛍️')
                                                    .addField('Site', 'Doordash', true)
                                                    .addField('Mode', 'Chain and Bill', true)
                                                    .addField('Email', '||' + email + '||')
                                                    .addField('Password', '||' + password + '||', true)
                                                    .addField('Phone', '||' + '206' + phoneNumber + '||', true)
                                                    .addField('Format', '||' + email + ':' + password + '||')
                                                    .setColor(webhookColor)
                                                    .setThumbnail('https://doordash.news/wp-content/uploads/2021/08/Screen-Shot-2021-08-30-at-11.39.16-AM-e1630348880898.png')
                                                    .setDescription('')
                                                    .setImage('')
                                                    .setFooter('SplashAIO', webhookIMG)
                                                    .setTimestamp();
            
                                                await hook.send(embed);
                                                await masterLog(secretKey, "Chain and Bill");
                                                await masterLogAdmin(license, secretKey);
                                                await grabAnalytics(hostHeader, license, secretKey, "Add")
                                                await logFileCreds(email, password, null);
            
                                                setTimeout(() => {
                                                    return runOfficial();
                                                }, 5000);
            
                                            }
            
            
            
                                        } else {
            
                                            console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED REFERRAL'.green.bold);
            
                                            await browser.close();
            
                                            const hook = new Webhook(credentials.discordWebhook);
            
                                            hook.setUsername('SplashAIO');
                                            hook.setAvatar(webhookIMG);
            
                                            const embed = new MessageBuilder()
                                                .setTitle('🛍️ Successfully Generated 🛍️')
                                                .addField('Site', 'Doordash', true)
                                                .addField('Mode', 'Chain', true)
                                                .addField('Email', '||' + email + '||')
                                                .addField('Password', '||' + password + '||', true)
                                                .addField('Phone', '||' + phoneNumber + '||', true)
                                                .addField('Format', '||' + email + ':' + password + '||')
                                                .setColor(webhookColor)
                                                .setThumbnail('https://doordash.news/wp-content/uploads/2021/08/Screen-Shot-2021-08-30-at-11.39.16-AM-e1630348880898.png')
                                                .setDescription('')
                                                .setImage('')
                                                .setFooter('SplashAIO', webhookIMG)
                                                .setTimestamp();
            
                                            await hook.send(embed);
                                            await masterLog(secretKey, "Chain");
                                            await masterLogAdmin(license, secretKey);
                                            await grabAnalytics(hostHeader, license, secretKey, "Add")
                                            await logFileCreds(email, password, phoneNumber);
            
                                            setTimeout(() => {
                                                return runOfficial();
                                            }, 5000);
            
                                        }
            
                                    } else {
                                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                                        await browser.close();
                                        setTimeout(() => {
                                            return runOfficial();
                                        }, 5000);
                                    }
                                }
                            } 
                        }
                    }

                } catch (e) {
                    console.log(e);
                    await browser.close();
                    setTimeout(() => {
                        return runOfficial();
                    }, 5000)
                }

            }

        }
        async function masterLog(secretKey, taskMode) {

            const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
            const hook = new Webhook(sharedHook);

            hook.setUsername('SplashAIO');
            hook.setAvatar(webhookIMG);

            const embed = new MessageBuilder()
                .setTitle('🛍️ Successfully Generated 🛍️')
                .addField('Site', 'Doordash', true)
                .addField('Mode', taskMode, true)
                .setColor(webhookColor)
                .setThumbnail('https://doordash.news/wp-content/uploads/2021/08/Screen-Shot-2021-08-30-at-11.39.16-AM-e1630348880898.png')
                .setDescription('')
                .setImage('')
                .setFooter('SplashAIO', webhookIMG)
                .setTimestamp();

            hook.send(embed);
        }
    }

}

module.exports = {doordash}