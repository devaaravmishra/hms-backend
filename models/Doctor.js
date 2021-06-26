const mongoose = require("mongoose");

const Doctor = new mongoose.Schema({
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
    specialization: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("doctor", Doctor, "doctor");
