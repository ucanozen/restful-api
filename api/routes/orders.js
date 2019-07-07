const express = require('express');
const ordersController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', checkAuth, ordersController.getAllOrders);

router.post('/', checkAuth, ordersController.postOrder);

router.get('/:orderId', checkAuth, ordersController.getOrderById);

router.patch('/:orderId', checkAuth, ordersController.updateOrder);

router.delete('/:orderId', checkAuth, ordersController.deleteOrder);

module.exports = router;
