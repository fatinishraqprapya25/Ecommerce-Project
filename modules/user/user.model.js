const { default: mongoose } = require("mongoose");
const config = require("../../config");
const bcrypt = require("bcrypt");

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
    status: {
        type: String,
        enum: ["active", "disabled"],
        default: "active"
    },
    profile: {
        fileName: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true
        }
    },
    verificationCode: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    address: {
        type: String
    }
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, config.bcryptCircle);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;