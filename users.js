const express= require('express');
const router= express.Router();
const bcrypt = require("bcryptjs");
const users=require('./db')

const auth = require("./auth");
const jwt = require("jsonwebtoken");

// Get all products
router.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  

router.post("/login", (request, response) => {
    // check if email exists
    users.findOne({ email: request.body.email })
  
      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(request.body.password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
            //   create JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
  
            //   return success response
            response.status(200).send({
              message: "Login Successful",
              email: user.email,
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
        });
      });
  });
  
  

//GET logged in user
router.get('/login',async(req,res)=>{
    try{
        const loggedInUser = await users.findOne(req.params.email);
        res.status(200).json(loggedInUser);
    }catch(err){
        res.status(404).json({
            "status":"Somethinng went wrong..."
        })
    }
})


//POST

router.post('/signup',async(req,res)=>{
    console.log(req.body)
    
    bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new users({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        photoUrl:req.body.photoUrl
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
})



module.exports = router;
