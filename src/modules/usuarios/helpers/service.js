const jwt = require('jsonwebtoken');
require('dotenv').config();

const validEmployee = (newUser, id_empleado = 0) => {
    let mensaje = "";
    const { nombre, apellidos } = newUser;


    if (isNaN(id_empleado)) {
        mensaje = "Inserte un id valido";
    }

    if (nombre === "") {
        mensaje = "Nombre requerido";
    }

    if (apellidos === "") {
        mensaje = "Apellidos requeridos";
    }
    return mensaje;
}

const generateToken = (user) => {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '60m' });
}

const validateToken = (req, res, next) => {


    const sinToken = req.headers.authorization;
    
    if (sinToken === undefined) {
        res.send("Acceso denegado,configure su token de acceso");
    }
    
    const accesToken = req.headers.authorization.split(' ')[1];

    jwt.verify(accesToken, process.env.SECRET, (err, user) => {
        if (err) {
            res.send("Token expirado o incorrecto");
        } else {
            next();
        }
    });




}


module.exports = {
    validEmployee,
    generateToken,
    validateToken
};