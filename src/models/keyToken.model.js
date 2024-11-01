const mongoose = require('mongoose'); // Erase if already required
const COLLECTION_NAME = 'Key';
const DOCUMENT_NAME = 'Keys';
// Declare the Schema of the Mongo model
const keyTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shop',
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: [],
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true,
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);