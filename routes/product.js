const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo");

// POST request - Create a new Product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.owner = req.body.ownerID;
    product.category = req.body.categoryID;
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();
    res.json({
      status: true,
      message: "Success"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET request - GET All Products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find()
      .populate("owner category")
      .populate("reviews", "rating")
      .exec();

    res.json({
      success: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET request - GET single Product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .populate("reviews", "rating")
      .exec();
    res.json({
      success: true,
      product: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// PUT request - Modifier un produit
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          description: req.body.description,
          photo: req.file.location,
          stockQuantity: req.body.stockQuantity,
          owner: req.body.ownerID
        }
      },
      { upsert: true }
    );

    res.json({
      success: true,
      updatedProduct: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE request - Supprimer un produit
router.delete("/products/:id", async (req, res) => {
  try {
    let deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deleteProduct) {
      res.json({
        status: true,
        message: "Supprimé avec succées"
      });
    } else {
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
module.exports = router;
