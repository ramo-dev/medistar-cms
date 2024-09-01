import mongoose from 'mongoose';


const inventorySchema = new mongoose.Schema({
  drug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    require: true
  },
  unit: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model('Inventory', inventorySchema);
