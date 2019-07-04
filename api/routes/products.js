const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests /products'
  });
});

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    message: 'Handling POST requests /products',
    createdProduct: product
  });
});

router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId;
  if (productId == 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: productId
    });
  } else {
    res.status(200).json({
      message: 'You passed and ID'
    });
  }
});
router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product!'
  });
});
router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product!'
  });
});

module.exports = router;
