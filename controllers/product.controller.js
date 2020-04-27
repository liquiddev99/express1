var Product = require('../models/product.model');

module.exports.index = function(req, res) {
	Product.find().then(function(product) {
		res.render('products/index', {
			products: products
		});
	});
};