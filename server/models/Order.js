const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String },
      name: { type: String }, // Added name for easier display
      qty: { type: Number, default: 1 },
      price: { type: Number }
    }
  ],
  amount: { type: Number, required: true },
  address: { type: Object, required: true }, // Accepts the full address object
  status: { type: String, default: "Processing" },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);