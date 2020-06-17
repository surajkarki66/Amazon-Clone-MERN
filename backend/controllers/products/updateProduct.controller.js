import Product from "../../models/product.model";

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .json({ message: "Product Updated", data: updatedProduct });
    }
    return res.status(400).json({ message: "Bad Request" });
  }
  return res.status(500).json({ message: " Error in Updating Product." });
};

export default updateProduct;
