const router = require("express").Router();
const Adress = require("../models/adress");
const User = require("../models/user");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");

// POST request - Create a new Category
router.post("/adresses", verifyToken, async (req, res) => {
  try {
    const adress = new Adress();
    adress.user = req.decoded._id;
    adress.country = req.body.country;
    adress.fullName = req.body.fullName;
    adress.streetAdress = req.body.streetAdress;
    adress.city = req.body.city;
    adress.state = req.body.state;
    adress.zipCode = req.body.zipCode;
    adress.phoneNumber = req.body.phoneNumber;
    adress.deliveryInstructions = req.body.deliveryInstructions;
    adress.securityCode = req.body.securityCode;
    await adress.save();

    res.json({
      success: true,
      message: "Successfuly added Adress"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/adresses", verifyToken, async (req, res) => {
  try {
    let adresses = await Adress.find({ user: req.decoded._id });
    res.json({
      success: true,
      adresses: adresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/adresses/:id", verifyToken, async (req, res) => {
  try {
    let adresse = await Adress.findOne({ _id: req.params.id });
    res.json({
      success: true,
      adresse: adresse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put("/adresses/:id", verifyToken, async (req, res) => {
  try {
    let foundAdress = await Adress.findOne({
      user: req.decoded._id,
      _id: req.params.id
    });
    if (foundAdress) {
      if (req.body.country) foundAdress.country = req.body.country;
      if (req.body.fullName) foundAdress.fullName = req.body.fullName;
      if (req.body.streetAdress)
        foundAdress.streetAdress = req.body.streetAdress;
      if (req.body.city) foundAdress.city = req.body.city;
      if (req.body.state) foundAdress.state = req.body.state;
      if (req.body.zipCode) foundAdress.zipCode = req.body.zipCode;
      if (req.body.phoneNumber) foundAdress.phoneNumber = req.body.phoneNumber;
      if (req.body.deliveryInstructions)
        foundAdress.deliveryInstructions = req.body.deliveryInstructions;
      if (req.body.securityCode)
        foundAdress.securityCode = req.body.securityCode;

      await foundAdress.save();

      res.json({
        success: true,
        message: "Adresse modifié avec succées"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete("/adresses/:id", verifyToken, async (req, res) => {
  try {
    let deletedAdress = await Adress.remove({
      user: req.decoded._id,
      _id: req.params.id
    });
    if (deletedAdress) {
      res.json({
        success: true,
        message: "L'adresse a été supprimé avec succés"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put("/adresses/set/default", verifyToken, async (req, res) => {
  try {
    const updatedAdressUser = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { adress: req.body.id } }
    );
    if (updatedAdressUser) {
      res.json({
        success: true,
        message: "L'adresse a été définit comme votre default adresse."
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/country", async (req, res) => {
  try {
    let response = await axios.get("http://restcountries.eu/rest/v2/all");

    res.json(response.data);
  } catch (error) {}
});

module.exports = router;
