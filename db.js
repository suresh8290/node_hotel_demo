const mongoose=require('mongoose');

const mongoUrl="mongodb://127.0.0.1:27017/hotels";
mongoose.connect(mongoUrl);


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
