const express = require('express');
const routerContacts = express.Router();
const { validateToken } = require('./helpers/service');

const { getContacts,
    addContact,
    getContact,
    deleteContact,
    updateContact
} = require('./contactosController');

//definicion de rutas para el routerContacts
routerContacts.get('/api/contactos', validateToken, getContacts);
routerContacts.post('/api/contactos', validateToken, addContact);
routerContacts.get('/api/contacto/:id', validateToken, getContact);
routerContacts.delete('/api/contacto/:id', validateToken, deleteContact);
routerContacts.put('/api/contacto/:id', validateToken, updateContact);


module.exports = routerContacts;