const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true},
        Totalchapters: { type: Number, required: true },
        chapters:[
            {
                chNo:{ type: Number, required: true},
                chName:{ type: String, required: true },
                content:{ type: String, required: true }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);
