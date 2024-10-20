const app = require("./app");
const config = require("./config");
const mongoose = require("mongoose");

let server;

const main = async () => {
    try {
        await mongoose.connect(config.dbString);
        server = app.listen(config.port, function () {
            console.log("Server listening at port ", config.port);
        });
    } catch (err) {
        console.log(err);
    }
}

main();