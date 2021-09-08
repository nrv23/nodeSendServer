const { Router } = require("express");
const router = Router();
const {check} = require("express-validator");
const auth = require("../middleware/auth");
const {
    subirArchivo
} = require("../controller/archivoController");
    

module.exports = ()  => {
    
    router.post('/',auth,subirArchivo);

    return router;
}