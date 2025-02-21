const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Admin"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;