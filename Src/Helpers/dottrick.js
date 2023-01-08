const fs = require('fs');

async function dotTrick(license, secretKey, hostHeader) {

    const emailList = fs
        .readFileSync("./Storage/emails.txt", "utf8")
        .split("\n")
        .filter(String);

    fs.writeFileSync("./Storage/trickedGmails.txt", "");
    fs.unlink("./Storage/trickedGmails.txt", (err) => {if (err) throw err;})
    for (let i = 0; i < emailList.length; i ++){
        let currentEmail = emailList[i];
        let prefix = currentEmail.split('@')[0];
        let domain = currentEmail.split('@')[1];
        if (domain == "gmail.com" && emailList.includes(currentEmail)){
            if (i == 0){
                firstLine = true;
            } else{
                firstLine = false;
            }
            trickEmail(prefix, firstLine);
        }
    }
    console.log('TASK STATUS: '.bold + 'SUCCESSFULLY JIGGED EMAILS'.green.bold);
    sendWebhookLog(secretKey);

    async function trickEmail(prefix, firstLine){
        if (firstLine){
            newEmail = prefix + "@gmail.com";
        } else{
            newEmail = "\n" + prefix + "@gmail.com";
        }
        fs.appendFileSync("./Storage/trickedGmails.txt", newEmail, "utf8");
        generate(prefix, 0);
    }

    function stringInsert($str,$pos){
        $str = $str.substring(0, $pos) + "." + $str.substring($pos);
        return $str;
    }

    function generate($var, $i){
        $length = $var.length;

        while ($i+1 < $length) {
            $i++;
            $new = stringInsert($var,$i);
            if ($new.substring($new.length - 1) != "." && $new.substring(0, 1) != "."){
                let newEmail = "\n" + $new + "@gmail.com";
                fs.appendFileSync("./Storage/trickedGmails.txt", newEmail, "utf8");
            }
            generate($new,$i+1);
        }
    }

    async function sendWebhookLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)

        const hook = new Webhook(sharedHook);
        const hook2 = new Webhook(credentials.discordWebhook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        hook2.setUsername('SplashAIO');
        hook2.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('📧 Successfully J!gg@d Emails 📧')
            .addField('Site', 'DotTrick', true)
            .addField('Amount', JSON.stringify(emailList.length), true)
            .setColor(webhookColor)
            .setThumbnail('https://i.gadgets360cdn.com/large/gmail_logo_main_1625048464864.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        await hook.send(embed);
        await hook2.send(embed);
    }

}

module.exports = {dotTrick};