const express = require('express');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/products');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name.toLowerCase() + '.jpg');
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get('/', productController.getAllProducts);
router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  productController.createProduct
);
router.get('/:productId', productController.getProductById);
router.patch('/:productId', checkAuth, productController.updateProduct);
router.delete('/:productId', checkAuth, productController.deleteProduct);

module.exports = router;
