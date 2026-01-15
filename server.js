const express = require('express')
const app = express();
const db =require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 


// const Person=require('./models/Person');
// const MenuItem=require('./models/Menuitem');

app.get('/',function (req,res){
    res.send('Welcome to my hotel... How i can help you? we have list of menus')
})

// app.post('/person', (res,res)=>{

//     const data = req.body //Assuming the request body contains the person data

//     //Create a new Person document using the Mongoose model
//     const newPerson = new Person(data);

//     //ese to agar hmare paas hundred entities hogi to ham hundred baar likhenge kya?  isliye ham new Person(data), likh dete hai
//   /* newPerson.name=data.name;
//      newPerson.age=data.age;
//      newPerson.mobile=data.mobile;
//      newPerson.email= data.email;
//      newPerson.address = data.address; */

//     // save the new person to the database
// //     newPerson.save((error,savedperson)=> {
// //         if(error){
// //             console.log('saving person me error aa gya:', error);
// //             res.status(500).json({error: 'internal server error aa gya'})

// //         }
// //         else{
// //             console.log('data saved successfully');
// //             res.status(200).json(savedperson);
// //         }
// //     })

// })
// 1️⃣6️⃣ Why NOT Callbacks?
// ❌ Callback issues:
// Hard to read
// Callback hell
// Poor maintainability
// ✅ Async/Await advantages:
// Cleaner code
// Better readability
// Industry standard

const personRoutes = require('./routes/PersonRoutes');

//use the routers
app.use('/person', personRoutes);

const menuroutes=require('./routes/menuitemRoutes');
app.use('/menu', menuroutes);

app.listen(3000,()=>{
    console.log('listen on port 3000');
})

 


