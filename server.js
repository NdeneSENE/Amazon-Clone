const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("🧳 Vous vous etes bien connecté sur la base de donnée.");
    }
  }
);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require apis
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const ownerRoutes = require("./routes/owner");
const userRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const adressRoutes = require("./routes/adress");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ownerRoutes);
app.use("/api", userRoutes);
app.use("/api", reviewRoutes);
app.use("/api", adressRoutes);
app.use("/api", paymentRoutes);
app.use("/api", orderRoutes);

app.listen(3000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("🚀 Server Running in port", 3000);
  }
});
