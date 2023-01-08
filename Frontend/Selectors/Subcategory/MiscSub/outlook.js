const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function runOutlookSub(license, secretKey, hostHeader) {

    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Task Type'.cyan.bold,
        limit: 3,
        initial: 1,
        choices: [
            'Edu Gen Outlook V1'.yellow.bold,
            'Edu Gen Outlook V2'.yellow.bold,
            'EDU Gen Outlook V3'.yellow.bold,
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if(this.answer1 == 'Edu Gen Outlook V1'.yellow.bold) {
                eduGenOutlook(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Edu Gen Outlook V2'.yellow.bold) {
                eduOutlookv2(license, secretKey, hostHeader);
            } else if(this.answer1 == 'EDU Gen Outlook V3'.yellow.bold) {
                eduOutlookv3(license, secretKey, hostHeader);
            } 
        })
        .catch();

}

module.exports = {runOutlookSub}