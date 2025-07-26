const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Provide a name for the user"],
        },
        email: {
            type: String,
            required: [true, "Provide an email for the user"],
            unique: true,
        },
        password:{
            type: String,
            required: [true, "La contraseña es requerida"],
            minlength: [6, "La constraseña debe tener al menos 6 caracteres"]
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }

    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;