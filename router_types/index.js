// const WR940N = require("./wr940n");
const { readDir } = require("../modules/general");

async function getRouterType(name_str) {
    const types = await readDir("./router_types");
    for (let type of types) {
        const element_name = type.split(".", 1)[0];
        const element_name_ = element_name.toLowerCase();
        if (name_str.toLowerCase().includes(element_name_) && element_name_ != "index") {
            return require(`./${element_name}`);
        }
    }
    return false;
}

module.exports = getRouterType;
