const fs = require("fs");
const path = require("path");

let sessions = [];

// variables
const SESSIONS_PATH = path.join(__dirname, "../../data/sessions.json");

function getSessions() {
    let rawdata = fs.readFileSync(SESSIONS_PATH);
    sessions = JSON.parse(rawdata);
    return sessions;
}
function getSession(number) {
    getSessions();
    const session = sessions.find((ssn) => ssn.number == number);
    return session ?? false;
}
function refreshSession(_session) {
    getSessions();
    const session = sessions.find((ssn) => ssn.number == _session.number);
    return session ?? false;
}
async function addSession(number) {
    getSessions();
    const newSession = {
        number,
        history_steps: [],
        data: [],
    };
    sessions.push(newSession);
    const data = JSON.stringify(sessions);
    await fs.writeFileSync(SESSIONS_PATH, data);
    return newSession;
}
async function addStepSession(session, newStep) {
    getSessions();
    sessions.map((sssn) => {
        if (sssn.number == session.number) sssn.history_steps.push(newStep);
    });
    const data = JSON.stringify(sessions);
    await fs.writeFileSync(SESSIONS_PATH, data);
    return newStep;
}
function clearStepsSession(session) {
    getSessions();
    sessions.map((sssn) => {
        if (sssn.number == session.number) sssn.history_steps = [];
    });
    const data = JSON.stringify(sessions);
    fs.writeFileSync(SESSIONS_PATH, data);
    return true;
}
async function addDataSession(session, key, value) {
    getSessions();
    const newData = { key, value };
    sessions.map((sssn) => {
        if (sssn.number == session.number) sssn.data.push(newData);
    });
    const data = JSON.stringify(sessions);
    await fs.writeFileSync(SESSIONS_PATH, data);
    return newData;
}
function getDataValueSession(session, key) {
    let data = session.data.find((dt) => dt.key == key);
    return data.value ?? false;
}
function clearDataSession(session) {
    getSessions();
    sessions.map((sssn) => {
        if (sssn.number == session.number) sssn.data = [];
    });
    const data = JSON.stringify(sessions);
    fs.writeFileSync(SESSIONS_PATH, data);
    return true;
}

module.exports = {
    getSessions,
    getSession,
    refreshSession,
    addSession,
    addStepSession,
    clearStepsSession,
    addDataSession,
    clearDataSession,
    getDataValueSession,
};
