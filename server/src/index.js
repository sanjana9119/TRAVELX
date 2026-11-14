import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import {Destination,Hotel,TravelPackage,User,Booking} from './models.js';
import {requireAuth} from './auth.js';

dotenv.config();
const app=express();
app.use(cors({origin:process.env.CLIENT_ORIGIN?.split(',')||true}));
app.use(express.json());
app.get('/api/health',(req,res)=>res.json({status:'ok',service:'TRAVELX API'}));

app.post('/api/auth/register',async(req,res)=>{
  try{
    const {name,email,password}=req.body;
    if(!name||!email||!password||password.length<8) return res.status(400).json({message:'Enter name, valid email and a password of at least 8 characters.'});
    if(await User.findOne({email:email.toLowerCase()})) return res.status(409).json({message:'An account with this email already exists.'});
    const user=await User.create({name,email,password:await bcrypt.hash(password,12)});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.status(201).json({token,user:{id:user._id,name:user.name,email:user.email}});
  }catch(e){res.status(500).json({message:'Could not create account.'});}
});
app.post('/api/auth/login',async(req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email:email?.toLowerCase()});
  if(!user||!await bcrypt.compare(password||'',user.password)) return res.status(401).json({message:'Incorrect email or password.'});
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
  res.json({token,user:{id:user._id,name:user.name,email:user.email}});
});
app.get('/api/destinations',async(req,res)=>res.json(await Destination.find().sort({featured:-1,name:1})));
app.get('/api/hotels',async(req,res)=>{
  const q=req.query.q||'', max=Number(req.query.maxPrice)||1000000, min=Number(req.query.minRating)||0;
  const filter={$and:[{$or:[{name:{$regex:q,$options:'i'}},{city:{$regex:q,$options:'i'}},{country:{$regex:q,$options:'i'}}]},{pricePerNight:{$lte:max}},{rating:{$gte:min}}]};
  res.json(await Hotel.find(filter).sort({rating:-1}));
});
app.get('/api/packages',async(req,res)=>{
  const q=req.query.q||'', category=req.query.category||'';
  res.json(await TravelPackage.find({$and:[{$or:[{title:{$regex:q,$options:'i'}},{destination:{$regex:q,$options:'i'}}]},...(category?[{category}]:[])]}));
});
app.post('/api/bookings',requireAuth,async(req,res)=>{
  try{
    const {itemType,itemId,travelDate,guests=1,nights=1}=req.body;
    if(!['hotel','package'].includes(itemType)||!itemId||!travelDate||new Date(travelDate)<new Date(new Date().toDateString())||guests<1||guests>20)
      return res.status(400).json({message:'Check your booking details and travel date.'});
    const item=itemType==='hotel'?await Hotel.findById(itemId):await TravelPackage.findById(itemId);
    if(!item) return res.status(404).json({message:'Selected item was not found.'});
    const unit=itemType==='hotel'?item.pricePerNight:item.price;
    const totalPrice=itemType==='hotel'?unit*Number(nights)*Number(guests):unit*Number(guests);
    const booking=await Booking.create({user:req.user._id,bookingRef:'TX-'+crypto.randomBytes(4).toString('hex').toUpperCase(),itemType,itemId,itemName:item.name||item.title,destination:item.city||item.destination,travelDate:new Date(travelDate),guests:Number(guests),nights:Number(nights),totalPrice});
    res.status(201).json(booking);
  }catch(e){res.status(500).json({message:'Unable to create booking.'});}
});
app.get('/api/bookings',requireAuth,async(req,res)=>res.json(await Booking.find({user:req.user._id}).sort({createdAt:-1})));
app.use((err,req,res,next)=>{console.error(err);res.status(500).json({message:'Unexpected server error.'});});
const port=process.env.PORT||5000;
await mongoose.connect(process.env.MONGODB_URI);
app.listen(port,()=>console.log(`TRAVELX API running on ${port}`));
