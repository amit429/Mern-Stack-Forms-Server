const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    id : {
        type : Number,
        autoIncrement : true,
    },
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Cpassword: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    Gender : {
        type: String,
        required: true
    },
    token: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

//Hashing the password
//we are going to use promise ie this keyword thus we need to use normal function and not arrow function 
userSchema.pre("save", async function(next){
    if(this.isModified("Password", "Cpassword")){
        this.Password = await bcrypt.hash(this.Password, 12);
        this.Cpassword = await bcrypt.hash(this.Cpassword, 12);
    }
    next();
})

//Generating a token
//for working with an instance called userSchema you need to use methods
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.token = this.token.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema); //model is used to create a collection schema.

module.exports = User;

