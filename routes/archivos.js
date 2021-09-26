const { Router } = require("express");
const router = Router();
const {check} = require("express-validator");
const auth = require("../middleware/auth");
const {
    subirArchivo,
    descargarArchivo,
    eliminarArchivo
} = require("../controller/archivoController");
    

module.exports = ()  => {
    
    router.post('/',auth,subirArchivo);
    router.get('/:archivo',auth,descargarArchivo,eliminarArchivo);

    return router;
}