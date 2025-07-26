const Product = require("../models/Product.model");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        console.log("All products fetched successfully")
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProductById = async (req, res) => {
     try {
        const {id} = req.params
        const product = await Product.findById(id)

        if (!product){
            res.status(404).json({message: "Product not found"})
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const updatedProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)

        if (!product){
            return res.status(404).json({message: "Product not found"})
        }

        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error updating product:", error.message)
    }
}
const deleteProduct = async (req, res) => {
    try {
            const {id} = req.params
            const product = await Product.findByIdAndDelete(id)
    
            if (!product){
                return res.status(404).json({message: "Product not found"})
            }
            res.status(200).json({message: "Product deleted successfully"})
    
        } catch (error) {
            res.status(500).json({message: error.message})
        }
}
const createProduct = async (req, res) => {
     try {
            const productData = {
                ...req.body,
                createdBy: req.user._id
            }
            const product = await Product.create(productData)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
}



module.exports = {
    getProducts,
    getProductById,
    updatedProduct,
    deleteProduct,
    createProduct

}