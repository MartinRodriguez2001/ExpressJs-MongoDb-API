const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({message: "Acceso denegado, token no proporcionado"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        req.user = user;
        next()
    } catch (error) {
        res.status(403).json({message: "Token invalido"});
    }
}

const requireAdmin = (req, res, next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "Acceso denegado, se requiere rol de administrador"});
    }
    next()
}

const requireOwnershipOrAdmin = async(req, res, next) => {
    try {
        const {id} = req.params;
        if (req.user.role == "admin" ){
            return next()
        }

        const product = await Product.findById(id);
        if(!product){
            res.status(401).json({message: "Producto no encontrado"});
        }

        if(product.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "No tienes permiso para realizar esta acción"})
        }
        next()

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    authenticateToken,
    requireAdmin,
    requireOwnershipOrAdmin
}

