import express from "express";

import upload from "../middlewares/upload";
const router = express.Router();

import { isAuth, isAdmin } from "../middlewares/utils";

import {
  createProductController,
  productListController,
  productDetailController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.controller";

// Routes
router.get("/", productListController);
router.post(
  "/",
  isAuth,
  isAdmin,
  upload.single("image"),
  createProductController
);
router.get("/:id", productDetailController);
router.put(
  "/:id",
  isAuth,
  isAdmin,
  upload.single("image"),
  updateProductController
);
router.delete("/:id", isAuth, isAdmin, deleteProductController);

export default router;
