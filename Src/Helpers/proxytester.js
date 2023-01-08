const {
    Webhook,
    MessageBuilder
} = require('discord-webhook-node')
const axios = require('axios-https-proxy-fix')
const cheerio = require('cheerio');
var prompt = require('prompt-sync')();
var colors = require('colors');
const path = require("path");
const fs = require("fs");

async function proxyTester(license, secretKey, hostHeader) {

    const proxyList = fs
        .readFileSync("./Storage/proxies.txt", "utf8")
        .split("\n")
        .filter(String);

    const site = prompt('Site you want to test your proxies on (no input for Google): '.cyan.bold);

    for (let i = 0; i < proxyList.length; i++) {
        proxy = proxyList[i];
        let speed = await testProxy(proxy, site);

        if (speed == "Error") {
            console.log(proxy.red);
            console.log("Error, Bad Proxy\n".red);
        } else {
            console.log(proxy.green);
            console.log(`Good Proxy, Speed: ${speed}ms\n`.green);
        }
    }

    async function testProxy(proxy, site){
        if (!site.includes("https://") && !site == ""){
            site = "https://" + site;
        }
        var start = Date.now();
        let speed;

        const splitproxy = proxy.split(":");

        try {
            let res = await axios({
                url: site ? site : "http://www.google.com",
                method: "GET",
                headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
                },
                timeout: 10000,
                proxy: {
                    protocol: "https",
                    host: splitproxy[0],
                    port: splitproxy[1],
                    auth: {
                        username: splitproxy[2],
                        password: splitproxy[3].replace('\r', '')
                    }
                },
            }).then(res => {
                if (res.status == 200) {
                    speed = Date.now() - start;
                }
            });
        } catch (err) {
        speed = "Error";
        }

        return speed;
    }

}

module.exports = {proxyTester}