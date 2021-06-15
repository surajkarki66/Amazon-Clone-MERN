import express from "express";

const router = express.Router();

import { isAuth, isAdmin } from "../middlewares/utils";

// Load all controllers
import {
  createOrderController,
  listOrderController,
  mineOrderController,
  deleteOrderController,
  orderDetailController,
} from "../controllers/orders.controller";

// Routes
router.post("/", isAuth, createOrderController);
router.get("/", isAuth, isAdmin, listOrderController);
router.get("/mine", isAuth, mineOrderController);
router.get("/:id", isAuth, orderDetailController);
router.delete("/:id", isAuth, deleteOrderController);

export default router;
