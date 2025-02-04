const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  dishname: { type: String, required: true },
  NumberOfOrder: { type: Number },
  taste: { type: String, enum: ['sour', 'spicy', 'normal'], required: true },
  rating: { type: Number, required: true },
  is_drink: { type: Boolean , default: false },
  price: { type: Number, required: true }  // Changed 'number' to 'Number'
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
