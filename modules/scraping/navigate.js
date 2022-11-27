// modules
const { chromium } = require("playwright");

// functions
async function navigate(actions) {
    // Make sure to run headed.
    const browser = await chromium.launch({ headless: false });
    // Setup context however you like.
    const context = await browser.newContext({
        /* pass any options */
    });
    // await context.route("**/*", (route) => route.continue());
    // Pause the page, and start recording manually.
    const page = await context.newPage();
    // await page.goto("https://www.mercadolibre.com.ec/#from=homecom");
    // await page.screenshot({ path: `example.png` });
    // await page.locator(".nav-search .nav-search-input").fill(text);
    // await page.locator(".nav-search .nav-search-btn").click(text);
    // await page.waitForNavigation();
    const isSuccess = await actions(browser, context, page);
    await browser.close();
    return isSuccess;
}

// exports
module.exports = { navigate };
