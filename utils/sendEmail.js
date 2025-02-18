const nodemailer = require("nodemailer");

const sendEmail = async (mailDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "",
                pass: ""
            }
        });
        const info = await transporter.sendEmail(mailDetails);
        return info;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = sendEmail;