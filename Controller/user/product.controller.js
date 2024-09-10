const Product = require('../../model/product.model')

exports.getAllProduct = async (req, res) => {
    try {
        let product = await Product.find({ isDelete: false })
        if (!product) {
            return res.json({ message: "product not found.." })
        }
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.json({ message: "product not found.." })
        }
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}