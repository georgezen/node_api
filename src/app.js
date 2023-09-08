const express = require('express');
const morgan = require('morgan');
const routerUsuarios = require('./modules/usuarios/routeUsuarios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// configuraciones
app.set('port', port);
// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//este middleware es para que express pueda entender los json
app.use(express.json());

//exportado de rutas de la carpeta routes
app.use(routerUsuarios);

module.exports = {
    app
};

