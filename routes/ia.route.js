const express = require("express");
const router = express.Router();
const { 
    testConnection,
    generateText, 
    analyzeSentiment, 
    summarizeText, 
    translateText,
    generateEmbeddings 
} = require('../controllers/ia.controller');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Errores de validación",
            errors: errors.array()
        });
    }
    next();
};

const textValidation = [
    body('text').notEmpty().withMessage('Texto es requerido'),
    body('text').isLength({ max: 5000 }).withMessage('Texto muy largo (máximo 5000 caracteres)')
];

const promptValidation = [
    body('prompt').notEmpty().withMessage('Prompt es requerido'),
    body('prompt').isLength({ max: 1000 }).withMessage('Prompt muy largo (máximo 1000 caracteres)')
];

router.post('/generate-text', authenticateToken, promptValidation, handleValidationErrors, generateText);
router.post('/analyze-sentiment', authenticateToken, textValidation, handleValidationErrors, analyzeSentiment);
router.post('/summarize', authenticateToken, textValidation, handleValidationErrors, summarizeText);
router.post('/translate', authenticateToken, textValidation, handleValidationErrors, translateText);
router.post('/embeddings', authenticateToken, textValidation, handleValidationErrors, generateEmbeddings);

module.exports = router;