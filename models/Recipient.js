const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

//we will not register this with mongoose but rather export it
module.exports = recipientSchema;