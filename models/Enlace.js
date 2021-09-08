const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enlaceSchema = new Schema({
    url: {
        type: String,
        required: true,   
    },
    nombre: {
        type: String,
        required: true
    },
    nombre_original: {
        type: String,
        require: true
    },
    descargas: {
        type: Number,
        default: 1
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        default: null // No todos los enlaces van a tener un usuario
    },
    password: {
        type: String,
        default: null
    },  
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('enlaces',enlaceSchema);