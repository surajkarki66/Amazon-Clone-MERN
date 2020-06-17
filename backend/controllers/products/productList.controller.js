import Product from '../../models/product.model';

const productList = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

export default productList;