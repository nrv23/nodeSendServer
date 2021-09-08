const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");

const crearUsuario = async (req,res) => {

    try {

        //mostrar mensjaes de error de express-validator
        const errores = validationResult(req); // lee los errores del req.body

        if(!errores.isEmpty()) return res.status(400).json({errores: errores.array()});

        const {email,nombre,password} = req.body;
        //verificar si el usuario existe

        const existe = await Usuario.findOne({email});

        if(existe) {
            return res.status(400).json({
                msg: 'El usuario ya existe. Intente registrando otro.'
            })
        }

        const usuario = new Usuario({email,nombre,password});

        //hashear password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password,salt);
        
        await usuario.save();
        
        if(!usuario || usuario.length === 0) {
            return res.status(400).json({
                msg: 'No se puedo registrar el usuario'
            })
        }

        return res.status(201).json({
            msg: 'Usuario creado con éxito'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al registrar el usuario'
        })
    }
}

module.exports = {

    crearUsuario
}