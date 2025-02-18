const nodemailer = require("nodemailer");
const config = require("../config");

const sendEmail = async (mailDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email,
                pass: config.emailPass
            }
        });
        const info = await transporter.sendMail(mailDetails);
        return info;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = sendEmail;