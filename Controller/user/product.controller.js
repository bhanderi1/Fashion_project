const Product = require('../../model/product.model')
const messages = require('../../helpers/messge')


exports.getAllProduct = async (req, res) => {
    try {
        let product = await Product.find({ isDelete: false })
        if (!product) {
            return res.json({ message:  messages. PRODUCT_NOT_FOUND })
        }
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR  })
    }
}

exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.json({ message:  messages. PRODUCT_NOT_FOUND })
        }
        res.status(200).json(product)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR  })
    }
}