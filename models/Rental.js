'use strict';
var mongoose = require('mongoose');
var RentalSchema = new mongoose.Schema({
    basics: {
        title: { type: String, required: true },
        homeType: { type: String, required: true },
        roomType: { type: String, required: true },
        bNb: { type: String, required: true },
        numGuests: { type: Number, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        imgurl: { type: String, required: true }
    },
    pricing: { type: Number, required: true },
    booking: {
        checkIn: { type: String, required: true },
        checkOut: { type: String, required: true }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.Rental = mongoose.model('Rental', RentalSchema);
