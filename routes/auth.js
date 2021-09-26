const { Router } = require("express");
const router = Router();
const {check} = require("express-validator");
const { login,usuarioAutenticado } = require("../controller/authController");
const auth = require("../middleware/auth");

module.exports = () => {


    router.post('/',auth,[
        check('email','El email no es válido').isEmail(),
        check('password','EL password es requerido').not().isEmpty()
    ],
    login);

    router.get('/',auth,usuarioAutenticado);

    return router;

}