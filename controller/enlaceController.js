const Enlace = require("../models/Enlace");
const {validationResult} = require("express-validator");
const {generate} = require("shortid");
const bcrypt = require("bcrypt");

const nuevoEnlace = async (req,res) => {

    try {
        
        //mostrar mensjaes de error de express-validator
        const errores = validationResult(req); // lee los errores del req.body
        if(!errores.isEmpty()) return res.status(400).json({errores: errores.array()});

        const {nombre_original} = req.body;
        const enlace = new Enlace();

        //datos autogenerados por el servidor

        enlace.url = generate();
        enlace.nombre = generate();
        enlace.nombre_original =nombre_original;


        //guardar el enlace

        if(req.usuario) { // esta autenticado   
            const {descargas,password} = req.body;

            if(descargas) {
                enlace.descargas = descargas;
            }

            if(password) {
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(password,salt);
                enlace.password = passwordHash;
            }

            enlace.autor = req.usuario.id
        }

        await enlace.save();

        res.status(201).json({msg: enlace.url});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Error al crear el enlace'});

    }
}

//obtenerEnalce 

const obtenerEnlace = async (req,res,next) => {

    try {
        
        const {params:{url}} = req;
        const existe = await Enlace.findOne({url});

        if(!existe) return res.status(404).json({ msg: 'La url no existe'});
        res.json({archivo: existe.nombre});

        if(enlace.descargas === 1) {
            req.archivo = existe.nombre ;
            next();
        } else {
            enlace.descargas--; // actualizar el numero de descargas mientras sea mayor a 1
            await enlace.save();
        }


    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    nuevoEnlace,
    obtenerEnlace
}