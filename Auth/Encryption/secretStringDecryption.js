var CryptoJS = require("crypto-js");

async function secretStringDecryption(encryptedMessage, secretKey) {
    /*
    Decyrpts the string using the key. Then returns the string
    back to the function to get executed.
    */
    var bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
}

module.exports = {secretStringDecryption}