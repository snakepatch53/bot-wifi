const { navigateHTTPS } = require("../modules/scraping/functions");

const data = {
    brand: "TP-LINK",
    version: "WR940N",
};

// constantes
const S_USER = "#userName";
const S_PASS = "#pcPassword";
const S_BTN_LOGIN = "#loginBtn";

const S_A_WIFI = "#a8";
const S_A_WIFI_SEC = "#a10";
const S_A_WIFI_PASS = "#pskSecret";

async function login(page, ipv4, port, JSON_USERS, JSON_PASSWORDS) {
    navigateHTTPS(page, `http://${ipv4}:${port}`);
    let steps = 0;
    for (let _user of JSON_USERS) {
        for (let _pass of JSON_PASSWORDS) {
            console.log(steps++);
            await page.waitForSelector(S_USER);
            await page.locator(S_USER).fill(_user);
            await page.locator(S_PASS).fill(_pass);
            await page.locator(S_BTN_LOGIN).click();
            // page.waitForLoadState("domcontentloaded");
            const html_body = (await page.innerHTML("*")).toLowerCase();
            if (!html_body.includes("iniciar sesión")) return true;
        }
    }
    return false;
}

async function changePass(page, ipv4, port, JSON_USERS, JSON_PASSWORDS, newpass) {
    navigateHTTPS(page, `http://${ipv4}:${port}`);
    await page.locator(S_A_WIFI).click();
    await page.locator(S_A_WIFI_SEC).click();
    await page.locator(S_A_WIFI_PASS).fill(newpass);
}

module.exports = { data, changePass, login };
