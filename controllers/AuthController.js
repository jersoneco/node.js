const User = require('../models/User');
const jwt = require('jsonwebtoken');
//const cookie = require('cookie-parser');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: ' ', password: ' ' };

    if (err.message === 'incorrect email') {
        errors.email = 'Email not Registered!';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'Password Incorrect!';
    }
    if (err.code === 11000) {
        errors.email = 'Email already exist!';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

const maxAge = 3 * 24 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'newUserMadapaker', {
        expiresIn: maxAge
    });
};

module.exports.register_get = (req, res) => {
    res.render('register', { title: 'Register Page' })
};

module.exports.register_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password })
        const token = await createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.json(errors);
    }
};

module.exports.login_get = (req, res) => {
    res.render('login', { title: 'Login Page' });
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = await createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.json(errors);
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}