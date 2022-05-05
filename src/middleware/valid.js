
const validateEmail = require('email-validator');
const collageModel = require('../models/collageModel');
const InternshipModel = require('../models/InternshipModel');

//************************check validation of college model************************************//

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

        if (Object.values(name.trim()).length <= 0) {
            return res.status(400).send("The name is required");
        }
        if(!(/^[A-Za-z ]+$/.test(name) )){ return res.status(400).send({ msg: "name is not valid!!" })}

        let collageName = await collageModel.findOne({name:name})
        if(collageName){
            return res.status(400).send("This Name is already exists");
        }

        if (Object.values(fullName.trim()).length <= 0) {
            return res.status(400).send("The fullName is required");
        }

        if(!(/^[A-Za-z , ; .]+$/.test(fullName) )){ return res.status(400).send({ msg: "Fullname is not valid!!" })}

        if (Object.values(logoLink.trim()).length <= 0) {
            return res.status(400).send("The logoLink is required");
        }
        if(!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:\+.~#?&//=]*)/.test(logoLink))){
            return res.status(400).send({ status: false, msg: "logoLink is a not valid" });
        } else {
            next()
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.validatecollage = validatecollage;


//************************check validation of internship model************************************//

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

        if (Object.values(name.trim()).length <= 0) {
            return res.status(400).send({status:false, msg:"Name is Required!!"});
        }
        if(!(/^[A-Za-z . ]+$/.test(name) )){ return res.status(400).send({ msg: "name is not valid!!" })}

        if (Object.values(email.trim()).length <= 0) {
            return res.status(400).send("The email is required");
        }
        if(!validateEmail.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })
        let internship = await InternshipModel.findOne({email:email})
        if(internship){
            return res.status(400).send({status:false,msg:"This email is already exists"});
        }
        let mob = /^[0-9]+$/
        if (!mob.test(mobile.trim())) {
            return res.status(400).send({ status: false, msg: "Mobile number should have digits only" });
        }

        if (Object.values(mobile).length < 10 || Object.values(mobile).length > 10) {
            return res.status(400).send({status:false,msg:"Enter the vailid mobile number"});
        }
        
        let mobileU = await InternshipModel.findOne({mobile:mobile});
        if(mobileU){
            return res.status(400).send({status:false,msg:"Mobile number is already exists"})
        }
        if (Object.values(collegeId.trim()).length <= 0) {
            return res.status(400).send({status:false, msg:"College id is Required!!"});
        }
        if (collegeId.length < 24) {
            return res.status(400).send("Invlid CollageId")
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
