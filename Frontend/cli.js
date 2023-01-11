var colors = require('colors');
const fs = require('fs');
const {grabAnalytics} = require('../API/analytics.js');
const {logCLILoad} = require('./Load/load.js');
const {cliCategories} = require('./Selectors/cliSelectors.js');

async function launchCLI(secretKey, discordUsername, hostHeader, license) {
    /*
    Launches CLI with key and Node which verifies
    that the key has been authenticated.
    */
    console.clear();
    //Logging logo
    console.log(`

████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░█████████░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░░░▄▀░░░░█░░▄▀░░░░░░▄▀░░█
█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░█████████░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░░░░░░░░░▄▀░░█░░▄▀░░░░░░░░░░█░░▄▀░░█████████░░▄▀░░░░░░▄▀░░█░░░░░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█████████░░▄▀░░█░░▄▀░░█████████░░▄▀░░█████████░░▄▀░░██░░▄▀░░█████████░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░███░░▄▀░░███░░▄▀░░██░░▄▀░░█
█░░░░░░░░░░▄▀░░█░░▄▀░░█████████░░▄▀░░░░░░░░░░█░░▄▀░░██░░▄▀░░█░░░░░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░░░▄▀░░░░█░░▄▀░░░░░░▄▀░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░█████████░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█
█░░░░░░░░░░░░░░█░░░░░░█████████░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░██░░░░░░█░░░░░░██░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░█
████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
`.cyan.bold);
    //Grabbing analytics
    var type = "Log";
    const analyticsNumber = await grabAnalytics(hostHeader, license, secretKey, type);
    await logCLILoad(license, secretKey)
    /*
    Below, what is being logged is an intro or prior start to the CLI. This will be soma analytics and
    other shit too.
    */
    console.log('');
    console.log('###############################################################################'.yellow.bold);
    console.log('');
    sleep(250);
    console.log('Loading data files... 🔄'.bold);
    sleep(250);
    console.log('Loaded configs.json, proxies.txt, emails.txt, accounts, and cookies ✅'.bold);

    /*
    Logging the amount of data files in the bot. This is found in the
    configs files and txt files.
    */
    const proxyList = fs
        .readFileSync("./Storage/proxies.txt", "utf8")
        .split("\n")
        .filter(String);
    const emailList = fs
        .readFileSync("./Storage/emails.txt", "utf8")
        .split("\n")
        .filter(String);
    console.log(`You currently have ${proxyList.length} proxies and ${emailList.length} emails loaded 📬`.bold);
    process.title = `[200][Splash AIO] | Success Count: 0 | Server Connection: 200 | Total Proxies: ${proxyList.length}`;


    console.log('')
    //Logging the discord username passed as a param
    console.log(`Welcome ${discordUsername} 🎉`.bold)
    console.log('You are running on SplashAIO Version 0.5.21 💧'.bold);
    console.log('');
    console.log('###############################################################################'.cyan.bold);
    console.log('');
    sleep(250);
    console.log(` 
▄▀█ █▄░█ ▄▀█ █░░ █▄█ ▀█▀ █ █▀▀ █▀
█▀█ █░▀█ █▀█ █▄▄ ░█░ ░█░ █ █▄▄ ▄█
`)
    console.log('');
    //Logging analyticsNumber which is recieved as a return from the analytics function
    console.log(`SplashAIO users have achieved ${analyticsNumber} successful tasks in the last 30 minutes 🎉`.bold);
    console.log('More information about SplashAIO success logs can be found in the Discord 📝'.bold)
    console.log('');
    console.log('SERVER STATUS: '.bold + "CONNECTED".green.bold);
    //Logging captcha status
    if (credentials.captchaAi == "") {
        console.log('CAPTCHA AI: '.bold + "NOT CONNECTED".red.bold);
    } else {
        console.log('CAPTCHA AI: '.bold + "CONNECTED".green.bold);
    }
    //Logging timestamp
    console.log(`TIMESTAMP: ${new Date()}`.bold);
    console.log('');
    console.log('###############################################################################'.yellow.bold);
    console.log('');
    console.log('Use the ⬆️  and ⬇️  arrows to navigate the menu.'.bold);
    console.log('Press enter to make your selection 🖱️'.bold);
    console.log('');
    //Running actual the CLI
    cliCategories();
}

module.exports = {launchCLI};