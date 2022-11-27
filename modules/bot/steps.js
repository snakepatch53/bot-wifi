const RESPONSES = require("../data_reponses");
function getStep(session, value) {
    const history_steps = session.history_steps;
    if (history_steps.length == 0) return getStepByTrigger(RESPONSES, "*");

    const history_step = history_steps[history_steps.length - 1];
    let step_old = getStepById(RESPONSES, history_step.id);
    step_old.client_value = history_step.value;
    if (Object.prototype.toString.call(step_old.options) == "[object Number]") {
        let step = getStepById(RESPONSES, step_old.options);
        step.client_value = value;
        return step;
    }
    if (step_old.options.length == 0) return getStepByTrigger(RESPONSES, value);

    let free_steps = RESPONSES.filter((rs) => step_old.options.includes(rs.id));
    let step = getStepByTrigger(free_steps, value);
    if (step) step.step_old = step_old;
    return step;
}

function getStepByTrigger(options, trigger) {
    let step = options.find((rs) => {
        let comparacion1 = trigger.toLowerCase();
        // return rs.triggers.find((tgg) => tgg.toLowerCase().includes(comparacion1) || comparacion1.toLowerCase().includes(tgg.toLowerCase()));
        return rs.triggers.find((tgg) => comparacion1.toLowerCase().includes(tgg.toLowerCase()));
    });
    if (step) step.step_old = {};
    return step ?? false;
}

function getStepById(options, id) {
    let step = options.find((rs) => rs.id == id);
    if (step) step.step_old = {};
    return step ?? false;
}

function getNewStepSession(step_id, step_value) {
    return {
        id: step_id,
        value: step_value,
    };
}

function isStepFinal(step) {
    if (!step.options) return true;
    if (Object.prototype.toString.call(step.options) == "[object Array]") {
        if (step.options.length == 0) return true;
    }
    return false;
}

module.exports = { getStep, getStepByTrigger, getStepById, getNewStepSession, isStepFinal };
