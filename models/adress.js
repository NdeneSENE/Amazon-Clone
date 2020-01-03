const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  country: String,
  fullName: String,
  streetAdress: String,
  city: String,
  state: String,
  zipCode: Number,
  phoneNumber: String,
  deliveryInstructions: String,
  securityCode: String
});

module.exports = mongoose.model("Adress", AdressSchema);
