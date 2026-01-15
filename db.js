const mongoose=require('mongoose');
require('dotenv').config();

// const mongoUrl="mongodb://127.0.0.1:27017/hotels";
// const mongoUrl='mongodb+srv://helloworld:Ram12345@cluster0.pzlvhge.mongodb.net/';
const mongoUrl= process.env.MONGODB_URL;
// const mongoUrl=process.env.MONGODB_LOCAL_URL

mongoose.connect(mongoUrl,{
    tls:true,
    tlsAllowInvalidCertificates:true
});

// get the default connecttion 
// Mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;

// Define event listener for database connection

db.on('connected', () => {
    console.log('mongodb server se connected ho gya');
})

db.on('disconnected', ()=> {
    console.log('connection disconnect ho gya');
})

db.on('error',(err)=> {
    console.error('mongodb connection error aa gya:', err);
})


//Export the database connection
module.exports=db;    
