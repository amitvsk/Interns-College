
const validateEmail = require('email-validator');
const collageModel = require('../models/collageModel');
const InternshipModel = require('../models/InternshipModel');

const validatecollage = async function (req, res, next) {
    try {
        let data = req.body
        const { name, fullName, logoLink} = data

        if (Object.keys(data).length != 0) {
            if (data.name === undefined) {
                return res.status(400).send({ status: false, msg: "Name is Missing !!" });
            }
            if (data.fullName === undefined) {
                return res.status(400).send({ status: false, msg: "FullName is Missing !!" });
            }
            if (data.logoLink === undefined) {
                return res.status(400).send({ status: false, msg: "logoLink Missing!!" });
            }
        }
        else {
            return res.status(400).send({ msg: "Mandatory field Missing!!" })
        }

        if (Object.values(name).length <= 0) {
            return res.status(400).send("The name is required");
        }
        let collageName = await collageModel.findOne({name:name})
        if(collageName){
            return res.status(400).send("This Name is already exists");
        }
        if (Object.values(fullName).length <= 0) {
            return res.status(400).send("The fullName is required");
        }
        if (Object.values(logoLink).length <= 0) {
            return res.status(400).send("The logoLink is required");
        } else {
            next()
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.validatecollage = validatecollage;


const validateInternship = async function (req, res, next) {
    try {
        let data = req.body
        const { name, email, mobile, collegeId } = data

        if (Object.keys(data).length != 0) {
            if (data.name === undefined) {
                return res.status(400).send({ status: false, msg: "Name MISSING!!" });
            }
            if (data.email === undefined) {
                return res.status(400).send({ status: false, msg: "Email MISSING!!" });
            }
            if (data.mobile === undefined) {
                return res.status(400).send({ status: false, msg: "Moblie MISSSING!!" });
            }
            if (data.collegeId === undefined) {
                return res.status(400).send({ status: false, msg: "CollageId MISSING!!!" });
            }
        }
        else {
            return res.status(400).send({ msg: "Mandatory field Missing!!" });
        }

        if (Object.values(name).length <= 0) {
            return res.status(400).send({status:false, msg:"Title is Required!!"});
        }
        if (Object.values(email).length <= 0) {
            return res.status(400).send("The email is required");
        }
        if(!validateEmail.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })
        let internship = await InternshipModel.findOne({email:email})
        if(internship){
            return res.status(400).send("This email is already exists");
        }
        if (Object.values(mobile).length = 10) {
            return res.status(400).send({status:false, msg:"Mobile Number is Required!!"});
        }
        
        let mobileU = await InternshipModel.findOne(mobile);
        if(mobileU){
            return res.status(400).send({status:false,msg:"Mobile number is already exists"})
        }
        if (Object.values(collegeId).length <= 0) {
            return res.status(400).send({status:false, msg:"Collage id is Required!!"});
        }
        if (collegeId.length < 24) {
            return res.status(400).send("Invlid AuthorId")
        }

        let collageid = await collageModel.findById(collegeId)
        if (!collageid) {
            return res.status(400).send('Enter a valid Collage id!!');
        } else {
            next()
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.validateInternship = validateInternship;
