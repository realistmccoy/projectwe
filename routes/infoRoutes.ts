"use strict";

import express = require("express");
import jwt = require('express-jwt');
let mongoose = require("mongoose");
let router = express.Router();
let hostModel = mongoose.model('hostModel');
let user = mongoose.model('user');
let auth = jwt({
  userProperty:'payload',
  secret: 'SecretKey'
})
router.get('/',(req,res,next)=>{
  hostModel.find({}).exec((err, info)=>{
    if(err) return next(err);
    res.json(info);
  })
})

router.get('/:id',(req,res,next)=>{
  hostModel.findOne({_id: req.params.id})
})

router.post('/', auth,(req,res,next)=>{
  let newInfo = new hostModel(req.body);
  newInfo.createdBy = req['payload']._id;
  newInfo.save((err,info)=>{
    if(err) return next(err);
    user.update({_id:req['payload']._id},{$push:{'info':info._id}},(err,result)=>{
      if (err) return next(err);
      res.send(info);
    })
  })
})

router.put('/:_id',(req,res,next)=> {
  hostModel.findOneAndUpdate({_id:req.params._id},req.body,{new:true},(err,result)=>{
    if(err)return next(err);
    if(!result) return next({message:'Could not find and update the info'});
    res.send(result);
  })
})
router.delete('/',(req,res,next)=> {
  if(!req.query._id) return next({ status:404,message:'Please fill out the requirement'})
  hostModel.remove({_id: req.query._id},(err,result)=>{
    res.send({ message: 'success'})
  })
})

export = router;
