const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "disabled"],
        default: "active"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;