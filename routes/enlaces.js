const express = require("express");
const {
    nuevoEnlace,
    obtenerEnlace,
    obtenerEnlaces,
    tienePassword,
    verificarPassword
} = require("../controller/enlaceController");
const router = express.Router();
const {check} = require("express-validator");
const auth = require("../middleware/auth");

module.exports = () => {

    router.post('/',
        auth,
        [   
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('nombre_original','El nombre es obligatorio').not().isEmpty(),
        ],
        nuevoEnlace);
    
    router.get('/:url',tienePassword,obtenerEnlace);
    router.get('/',obtenerEnlaces);

    router.post('/:url',verificarPassword,obtenerEnlace);


    return router;
}