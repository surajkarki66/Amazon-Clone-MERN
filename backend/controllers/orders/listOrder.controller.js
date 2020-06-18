import Order from '../../models/order.model';

const listOrder = async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.json(orders);
};

export default listOrder;