const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

// Create model
const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;