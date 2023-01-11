var CryptoJS = require("crypto-js");
const paramLength = "<RETRACTED>"

async function stringDecryption(encryptedMessage) {
    /*
    Decyrpts the string using the key. Then returns the string
    back to the function to get executed.
    */
    var bytes = CryptoJS.AES.decrypt(encryptedMessage, paramLength);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
}

module.exports = {stringDecryption}