import Product from '../../models/product.model';

const productDetail = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found." });
    }
};

export default productDetail;