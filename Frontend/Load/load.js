const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')
var ip = require('ip');
const {
    getHWID
} = require("hwid");

async function logCLILoad(license, secretKey) {
        
    const sharedHook = await secretStringDecryption("U2FsdGVkX18eq4r5TA6r9qgbLAbe6lcLiHKjlbX895Wssxzst9zbtDJdaniLm3nVGr1373/gR0Z1YD/9/vz3p57+qrieP00f42NdkGlD2sH97Ie0Rn00odWudWBkBmASRAjAv4fh5bF0cJwdBlrXYA==", secretKey)
    const hook = new Webhook(sharedHook);

    hook.setUsername('SplashAIO');
    hook.setAvatar(webhookIMG);

    const embed = new MessageBuilder()
        .setTitle('Launched CLI')
        .addField('Key', license, true)
        .addField('HWID', await getHWID(), true)
        .addField('IP', ip.address())
        .addField('Dirname', __dirname, true)
        .setColor(webhookColor)
        .setFooter('SplashAIO', webhookIMG)
        .setTimestamp();

    hook.send(embed);

}

module.exports = {logCLILoad}