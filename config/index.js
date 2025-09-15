const dotenv = require('dotenv');
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), ".env") });

module.exports = {
    port: process.env.PORT,
    dbString: process.env.MONGO_CONNECTION_STRING,
    bcryptCircle: parseInt(process.env.BCRYPT_CIRCLE_COUNT),
    jwtSecret: process.env.JWT_SECRET,
    email: process.env.EMAIL,
    emailPass: process.env.APP_PASS,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
}