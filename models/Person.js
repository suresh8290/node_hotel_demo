const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
//define the person schema

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save', async function() {
    const person = this;
    if(!person.password){
           throw new Error("password is required");
        }

    //Hash the password only if it has been modified(or is new)
    if(!person.isModified('password')) {
             return;
    }
    try{
 
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);
        

        //Override the plain password with the hashed one
       person.password = hashedPassword;
  
    }
    catch(err){
       return (err) ;
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    const person=this;
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    }catch(err){

        throw err;
    }
}

//Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;


