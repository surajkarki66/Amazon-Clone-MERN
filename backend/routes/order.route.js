import express from "express";

const router = express.Router();

import { isAuth, isAdmin } from "../middlewares/utils";

// Load all controllers
import createOrderController from '../controllers/orders/createOrder.controller';
import listOrderController from '../controllers/orders/listOrder.controller';
import mineOrderController from '../controllers/orders/mineOrder.controller';
import orderDetailController from '../controllers/orders/orderDetail.controller';
import deleteOrderController from '../controllers/orders/deleteOrder.controller';


// Routes
router.post("/", isAuth, createOrderController);
router.get("/", isAuth, listOrderController);
router.get("/mine", isAuth, mineOrderController);
router.get("/:id", isAuth, orderDetailController);
router.delete("/:id", isAuth, deleteOrderController);

export default router;
