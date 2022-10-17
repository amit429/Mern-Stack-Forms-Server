const routes = require('express').Router();
require("../db/connection");
const User = require("../models/Userschema");
const Contact = require("../models/Contactschema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



routes.get('/', (req, res) => {
    res.send("Landing Page with auth");
})

// Send data to the server using promises

// routes.post('/register', (req, res) => {
//     const {
//         Fullname,
//         Email,
//         Password,
//         DOB,
//         Gender
//     } = req.body;

//     if (!Fullname || !Email || !Password || !DOB || !Gender) {
//         return res.status(422).json({
//             error: "Please fill all the fields"
//         });
//     }

//     //sending data to the database with promises
//     User.findOne({
//         Email: Email
//     }).then((userExist) => { //findOne is used to find the data in the database
//         if (userExist) { //in findone syntax , left side is the data in the database and right side is the data entered by the user
//             return res.status(422).json({
//                 error: "Email already exists"
//             });
//         }

//         const user = new User({
//             Fullname,
//             Email,
//             Password,
//             DOB,
//             Gender
//         })

//         user.save().then(()=>{
//             res.status(201).json({message: "User registered successfully"});
//         }).catch((err)=>{
//             res.status(500).json({error: "Failed to register"});
//             console.log(err);
//         })
//     }).catch((err) => {
//         console.log(err);
//     })
// })

//Sending Data to the database with async await
routes.post("/register", async (req, res) => {

    const {
        Fullname,
        Email,
        Password,
        Cpassword,
        DOB,
        Gender
    } = req.body;

    if (!Fullname || !Email || !Password || !DOB || !Gender || !Cpassword) {
        return res.status(422).json({
            error: "Please fill all the fields"
        });
    }

    let date = DOB.split("-");

    if(date[0] > 2010){
        return res.status(418).json({
            error: "You are not eligible to register"
        });
    }

    if(Password.length < 10){
        return res.status(419).json({
            error: "Password must be atleast 6 characters"
        });
    }

    if (Password != Cpassword) {
        return res.status(420).json({
            error: "Password and Confirm Password must be same"
        });
    }

    try {
        const userExist = await User.findOne({
            Email: Email
        });

        if (userExist) {
            return res.status(422).json({
                error: "Email already exists , please login"
            });
        }

        const user = new User({
            Fullname,
            Email,
            Password,
            Cpassword,
            DOB,
            Gender
        });

        //Before saving the data to the database , we need to hash the password
        //Hashing is a process of converting the password into a random string of characters
        //Hashing is done to make the password more secure
        //Hashing is done using bcryptjs
        //bcryptjs is a library which is used to hash the password

        const userRegister = await user.save();

        if (userRegister) {
            res.status(201).json({
                message: "User registered successfully"
            });
        } else {
            res.status(500).json({
                error: "Failed to register"
            });
        }
    } catch (err) {
        console.log(err);
    }


})

//Contact US Page
routes.post("/contact", async (req, res) => {
    const  {
        Fullname,
        Email,
        Subject,
        Message,
        Query,
    } = req.body;

    if(!Fullname || !Email || !Subject || !Message || !Query){
        return res.status(422).json({
            error: "Please fill all the fields"
        });
    }

    try{
        const contact = new Contact({
            Fullname,
            Email,
            Subject,
            Message,
            Query
        });

        const contactUs = await contact.save();

        if(contactUs){
            res.status(201).json({
                message: "Query submitted successfully"
            });
        }else{
            res.status(500).json({
                error: "Failed to submit query"
            });
        }
    }
    catch{
        console.log(err);
    }

})

//Query Page
routes.get("/query", async (req, res) => {
    try{
        const contactData = await Contact.find();
        res.send(contactData);
    }
    catch{
        console.log(err);
    }
})

//Login Route
routes.post("/sign-in", async(req,res)=>{
    try{
        const{Email,Password} = req.body;

        if(!Email || !Password){
            return res.status(400).json({error:"Please fill all the fields"});
        }

        const userLogin  = await User.findOne({Email:Email});
        //console.log(userLogin);
        
        if(userLogin){
            const isMatch = await bcrypt.compare(Password,userLogin.Password);
            
            //generating a token that is returned to the user from schema and stored in the database
            const token = await userLogin.generateAuthToken();
            // console.log(token);
            
            //generating a cookie
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            });
            
            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"});
            }
            else{
                res.json({message:"User Signed In Successfully"});
            }
        }else{
            res.status(400).json({error:"Invalid Credentials"});
        }
    }
    catch(err){
        console.log(err);
    }
})



module.exports = routes;