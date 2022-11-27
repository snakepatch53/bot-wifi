// MODULES
const net = require("net");
const fs = require("fs");

// FUNCTIONS
async function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve(), ms);
    });
}

function ping(ipv4, port) {
    return new Promise((resolve) => {
        var sock = new net.Socket();
        sock.setTimeout(2500);
        sock.on("connect", function () {
            sock.destroy();
            resolve(true);
        })
            .on("error", (e) => {
                sock.destroy();
                resolve(false);
            })
            .on("timeout", (e) => {
                sock.destroy();
                resolve(false);
            })
            .connect(port, ipv4);
    });
}

async function getPort(ipv4) {
    if (await ping(ipv4, 8080)) return 8080;
    if (await ping(ipv4, 80)) return 80;
    return false;
}

async function getPorts(ipv4, JSON_PORTS) {
    let accessible = false;
    const PORTS = [];
    for (let i = 0; i < JSON_PORTS.length && !accessible; i++) {
        const PORT = JSON_PORTS[i];
        if (await ping(ipv4, PORT)) PORTS.push(PORT);
    }
    return PORTS;
}

function readDir(path_folder) {
    return new Promise((resolve) => {
        fs.readdir(path_folder, (err, files) => {
            let files_arr = [];
            files.forEach((file) => {
                files_arr.push(file);
            });
            resolve(files_arr);
        });
    });
}

function getNumberFromWhatsapp(whatsapp_number) {
    const withoutCode = whatsapp_number.split("@", 1)[0];
    return "0" + withoutCode.substring(withoutCode.length - 9);
}

function stringtablehtmlToJson(stringtablehtml) {
    const $TRS = stringtablehtml.split("</tr>");
    const json = $TRS.map((tr) => ({
        id: ((tr.split("</td>")[1] + "").split('">')[1] + "").trimStart().trimEnd(),
        name: (((tr.split("</td>")[2] + "").split("<small>")[0] + "").split('">')[1] + "").trimStart().trimEnd(),
        ip: (((tr.split("</td>")[3] + "").split("</a>")[0] + "").split('">')[1] + "").trimStart().trimEnd(),
    }));
    return json;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    timeout,
    ping,
    getPort,
    getPorts,
    readDir,
    getNumberFromWhatsapp,
    stringtablehtmlToJson,
    getRandomArbitrary,
};
