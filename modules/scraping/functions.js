// MODULES
const { timeout } = require("../general/");
const getRouterType = require("../../router_types");

// FUNCTIONS
async function navigateHTTPS(page, url) {
    await page.goto(url);
    const BODY = (await page.innerHTML("*")).toLowerCase();
    if (!BODY.includes("err_cert_authority_invalid")) return true;
    await page.locator("#details-button").click();
    await page.locator("#proceed-link").click();
    await page.waitForNavigation();
    return true;
}

async function getDevice(page, ipv4, port) {
    await navigateHTTPS(page, `http://${ipv4}:${port}`);
    const html_body = (await page.innerHTML("*")).toLowerCase();
    let router_type = await getRouterType(html_body);
    return router_type ?? false;
}

// EXPORTS
module.exports = {
    getDevice,
    navigateHTTPS,
};
