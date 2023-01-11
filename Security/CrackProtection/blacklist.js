const {sendHook} = require('../Notify/sendHook.js')

async function checkForBlacklist() {

    const blacklistip = []
    const blacklisthwid = []
    const securityType = "Blacklist";
    /*
    If statements to check if the HWID and IP being used matches
    any of the blacklisted HWID's or IP's. If it does, then the
    bot will send a hook to our security.
    */
    if (blacklistip.includes(userIP)) {
        await sendHook(securityType);
        console.log('You Are Terminated From Our Software Due to Misuse'.red.bold);
        sleep(2000);
        process.exit();
    }
    if (blacklisthwid.includes(hardwareID)) {
        await sendHook(securityType);
        console.log('You Are Terminated From Our Software Due to Misuse'.red.bold);
        sleep(2000);
        process.exit();
    }
    if (hardwareID == "") {
        await sendHook(securityType);
        console.log('Your device is not configured for SplashAIO. Please use a new one'.red.bold);
        sleep(2000);
        process.exit();
    }
}

module.exports = {checkForBlacklist}