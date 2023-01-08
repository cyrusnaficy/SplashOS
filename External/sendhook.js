const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')

async function sendHook(securityType) {

    //Sending security hook
    const securityHook = await stringDecryption("U2FsdGVkX18rgMLl3VoiHu/jzJ/EJZosNJzWKPpHPTpnSTSrJubaWPUrUqdukGPLFryxPQxYm6pNUfXrB5VgT4vKFzJiyQaYW0MkDm3O071q85xsZ5x+jWlFhrtzZw2qhZsUcM9DHOpI4Cm6w94OexXbsfWV0akCCTEtuWg0qDu2SYWOf58UjASbTBFLaJJE");
    const hook = new Webhook(securityHook);

    if(credentials.license == "") {

        hook.setUsername('SplashAIO Security');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🚨 Security Threat 🚨')
            /*
            Lists user HWID and IP, allowing us to blacklist them easily in future updates
            or even roll bearer if it is a major threat.
            */
            .addField('Type', securityType, true)
            .addField('IP', userIP, true)
            .addField('HWID', hardwareID)
            .addField('Dirname', __dirname, true)
            .setColor(webhookColor)
            .setDescription('')
            .setImage('')
            .setFooter('Splash AIO', webhookIMG)
            .setTimestamp();

        await hook.send(embed);

    } else {

        hook.setUsername('SplashAIO Security');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🚨 Security Threat 🚨')
            /*
            Lists user HWID and IP, allowing us to blacklist them easily in future updates
            or even roll bearer if it is a major threat.
            */
            .addField('Type', securityType, true)
            .addField('Key', credentials.license, true)
            .addField('IP', userIP)
            .addField('HWID', hardwareID)
            .addField('Dirname', __dirname, true)
            .setColor(webhookColor)
            .setDescription('')
            .setImage('')
            .setFooter('Splash AIO', webhookIMG)
            .setTimestamp();

        await hook.send(embed);

    }

}

module.exports = {sendHook}