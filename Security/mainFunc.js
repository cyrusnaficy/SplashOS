const {checkForTerms} = require('./Legal/tos.js')
const {checkForBlacklist} = require('./CrackProtection/blacklist.js')
const {sniffCheck} = require('./CrackProtection/sniff.js')

async function runSec() {
    checkForTerms();
    checkForBlacklist();
    sniffCheck();
}

module.exports = {runSec}