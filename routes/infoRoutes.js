"use strict";
var express = require("express");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var router = express.Router();
var Rental = mongoose.model('Rental');
var user = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/', function (req, res, next) {
    Rental.find({}).exec(function (err, info) {
        if (err)
            return next(err);
        res.json(info);
    });
});
router.get('/:id', function (req, res, next) {
    Rental.findOne({ _id: req.params.id });
});
router.post('/', auth, function (req, res, next) {
    console.log('1');
    var newInfo = new Rental(req.body);
    console.log('2');
    newInfo.createdBy = req['payload']._id;
    console.log('3');
    newInfo.save(function (err, info) {
        console.log('4');
        if (err)
            return next(err);
        console.log('5');
        user.update({ _id: req['payload']._id }, { $push: { 'info': info._id } }, function (err, result) {
            console.log('6');
            if (err)
                return next(err);
            console.log('7');
            res.send(info);
            console.log('8');
        });
    });
});
router.put('/:_id', function (req, res, next) {
    Rental.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: 'Could not find and update the info' });
        res.send(result);
    });
});
router.delete('/', function (req, res, next) {
    if (!req.query._id)
        return next({ status: 404, message: 'Please fill out the requirement' });
    Rental.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: 'success' });
    });
});
module.exports = router;
