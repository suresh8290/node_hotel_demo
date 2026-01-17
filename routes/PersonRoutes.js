const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');

//POST route to add a person
router.post('/', async (req,res) =>{
    try{
        const data=req.body   //assuming the request body contains the person data

        const newPerson = new Person(data);
        const response= await newPerson.save();
        console.log('data saved ho gya');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server me error aa gya'});
    }
})

router.patch('/name', async(req,res)=>{
    try{
        const result=await Person.updateOne({name:"Alice"},
            {$set:{name:"suresh"}}
        );
        res.status(200).json({
            message: "Person update successfully",
            result
        });
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Internal server error hai bhai update nahi ho paayega"});
    }
});

router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType;    //Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});

    }
})

router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData= req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators:true,
        })
        if(!response){
            res.status(404).json({error: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})


router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;
        
        const response = await Person.findByIdAndDelete(personId)
        if(!response){
           return res.status(404).json({error: 'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'person Deleted Successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})











router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }

})



module.exports=router;









