const express = require("express");
const router = express.Router();
const internshipController = require("../controllers/internshipController");
const collageController =require("../controllers/collageController")
const getController = require("../controllers/getInternshipController")
const { validatecollage, validateInternship } = require('../middleware/valid');

router.post("/functionup/colleges",validatecollage,collageController.createCollage);

router.post("/functionup/interns",validateInternship,internshipController.createInternship);

router.get("/functionup/collegeDetails",getController.getColleges)

module.exports = router;