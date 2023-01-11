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
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
var Fakerator = require("fakerator");
var fakerator = Fakerator();

async function supremeUS(license, secretKey, hostHeader) {

    var mode, category;

    const auto1 = new AutoComplete({
        name: 'mode',
        message: 'Select The Mode You Would Like To Run'.cyan.bold,
        limit: 4,
        initial: 0,
        choices: [
            'Bypass'.yellow.bold,
            'Bypass Safe'.yellow.bold,
            'Safe'.yellow.bold,
            'Super Safe'.yellow.bold
        ]
    });
    await auto1.run()
    .then(answer => {
        mode = answer.strip;
    })
    .catch();

    
    var keywords = prompt('Enter the keywords for the product you wish to checkout (Ex. box,logo,shirt,-hoodie): '.cyan.bold);
    var styles = prompt('Enter the style/colour that you would like to checkout: '.cyan.bold);
    // var sizes = prompt('Enter the sizes you would like to checkout in order of preference (Ex. M,L,S): '.cyan.bold);

    const auto2 = new AutoComplete({
        name: 'category',
        message: `Select The Category In Which ${keywords} Is In`.cyan.bold,
        limit: 12,
        initial: 0,
        choices: [
            'Accessories'.yellow.bold,
            'Bags'.yellow.bold,
            'Skate'.yellow.bold,
            'Shoes'.yellow.bold,
            'Hats'.yellow.bold,
            'Shirts'.yellow.bold,
            'T-Shirts'.yellow.bold,
            'Pants'.yellow.bold,
            'Jackets'.yellow.bold,
            'Shorts'.yellow.bold,
            'Tops/Sweaters'.yellow.bold,
            'Sweatshirts'.yellow.bold
        ]
    });
    await auto2.run()
    .then(answer => {
        category = answer.strip;
    })
    .catch();
    var confirm = prompt(`Y or N, you want to start tasks for ${keywords}? `.cyan.bold);
    if (confirm == "Y" || confirm == "y") {
        keywords = keywords.replace(/\s/g, '');
        keywords = keywords.toLowerCase();
        keywords = keywords.split(',');

        styles = styles.toLowerCase();
        styles = styles.replace(/\s/g, '');
        styles = styles.split(',');

        //sizes = sizes.toLowerCase();
        //sizes = sizes.replace(/\s/g, '');
        //sizes = sizes.split(',');

        var negativeKeywords = [];
        var positiveKeywords = [];
        for (var i = 0; i < keywords.length; i++){
            if (keywords[i].charAt(0) == '-'){
                negativeKeywords[negativeKeywords.length] = keywords[i].substring(1);
            } else {
                positiveKeywords[positiveKeywords.length] = keywords[i];
            }
        }
        keywords = positiveKeywords;

        var profiles = "";

        try {
            profiles = JSON.parse(fs.readFileSync('./Storage/Profiles/aycd.json', 'utf-8'));
        } catch (e) {
            console.log('TASK STATUS: '.bold + 'ERROR READING PROFILES'.red.bold);
            sleep(2000);
            process.exit();
        }

        if(profiles.length == null) {
            console.log('TASK STATUS: '.bold + 'ERROR READING PROFILES LENGTH'.red.bold);
            sleep(2000);
            process.exit();
        } else {
            for(var loop = 0; loop < profiles.length; loop++) {
                runOfficial(negativeKeywords, positiveKeywords, profiles);
            }
        }
    } else {
        sleep(2000);
        process.exit();
    }

    async function runOfficial(negativeKeywords, positiveKeywords, profiles) {

        let monitorCount = 0;

        function random(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        const list = fs
            .readFileSync("./Storage/proxies.txt", "utf8")
            .split("\n")
            .filter(String);
        const raw = random(list);
        const splitproxy = raw.split(":");

        console.log('TASK STATUS: '.bold + 'GETTING HOMEPAGE'.yellow.bold);
        getHome();

        async function getHome() {

            var headerList = "";

            if(mode == "Bypass" || mode == "Bypass Safe") {
                headerList = {
                    "Host": "www.supremenewyork.com",
                    "Upgrade-Insecure-Requests": 1,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Referer": "https://www.supremenewyork.com/mobile/",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8"
                }
            } else {
                headerList = {
                    "Host": "www.supremenewyork.com",
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Referer": "http://www.supremenewyork.com/",
                }
            }

            try {
                const response = await axios({
                    method: 'GET',
                    url: "https://www.supremenewyork.com/shop",
                    headers: headerList,
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                })
                if(response.headers) {
                    let cookies = response.headers['set-cookie'];
                    cookies = cookies[0].slice(0, -47) + cookies[1].slice(0, -47) + cookies[2].slice(0, -8) + cookies[3].slice(0, -8) + " "
                    monitorStock(cookies)
                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING HOMEPAGE'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 1000);
                }
                
            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR GETTING HOMEPAGE'.red.bold);
                setTimeout(() => {
                    return runOfficial();
                }, 1000);
            }
        }

        async function monitorStock(cookies) {

            var headerList = "";

            if(mode == "Bypass" || mode == "Bypass Safe") {

                headerList = {
                    "Host": "www.supremenewyork.com",
                    "Cookie": cookies,
                    "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                    "Sec-Ch-Ua-Mobile": "?0",
                    "Sec-Ch-Ua-Platform": "macOS",
                    "Upgrade-Insecure-Requests": 1,
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Referer": "https://www.supremenewyork.com/mobile/",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8"
                }
            
            } else {

                headerList = {
                    "Host": "www.supremenewyork.com",
                    "Cookie": cookies,
                    "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                    "Sec-Ch-Ua-Mobile": "?0",
                    "Sec-Ch-Ua-Platform": '"Windows"',
                    "Upgrade-Insecure-Requests": "1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "Sec-Fetch-Site": "none",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-User": "?1",
                    "Sec-Fetch-Dest": "document",
                    "Accept-Encoding": "gzip, deflate",
                }
                
            }

            try {
                const response = await axios({
                    url: "https://www.supremenewyork.com/mobile_stock.json",
                    method: "GET",
                    headers: headerList,
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                });

                const data = await response.data;
                if(data) {
                    monitorCount++;
                    if(monitorCount > 20) {
                        return getHome()
                    } else {
                        const products_and_categories = data['products_and_categories'][category];
                        // console.log(products_and_categories);
                        for (var j = 0; j < products_and_categories.length; j++) {
                            var item = products_and_categories[j]['name'].toLowerCase();
                            // console.log("Item: " + item);
                            var tempKeywords = keywords.slice();
                            var tempNegativeKeywords = negativeKeywords.slice();
                            for (var i = 0; i < keywords.length; i++){
                                if (item.includes(keywords[i])){
                                    tempKeywords = tempKeywords.filter(e => e !== keywords[i]);
                                } else {
                                    tempKeywords = keywords.slice();
                                    break;
                                }
                            }
                            if (tempKeywords.length == 0){
                                for (var i = 0; i < negativeKeywords.length; i++){
                                    if (!item.includes(negativeKeywords[i])){
                                        tempNegativeKeywords = tempNegativeKeywords.filter(e => e !== negativeKeywords[i]);
                                    } else{
                                        tempNegativeKeywords = negativeKeywords.slice();
                                        tempKeywords = keywords.slice();
                                        break;
                                    }
                                }
                                if (tempNegativeKeywords.length == 0){
                                    console.log('TASK STATUS: '.bold + `ITEM FOUND ${item}`.cyan.bold);
                                    var productID = products_and_categories[j]['id'];
                                    if(mode == "Bypass" || mode == "Bypass Safe") {
                                        runBypass(cookies, productID)
                                    } else {
                                        getProduct(cookies, productID);
                                    }
                                    break;
                                }
                            }
                            if (j + 1 == products_and_categories.length){
                                console.log('TASK STATUS: '.bold + 'MONITORING...'.magenta.bold);
                                setTimeout(function(){
                                    monitorStock(cookies);
                                }, 3500);  // Maybe add an error delay here that the user can change
                            }
                        }
                    }
                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING STOCK'.red.bold);
                    setTimeout(() => {
                        return runOfficial();
                    }, 1000);
                }

            } catch (e) {
                console.log(e);
                setTimeout(() => {
                    return runOfficial();
                }, 1000);
            }
            

        }
        
        async function getProduct(cookies, productID) {

            console.log('TASK STATUS: '.bold + 'GETTING PRODUCT PAGE'.yellow.bold);

            let urlGet = "";

            if(mode == "Safe" || mode == "Super Safe") {category
                urlGet = `https://www.supremenewyork.com/shop/${category}/${productID}`;
            } else {
                urlGet = `https://www.supremenewyork.com/shop/new/${productID}`;
            }

            try {
                const response = await axios({
                    method: 'GET',
                    url: urlGet,
                    headers: {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": '"Windows"',
                        "Upgrade-Insecure-Requests": "1",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Accept-Encoding": "gzip, deflate",
                    },
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                })
                
                if(response.data) {
                    const $ = cheerio.load(response.data);
                    const csrfToken = $(`meta[name="csrf-token"]`).attr("content");
                    const chk = $(`input[name="chk"]`).attr("value");
                    let theCartStyle = styles[0].charAt(0).toUpperCase() + styles[0].slice(1);
                    theCartStyle = $(`button[data-style-name="${theCartStyle}"]`).attr("data-style-id");
                    let cartSize = $(`#size > option:nth-child(${JSON.stringify(fakerator.date.age(1, 2))})`).attr("value");

                    cookies = cookies + response.headers['set-cookie'][2].slice(0, -8)

                    addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize);


                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING PRODUCT'.red.bold);
                    return getProduct(cookies, productID);
                }
            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR GETTING PRODUCT'.red.bold);
                return getProduct(cookies, productID)
            }
        }

        async function runBypass(cookies, productID) {

            console.log('TASK STATUS: '.bold + 'GETTING PRODUCT PAGE'.yellow.bold);

            try {
                const response = await axios({
                    url: `https://www.supremenewyork.com/shop/${productID}.json`,
                    method: "GET",
                    headers: {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Upgrade-Insecure-Requests": 1,
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Referer": "https://www.supremenewyork.com/mobile/",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8"
                    },
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                })

                if(response.data) {
                    const data = await response.data;
                    const stylesData = data['styles'];
                    const sizesAr = ["s", "m", "l", "xl"];
                    let sizes = sizesAr[Math.floor(Math.random() * sizesAr.length)]
                    sizes = [sizes]
                    if (sizes.length != 0){
                        sizes = await convertSizes(sizes);
                    } else {
                        sizes = ["N/A"];
                    }
                    for (var i = 0; i < stylesData.length; i++){
                        for (var j = 0; j < styles.length; j++){
                            if (stylesData[i]['name'].toLowerCase() == styles[j]){
                                // console.log("Found Color " + String(stylesData[i]['id']));
                                var styleID = stylesData[i]['id'];
                                var styleCHK = stylesData[i]['chk'];
                                // console.log(sizes);
                                // console.log(stylesData[i]['sizes']);
                                for (var t = 0; t < sizes.length; t++){  // This one on top is prioritizing the order the user entered the sizes.
                                    for (var k = 0; k < stylesData[i]['sizes'].length; k++){  // Change the order of these for loops depending on if we want to go prefered size first or smallest size first.
                                        if (stylesData[i]['sizes'][k]['name'] == sizes[t]){  // Could check stock here but other bots may grab it after we have checked.
                                            var sizeID = stylesData[i]['sizes'][k]['id'];
                                            // console.log(String(styleID));
                                            // console.log(String(sizeID));
                                            // console.log(String(productID));
                                            bypassCart(styleID, sizeID, productID, styleCHK, cookies);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR GETTING PRODUCT'.red.bold);
                return runBypass(cookies, productID)
            }

        }

        const convertSizes = async (sizes) => {
            for (var i = 0; i < sizes.length; i++){
                if (sizes[i] == 'xs'){
                    sizes[i] = "XSmall";
                } else if (sizes[i] == 's'){
                    sizes[i] = "Small";
                } else if (sizes[i] == 'm'){
                    sizes[i] = "Medium";
                } else if (sizes[i] == 'l'){
                    sizes[i] = "Large";
                } else if (sizes[i] == 'xl'){
                    sizes[i] = "XLarge";
                } else if (sizes[i] == 'xxl'){
                    sizes[i] = "XXL";
                } else if (sizes[i] == 's'){
                    sizes[i] = "Small";
                } else if (sizes[i] == 's/m'){
                    sizes[i] = "S/M";
                } else if (sizes[i] == 'm/l'){
                    sizes[i] = "M/L";
                } else {
                    sizes[i] = String(sizes[i]);
                }
            }
            return sizes;
        };

        async function bypassCart(styleID, sizeID, productID, styleCHK, cookies) {
            console.log('TASK STATUS: '.bold + 'ADDING TO CART'.cyan.bold);

            var sov = styleCHK.split("").reverse().join("").substring(0, 9) + "50131360511513011514860418324546139";

            try {
                const response = await axios({
                    url: `https://www.supremenewyork.com/shop/${productID}/atc.json`,
                    method: "POST",
                    headers: {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Upgrade-Insecure-Requests": 1,
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Referer": "https://www.supremenewyork.com/mobile/",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }, 
                    data: qs.stringify({
                        size: sizeID,
                        style: styleID,
                        qty: 1,
                        chk: styleCHK,
                        sov: sov
                    }),
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                })

                const data = await response.data;
                if (data['success'] == true){
                    cookies = cookies + response.headers['set-cookie'][1].slice(0, -56) + response.headers['set-cookie'][2].slice(0, -56) + response.headers['set-cookie'][3].slice(0, -94);
                    runBypassCheckout(cookies, sizeID)
                }
            
            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR ADDING TO CART'.red.bold);
                return bypassCart(styleID, sizeID, productID, styleCHK, cookies);
            }
        }
        
        async function addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize) {

            console.log('TASK STATUS: '.bold + 'ADDING TO CART'.yellow.bold);

            var sov = chk.split("").reverse().join("").substring(0, 9) + "5010064645373610405112102537368324546116";
            
            try {
                const response = await axios({
                    method: 'POST',
                    url: `https://www.supremenewyork.com/shop/${productID}/atc`,
                    headers: {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                        "X-Csrf-Token": csrfToken,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "*/*",
                        "X-Requested-With": "XMLHttpRequest",
                        "Sec-Ch-Ua-Platform": '"Windows"',
                        "Origin": "https://www.supremenewyork.com",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://www.supremenewyork.com/shop/accessories/a608cfjws",
                        "Accept-Encoding": "gzip, deflate",
                    },
                    data: qs.stringify({
                        "utf8": "%E2%9C%93",
                        "authenticity_token": csrfToken,
                        "size": cartSize,
                        "style": theCartStyle,
                        "qty": "1",
                        "chk": chk,
                        "sov": sov
                    }),
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                });
        
                if(response.data.success == true) {
                    cookies = cookies + response.headers['set-cookie'][1].slice(0, -56) + response.headers['set-cookie'][2].slice(0, -56) + response.headers['set-cookie'][3].slice(0, -94);
                    getCheckout(cookies)
                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR ADDING TO CART'.red.bold);
                    return addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize);
                }
        
            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR ADDING TO CART'.red.bold);
                return addToCart(cookies, csrfToken, chk, productID, theCartStyle, cartSize)
            }
        }

        async function getCheckout(cookies) {
            
            console.log('TASK STATUS: '.bold + 'GETTING CHECKOUT'.yellow.bold);

            try {
                const response = await axios({
                    method: 'GET',
                    url: 'https://www.supremenewyork.com/checkout',
                    headers: {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Cache-Control": "max-age=0",
                        "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": '"Windows"',
                        "Upgrade-Insecure-Requests": "1",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Accept-Encoding": "gzip, deflate",
                        "Accept-Language": "en-US,en;q=0.9",
                    },
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                });

                if(response.headers) {
                    cookies = cookies + response.headers['set-cookie'][0].slice(0, -15)
                    const $ = cheerio.load(response.data);
                    const csrfToken = $(`meta[name="csrf-token"]`).attr("content");
                    submitCheckout(cookies, csrfToken)
                } else {
                    console.log('TASK STATUS: '.bold + 'ERROR GETTING CHECKOUT'.red.bold);
                    return getCheckout(cookies);
                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR GETTING CHECKOUT'.red.bold);
                return getCheckout(cookies)
            }
        }

        async function runBypassCheckout(cookies, sizeID) {

            console.log('TASK STATUS: '.bold + 'SUBMITTING CHECKOUT'.magenta.bold);

            let captchaResCheckout = "";

            if(mode == "Bypass Safe") {
                captchaResCheckout = await solveTwoCap('hcaptcha', '9c1f7658-2de8-43d2-abca-6660f344ea1c', 'https://www.supremenewyork.com/checkout');
            }

            const loopTwo = loop - 1;

            const timestamp = Date.now();
            const theRealState = states.abbr(profiles[loopTwo].billingAddress.state);
            var urlEncoded = encodeURIComponent(`{"${sizeID}":1}`);
            var phoneConverted = profiles[loopTwo].billingAddress.phone.substring(0, 3) + "-" + profiles[loopTwo].billingAddress.phone.substring(3, 6) + "-" + profiles[loopTwo].billingAddress.phone.substring(6, 10);
            var convertedCardNumber = profiles[loopTwo].paymentDetails.cardNumber.strip.match(/.{1,4}/g).join(' ');

            try {
                const response = await axios({
                    url: `https://www.supremenewyork.com/checkout.json`,
                    method: "POST",
                    headers: {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": `"(Not(A:Brand";v="99", "Chromium";v="104"`,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "Sec-Ch-Ua-Platform": "macOS",
                        "Upgrade-Insecure-Requests": 1,
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        "Sec-Fetch-Site": "none",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-User": "?1",
                        "Sec-Fetch-Dest": "document",
                        "Referer": "https://www.supremenewyork.com/mobile/",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en-CA,en-US;q=0.9,en;q=0.8",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: qs.stringify({
                        'from_mobile': 1,
                        'cookie-sub': urlEncoded,
                        'current_time': timestamp,
                        'same_as_billing_address' : 1,
                        'order': {
                            'billing_name' : profiles[loopTwo].billingAddress.name,
                            'email' : profiles[loopTwo].billingAddress.email,
                            'tel' : phoneConverted,
                            'billing_address' : profiles[loopTwo].billingAddress.line1,
                            'billing_address_2' : profiles[loopTwo].billingAddress.line2,
                            'billing_zip' : profiles[loopTwo].billingAddress.postCode,
                            'billing_city' : profiles[loopTwo].billingAddress.city,
                            'billing_state' : theRealState,
                            'billing_country' : "USA",
                            'terms' : 1,
                        },
                        'credit_card' : {
                            'type' : "credit card",
                            'number' : convertedCardNumber,
                            'month' : profiles[loopTwo].paymentDetails.cardExpMonth,
                            'year' : profiles[loopTwo].paymentDetails.cardExpYear,
                            'verification_value' : profiles[loopTwo].paymentDetails.cardCvv,
                        },
                        'h-captcha-response' : captchaResCheckout
                    }),
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                })

                if(response.data) {
                    if(response.data.status == 'failed' && response.data.page) {
                        const dayta = response.data.page
                        const regex = /unable to process your order/
                        const found = regex.test(dayta);
                        if(found) {
                            console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (TRAFFIC ERROR)'.red.bold);
                            return runOfficial(negativeKeywords, positiveKeywords, profiles);
                        } else {
                            console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (UNKNOWN ERROR)'.red.bold);
                            return runOfficial(negativeKeywords, positiveKeywords, profiles);
                        }
                    } else if(response.data.status == "queued") {
                        console.log('TASK STATUS: '.bold + 'WAITING IN SPLASH...'.cyan.bold);
                        console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT (MAYBE GHOST)'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🎉 Successful Checkout 🎉')
                            .addField('Site', 'Supreme', true)
                            .addField('Mode', mode, true)
                            .addField('Captcha Bypass', 'true')
                            .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")

                    } else if(response.data.status == 'failed') {
                        if(response.data.info.email) {
                            console.log('TASK STATUS: '.bold + 'ERROR CHECKING OUT (ADDRESS BAN)'.red.bold);
                            return runOfficial(negativeKeywords, positiveKeywords, profiles);
                        } else {
                            console.log('TASK STATUS: '.bold + 'ERROR CHECKING OUT'.red.bold);
                            return runOfficial(negativeKeywords, positiveKeywords, profiles);
                        }
                    } else {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🎉 Successful Checkout 🎉')
                            .addField('Site', 'Supreme', true)
                            .addField('Mode', mode, true)
                            .addField('Captcha Bypass', 'true')
                            .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                    }
                    
                }

            } catch (e) {
                console.log(e)
            }
        }

        async function submitCheckout(cookies, csrfToken) {

            console.log('TASK STATUS: '.bold + 'SUBMITTING CHECKOUT'.magenta.bold);

            let captchaResCheckout = "";

            if(mode == "Super Safe") {
                captchaResCheckout = await solveTwoCap('hcaptcha', '9c1f7658-2de8-43d2-abca-6660f344ea1c', 'https://www.supremenewyork.com/checkout');
            }

            //loop
            const loopTwo = loop - 1;

            const timestamp = Date.now();
            const theRealState = states.abbr(profiles[loopTwo].billingAddress.state);
            var phoneConverted = profiles[loopTwo].billingAddress.phone.substring(0, 3) + "-" + profiles[loopTwo].billingAddress.phone.substring(3, 6) + "-" + profiles[loopTwo].billingAddress.phone.substring(6, 10);
            var convertedCardNumber = profiles[loopTwo].paymentDetails.cardNumber.strip.match(/.{1,4}/g).join(' ');

            try {
                const response = await axios({
                    method: 'POST',
                    url: 'https://www.supremenewyork.com/checkout.json',
                    headers: {
                        "Host": "www.supremenewyork.com",
                        "Cookie": cookies,
                        "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="104"',
                        "X-Csrf-Token": csrfToken,
                        "Sec-Ch-Ua-Mobile": "?0",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36",
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "*/*",
                        "X-Requested-With": "XMLHttpRequest",
                        "Sec-Ch-Ua-Platform": '"Windows"',
                        "Origin": "https://www.supremenewyork.com",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Dest": "empty",
                        "Referer": "https://www.supremenewyork.com/checkout",
                        "Accept-Encoding": "gzip, deflate",
                    },
                    data: qs.stringify({
                        "authenticity_token": csrfToken,
                        "credit_card[month]": profiles[loopTwo].paymentDetails.cardExpMonth,
                        "credit_card[number]": convertedCardNumber,
                        "credit_card[type]": "credit card",
                        "credit_card[verification_value]": profiles[loopTwo].paymentDetails.cardCvv,
                        "credit_card[year]": profiles[loopTwo].paymentDetails.cardExpYear,
                        "current_time": timestamp,
                        "h-captcha-response": captchaResCheckout,
                        "order[billing_address]": profiles[loopTwo].billingAddress.line1,
                        "order[billing_address_2]": profiles[loopTwo].billingAddress.line2,
                        "order[billing_city]": profiles[loopTwo].billingAddress.city,
                        "order[billing_country]": "USA",
                        "order[billing_name]": profiles[loopTwo].billingAddress.name,
                        "order[billing_state]": theRealState,
                        "order[billing_zip]": profiles[loopTwo].billingAddress.postCode,
                        "order[email]": profiles[loopTwo].billingAddress.email,
                        "order[tel]": phoneConverted,
                        "order[terms]": '1',
                        "same_as_billing_address": "1",
                        "store_credit_id": "",
                        "utf8": "✓"
                      }),
                    proxy: {
                        host: splitproxy[0],
                        port: splitproxy[1],
                        auth: {
                            username: splitproxy[2],
                            password: splitproxy[3].replace('\r', '')
                        }
                    },
                    timeout: 10000
                })

                if(response.data) {
                    if(response.data.status == 'failed' && response.data.page) {
                        const dayta = response.data.page
                        const regex = /unable to process your order/
                        const found = regex.test(dayta);
                        if(found) {
                            console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (TRAFFIC ERROR)'.red.bold);
                            return runOfficial(negativeKeywords, positiveKeywords, profiles);
                        } else {
                            console.log('TASK STATUS: '.bold + 'CHECKOUT FAILED (UNKNOWN ERROR)'.red.bold);
                            return runOfficial(negativeKeywords, positiveKeywords, profiles);
                        }
                    } else if(response.data.status == "queued") {
                        console.log('TASK STATUS: '.bold + 'WAITING IN SPLASH...'.cyan.bold);
                        console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT (MAYBE GHOST)'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🎉 Successful Checkout 🎉')
                            .addField('Site', 'Supreme', true)
                            .addField('Mode', mode, true)
                            .addField('Captcha Bypass', 'true')
                            .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")

                    } else if(response.data.status == 'failed') {
                        console.log('TASK STATUS: '.bold + 'ERROR CHECKING OUT'.red.bold);
                        return runOfficial(negativeKeywords, positiveKeywords, profiles);
                    } else {
                        console.log('TASK STATUS: '.bold + 'SUCCESSFUL CHECKOUT'.green.bold);

                        const hook = new Webhook(credentials.discordWebhook);

                        hook.setUsername('SplashAIO');
                        hook.setAvatar(webhookIMG);

                        const embed = new MessageBuilder()
                            .setTitle('🎉 Successful Checkout 🎉')
                            .addField('Site', 'Supreme', true)
                            .addField('Mode', mode, true)
                            .addField('Captcha Bypass', 'true')
                            .addField('Profile', '||' + profiles[loopTwo].billingAddress.email + '||')
                            .setColor(webhookColor)
                            .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
                            .setDescription('')
                            .setImage('')
                            .setFooter('SplashAIO', webhookIMG)
                            .setTimestamp();

                        await hook.send(embed);
                        await masterLog(secretKey);
                        await masterLogAdmin(license, secretKey);
                        await grabAnalytics(hostHeader, license, secretKey, "Add")
                    }
                    
                }

            } catch (e) {
                console.log('TASK STATUS: '.bold + 'ERROR SUBMITTING CHECKOUT'.red.bold);
                return runOfficial(negativeKeywords, positiveKeywords, profiles)
            }
        }
    }

    async function masterLog(secretKey) {

        const sharedHook = await secretStringDecryption(encryptedHook, secretKey)
        const hook = new Webhook(sharedHook);

        hook.setUsername('SplashAIO');
        hook.setAvatar(webhookIMG);

        const embed = new MessageBuilder()
            .setTitle('🎉 Successful Checkout 🎉')
            .addField('Site', 'Supreme', true)
            .addField('Mode', mode, true)
            .addField('Captcha Bypass', 'true')
            .setColor(webhookColor)
            .setThumbnail('https://www.highsnobiety.com/static-assets/thumbor/E5emcBnpY8iVPR0M3kp1vrotjSM=/1000x600/www.highsnobiety.com/static-assets/wp-content/uploads/2018/01/16110157/supreme-box-logo-00.jpg')
            .setDescription('')
            .setImage('')
            .setFooter('SplashAIO', webhookIMG)
            .setTimestamp();


        hook.send(embed);

    }
    
}

module.exports = {supremeUS}