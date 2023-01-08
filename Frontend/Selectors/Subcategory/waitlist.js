const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function Waitlist(license, secretKey, hostHeader) {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Task'.cyan.bold,
        limit: 6,
        initial: 1,
        choices: [
            'Cybersole'.yellow.bold,
            'WhatBot'.yellow.bold,
            'Trickle Bot'.yellow.bold,
            'Kodai'.yellow.bold,
            'PrismAIO'.yellow.bold,
            'MekAIO'.yellow.bold,
            'ValorAIO'.yellow.bold,
            'DalleAI'.yellow.bold
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Cybersole'.yellow.bold) {
                cybersole(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Trickle Bot'.yellow.bold) {
                trickleBot(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Kodai'.yellow.bold) {
                kodai(license, secretKey, hostHeader);
            } else if (this.answer1 == 'PrismAIO'.yellow.bold) {
                prismAIO(license, secretKey, hostHeader);
            } else if (this.answer1 == 'MekAIO'.yellow.bold) {
                mekAIO(license, secretKey, hostHeader);
            } else if (this.answer1 == 'ValorAIO'.yellow.bold) {
                valorAIO(license, secretKey, hostHeader);
            } else if (this.answer1 == 'DalleAI'.yellow.bold) {
                dalleAI(license, secretKey, hostHeader);
            } else if (this.answer1 == 'WhatBot'.yellow.bold) {
                whatBot(license, secretKey, hostHeader);
            }
        })
        .catch();
}

module.exports = {Waitlist}