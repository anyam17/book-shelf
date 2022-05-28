const dotenv = require('dotenv');
dotenv.config();

const config = {
    production: {
        SECRET: process.env.SESSION_SECRET,
        DATABASE_URL: process.env.MONGODB_URI
    },
    default: {
        PORT: process.env.PORT,
        APP_SECRET: process.env.APP_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
        
        ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
        BUCKET_NAME: process.env.BUCKET_NAME
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}