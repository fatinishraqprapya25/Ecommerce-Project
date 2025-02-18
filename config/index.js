const dotenv = require('dotenv');
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

module.exports = {
    port: process.env.PORT,
    dbString: process.env.MONGO_CONNECTION_STRING,
    bcryptCircle: Number(process.env.BCRYPT_CIRCLE_COUNT),
    jwtSecret: process.env.JWT_SECRET,
    email: process.env.EMAIL,
    emailPass: process.env.APP_PASS
}