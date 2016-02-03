"use strict";

import express = require("express");
import jwt = require('express-jwt');
let mongoose = require("mongoose");

let router = express.Router();
let Rental = mongoose.model('Rental');
let user = mongoose.model('User');
let auth = jwt({
  userProperty:'payload',
  secret: process.env.JWT_SECRET
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

router.post('/',auth,(req,res,next)=>{
  console.log('1')
  let newInfo = new Rental(req.body);
  console.log('2')
  newInfo.createdBy = req['payload']._id;
  console.log('3')
  newInfo.save((err,info)=>{
    console.log('4')
    if(err) return next(err);
    console.log('5')
    user.update({_id:req['payload']._id},{$push:{'info':info._id}},(err,result)=>{
      console.log('6')
      if (err) return next(err);
      console.log('7')
      res.send(info);
      console.log('8')
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
