
const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: String,
  image: String,
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;
