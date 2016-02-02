'use strict';
var mongoose = require('mongoose');
var hostModelSchema = new mongoose.Schema({
    apartment: { type: Boolean },
    house: { type: Boolean },
    bnb: { type: Boolean },
    other: { type: Boolean },
    entireHome: { type: Boolean },
    privateRoom: { type: Boolean },
    sharedRoom: { type: Boolean },
    accommodates: { type: Number },
    city: { type: String, Number: Number },
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});
exports.hostModel = mongoose.model('hostModel', hostModelSchema);
