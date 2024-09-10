const Product = require('../../model/product.model')

exports.addProduct = async (req, res) => {
    try {
        let imagePath = " "
        const { title,  description, price, image ,size} = req.body
        let product = await Product.findOne({ title:title, isDelete: false })
        if (product) {
            return res.status(400).json({ message: "Product already exist..." })
        }
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/")
        }
        product = await Product.create({
            title:title, description: description, price:price , image:imagePath , size:size
        })
        res.status(201).json({ product, message: "Product added succesfully......" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.updateProduct = async(req,res)=>{
    try{
      let product = await Product.findById({_id:req.query.productId , isDelete:false})
      if(!product){
        return res.status(404).json({message:"Product not found.."})
      }
      product = await Product.updateOne({_id:product.id}, req.body , {new:true})
      res.status(202).json({product,message:'Product updated successfully...'})
    }
    catch(err){
        console.log(err);
        req.status(500).json({message:"Internal server Error"})
    }
}

exports.deleteProduct = async(req,res) => {
    try{
       let product = await Product.findOne({_id:req.query.productId , isDelete:false})
       if(!product){
        return res.status(404).json({message:"Product not found"})
      }
      product = await Product.findByIdAndUpdate(product._id,{isDelete:true}, {new:true})
      res.status(200).json({message:"product Delete SuccessFully..."})
    }
    catch(err){
        console.log(err);
        req.status(500).json({message:"Internal server Error"})
    }
}