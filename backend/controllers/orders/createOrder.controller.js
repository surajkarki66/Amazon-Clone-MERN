import Order from '../../models/order.model';

const createOrder = async (req, res) => {
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
      if (newOrderCreated) {
        return res.status(201).json({ message: "New Order Created", data: newOrderCreated });
      }
      return res.status(500).json({ message: 'New order is not created'});
    
};

export default createOrder;

