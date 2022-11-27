// modules
const { navigate } = require("./navigate");
const { getDevice } = require("./functions");
const { getClients } = require("./functions_mikrowisp");
const { getPort } = require("../general/");

// data
const JSON_USERS = require("../../data/users.json");
const JSON_PASSWORDS = require("../../data/passwords.json");

// functions
async function changeSSID(newSSID, ipv4) {
    let port = await getPort(ipv4);
    if (!port) return false;

    return await navigate(async (browser, context, page) => {
        const DEVICE = await getDevice(page, ipv4, port);
        const isLoged = await DEVICE.login(page, ipv4, port, JSON_USERS, JSON_PASSWORDS);
        if (!isLoged) return false;
        return await DEVICE.changeSSID(page, ipv4, port, newSSID);
    });
}

async function changePass(newPass, ipv4) {
    let port = await getPort(ipv4);
    if (!port) return false;

    return await navigate(async (browser, context, page) => {
        const DEVICE = await getDevice(page, ipv4, port);
        const isLoged = await DEVICE.login(page, ipv4, port, JSON_USERS, JSON_PASSWORDS);
        if (!isLoged) return false;
        return await DEVICE.changePass(page, ipv4, port, newPass);
    });
}

async function getClient(client_name) {
    // const number = getNumberFromWhatsapp(whatsapp_number);
    return new Promise(async (resolve) => {
        await navigate(async (browser, context, page) => {
            const client_list = await getClients(page);
            const client = client_list.find((cl) => {
                const cl1 = cl.name.toLowerCase().trim();
                const cl2 = client_name.toLowerCase().trim();
                return cl1.includes(cl2) || cl2.includes(cl1);
            });
            resolve(client || false);
        });
    });
}

// exports
module.exports = { changeSSID, changePass, getClient };
