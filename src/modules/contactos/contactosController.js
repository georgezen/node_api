const { getConection } = require('../../db/conexion');
const { validEmployee,generateToken } = require('./helpers/service');



const getContacts = async (req, res) => {
    
    try {
        const conection = await getConection();
        const result = await conection.query('SELECT id_contacto,nombre,telefono,correo,mensaje FROM contactos');
        res.json(result);
        console.log(result);
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getContact = async (req, res) => {
    
    try {


        const {id} = req.params;
        console.log(id);
        const conection = await getConection();
        const result = await conection.query('SELECT id_empleado,nombre,apellidos FROM empleados where id_empleado = ?',id);
        res.json(result);
        
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const addContact = async (req, res) => {
    try {
        const {nombre,telefono,correo} = req.body;
        console.log(req.body);
        const newRow = {
            nombre,
            telefono,
            correo
        }
        
        const conection = await getConection();
        const result = await conection.query('insert into contactos set ?', newRow);
        res.status(201).json({message: "Contacto agregado",result: result.insertId});
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({message: "Correo ya existente"});
        } else {
            res.status(500).json({message: error.message});
        }
    }
}


const updateContact = async (req, res) => {
    
    
    try {
        const {id} = req.params;
        const {nombre,apellidos} = req.body;
         
        const newUser = {
            nombre,
            apellidos
        }
        let mensaje = validEmployee(newUser,id);

        if (mensaje !== "") {
            res.status(400).json({message: mensaje});
            return;
        }
        
        const conection = await getConection();
        const result = await conection.query('update empleados set ? where id_empleado = ?', [newUser,id]);
        res.status(201).json({message: "Empleado modificado",
        result: result});
        
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const deleteContact = async (req, res) => {
    
    try {


        const {id} = req.params;
        console.log(id);
        const conection = await getConection();
        const result = await conection.query('delete FROM empleados where id_empleado = ?',id);
        res.json(result);
        
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}






module.exports = {
    getContacts,
    getContact,
    addContact,
    deleteContact,
    updateContact
};