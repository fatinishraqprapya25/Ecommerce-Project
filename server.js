const app = require("./app");
const config = require("./config");
const mongoose = require("mongoose");
const User = require("./modules/user/user.model");
const Admin = require("./modules/admin/admin.model");

let server;

const main = async () => {
    try {
        await mongoose.connect(config.dbString)
            .then(() => {
                console.log("connected to database");
            })
        server = app.listen(config.port, function () {
            console.log("Server listening at port ", config.port);
        });
    } catch (err) {
        console.log(err);
    }
}

main();