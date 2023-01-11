const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require ('colors');

async function accountGen(license, secretKey, hostHeader) {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Task'.cyan.bold,
        limit: 6,
        initial: 1,
        choices: [
            'Best Buy'.yellow.bold,
            'Target'.yellow.bold,
            'Walmart'.yellow.bold,
            'Gmail'.yellow.bold,
            'Nike'.yellow.bold,
            'Shopify Browser'.yellow.bold,
            'Shopify Requests'.yellow.bold,
            'Ssense'.yellow.bold,
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Best Buy'.yellow.bold) {
                bestBuy(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Target'.yellow.bold) {
                target(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Walmart'.yellow.bold) {
                walmart(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Gmail'.yellow.bold) {
                gmail(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Shopify Browser'.yellow.bold) {
                shopifyBrowser(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Shopify Requests'.yellow.bold) {
                shopifyRequests(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Ssense'.yellow.bold) {
                ssense(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Nike'.yellow.bold) {
                console.log("Module under maintenance".red.bold);
                sleep(2000);
                process.exit();
            }
        })
        .catch();
}

module.exports = {accountGen}