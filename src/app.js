const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routerUsuarios = require('./modules/usuarios/routeUsuarios');
const routerContactos = require('./modules/contactos/routeContacts');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// configuraciones
app.set('port', port);
// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cors());
//este middleware es para que express pueda entender los json
app.use(express.json());

//exportado de rutas de la carpeta routes
app.use(routerUsuarios);
app.use(routerContactos);

// Exportado del aplicativo general
module.exports = {
    app
};

