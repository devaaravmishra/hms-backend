const mongoose = require("mongoose");

const Appointment = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    pid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    did: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    slot: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("appointment", Appointment, "appointment");
