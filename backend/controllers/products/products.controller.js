import Product from '../../models/product.model';

const createProductController = async(req, res) => {
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

const productListController = async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
      ? {
          name: {
            $regex: req.query.searchKeyword,
            $options: "i",
          },
        }
      : {};
    const sortOrder = req.query.sortOrder
      ? req.query.sortOrder === "lowest"
        ? { price: 1 }
        : { price: -1 }
      : { _id: -1 };
    const products = await Product.find({ ...category, ...searchKeyword }).sort(
      sortOrder
    );
    res.status(200).json(products);
  };
  

  const productDetailController = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.status(400).json(product);
    } else {
      res.status(404).json({ message: "Product Not Found." });
    }
};

const updateProductController = async (req, res) => {
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

  const deleteProductController = async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.json({ message: "Product Deleted" });
      } else {
        res.json("Error in Deletion.");
      }
};

export {
    createProductController,
    productListController,
    productDetailController,
    deleteProductController,
    updateProductController
};