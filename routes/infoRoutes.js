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
    Rental.findOne({ _id: req.params.id })
        .populate('createdBy', 'username')
        .exec(function (err, p) {
        if (err)
            return next(err);
        if (!p)
            return next({ message: 'Could not find the Rental' });
        res.send(p);
    });
});
router.post('/', auth, function (req, res, next) {
    var newInfo = new Rental(req.body);
    newInfo.createdBy = req['payload']._id;
    newInfo.save(function (err, p) {
        if (err)
            return next(err);
        Rental.update({ _id: req['payload']._id }, { $push: { 'info': p._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send(p);
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
