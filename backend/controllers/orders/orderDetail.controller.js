import Order from "../../models/order.model";

const orderDetail = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.json(order);
  } else {
    res.status(404).json("Order Not Found.");
  }
};

export default orderDetail;