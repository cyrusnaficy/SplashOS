const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function FoodSub() {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Food Type'.cyan.bold,
        limit: 2,
        initial: 1,
        choices: [
            'Major Loops'.yellow.bold,
            'Birthday/Referral Rewards'.yellow.bold
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Major Loops'.yellow.bold) {
                majorLoops(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Birthday/Referral Rewards'.yellow.bold) {
                Food(license, secretKey, hostHeader);
            }
        })
        .catch();
}

module.exports = {FoodSub}