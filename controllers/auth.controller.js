const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

const register = async (req, res) => {
    const {name, email, password, role} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "El usuario ya existe"})
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        })

        const token = jwt.sign({userId: user._id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
         )

         const userResponse = user.toObject();
         delete userResponse.password;

         res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: userResponse,
            token
         })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;


        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Credenciales invalidas"})
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(400).json({message: "Credenciales invalidas"})
        }

        const token = jwt.sign({userId: user._id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )


        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "Usuario logueado exitosamente",
            user: userResponse,
            token
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    register,
    login
}