const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internshipController");
const collageController =require("../controllers/collageController")
const { validatecollage, validateInternship } = require('../middleware/valid');

router.post("/functionup/colleges",validatecollage,collageController.createCollage);

router.post("/functionup/interns",validateInternship,internshipController.createInternship);


module.exports = router;