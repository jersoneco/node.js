const Product = require('../models/product');

const productDisplay = (req, res) => {
    Product.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('home', { title: 'Home Page', allproduct: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

const productCreate = (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then((result) => {
            res.redirect('/home');
        })
        .catch((err) => {
            console.log(err);
        });
};

const productDetails = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then(result => {
            res.render('details', { title: 'Product Details Page', product: result });
        })
        .catch(err => {
            res.status(404).render('404', { title: '404' })
        });
};

const productUpdate = (req, res) => {
    Product.findByIdAndUpdate({ _id: req.params.id }, {
        product: req.body.product,
        quantity: req.body.quantity,
        comment: req.body.comment
    },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/home');
            }
        }
    )
};

const productDelete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: '/home'
            });
        })
        .catch((err) => { console.log(err); });
};

module.exports = {
    productDisplay,
    productCreate,
    productDetails,
    productDelete,
    productUpdate
};
