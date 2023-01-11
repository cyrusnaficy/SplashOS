const {deleteKey} = require('./Security/deleteKey.js')
const {authCheck} = require('./Login/authCheck.js')
const {decryptSecretKey} = require('./Encryption/getSecKey.js')
const {secretStringDecryption} = require('./Encryption/secretStringDecryption.js')


deleteKey();
authCheck();
decryptSecretKey();
secretStringDecryption();