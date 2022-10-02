const express = require('express');
const productController = require('../controllers/productController');
const { requireAuth } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/home', requireAuth, productController.productDisplay);
router.post('/home', productController.productCreate);
router.get('/home/details/:id', productController.productDetails);
router.delete('/home/details/:id', productController.productDelete);
router.post('/home/details/:id', productController.productUpdate);

module.exports = router;