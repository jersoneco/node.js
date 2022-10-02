const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an Email!'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter Valid Email!']
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password!'],
        minlength: [6, 'Minimum Passsword lenght six(6) characters!']
    },
});

//hash passsword before save in database
userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};


const User = mongoose.model('User', userSchema);
module.exports = User;