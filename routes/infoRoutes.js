"use strict";
var express = require("express");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var router = express.Router();
var hostModel = mongoose.model('hostModel');
var user = mongoose.model('user');
var auth = jwt({
    userProperty: 'payload',
    secret: 'SecretKey'
});
router.get('/', function (req, res, next) {
    hostModel.find({}).exec(function (err, info) {
        if (err)
            return next(err);
        res.json(info);
    });
});
router.get('/:id', function (req, res, next) {
    hostModel.findOne({ _id: req.params.id });
});
router.post('/', auth, function (req, res, next) {
    var newInfo = new hostModel(req.body);
    newInfo.createdBy = req['payload']._id;
    newInfo.save(function (err, info) {
        if (err)
            return next(err);
        user.update({ _id: req['payload']._id }, { $push: { 'info': info._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send(info);
        });
    });
});
router.put('/:_id', function (req, res, next) {
    hostModel.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
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
    hostModel.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: 'success' });
    });
});
module.exports = router;
