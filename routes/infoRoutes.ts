"use strict";

import express = require("express");
import jwt = require('express-jwt');
let mongoose = require("mongoose");
let router = express.Router();
let Rental = mongoose.model('Rental');

let auth = jwt({
  userProperty:'payload',
  secret: 'SecretKey'
})
router.get('/',(req,res,next)=>{
  Rental.find({}).exec((err, info)=>{
    if(err) return next(err);
    res.json(info);
  })
})

router.get('/:id',(req,res,next)=>{
  Rental.findOne({_id: req.params.id})
})

router.post('/', auth,(req,res,next)=>{
  let newInfo = new Rental(req.body);
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
  Rental.findOneAndUpdate({_id:req.params._id},req.body,{new:true},(err,result)=>{
    if(err)return next(err);
    if(!result) return next({message:'Could not find and update the info'});
    res.send(result);
  })
})
router.delete('/',(req,res,next)=> {
  if(!req.query._id) return next({ status:404,message:'Please fill out the requirement'})
  Rental.remove({_id: req.query._id},(err,result)=>{
    res.send({ message: 'success'})
  })
})

export = router;
