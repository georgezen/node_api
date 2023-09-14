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
    return jwt.sign(user, process.env.SECRET, { expiresIn: '30m' });
}

const validateToken = (req,res,next) => {
    const accesToken = req.headers.authorization.split(' ')[1];
    console.log(accesToken);
    if (!accesToken) res.send("Acceso denegado");

    jwt.verify(accesToken,process.env.SECRET,(err,user) => {
        if (err) {
            console.log(err);
            res.send("Acceso denegado,token expirado o incorrecto");
        }else{
            next();
        }
    });
}


module.exports = {
    validEmployee,
    generateToken,
    validateToken
};