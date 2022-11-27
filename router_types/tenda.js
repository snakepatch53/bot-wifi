const { navigateHTTPS } = require("../modules/scraping/functions");

const data = {
    brand: "TENDA",
    version: "TENDA",
};

// constantes
const S_PASS = "#login-password";
const S_BTN_LOGIN = "#save";
const S_BTN_LOGOUT = "#loginout";

const S_A_WIFI = "#wireless";
const S_A_WIFI_SSID = "#wifiSSID";
const S_A_WIFI_PASS = "#wifiPwd";
const S_A_WIFI_SUBMIT = "#submit";

const S_A_FORM_MODAL_MSG = "#form-massage";

async function login(page, ipv4, port, JSON_USERS, JSON_PASSWORDS) {
    navigateHTTPS(page, `http://${ipv4}:${port}`);
    for (let _user of JSON_USERS) {
        for (let _pass of JSON_PASSWORDS) {
            await page.waitForSelector(S_PASS);
            await page.locator(S_PASS).fill(_pass);
            await page.locator(S_BTN_LOGIN).click();
            const html_body = (await page.innerHTML("*")).toLowerCase();
            if (!html_body.includes("iniciar sesión")) return true;
        }
    }
    return false;
}

async function changeSSID(page, ipv4, port, newSSID) {
    navigateHTTPS(page, `http://${ipv4}:${port}`);
    await page.waitForSelector(S_A_WIFI);
    await page.locator(S_A_WIFI).click();
    await page.waitForSelector(S_A_WIFI_SSID);
    await page.waitForFunction((S_A_WIFI_SSID) => document.querySelector(S_A_WIFI_SSID).value != "", S_A_WIFI_SSID);

    await page.locator(S_A_WIFI_SSID).fill(newSSID);
    await page.locator(S_A_WIFI_SUBMIT).click({ force: true, strict: true });
    await page.waitForSelector(`${S_A_FORM_MODAL_MSG} >> text=Guardado exitosamente`);
    await page.locator(S_BTN_LOGOUT).click();
    await page.waitForSelector(S_A_WIFI_PASS);
    return true;
}

async function changePass(page, ipv4, port, newpass) {
    navigateHTTPS(page, `http://${ipv4}:${port}`);
    await page.waitForSelector(S_A_WIFI);
    await page.locator(S_A_WIFI).click();
    await page.waitForSelector(S_A_WIFI_PASS);
    await page.waitForFunction((S_A_WIFI_PASS) => document.querySelector(S_A_WIFI_PASS).value != "", S_A_WIFI_PASS);

    // await page.locator("#wifiPwd ~ label.invis-eyes").click();
    await page.locator(S_A_WIFI_PASS).fill(newpass);
    await page.locator(S_A_WIFI_SUBMIT).click({ force: true, strict: true });
    await page.waitForSelector(`${S_A_FORM_MODAL_MSG} >> text=Guardado exitosamente`);
    await page.locator(S_BTN_LOGOUT).click();
    await page.waitForSelector(S_A_WIFI_PASS);
    return true;
}

module.exports = { data, changeSSID, changePass, login };
