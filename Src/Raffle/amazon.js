const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')
const axios = require('axios-https-proxy-fix')
const cheerio = require('cheerio');
var prompt = require('prompt-sync')();
var colors = require('colors');
const path = require("path");
const fs = require("fs");

async function amazonRaffles(license, secretKey, hostHeader) {

    const url = prompt('What Is The Raffle URL:'.cyan.bold)

    const amazonAccts = fs
    .readFileSync("./Storage/Accounts/amazonaccounts.txt", "utf8")
    .split("\n")
    .filter(String);

    for (let i = 0; i < amazonAccts.length ; i++){

        const akz = amazonAccts[i]

        const splitaccount = akz.split(":");

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
                    headless: true,
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
                    })
                    await page.goto('https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fdp%2FB0B16656Z2%3Fref_%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&');
                    console.log('TASK STATUS: '.bold + 'LAUNCHED BROWSER'.yellow.bold);
                    await page.waitForTimeout(1000);
                    await page.waitForSelector("input[type='email']");
                    await page.waitForTimeout(500);
                    console.log('TASK STATUS: '.bold + 'LOGGING IN'.yellow.bold);
                    await page.type("input[type='email']", splitaccount[0], {delay: 100});
                    await page.waitForTimeout(100);
                    await page.click("input[id='continue']",  elem => elem.click());   
                    await page.waitForTimeout(100);
                    await page.waitForSelector("input[type='password']");
                    await page.waitForTimeout(100);
                    await page.type("input[type='password']", splitaccount[1], {delay: 100});
                    await page.waitForTimeout(100);
                    await page.click("input[id='signInSubmit']", elem => elem.click()); 
                    await page.waitForNavigation();  
                    await page.waitForTimeout(1000);
                    if (await page.$("a[id='ap-account-fixup-phone-skip-link']") !== null){
                        await page.click("a[id='ap-account-fixup-phone-skip-link']", elem => elem.click());   
                    }
                    await page.waitForTimeout(1000);
                    if (await page.$("a[id='nav-cart']") !== null){
                    }
                    else{
                        console.log('TASK STATUS: '.bold + 'ERROR LOGGING IN'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    await page.goto(url);
                    await page.waitForTimeout(2500);
                    if (await page.$("input[value='Request invitation']") !== null){
                    }
                    else{
                        console.log('TASK STATUS: '.bold + 'FAILED TO LOAD RAFFLE'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                    await page.click("span[data-action='invite-button']", elem => elem.click(), {clickCount: 3});
                    await page.waitForTimeout(7500);
                    if (await page.$("div[id='hdp-detail-requested-id']") !== null){
                        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY ENTERED RAFFLE'.green.bold);
                        await browser.close();
                
                        const hook = new Webhook(credentials.discordWebhook);
                        const b_url = webhookIMG;
                        hook.setUsername('SplashAIO');
                        hook.setAvatar(b_url);
                    
                        const embed = new MessageBuilder()
                            .setTitle('📦 Successfully Entered Raffle 📦')
                            .addField('Site', 'Amazon US')
                            .addField('Email', '||' + splitaccount[0] + '||', true)
                            .addField('Password', '||' + splitaccount[1] + '||', true)
                            .setColor(webhookColor)
                            .setThumbnail('https://m.economictimes.com/thumb/msid-91166059,width-1280,height-720,resizemode-4,imgsize-19856/amazon.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();
                    
                            await hook.send(embed);
                            await masterLog(secretKey);
                            await masterLogAdmin(license, secretKey);
                            await grabAnalytics(hostHeader, license, secretKey, "Add")

                    } else {
                        console.log('TASK STATUS: '.bold + 'FAILED TO ENTER RAFFLE'.red.bold);
                        await browser.close();
                        setTimeout(() => {
                            return runOfficial();
                        }, 5000);
                    }
                } catch (e) {
                    console.log(e);
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
            .setTitle('📦 Successfully Entered Raffle 📦')
            .addField('Site', 'Amazon US', true)
            .setColor(webhookColor)
            .setThumbnail('https://m.economictimes.com/thumb/msid-91166059,width-1280,height-720,resizemode-4,imgsize-19856/amazon.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);
    }

}

module.exports = {amazonRaffles}