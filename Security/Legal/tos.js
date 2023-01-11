const puppeteer = require('puppeteer-extra')
const fs = require('fs')
const chromePaths = require('chrome-paths');

async function checkForTerms() {

    const theTermsFileOfficial = JSON.parse(fs.readFileSync(`./Storage/Accounts/Cookies/sessionStorage.json`, 'utf-8'));
    const theTermsFile = editJsonFile(`./Storage/Accounts/Cookies/sessionStorage.json`);

    if (theTermsFileOfficial.ndatos == false) {

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized', "--disable-blink-features"],
            executablePath: chromePaths.chrome
        });

        try {
            var [page] = await browser.pages();
            await page.goto("https://drive.google.com/file/d/1H-p8POIQHKfPXRiRECjePRU40C8-xs_E/view?usp=sharing");

            const promptResponse = prompt("Do you agree to our NDA? (Y/N): ".yellow.bold);
            if (promptResponse.charAt(0) == "Y" || promptResponse.charAt(0) == "y") {
                await browser.close();
                theTermsFile.set("ndatos", true);
                theTermsFile.save();
            } else {
                console.log("Error: You must agree to our NDA to use this program.".red.bold);
                sleep(2000);
                process.exit();
            }
        } catch (e) {
            console.log("Error: You must keep the browser open until it automatically closes.".red.bold);
            sleep(2000);
            process.exit();
        }
    }
}

module.exports = { checkForTerms }