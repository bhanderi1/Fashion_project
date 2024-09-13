const Product = require('../../model/product.model')
const messages = require('../../helpers/messge')

exports.addProduct = async (req, res) => {
    try {
        let imagePath = " "
        const { title, description, price, image, size } = req.body
        let product = await Product.findOne({ title: title, isDelete: false })
        if (product) {
            return res.status(400).json({ message:messages.PRODUCT_ALREADY_EXIST })
        }
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/")
        }
        product = await Product.create({
            title: title, description: description, price: price, image: imagePath, size: size
        })
        res.status(201).json({ product, message:messages.PRODUCT_ADDED })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message:messages.INTERNAL_SERVER_ERROR })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById({ _id: req.query.productId, isDelete: false })
        if (!product) {
            return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND })
        }
        product = await Product.updateOne({ _id: product.id }, req.body, { new: true })
        res.status(202).json({ product, message: messages.PRODUCT_UPDATED })
    }
    catch (err) {
        console.log(err);
        req.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.query.productId, isDelete: false })
        if (!product) {
            return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND })
        }
        product = await Product.findByIdAndUpdate(product._id, { isDelete: true }, { new: true })
        res.status(200).json({ message: messages.PRODUCT_DELETE })
    }
    catch (err) {
        console.log(err);
        req.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}