const Captcha = require("2captcha")

async function solveTwoCap(type, siteKey, websiteUrl) {

    var captchaToken = "";
    await getData();

    async function getData() {

        if(type == "recaptcha") {

            console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
            await solver.recaptcha(siteKey, websiteUrl)

                .then((res) => {
                    captchaToken = res.data
                    console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "CAPTCHA SOLVED".green.bold);
                })
                .catch((err) => {
                    console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                    captchaToken = null;
                })

        } else if(type == "hcaptcha") {
            
            console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
            await solver.hcaptcha(siteKey, websiteUrl)

                .then((res) => {
                    captchaToken = res.data
                    console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "CAPTCHA SOLVED".green.bold);
                })
                .catch((err) => {
                    console.log("REQUESTING 2CAPTCHA STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                    captchaToken = null;
                })

        }

    }

    return captchaToken;
}

module.exports = {solveTwoCap}