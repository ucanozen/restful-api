const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
