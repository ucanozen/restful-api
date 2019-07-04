const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were Fetched'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Order was created'
  });
});

router.get('/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;
  res.status(200).json({
    message: 'You discovered the special ID',
    id: orderId
  });
});

router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated order!'
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted orders!'
  });
});

module.exports = router;
