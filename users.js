const express= require('express');
const router= express.Router();
const Users=require('./db')

// Get all products
// /api/products/
router.get('/login',async(req,res)=>{
    try{
    
        const products=await Users.find();
        res.json(products);
        
    }
    catch(err){
        res.status(404).json(
            {
                "status":404,
                "reason":"Page Not Found"
            }
        )
    }
})

// /api/products/01
//GET product by id
router.get('/:user',async(req,res)=>{
    try{
        const product = await Users.findById(req.params.product_id);
        res.status(200).json(product);
    }catch(err){
        res.status(404).json({
            "status":"Product was not found..."
        })
    }
})

//POST 
router.post('/signup',async(req,res)=>{
    if(req.body.quantity<0){
        return res.status(416).json({
            "status":"failure",
            "reason":"quantity should be grater than 0"
        })
    }
    const user= new Users({
        fisrtName: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        photoUrl: req.body.photoUrl,
    });
    try{
    const savedUser=await user.save()
    res.status(201).json(savedUser);
    }catch(err){
        res.status(400).json({
            "status": "failure",
            "reason": "request error"
        })
    }
})



module.exports = router;
