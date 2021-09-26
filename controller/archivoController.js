const multer = require("multer");
const { generate } = require("shortid");
const fs = require("fs");
const Enlace = require("../models/Enlace");
const path = require("path");

const subirArchivo =  async (req,res,next  ) => {

    const configMulter = {
        limits: {fileSize : req.usuario ? 1024*1024*10 : 1000000},//10 megas para personas que tienen cuenta, 1 mega para cuenras gratis
        storage: fileStorage = multer.diskStorage({
            destination: (req,file,cb) => {
                cb(null,__dirname+'/../uploads')
            },
            filename: (req,file,cb) => {
                //const ext = file.mimetype.split('/')[1];
                const ext = file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length);
                cb(null,`${generate()}${ext}`)
            }
        })
    }
    
    const upload = multer(configMulter).single("archivo");

    upload(req,res,async(error) => {
        console.log(req.file)
        if(!error) {
            return res.status(201).json({
                archivo: req.file.filename
            })
        } else {
            console.log(error);
            if(error.code === 'LIMIT_FILE_SIZE'){
                return res.status(400).json({
                    msg: 'Debe subir un archivo menos pesado'
                })
            }

            return next();
        }
    })

}

const eliminarArchivo =  (req,res) => {

    fs.unlink(__dirname+`/../uploads/${req.params.archivo}`, (err) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Error al eliminar el archivo'
            })
        }

        console.log("Eliminado")
    })

}

const descargarArchivo = async (req,res,next) => {

    try {
        const {params:{archivo}} = req;
        console.log(archivo)
        const enlace = await Enlace.findOne({nombre: archivo});
        const ruta = path.join(__dirname,'/../uploads/'+archivo);
        res.download(ruta);

        if(enlace.descargas === 1) {
            req.archivo = enlace.nombre ;
            await Enlace.findByIdAndRemove(enlace.id);
            return next();
        } else {
            enlace.descargas--; // actualizar el numero de descargas mientras sea mayor a 1
            await enlace.save();
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un error'
        })
    }
    
}

module.exports = {

    subirArchivo,
    eliminarArchivo,
    descargarArchivo
}