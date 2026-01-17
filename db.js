const mongoose = require('mongoose');
require('dotenv').config();


const mongoUrl= process.env.MONGODB_URL; /*|| "mongodb://127.0.0.1:27017";*/
// const mongoUrl=process.env.MONGODB_LOCAL_URL;

mongoose.connect(mongoUrl,{
    tls:true,
    tlsAllowInvalidCertificates:true
    // useNewUrlParser: true,
    // useUnifiedTopology:true
});

// get the default connecttion 
// Mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;

// Define event listener for database connection

db.on('connected', () => {
    console.log('mongodb server se connected ho gya');
})

db.on('error',(err)=> {
    console.error('mongodb connection error aa gya:', err);
})

db.on('disconnected', ()=> {
    console.log('MongoDB disconnect ho gya');
})




//Export the database connection
module.exports = db;    




