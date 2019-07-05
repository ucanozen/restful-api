const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests /products'
  });
});

router.post('/', async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  try {
    const result = await product.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests /products',
      createdProduct: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.get('/:productId', async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    console.log(product);
    if (product) {
      return res.status(200).json(product);
    }
    res.status(404).json({ message: 'No product was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
router.patch('/:productId', async (req, res, next) => {
  console.log('Patch');
  console.log(req.body);
  const productId = req.params.productId;
  const update = req.body;
  const options = { new: true };
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      update,
      options
    );
    console.log(updatedProduct);
    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    }
    res.status(404).json({ message: 'No product was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
router.delete('/:productId', async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    console.log(deletedProduct);
    if (deletedProduct) {
      return res.status(200).json(deletedProduct);
    }
    res.status(404).json({ message: 'No product was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
