// importaciones
const { navigateHTTPS } = require("./functions");
const { stringtablehtmlToJson } = require("../general");

// Datos de acceso
const MIKROWISP_URL = "http://167.71.189.123/";
const MIKROWISP_USER = "snakepatch53";
const MIKROWISP_PASS = "Harold-12";

// Selectores html
const S_LOGIN_USER = "input[name=login]";
const S_LOGIN_PASS = "input[name=password]";
const S_LOGIN_SUBMIT = ".btn.btn-success.btn-block.btn-lg";

// funciones
async function login(page) {
    try {
        await navigateHTTPS(page, `${MIKROWISP_URL}admin/login`);
        await page.waitForSelector(S_LOGIN_USER);
        await page.locator(S_LOGIN_USER).fill(MIKROWISP_USER);
        await page.locator(S_LOGIN_PASS).fill(MIKROWISP_PASS);
        await page.locator(S_LOGIN_SUBMIT).click();
        await page.waitForSelector("#header");
        return true;
    } catch (err) {
        return false;
    }
}

async function getClients(page) {
    if (!(await login(page))) return false;
    await navigateHTTPS(page, `${MIKROWISP_URL}admin/#ajax/usuarios`);
    await page.locator("button.btn.btn-secondary.buttons-collection.dropdown-toggle.buttons-page-length").click();
    await page.locator("a.dt-button.dropdown-item.button-page-length span >> text=Mostrar Todos").click();
    const $str_table = await page.innerHTML("#data-usuarios tbody");
    const client_list = stringtablehtmlToJson($str_table);
    return client_list;
}

module.exports = { getClients };
