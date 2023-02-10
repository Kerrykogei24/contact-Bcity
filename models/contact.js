const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Contact name is required'],
        maxLength: 50,
    },
    surname: {
        type: String,
        required: [true, 'Contact surname is required'],
        maxLength: 50,
    },
    email: {
        type: String,

        required: [true, 'email is required'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please provide valid email"
        ],
        unique: true,
    },


    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'USer',
        required: [true, "Please Provide User"]
    }
}, { timestamps: true })


module.exports = mongoose.model('Contact', ContactSchema)