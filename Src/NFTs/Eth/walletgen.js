const ethers = require('ethers')
const { id } = require("ethers/lib/utils");

async function ethWallet(license, secretKey, hostHeader) {

    const threads = prompt('How Many Wallets Do You Want: '.cyan.bold);

    if(threads > 100) {
        console.log('TASK STATUS: '.bold + 'MAXIMUM 100 AT A TIME'.red.bold);
        sleep(2000);
        process.exit();
    }

    let walletAddress = 'Eth Address'
    let walletMnemonic = 'Eth Seed Phrase'
    let privateKey = 'Eth Private Key'
    let instances = 0

    await grabAnalytics(hostHeader, license, secretKey, "Add");

    for(let i = 0; i < threads; i++) {

        const wallet = ethers.Wallet.createRandom()

            walletAddress = walletAddress + ':' + wallet.address
            walletMnemonic = walletMnemonic + ':' + wallet.mnemonic.phrase
            privateKey = privateKey + ':' + wallet.privateKey
    
        console.log('TASK STATUS: '.bold + 'SUCCESSFULLY GENERATED WALLET'.green.bold);
        instances = instances + 1

    }

    const hook = new Webhook(credentials.discordWebhook);
    const b_url = webhookIMG;
    hook.setUsername('SplashAIO');
    hook.setAvatar(b_url);
  
    const embed = new MessageBuilder()
      .setTitle('💸 Successfully Generated 💸')
      .addField('Site', 'Ethereum', true)
      .addField('Mode', 'Wallet Gen', true)
      .addField('Wallet', walletAddress)
      .addField('Private Key', '||' + privateKey + '||', true)
      .addField('Seed Phrase', '||' + walletMnemonic + '||')
      .setColor(webhookColor)
      .setThumbnail('https://img-0.journaldunet.com/Hz8ENkFlT-vCQmW-NBLNim0NtfU=/1500x/smart/2fd6cdb0106140c487e3b484e86a3e86/ccmcms-jdn/26944777.png')
      .setDescription('')
      .setImage('')
      .setFooter('SplashAIO', webhookIMG)
      .setTimestamp();
  
    await hook.send(embed);
    await masterLog(secretKey);
    await masterLogAdmin(license, secretKey);

    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('💸 Successfully Generated 💸')
            .addField('Site', 'Ethereum', true)
            .addField('Mode', 'Wallet Gen', true)
            .setColor(webhookColor)
            .setThumbnail('https://img-0.journaldunet.com/Hz8ENkFlT-vCQmW-NBLNim0NtfU=/1500x/smart/2fd6cdb0106140c487e3b484e86a3e86/ccmcms-jdn/26944777.png')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();
    

        hook.send(embed);
    }


}

module.exports = {ethWallet}