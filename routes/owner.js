const router = require("express").Router();
const Owner = require("../models/owner");

const upload = require("../middlewares/upload-photo");

// POST request - Create a new Owner
router.post("/owners", upload.single("photo"), async (req, res) => {
  try {
    let owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();
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

// GET request - GET All Owners
router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({
      success: true,
      owners: owners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
