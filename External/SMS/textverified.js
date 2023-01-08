const axios = require('axios');

async function textVerifiedGetSession(apiKey) {

    try {
        const response = await axios({
            url: "https://www.textverified.com/Api/SimpleAuthentication",
            method: "POST",
            headers: {
                'X-SIMPLE-API-ACCESS-TOKEN': apiKey
            }
        })
        return response.data.bearer_token;
    } catch (e) {
        return null;
    }

}

async function textVerifiedNumber(bearerToken, id) {

    try {
        const response = await axios({
            url: "https://www.textverified.com/api/Verifications",
            method: "POST",
            headers: {
                'Authorization': "Bearer " + bearerToken
            },
            data: {
                "id": id
            }
        })
        return response.data.number + ":" + response.data.id;
    } catch (e) {
        return null;
    }

}

async function textVerifiedCheck(bearerToken, id) {

    try {
        const response = await axios({
            url: `https://www.textverified.com/api/Verifications/${id}`,
            method: "GET",
            headers: {
                'Authorization': "Bearer " + bearerToken
            }
        })

        if(response.data.status == "Completed") {
            return response.data.code;
        } else {
            return "Pending"
        }
    } catch (e) {
        console.log(e);
        return null;
    }

}

module.exports = {
    textVerifiedGetSession,
    textVerifiedNumber,
    textVerifiedCheck
}