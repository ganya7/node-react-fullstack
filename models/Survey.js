const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surverySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    // this sets up the relation between the user and the surveys created by the user
    // this is a referecne to a particular user to understand by mongoose
    // the key name is our own choice and could have been named anything
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastRespondede: Date
});

mongoose.model('surveys', surverySchema);