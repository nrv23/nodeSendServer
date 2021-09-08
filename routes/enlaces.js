const express = require("express");
const {nuevoEnlace} = require("../controller/enlaceController");
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

    return router;
}