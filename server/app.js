const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

dotenv.config({path: './.env'});
require('./db/connection');

// require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
// app.use(() => (req, res, next)=> {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

app.use(require('./routes/auth'));



const port = 5000;


//Middleware
//middle ware is used to check if the user is logged in or not and display the data accordingly
//Middleware are functions having access to the request and response objects and the next function in the express execution cycle 

// app.get('/', (req,res)=>{
//     res.send("Landing Page");
// })

// app.get('/About-ngo', (req,res)=>{
//     res.send("About-ngo Page");
// })

// app.get('/Contact-ngo', (req,res)=>{
//     res.send("Contact-ngo Page");
// })

// app.get('/Donate', (req,res)=>{
//     res.send("Donate Page");
// })

// app.get('/Events', (req,res)=>{
//     res.send("Events Page");
// })

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});