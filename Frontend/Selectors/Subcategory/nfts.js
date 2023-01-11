const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function NFTs(license, secretKey, hostHeader) {

    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Task'.cyan.bold,
        limit: 6,
        initial: 1,
        choices: [
            'Discord Request Gen'.yellow.bold,
            'Discord Browser Gen'.yellow.bold,
            'Discord Invites'.yellow.bold,
            'Discord Send Messages'.yellow.bold,
            'Discord React To Message'.yellow.bold,
            'Ethereum Wallet Gen'.yellow.bold,
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Discord Request Gen'.yellow.bold) {
                discordRequests(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Discord Browser Gen'.yellow.bold) {
                discordBrowser(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Discord Invites'.yellow.bold) {
                discordInvites(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Discord Send Messages'.yellow.bold) {
                discordSendMessage(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Discord React To Message'.yellow.bold) {
                discordReact(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Ethereum Wallet Gen'.yellow.bold) {
                ethWallet(license, secretKey, hostHeader);
            } else if (this.answer1 == 'DalleAI'.yellow.bold) {
                dalleAI(license, secretKey, hostHeader);
            }
        })
        .catch();
}

module.exports = {NFTs}