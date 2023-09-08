const mysql = require('promise-mysql');
//const {host,user,password,database} = require('./../config');
require('dotenv').config();
//require('../node_modules/dotenv').config();
const conection = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

const getConection =  () => {
	return conection;
}

module.exports = {getConection};