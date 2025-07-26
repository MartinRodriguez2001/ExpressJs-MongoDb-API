const express = require("express");
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { body } = require('express-validator');

//validaciones
const registerValidation = [
body('name').notEmpty().withMessage('El nombre es requerido'),
body('email').isEmail().withMessage('Email inválido'),
body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const loginValidation = [
body('email').isEmail().withMessage('Email inválido'),
body('password').notEmpty().withMessage('La contraseña es requerida')
];

// Rutas
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
module.exports = router;