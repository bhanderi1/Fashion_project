const Product = require('../model/product.model')
module.exports = class ProductServices {

    addNewProduct = async (body) => {
        return await Product.create(body)
    }
    getProduct = async (body) => {
        return await Product.findOne(body)
    }
    getProductById = async (id) => {
        return await Product.findById(id)
    }
    getProducts = async(query) => {
        return await Product.find(query)
    }
    updateProduct = async(id, body) => {
        return await Product.findByIdAndUpdate(id, { $set: body }, { new: true });
    }
}
