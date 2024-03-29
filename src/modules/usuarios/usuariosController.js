const { getConection } = require('./../../db/conexion');
const { validEmployee,generateToken } = require('./helpers/service');



const getUsers = async (req, res) => {
    
    try {
        const conection = await getConection();
        const result = await conection.query('SELECT id_empleado,nombre,apellidos FROM empleados');
        res.json(result);
        console.log(result);
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getUser = async (req, res) => {
    
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


const addUser = async (req, res) => {
    
    
    try {
        const {nombre,apellidos} = req.body;
        // console.log(req.body.nombre);
        const newUser = {
            nombre,
            apellidos
        }
        let mensaje = validEmployee(newUser);

        if (mensaje !== "") {
            res.status(400).json({message: mensaje});
            return;
        }
        
        const conection = await getConection();
        const result = await conection.query('insert into empleados set ?', newUser);
        res.status(201).json({message: "Empleado agregado",result: result.insertId});
        
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const updateUser = async (req, res) => {
    
    
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


const deleteUser = async (req, res) => {
    
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


const authUser = async (req, res) => {
    
    
    try {
        const {nombre} = req.body;
        console.log(req.body.nombre);
        const user = {
            nombre
        }

        const conection = await getConection();
        const existe = await conection.query('SELECT id_empleado FROM empleados where nombre = ?',nombre);

        if (existe.length > 0) {
            let accesToken = generateToken(user);
            
            res.status(200).header('authorization',accesToken).json({
                message: 'usuario autenticado',
                token: accesToken,
                id_empleado: existe[0].id_empleado
            });
            
        }else{
            res.json(`No existe el usuario ${nombre} en la base de datos`);
        }


       
        
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}



module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    authUser
};