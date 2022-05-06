require("dotenv").config();
module.exports = {
    mongoURI: "mongodb://127.0.0.1:27017/marketplace",
    port: process.env.PORT,
    pinataApiKey: process.env.pinataApiKey,
    pinataSecretApiKey: process.env.pinataSecretApiKey
};
