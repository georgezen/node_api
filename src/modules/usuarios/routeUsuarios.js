const express = require('express');
const routerUsuarios = express.Router();
const { validateToken } = require('./helpers/service');

const {getUsers,addUser,getUser,
    deleteUser,
    updateUser,
    authUser
} = require('./usuariosController');

//definicion de rutas para el routerUsuarios
routerUsuarios.get('/api/usuarios',validateToken,getUsers);
routerUsuarios.post('/api/usuarios',validateToken,addUser);
routerUsuarios.get('/api/usuario/:id',validateToken,getUser);
routerUsuarios.delete('/api/usuario/:id',validateToken,deleteUser);
routerUsuarios.put('/api/usuario/:id',validateToken,updateUser);
routerUsuarios.post('/api/usuarios/auth',authUser);


module.exports = routerUsuarios;