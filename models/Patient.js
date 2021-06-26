const mongoose = require("mongoose");

const Patient = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("patient", Patient, "patient");
