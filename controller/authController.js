const Usuario = require("../models/Usuario");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: 'variables.env'});

const login = async (req,res) => {

    try {
         
        //mostrar mensjaes de error de express-validator
         const errores = validationResult(req); // lee los errores del req.body
         if(!errores.isEmpty()) return res.status(400).json({errores: errores.array()});
 
         const {email,password} = req.body;

         const usuario = await Usuario.findOne({email});

        if(!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe'
            })
        }


        //comparar contraseña

        const passCorrecta = await bcrypt.compare(password,usuario.password);

        if(passCorrecta) {
            //crear el token
            const token = jwt.sign({
                usuario: usuario.nombre,
                id: usuario._id,
                fecha: Date.now()
            },process.env.JWT_SECRET,{
                expiresIn: '2h'
            });

            res.json({token});

        } else {
            return res.status(401).json({
                msg: 'Usuario o contraseña incorrectos'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al registrar el usuario'
        })
    }
}

const usuarioAutenticado = (req,res) => {
   
    const {usuario} = req;
    if(usuario) {
        res.json({usuario: {
            id: usuario.id,
            usuario: usuario.usuario
        }});
    }
}


module.exports = {
    login,
    usuarioAutenticado
}