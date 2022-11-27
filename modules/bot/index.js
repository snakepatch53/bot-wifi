const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
function initializeClient(onmessage) {
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: "localauth" }),
    });
    client.on("qr", (qr) => qrcode.generate(qr, "small"));
    client.on("ready", () => console.log("Client is ready!"));
    client.on("message", (msg) => onmessage(msg, client));
    client.initialize();
}
module.exports = initializeClient;
