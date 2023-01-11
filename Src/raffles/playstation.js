const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function playstationDirect(license, secretKey, hostHeader) {
        
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
                    await page.goto('https://www.playstation.com/en-us/ps5/register-to-buy/?', {
                        waitUntil: 'networkidle2'
                    });
                    console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                    await page.waitForSelector('#sb-social-toolbar-root > div > div > button');
                    await page.waitForTimeout(1000);
                    await page.click('#sb-social-toolbar-root > div > div > button', elem => elem.click());  
                    await page.waitForSelector('#ember27 > button');
                    await page.waitForTimeout(1000);
                    await page.click('#ember27 > button', elem => elem.click());  
                    await page.waitForSelector('#ember19 > button');
                    await page.waitForTimeout(1000);
                    await page.click('#ember19 > button', elem => elem.click());
                    console.log('TASK STATUS: '.bold + 'INJECTING PAYLOAD'.yellow.bold);
                    await page.waitForSelector('#ember51 > div > select');
                    await page.waitForTimeout(1000);
                    await page.type('#ember51 > div > select', '1', {delay: 25});
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(250);
                    await page.type('#ember52 > div > select', '1', {delay: 25});
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(250);
                    await page.type('#ember53 > div > select', '1999', {delay: 25});
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(250);
                    await page.click('#ember56 > button', elem => elem.click());
                    await page.waitForTimeout(1000);
                    await page.waitForSelector('#ember66 > select');
                    await page.waitForTimeout(1000);
                    await page.click('#ember71 > button', elem => elem.click());
                    console.log('TASK STATUS: '.bold + 'SUBMITTING INITIAL PAYLOAD'.yellow.bold);
                    await page.waitForSelector('#ember86'); 
                    await page.waitForTimeout(1000);
                    await page.type('#ember86', email, {delay: 25});
                    const password = fakerator.random.string(8)	+ 'fa!2A';
                    await page.waitForTimeout(50);
                    await page.type('#ember90', password, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.type('#ember93', password, {delay: 25});
                    await page.waitForTimeout(50);
                    await page.click("button[class='next-button text-button']", elem => elem.click());
                    await page.waitForSelector("input[name='address-level2']");
                    await page.type("input[name='address-level2']", 'New York City', {delay: 25});
                    await page.waitForTimeout(50);
                    await page.type("select[title='State or Province']", 'new y', {delay: 25});
                    await page.waitForTimeout(250);
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(250);
                    await page.type("input[name='postal-code']", '10001', {delay: 25});
                    await page.waitForTimeout(50);
                    await page.click("button[class='next-button text-button']", elem => elem.click());
                    await page.waitForSelector("input[title='Online ID']");
                    await page.waitForTimeout(4500);
                    console.log('TASK STATUS: '.bold + 'SUBMITTING ONLINE DETAILS'.yellow.bold);
                    await page.type("input[title='Online ID']", fakerator.random.string(8) + '2' , {delay: 25});
                    await page.waitForTimeout(50);
                    await page.type("input[title='First Name']", fakerator.names.firstName(), {delay: 25});
                    await page.waitForTimeout(50);
                    await page.type("input[title='Last Name']", fakerator.names.lastName(), {delay: 25});
                    await page.waitForTimeout(50);
                    await page.click("button[class='next-button text-button']", elem => elem.click());
                    await page.waitForSelector("button[class='primary-button row-button text-button']");
                    await page.waitForTimeout(3000);
                    await page.click("button[class='primary-button row-button text-button']", elem => elem.click());
                    try{
                        await page.waitForSelector("div[class='icon-succeed']");
                        console.log('TASK STATUS: '.bold + 'STARTING EMAIL VERIFICATION'.cyan.bold);
                    }
                    catch(e){
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }   
                    await page.waitForTimeout(2000);
                    await page.waitForSelector("button[class='primary-button row-button text-button']");
                    await page.waitForTimeout(1000);
                    await page.click("button[class='primary-button row-button text-button']", elem => elem.click());
                    try{
                        await page.waitForSelector("div[class='icon-upgrade']");
                    }
                    catch(e){
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    } 
                    await page.waitForTimeout(2000);
                    await page.goto('https://www.playstation.com/en-us/ps5/register-to-buy/?');
                    await page.waitForSelector('#sb-social-toolbar-root > div > div > button');
                    await page.waitForTimeout(1000);
                    await page.click('#sb-social-toolbar-root > div > div > button', elem => elem.click());
                    try{
                        await page.waitForSelector("input[placeholder='Email Address']");
                    }
                    catch(e){
                        console.log('TASK STATUS: '.bold + 'ERROR GENERATING ACCOUNT'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    console.log('TASK STATUS: '.bold + 'PENDING MANUAL EMAIL VERIFICATION'.magenta.bold);
                    const verificationUrl = await prompt('Please Paste The Verification Link: '.cyan.bold);
                    await page.goto(verificationUrl);
                    try{
                        await page.waitForSelector("div[class='icon-succeed']");
                        console.log('TASK STATUS: '.bold + 'VERIFIED EMAIL'.green.bold);
                        await page.waitForTimeout(1000);
                    }
                    catch(e){
                        console.log('TASK STATUS: '.bold + 'FAILED TO VERIFY EMAIL'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
                    await page.waitForTimeout(5000);
                    await page.goto('https://www.playstation.com/en-us/ps5/register-to-buy/?');
                    await page.waitForSelector('#sb-social-toolbar-root > div > div > button');
                    await page.waitForTimeout(1000);
                    await page.click('#sb-social-toolbar-root > div > div > button', elem => elem.click());
                    try{
                        await page.waitForSelector("button[data-dtm-label='Register Now']");
                        await page.waitForTimeout(3000);
                    }
                    catch(e){
                        console.log('TASK STATUS: '.bold + 'FAILED TO VERIFY EMAIL'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    await page.waitForTimeout(5000);
                    await page.click("button[data-dtm-label='Register Now']", elem => elem.click());
                    try{
                        await page.waitForSelector("div[class='form__message form__message--success']");
                        await page.waitForTimeout(5000);

                        await browser.close();

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);
            
                        const embed = new MessageBuilder()
                            .setTitle('🎮 Successfully Entered Raffle 🎮')
                            .addField('Site', 'Playstation Direct', true)
                            .addField('Email', '||' + email + '||', true)
                            .addField('Password', '||' + password + '||')
                            .addField('Format', '||' + email + ':' + password + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://assets-prd.ignimgs.com/2020/06/12/playstation-5-button-02-1591933908407.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();
            
                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                        await logFileCreds(email, password, null);
                    } catch (e) {
                        console.log('TASK STATUS: '.bold + 'FAILED TO GENERATE ACCOUNT'.red.bold);
                        await browser.close();
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
            .setTitle('🎮 Successfully Entered Raffle 🎮')
            .addField('Site', 'Playstation Direct ', true)
            .setColor(webhookColor)
            .setThumbnail('https://assets-prd.ignimgs.com/2020/06/12/playstation-5-button-02-1591933908407.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);

    }

}

module.exports = {playstationDirect}