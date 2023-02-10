const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




const UserSchema = new mongoose.Schema({


    name: {
        type: String,

        required: [true, 'Username is required'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,

        required: [true, 'email is required'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please provide valid email"
        ],
        unique: true,
    },
    password: {
        type: String,

        required: [true, 'password is required'],
        minLength: 6,

    },
    code: {
        type: String,
        unique: true
    }


})
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)


})

UserSchema.methods.createJWT = function() {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}


UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
}



UserSchema.pre("save", function(next) {
    // Get the first three letters of the client's name
    let code = this.name
        .split(" ")
        .map(word => word[0].toUpperCase())
        .slice(0, 3)
        .join("");

    // Get the next three numeric digits from the database
    User.countDocuments({ code: new RegExp("^" + code) }, (err, count) => {
        if (err) return next(err);


        // Append the numeric digits to the code
        this.code = code + ("000" + (count + 1)).slice(-3);
        next();
    });
});


const User = mongoose.model('User', UserSchema)
module.exports = User