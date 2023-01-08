const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function majorLoops(license, secretKey, hostHeader) {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Task Options'.cyan.bold,
        limit: 4,
        initial: 1,
        choices: [
            'Starbucks Drink/Food'.yellow.bold,
            'AMC Theaters'.yellow.bold,
            'Doordash'.yellow.bold,
            'Chipotle Entree'.yellow.bold
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Starbucks Drink/Food'.yellow.bold) {
                starbucksDrink(license, secretKey, hostHeader);
            } else if (this.answer1 == 'AMC Theaters'.yellow.bold) {
                amcTheaters(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Doordash'.yellow.bold) {
                doordash(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Chipotle Entree'.yellow.bold) {
                console.log("Coming Soon".cyan.bold);
                sleep(2000);
                process.exit();
            }
        })
        .catch();
}

module.exports = {majorLoops}