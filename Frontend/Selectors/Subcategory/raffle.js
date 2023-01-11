const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require ('colors');

async function Raffle() {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Raffle Type'.cyan.bold,
        limit: 6,
        initial: 1,
        choices: [
            'Custom Request'.yellow.bold,
            'Launches AIO'.yellow.bold,
            'Travis Scott'.yellow.bold,
            'Tom Sachs'.yellow.bold,
            'Playstation Direct'.yellow.bold,
            'Amazon Raffles'.yellow.bold
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Custom Request'.yellow.bold) {
                customRequest(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Launches AIO'.yellow.bold) {
                console.log('Coming soon'.cyan.bold);
                sleep(2000);
                process.exit();
            } else if(this.answer1 == 'Travis Scott'.yellow.bold) {
                travisScott(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Tom Sachs'.yellow.bold) {
                tomSachs(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Playstation Direct'.yellow.bold) {
                playstationDirect(license, secretKey, hostHeader);
            } else if(this.answer1 == 'Amazon Raffles'.yellow.bold) {
                amazonRaffles(license, secretKey, hostHeader);
            }
        })
        .catch();
}

module.exports = {Raffle}