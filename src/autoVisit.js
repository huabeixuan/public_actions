import puppeteer from "puppeteer";
const juejinUrl = 'https://juejin.cn'
const { COOKIE } = process.env;

const visit = () => {
    try {
        const browser = await puppeteer.launch({ headless: true }); //打开浏览器, headless 为 false 的时候，能够看见浏览器的整个过程
        const page = await browser.newPage(); //打开一个空白页
        const cookies =  COOKIE.split(';').map(item => { const [name, value] = item.split(':'); return { name, value, url: juejinUrl } });
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
        return Promise.reject('e')
    }
  
}