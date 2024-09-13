const Product = require('../model/product.model')

class ProductServices {
    async findProduct(body) {
        return await Product.findOne(body)
    }
    async createProduct(body) {
        return await Product.create(body)
    }
    async findProducts(body) {
        return await Product.find(body)
    }
    async findProductId(body) {
        return await Product.findById(body)
    }
    async findAndUpdateProductId(body) {
        return await Product.findByIdAndUpdate(body)
    }
}

module.exports = ProductServices
