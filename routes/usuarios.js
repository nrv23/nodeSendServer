const express = require("express");
const { crearUsuario } = require("../controller/usuarioController");
const router = express.Router();
const {check} = require("express-validator");


module.exports = () => {

    router.post('/',[
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('email','El email no es válido').isEmail(),
        check('password','La contraseña debe contener al menos 6 caracteres').isLength({min: 6}),

    ],crearUsuario);

    return router;
}