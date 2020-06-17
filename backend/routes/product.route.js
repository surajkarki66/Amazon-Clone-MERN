import express from "express";

const router = express.Router();

import { isAuth, isAdmin } from "../middlewares/utils";

import productListController from "../controllers/products/productList.controller";
import createProductController from "../controllers/products/createProduct.controller";
import updateProductController from "../controllers/products/updateProduct.controller";
import deleteProductController from "../controllers/products/deleteProduct.controller";

// Routes
router.get("/", productListController);
router.post("/", isAuth, isAdmin, createProductController);
router.put("/:id", isAuth, isAdmin, updateProductController);
router.delete("/:id", isAuth, isAdmin, deleteProductController);

export default router;
