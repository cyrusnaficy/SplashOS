const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function FCFS() {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your FCFS Type'.cyan.bold,
        limit: 6,
        initial: 1,
        choices: [
            'Amazon US'.yellow.bold,
            'Footsites'.yellow.bold,
            'Supreme US'.yellow.bold,
            'Adafruit US'.yellow.bold,
       ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Supreme US'.yellow.bold) {
                supremeUS(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Footsites'.yellow.bold) {
                console.log('Coming soon'.cyan.bold);
                sleep(2000);
                process.exit();
            } else if (this.answer1 == 'Amazon US'.yellow.bold) {
                amazonSafe(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Adafruit US'.yellow.bold) {
                adafruit(license, secretKey, hostHeader);
            }
        })
        .catch();
}

module.exports = {FCFS}