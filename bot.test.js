const initializeClient = require("./modules/bot");
const executeCommand = require("./modules/bot/executeCommand");
const RESPONSES = require("./modules/data_reponses");
const { getStep, getStepByTrigger, getStepById, getNewStepSession, isStepFinal } = require("./modules/bot/steps");
const { getSessions, getSession, refreshSession, addSession, addStepSession, clearStepsSession } = require("./modules/bot/sessions");
const { getRandomArbitrary } = require("./modules/general");

initializeClient(async (msg, client) => {
    try {
        await onmessage(msg, client);
    } catch (err) {
        console.log(err);
    }
});

async function onmessage(msg, client) {
    // cargo variables
    const number = msg.from;
    const value = msg.body;
    const send = (msg) => client.sendMessage(number, msg);

    // cargo las sesiones actuales en memoria
    getSessions();

    // cargo la session del client
    let SESSION = getSession(number);
    if (!SESSION) SESSION = await addSession(number);

    // identifico si tengo un step anterior
    const STEP = getStep(SESSION, value);
    if (!STEP) return send("No entendimos tu peticion 😥");
    let rs_msg = STEP.responses;
    if (Object.prototype.toString.call(STEP.options) == "[object Array]") {
        rs_msg += STEP.options.map((id) => "\n" + getStepById(RESPONSES, id).name);
    }
    send(rs_msg);
    // agrego y refresco la session
    await addStepSession(SESSION, getNewStepSession(STEP.id, value));
    SESSION = refreshSession(SESSION);
    if (STEP.js_code.code) send(await executeCommand(STEP, msg, client, send, SESSION));

    if (isStepFinal(STEP)) clearStepsSession(SESSION);
}
