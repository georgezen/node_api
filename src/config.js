require('dotenv').config();



module.exports = {
    host: process.env.HOST || '',
    database: process.env.DATABASE || '',
    user: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
};