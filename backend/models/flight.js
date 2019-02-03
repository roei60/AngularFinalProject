const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  takeoff: { type: String, required: true },
  landing: { type: String, required: true },
  price: { type: String, required: true },
  // destination: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Destination'
  // }
  destination: { type: String, required: true }
});

module.exports = mongoose.model("Flight", flightSchema);
