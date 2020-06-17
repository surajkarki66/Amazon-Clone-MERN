import Product from '../../models/product.model';

const deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.json({ message: "Product Deleted" });
      } else {
        res.json("Error in Deletion.");
      }
};

export default deleteProduct;