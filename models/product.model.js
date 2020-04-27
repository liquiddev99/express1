var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	description: String,
	name: String,
	image: String
});

var Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = Product;