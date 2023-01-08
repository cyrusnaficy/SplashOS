const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function checkoutSub() {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Checkout Type'.cyan.bold,
        limit: 2,
        initial: 1,
        choices: [
            'FCFS Modules'.yellow.bold,
            'Raffle Modules'.yellow.bold
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Raffle Modules'.yellow.bold) {
                Raffle();
            } else if (this.answer1 == 'FCFS Modules'.yellow.bold) {
                FCFS();
            }
        })
        .catch();
}

module.exports = {checkoutSub}