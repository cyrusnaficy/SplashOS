const prompts = require('prompts');
const {
    AutoComplete
} = require('enquirer');
var colors = require('colors');
const {Food}  = require('./Subcategory/food.js');
const {Misc}  = require('./Subcategory/misc.js');
const {Raffle} = require('./Subcategory/raffle.js');
const {FCFS} = require('./Subcategory/fcfs.js');
const {checkoutSub} = require('./Subcategory/MiscSub/checkoutSub.js');
const {FoodSub} = require('./Subcategory/MiscSub/foodSub.js');
const {majorLoops} = require('./Subcategory/MiscSub/majorLoops.js');
const {accountGen} = require('./Subcategory/accountGen.js');
const {Waitlist} = require('./Subcategory/waitlist.js');
const{NFTs} = require('./Subcategory/nfts.js');

async function cliCategories() {
    /*
    This function will contain the entire CLI and all of the function calls. Any external calls will be handled 
    in external functions
    */
    async function mainPrompt() {
        const prompt = new AutoComplete({
            name: 'module',
            message: 'Select Your Module Group'.cyan.bold,
            limit: 6,
            initial: 1,
            choices: [
                'Sneakers & Retail'.yellow.bold,
                'Account Generator'.yellow.bold,
                'Waitlist'.yellow.bold,
                'NFTs'.yellow.bold,
                'Food'.yellow.bold,
                'Misc'.yellow.bold
            ]
        });
        prompt.run()
            .then(answer => {
                this.answer1 = answer;
                if (this.answer1 == 'Food'.yellow.bold) {
                    Food();
                } else if (this.answer1 == 'Account Generator'.yellow.bold) {
                    accountGen(license, secretKey, hostHeader);
                } else if (this.answer1 == 'Waitlist'.yellow.bold) {
                    Waitlist(license, secretKey, hostHeader);
                } else if (this.answer1 == 'Sneakers & Retail'.yellow.bold) {
                    checkoutSub();
                } else if (this.answer1 == 'Misc'.yellow.bold) {
                    Misc(license, secretKey, hostHeader);
                } else if (this.answer1 == 'NFTs'.yellow.bold) {
                    NFTs(license, secretKey, hostHeader);
                }
            })
            .catch();
    }

    await mainPrompt();
}

module.exports = {cliCategories}