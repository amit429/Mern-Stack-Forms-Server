const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: './.env'});
require('./db/connection');

// require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
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