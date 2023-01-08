const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')

async function masterLogAdmin(license, secretKey) {

    const sharedHook = await secretStringDecryption("U2FsdGVkX1/CIvkyKeYPVNUDGBL14g/qOJ886p3cs/ZbOl/F5/1S7Cc+pi7EDWiFTxkgcTmxby7f1UFnbc9mWqBmzAwbQwNuzSq/1L647gAk4XjY6dZEGo4VMfN98SIDOB0+J6roVE0Yp80dN+xltw==", secretKey)
    const hook = new Webhook(sharedHook);

    hook.setUsername('SplashAIO');
    hook.setAvatar(webhookIMG);
    const embed = new MessageBuilder()
        .setTitle('Account Generated')
        .addField('Key', license, true)
        .addField('HWID', await getHWID(), true)
        .addField('IP', ip.address())
        .addField('Dirname', __dirname, true)
        .setColor(webhookColor)
        .setFooter('SplashAIO', webhookIMG)
        .setTimestamp();

    hook.send(embed);
}

module.exports = {masterLogAdmin}