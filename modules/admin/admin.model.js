const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    addedBy: {
        type: mongoose.Types.mixed,
        required: true,
        default: "main_admin"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Admin = mongoose.model(adminSchema);

module.exports = Admin;