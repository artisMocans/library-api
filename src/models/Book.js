const {Schema, model} = require('mongoose');

const bookSchema = new Schema(
    {
        name: {type: String, required: true},
        author: {type: String, required: true},
        year: {type: String, required: true},
        available: {type: Number, required: true, min: 0},
    },
    {timestamps: true}
);

module.exports = model('Book', bookSchema);