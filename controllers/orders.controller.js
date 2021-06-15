import Order from "../models/order.model";

const createOrderController = async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    return res
      .status(201)
      .json({ message: "New Order Created", data: newOrderCreated });
  } catch (error) {
    return res.status(500).json({ error: "New Order is not created." });
  }
};

const listOrderController = async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.status(200).json(orders);
};

const mineOrderController = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
};

const orderDetailController = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json("Order Not Found.");
  }
};

const deleteOrderController = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    if (deletedOrder) {
      return res.status(200).json(deletedOrder);
    } else {
      return res.status(500).json("Something wrong with database !");
    }
  } else {
    res.status(404).json("Order Not Found.");
  }
};

export {
  createOrderController,
  listOrderController,
  mineOrderController,
  orderDetailController,
  deleteOrderController,
};
