const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    Fullname : {
        type : String,
        required : true
    },

    Email : {
        type : String,
        required : true
    },
    
    Subject : {
        type : String,
        required : true
    },

    Message : {
        type : String,
        required : true
    },

    Query : {
        type : String,
        required : true
    },

    time : {
        type : Date,
        default : Date.now
    }
});

const Contact = mongoose.model('CONTACT', contactSchema);
module.exports = Contact;