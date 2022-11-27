const { changeSSID, changePass, getClient } = require("../scraping");
const { refreshSession, clearStepsSession, addDataSession, clearDataSession, getDataValueSession } = require("../bot/sessions");

const commandList = {
    1: {
        name: "comprobar_usuario",
        fun: async function ({ value, session }) {
            const client = await getClient(value);
            if (!client) clearStepsSession(session);
            await addDataSession(session, "client", client);
            return client ? true : false;
        },
    },
    2: {
        name: "guardar_nueva_clave",
        fun: async function ({ value, session }) {
            await addDataSession(session, "new_pass", value);
            session = refreshSession(session);

            const client = getDataValueSession(session, "client");
            const new_pass = getDataValueSession(session, "new_pass");
            const isSuccess = await changePass(new_pass, client.ip);
            clearDataSession(session);
            return isSuccess;
        },
    },
};

module.exports = async function (step, msg, client, send, session) {
    const data = {
        step,
        value: step.client_value,
        from: msg.from,
        to: msg.to,
        msg: msg.body,
        client,
        send,
        session,
    };
    let command = commandList[step.js_code.code];
    if (!command) command = commandList.find((cmm) => cmm.name == step.js_code.name);
    if (await command.fun(data)) {
        return step.js_code.true_response;
    } else {
        return step.js_code.false_response;
    }
};
