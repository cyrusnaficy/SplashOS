const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require ('colors');
const {runOutlookSub} = require('./MiscSub/outlook.js')

async function Misc(license, secretKey, hostHeader) {

    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Task Type'.cyan.bold,
        limit: 6,
        initial: 1,
        choices: [
            'Edu Gen Forward'.yellow.bold,
            'Edu Gen Outlook'.yellow.bold,
            'Thorne Pharmaceutical'.yellow.bold,
            'Shell Gas'.yellow.bold,
            'Amazon Gift Card'.yellow.bold,
            'Beast Slapper Game'.yellow.bold,
            'Dot Trick'.yellow.bold,
            'Proxy Tester'.yellow.bold
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Edu Gen Forward'.yellow.bold) {
                eduGenForward(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Edu Gen Outlook'.yellow.bold) {
                runOutlookSub(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Thorne Pharmaceutical'.yellow.bold) {
                thronePharmaceutical(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Dot Trick'.yellow.bold) {
                dotTrick(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Proxy Tester'.yellow.bold) {
                proxyTester(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Shell Gas'.yellow.bold) {
                shellGas(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Amazon Gift Card'.yellow.bold) {
                amazonGiftCard(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Beast Slapper Game'.yellow.bold) {
                slapperGame(license, secretKey, hostHeader);
            } 
        })
        .catch();

}

module.exports = {Misc};