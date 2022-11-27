const { changeSSID, changePass, getClient } = require("./modules/scraping");
(async () => {
    // await changePass("xd", "10.1.15.10");
    // await changePass("xd", "10.2.13.20");
    // await changeSSID("HOA MUNDO", "10.2.13.20");
    // await changePass("xd", "10.1.3.6");
    const client = await getClient("julio");
    console.log(client);
})();
