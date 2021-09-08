const jwt = require("jsonwebtoken");
require("dotenv").config({path: 'variables.env'});

module.exports = (req,res,next) => {

    const authHeader = req.get('Authorization');

    if(authHeader){

        try{    

            const token = authHeader.split(' ');
            const usuario = jwt.verify(token[1],process.env.JWT_SECRET);
            req.usuario = usuario;

            return next();
        } catch(err) {
            res.status(500).json({
                msg: 'Token inválido'
            })
        }

    } 

    return next();
}