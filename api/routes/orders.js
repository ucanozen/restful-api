const express = require('express');
const Order = require('../models/order');
const checkAuth = require('../middleware/check-auth');

const Product = require('../models/product');

const router = express.Router();

router.get('/', checkAuth, async (req, res, next) => {
  try {
    const orders = await Order.find();
    const response = {
      count: orders.length,
      orders: orders.map(order => {
        return {
          id: order._id,
          product: {
            id: order.productId,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + order.productId
            }
          },
          request: {
            type: 'GET',
            url: 'http://localhost:3000/orders/' + order._id
          }
        };
      })
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.post('/', checkAuth, async (req, res, next) => {
  const order = new Order({
    quantity: req.body.quantity,
    productId: req.body.productId
  });

  try {
    const productExists = await Product.exists({ _id: order.productId });
    if (productExists) {
      const savedOrder = await order.save();
      console.log(savedOrder);
      res.status(201).json({
        message: 'Created a new order',
        createdOrder: {
          productId: savedOrder.productId,
          quantity: savedOrder.quantity,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/orders/' + savedOrder._id
          }
        }
      });
    } else {
      res.status(404).json({
        message: "Product doesn't exist"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.get('/:orderId', checkAuth, async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const response = await Order.findById(orderId).lean();
    console.log(response);
    if (response) {
      const order = {
        id: response._id,
        product: {
          id: response.productId,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + response.productId
          }
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders/' + response._id
        }
      };
      return res.status(200).json(order);
    }
    res.status(404).json({ message: 'No order was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.patch('/:orderId', checkAuth, async (req, res, next) => {
  const orderId = req.params.orderId;
  const update = req.body;
  const options = { new: true };
  try {
    const updatedOrder = await Product.findByIdAndUpdate(
      orderId,
      update,
      options
    );
    console.log(updatedOrder);
    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    }
    res.status(404).json({ message: 'No order was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.delete('/:orderId', checkAuth, async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const deletedOrder = await Product.findByIdAndDelete(orderId);
    console.log(deletedOrder);
    if (deletedOrder) {
      return res.status(200).json(deletedOrder);
    }
    res.status(404).json({ message: 'No order was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
