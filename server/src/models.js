import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name:{type:String,required:true}, country:{type:String,required:true},
  description:String, image:String, startingPrice:Number, featured:Boolean
});
const hotelSchema = new mongoose.Schema({
  name:{type:String,required:true}, city:String, country:String, image:String,
  rating:Number, pricePerNight:Number, amenities:[String], description:String
});
const packageSchema = new mongoose.Schema({
  title:{type:String,required:true}, destination:String, duration:String,
  days:Number, nights:Number, price:Number, image:String, category:String,
  includes:[String], description:String
});
const userSchema = new mongoose.Schema({
  name:{type:String,required:true}, email:{type:String,required:true,unique:true,lowercase:true},
  password:{type:String,required:true}
},{timestamps:true});
const bookingSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  bookingRef:{type:String,required:true,unique:true}, itemType:{type:String,enum:['hotel','package'],required:true},
  itemId:{type:mongoose.Schema.Types.ObjectId,required:true}, itemName:String, destination:String,
  travelDate:Date, guests:Number, nights:Number, totalPrice:Number,
  status:{type:String,default:'Demo booking request'}
},{timestamps:true});

export const Destination=mongoose.model('Destination',destinationSchema);
export const Hotel=mongoose.model('Hotel',hotelSchema);
export const TravelPackage=mongoose.model('TravelPackage',packageSchema);
export const User=mongoose.model('User',userSchema);
export const Booking=mongoose.model('Booking',bookingSchema);
