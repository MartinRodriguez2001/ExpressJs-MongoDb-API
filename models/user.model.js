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
        products:{
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
            default: []
        }

    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema);
module.exports = User;