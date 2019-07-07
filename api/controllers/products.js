const Product = require('../models/product');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    console.log(products);
    const response = {
      count: products.length,
      products: products.map(product => {
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          productImage: product.productImage,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + product._id
          }
        };
      })
    };
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const createProduct = async (req, res, next) => {
  console.log(req.body);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  try {
    const response = await product.save();
    console.log(response);
    res.status(201).json({
      message: 'Created a new product',
      createdProduct: {
        id: response._id,
        name: response.name,
        price: response.price,
        productImage: response.productImage,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + response._id
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const response = await Product.findById(productId).lean();
    console.log(response);
    if (response) {
      const product = {
        id: response._id,
        name: response.name,
        price: response.price,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/'
        }
      };
      return res.status(200).json(product);
    }
    res.status(404).json({ message: 'No product was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const updateProduct = async (req, res, next) => {
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
};

const deleteProduct = async (req, res, next) => {
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
};
module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
