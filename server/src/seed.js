import mongoose from 'mongoose'; import dotenv from 'dotenv';
import {Destination,Hotel,TravelPackage} from './models.js';
dotenv.config();
await mongoose.connect(process.env.MONGODB_URI);
await Promise.all([Destination.deleteMany({}),Hotel.deleteMany({}),TravelPackage.deleteMany({})]);
const pics={
  paris:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
  bali:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
  dubai:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
  maldives:'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
  swiss:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',
  goa:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200',
  hotel:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
  mountain:'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200'
};
await Destination.insertMany([
 ['Paris','France','Romantic boulevards, art and iconic architecture.',pics.paris,899, true],
 ['Bali','Indonesia','Lush landscapes, temples and beautiful beaches.',pics.bali,699,true],
 ['Dubai','UAE','A dazzling mix of modern luxury and desert adventure.',pics.dubai,799,true],
 ['Maldives','Maldives','Turquoise lagoons and overwater escapes.',pics.maldives,1199,true],
 ['Swiss Alps','Switzerland','Mountain villages, scenic trains and alpine views.',pics.swiss,1399,true],
 ['Goa','India','Sun-kissed beaches, culture and coastal cuisine.',pics.goa,299,false]
].map(([name,country,description,image,startingPrice,featured])=>({name,country,description,image,startingPrice,featured})));
await Hotel.insertMany([
 {name:'The Grand Meridian',city:'Dubai',country:'UAE',image:pics.hotel,rating:4.8,pricePerNight:180,amenities:['Wi-Fi','Pool','Restaurant','Spa'],description:'A refined city stay with elegant rooms and skyline views.'},
 {name:'Azure Palm Resort',city:'Bali',country:'Indonesia',image:pics.bali,rating:4.7,pricePerNight:145,amenities:['Wi-Fi','Pool','Breakfast','Beach access'],description:'A tropical hideaway surrounded by lush greenery.'},
 {name:'Mont Blanc Lodge',city:'Swiss Alps',country:'Switzerland',image:pics.mountain,rating:4.9,pricePerNight:220,amenities:['Wi-Fi','Restaurant','Mountain view'],description:'A cozy alpine retreat with breathtaking mountain views.'},
 {name:'Coastal Haven',city:'Goa',country:'India',image:pics.goa,rating:4.5,pricePerNight:85,amenities:['Wi-Fi','Pool','Restaurant'],description:'A relaxed coastal hotel close to the beach.'},
 {name:'Eiffel House Hotel',city:'Paris',country:'France',image:pics.paris,rating:4.6,pricePerNight:210,amenities:['Wi-Fi','Breakfast','Room service'],description:'A stylish boutique stay in the heart of Paris.'}
]);
await TravelPackage.insertMany([
 {title:'Bali Island Escape',destination:'Bali, Indonesia',duration:'5 Days / 4 Nights',days:5,nights:4,price:699,image:pics.bali,category:'Honeymoon',includes:['4 nights stay','Airport transfer','Daily breakfast'],description:'A relaxed island escape with curated experiences.'},
 {title:'Dubai in Style',destination:'Dubai, UAE',duration:'4 Days / 3 Nights',days:4,nights:3,price:799,image:pics.dubai,category:'Luxury',includes:['Hotel stay','Desert safari','City tour'],description:'Discover the city skyline, souks and desert.'},
 {title:'Swiss Alpine Adventure',destination:'Swiss Alps, Switzerland',duration:'6 Days / 5 Nights',days:6,nights:5,price:1399,image:pics.swiss,category:'Adventure',includes:['5 nights stay','Scenic rail pass','Guided excursion'],description:'Explore dramatic mountain landscapes.'},
 {title:'Goa Family Getaway',destination:'Goa, India',duration:'3 Days / 2 Nights',days:3,nights:2,price:299,image:pics.goa,category:'Family',includes:['2 nights stay','Breakfast','Local transfer'],description:'A sunny break for the whole family.'}
]);
console.log('Seed data inserted'); await mongoose.disconnect();
