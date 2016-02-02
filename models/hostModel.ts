'use strict';

import mongoose = require('mongoose');
//Become A Host
let hostModelSchema = new mongoose.Schema({
  //Home Type
  apartment: {type: Boolean},
  house: {type: Boolean},
  bnb: {type: Boolean},
  other: {type: Boolean},
//Room Type
entireHome: {type: Boolean},
privateRoom: {type: Boolean},
sharedRoom: {type: Boolean},
//Accommodates
accommodates: {type: Number},
//city
city:{type: String,Number},
//m-m
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

});





export let hostModel = mongoose.model('hostModel',hostModelSchema);
