import Product from '../../models/product.model';

const createProduct = async(req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews

    });
    const newProduct = await product.save();

    if (newProduct) {
        return res.status(201).json({message: 'New product created', data: newProduct});
    }
    return res.status(500).json({message: 'Error in creating product!'});

};

export default createProduct;