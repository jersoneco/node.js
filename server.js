const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const authRoute = require('./routes/auth');
const app = express();

const MyDatabase = 'mongodb+srv://MyFirstDB:myfirstdb123@cluster0.oxsmv.mongodb.net/myfirstdatabase?retryWrites=true&w=majority';
mongoose.connect(MyDatabase, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('firstinterface', { title: 'Welcome to Supreme Mario Market' })
})
app.use(authRoute);
app.use(productRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    });
});