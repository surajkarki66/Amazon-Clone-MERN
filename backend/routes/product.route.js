import express from "express";

const router = express.Router();

import productListController from "../controllers/products/productList.controller";
import createProductController from '../controllers/products/createProduct.controller';
import updateProductController from '../controllers/products/updateProduct.controller';
import deleteProductController from '../controllers/products/deleteProduct.controller';

// Routes
router.get("/", productListController);
router.post("/", createProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
