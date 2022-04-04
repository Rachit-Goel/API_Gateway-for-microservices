const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { 
            type: String, required: true, unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('email is invalid');
                }
            },
        },
        password: { type: String, required: true },
        content: [
            {
                c_Id: { type: mongoose.Schema.Types.ObjectId },
                unlockedCh: { type: Number, default: 4 }
            }
        ]
    },
    { timestamps: true}
);

module.exports = mongoose.model("User", userSchema);