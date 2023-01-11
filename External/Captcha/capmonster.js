const captcha = new capmonster(credentials.capmonster);

async function solveCapmonster(type, siteKey, websiteUrl) {

    var capResult = 0;
    var captchaToken = "";

    async function getData() {

        console.log("REQUESTING CAPMONSTER STATUS: ".bold + "REQUESTING CAPTCHA".cyan.bold);
        await captcha.solveReCaptchaV2(websiteUrl, siteKey)
            .then((result) => {
                capResult = result.taskId;
                if (result.errorId != 0) {
                    console.log("REQUESTING CAPMONSTER STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                    captchaToken = null;
                }
            });

        await captcha.getResult(capResult).then((result) => {

            if (result.errorId != 0) {
                console.log("REQUESTING CAPMONSTER STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                captchaToken = null;
            }

            try {
                captchaToken = result.solution.gRecaptchaResponse;
                console.log("REQUESTING CAPMONSTER STATUS: ".bold + "SOLVED CAPTCHA".green.bold);
            } catch (e) {
                console.log("REQUESTING CAPMONSTER STATUS: ".bold + "ERROR CANNOT SOLVE".red.bold);
                captchaToken = null;
            }

        });

    }

    await getData();
    return captchaToken;
}

module.exports = {solveCapmonster}