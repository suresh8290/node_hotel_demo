const express = require('express');
const router = express.Router();
const MenuItem= require('../models/MenuItem');



router.post('/',async(req,res)=>{
    try{
        const data=req.body
        const newMenu= new MenuItem(data);
        const response= await newMenu.save();
        console.log('menu save ho gya');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server me error ho gya'});

    }
})

router.get('/',async(req,res)=>{
    try{
        const data= await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server me error aa gya'});
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const itemId= req.params.id;
       const updatedItemData = req.body;
        const response= await MenuItem.findByIdAndUpdate(itemId,updatedItemData,{
            new:true,
            runValidators:true,
        })

        if(!response){
            res.status(404).json({message: "item not found"});

        }
        console.log("item updated");
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
})




router.delete('/:id', async(req,res)=>{
    try{
        const menuId=req.params.id;
        const response= await MenuItem.findByIdAndDelete(menuId);

        if(!response){
            res.status(404).json({error: 'item not found'});
        }
        console.log("item delete");
        res.status(200).json({message: "item deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server me error aa gya'});
    }
});

router.get('/:taste',async(req,res)=>{
    try{
        const tasty=req.params.taste;
        if(tasty=='spicy' || tasty =='salty' || tasty =='sweet'){
            const data= await MenuItem.find({taste: tasty})
            console.log('data fetched');
            res.status(200).json(data)
            
        }
        else{
            res.status(404).json({error: 'invalid input'});

        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})


module.exports=router;