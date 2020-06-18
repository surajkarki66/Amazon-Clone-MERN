import Order from "../../models/order.model";

const deleteOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    if (deletedOrder) {
        return res.json(deletedOrder);
    } else {
        return res.json('Something wrong with database !');
    }
  } else {
    res.status(404).json("Order Not Found.");
  }
};

export default deleteOrder;
