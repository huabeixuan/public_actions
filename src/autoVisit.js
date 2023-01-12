const puppeteer = require("puppeteer");
const juejinUrl = 'https://juejin.cn'
const cookie = require('cookie');
const { COOKIE } = process.env;

const temp = 'ttcid=7c3c4c7d8e4a441ba7ed927c28df12fc26; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227124959312283944455%2522%252C%2522user_unique_id%2522%253A%25227124959312283944455%2522%252C%2522timestamp%2522%253A1658908869056%257D; sid_guard=434757af6600eab0320553808734dda1%7C1658977493%7C31536000%7CFri%2C+28-Jul-2023+03%3A04%3A53+GMT; uid_tt=8eab98d173160ff7f82110282d6ba77c; uid_tt_ss=8eab98d173160ff7f82110282d6ba77c; sid_tt=434757af6600eab0320553808734dda1; sessionid=434757af6600eab0320553808734dda1; sessionid_ss=434757af6600eab0320553808734dda1; sid_ucp_v1=1.0.0-KDZhNTY5MjhlMDgwMjI3YzZlOGZlMTg2M2Y4MGY4N2E4ZWM2NzczNmIKFwinoYC4k4zEAhDV-YeXBhiwFDgCQPEHGgJsZiIgNDM0NzU3YWY2NjAwZWFiMDMyMDU1MzgwODczNGRkYTE; ssid_ucp_v1=1.0.0-KDZhNTY5MjhlMDgwMjI3YzZlOGZlMTg2M2Y4MGY4N2E4ZWM2NzczNmIKFwinoYC4k4zEAhDV-YeXBhiwFDgCQPEHGgJsZiIgNDM0NzU3YWY2NjAwZWFiMDMyMDU1MzgwODczNGRkYTE; MONITOR_WEB_ID=bdf30ac3-d9f6-49b6-83d2-9bd1c08304a1; _tea_utm_cache_2608={%22utm_medium%22:%22user_center%22%2C%22utm_campaign%22:%22ad%22}; tt_scid=j1MznNc0O1UE475yzr9f2gVwxSLEX-7duTOq9d.7ZFJpQJyj0Jdx5XPfOClXhCzOcca2'

const visit = async () => {
    try {
        const browser = await puppeteer.launch({ headless: true }); //打开浏览器, headless 为 false 的时候，能够看见浏览器的整个过程
        const page = await browser.newPage(); //打开一个空白页
        const parseCookie = cookie.parse(temp)
        const cookies =  Object.keys(parseCookie).map(key=>{
            return {
                name: key,
                value: parseCookie[key],
                url:juejinUrl
            }
        });
        await page.setCookie(...cookies)
        await page.goto('https://juejin.cn/'); //打开网站
        await page.click("button.add-btn"); // 点击登陆的按钮 （也能够是其余的选择器）
        await page.waitForNavigation({
            waitUntil: "load",
            timeout: 0,
          }); //等待页面加载出来，等同于window.onload
        console.log("模拟登录成功");
        await browser.close(); //关掉浏览器
        return Promise.resolve('模拟登录成功')
    } catch(e) {
        console.log(e);
        return Promise.reject('e')
    }
  
}

visit()
module.exports = visit;