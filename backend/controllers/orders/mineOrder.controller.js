import Order from '../../models/order.model';

const mineOrder = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

export default mineOrder;