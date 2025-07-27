const { InferenceClient } = require("@huggingface/inference");
const {HfInference} = require("@huggingface/inference");

const hf = new InferenceClient(process.env.HUGGGINFACE_API_KEY);

const generateText = async (req, res) => {
    try {
        const {prompt, maxTokens = 100} = req.body;

        if(!prompt){
            return res.status(400).json({message: "Prompt es requerido"})
        }

        const models = [
            "microsoft/DialoGPT-medium",
            "gpt2",
            "EleutherAI/gpt-neo-1.3B",
            "facebook/blenderbot-400M-distill"
        ];

        let response = null;
        let usedModel = null;

        for (const model of models) {
            try {
                console.log(`Intentando con modelo: ${model}`);
                response = await hf.textGeneration({
                    model: model,
                    inputs: prompt,
                    parameters:{
                        max_new_tokens: maxTokens,
                        temperature: 0.7,
                        top_p: 0.9
                    }
                });
                usedModel = model;
                break; 
            } catch (modelError) {
                console.log(`Error con modelo ${model}:`, modelError.message);
                continue;
            }
        }

        if (!response) {
            return res.status(503).json({
                message: "Ningún modelo de generación de texto está disponible en este momento",
                error: "Service temporarily unavailable"
            });
        }

        res.status(200).json({
            message: "Texto generado exitosamente",
            prompt: prompt,
            generatedText: response.generated_text,
            model: usedModel
        })
    } catch (error) {
        console.error("Error generating text:", error);
        res.status(500).json({message: "Error generando texto", error: error.message});
    }
}

const analyzeSentiment = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({message: "Texto es requerido"})
        }

        const response = await hf.textClassification({
            model: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
            inputs: text
        });

        res.status(200).json({
            message: "Analisis completado",
            text: text,
            sentiment: response,
            model: 'cardiffnlp/twitter-roberta-base-sentiment-latest'
        })
    } catch (error) {
        console.error('Error en análisis de sentimientos:', error);
        res.status(500).json({ 
            message: "Error al analizar sentimiento",
            error: error.message 
        });
    }
}

const summarizeText = async (req, res) => {
    try {
        const { text, maxLength = 150, minLength = 50 } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: "Texto es requerido" });
        }

        const response = await hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: text,
            parameters: {
                max_length: maxLength,
                min_length: minLength
            }
        });

        res.status(200).json({
            message: "Resumen generado exitosamente",
            originalText: text,
            summary: response.summary_text,
            model: "facebook/bart-large-cnn"
        });

    } catch (error) {
        console.error('Error en resumen:', error);
        res.status(500).json({ 
            message: "Error al generar resumen",
            error: error.message 
        });
    }
};


const translateText = async (req, res) => {
    try {
        const { text, targetLanguage = 'es' } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: "Texto es requerido" });
        }

        const model = targetLanguage === 'es' 
            ? 'Helsinki-NLP/opus-mt-en-es'
            : 'Helsinki-NLP/opus-mt-es-en';

        const response = await hf.translation({
            model: model,
            inputs: text
        });

        res.status(200).json({
            message: "Traducción completada",
            originalText: text,
            translatedText: response.translation_text,
            targetLanguage: targetLanguage,
            model: model
        });

    } catch (error) {
        console.error('Error en traducción:', error);
        res.status(500).json({ 
            message: "Error al traducir texto",
            error: error.message 
        });
    }
};

const generateEmbeddings = async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: "Texto es requerido" });
        }

        const response = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: text
        });

        res.status(200).json({
            message: "Embeddings generados exitosamente",
            text: text,
            embeddings: response,
            dimensions: response.length,
            model: "sentence-transformers/all-MiniLM-L6-v2"
        });

    } catch (error) {
        console.error('Error en embeddings:', error);
        res.status(500).json({ 
            message: "Error al generar embeddings",
            error: error.message 
        });
    }
};

module.exports = {
    generateText,
    analyzeSentiment,
    summarizeText,
    translateText,
    generateEmbeddings
};