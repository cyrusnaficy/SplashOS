const fs = require('fs');
const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')


async function logFileCreds(email, password, phone) {

    if(phone == null) {

        const outputFile = fs
        .readFileSync("./Storage/Accounts/successfulgens.txt", "utf8")
        var logger = fs.createWriteStream('./Storage/Accounts/successfulgens.txt', {
          flags: 'a' // 'a' means appending (old data will be preserved)
        })
        if(outputFile == ""){
          logger.write(`${email}:${password}`) // append string to your file 
        }
        else{
            logger.write(`\n${email}:${password}`) // append string to your file 
        }

    } else {

        const outputFile = fs
        .readFileSync("./Storage/Accounts/successfulgens.txt", "utf8")
        var logger = fs.createWriteStream('./Storage/Accounts/successfulgens.txt', {
          flags: 'a' // 'a' means appending (old data will be preserved)
        })
        if(outputFile == ""){
          logger.write(`${email}:${password}:${phone}`) // append string to your file 
        }
        else{
            logger.write(`\n${email}:${password}:${phone}`) // append string to your file 
        }

    }
}

module.exports = {logFileCreds}