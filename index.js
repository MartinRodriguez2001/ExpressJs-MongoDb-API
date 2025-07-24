const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route");

// Cargar variables de entorno
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoute)

app.get("/", (req, res) => {
    res.send("Hellooo there")
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    })
})
.catch((error)=> {
    console.error("Error connecting to MongoDB:", error);
})