import express from "express";

const router = express.Router();

import { isAuth, isAdmin } from "../middlewares/utils";

import {
  createProductController,
  productListController,
  productDetailController,
  updateProductController,
  deleteProductController,
} from "../controllers/products/products.controller";

// Routes
router.get("/", productListController);
router.post("/", isAuth, isAdmin, createProductController);
router.get("/:id", productDetailController);
router.put("/:id", isAuth, isAdmin, updateProductController);
router.delete("/:id", isAuth, isAdmin, deleteProductController);

export default router;
