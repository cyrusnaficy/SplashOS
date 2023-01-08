const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');

async function Food(license, secretKey, hostHeader) {
    const prompt = new AutoComplete({
        name: 'module',
        message: 'Select Your Task Options'.cyan.bold,
        limit: 6,
        initial: 1,
        choices: [
            'Krispy Kreme Requests'.yellow.bold,
            'Krispy Kreme Browser'.yellow.bold,
            'Dippin Dots'.yellow.bold,
            'Panera Bread'.yellow.bold,
            'Popeyes'.yellow.bold,
            'Mission BBQ'.yellow.bold,
            'Cinnabon'.yellow.bold,
            'iHop Pancakes'.yellow.bold,
            'Jamba Juice'.yellow.bold,
            'Waffle House'.yellow.bold,
            'Longhorn Steakhouse'.yellow.bold,
            'Dennys'.yellow.bold,
            'Red Lobster'.yellow.bold,
            'BJ Brewhouse'.yellow.bold,
        ]
    });
    prompt.run()
        .then(answer => {
            this.answer1 = answer;
            if (this.answer1 == 'Krispy Kreme Requests'.yellow.bold) {
                krispyKremeReq(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Krispy Kreme Browser'.yellow.bold) {
                krispyKremeBrowser(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Dippin Dots'.yellow.bold) {
                dippinDots(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Panera Bread'.yellow.bold) {
                paneraBread(license, secretKey, hostHeader);
            } else if (this.answer1 == 'Popeyes'.yellow.bold) {
                popeyes(license, secretKey, hostHeader)
            } else if (this.answer1 == 'Mission BBQ'.yellow.bold) {
                missionBBQ(license, secretKey, hostHeader)
            } else if (this.answer1 == 'Cinnabon'.yellow.bold) {
                cinnabon(license, secretKey, hostHeader)
            } else if (this.answer1 == 'iHop Pancakes'.yellow.bold) {
                iHopPancakes(license, secretKey, hostHeader)
            } else if (this.answer1 == 'Jamba Juice'.yellow.bold) {
                jambaJuice(license, secretKey, hostHeader)
            } else if (this.answer1 == 'Waffle House'.yellow.bold) {
                waffleHouse(license, secretKey, hostHeader)
            } else if (this.answer1 == 'Longhorn Steakhouse'.yellow.bold) {
                longhornSteakhouse(license, secretKey, hostHeader)
            } else if (this.answer1 == 'Dennys'.yellow.bold) {
                dennys(license, secretKey, hostHeader)
            } else if (this.answer1 == 'Red Lobster'.yellow.bold) {
                redLobster(license, secretKey, hostHeader)
            } else if (this.answer1 == 'BJ Brewhouse'.yellow.bold) {
                bjBrewhouse(license, secretKey, hostHeader)
            }
        })
        .catch();
}

module.exports = {Food}