
const validateEmail = require('email-validator');
const collageModel = require('../models/collageModel');
const InternshipModel = require('../models/InternshipModel');

//********************************check validation of college model************************************//

const validatecollage = async function (req, res, next) {
    try {
        let data = req.body
        const { name, fullName, logoLink} = data

        if (Object.keys(data).length != 0) { // check the key are present or not
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

        if (Object.values(name.trim()).length <= 0) { //check the values of name
            return res.status(400).send("The name is required");
        }// validation of name
        if(!(/^[A-Za-z ]+$/.test(name) )){ return res.status(400).send({ msg: "name is not valid!!" })}

        let collageName = await collageModel.findOne({name:name,isDeleted:false})
        if(collageName){ // check the name are unique 
            return res.status(400).send("This Name is already exists");
        }

        if (Object.values(fullName.trim()).length <= 0) {  //check the values of Fullname
            return res.status(400).send("The fullName is required");
        }
            // validation of full name 
        if(!(/^[A-Za-z , ; .]+$/.test(fullName) )){ return res.status(400).send({ msg: "Fullname is not valid!!" })}

        if (Object.values(logoLink.trim()).length <= 0) {  //check the values of Logo link
            return res.status(400).send("The logoLink is required");
        }
        // validation of logo link
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


//****************************check validation of internship model************************************//

const validateInternship = async function (req, res, next) {
    try {
        let data = req.body
        const { name, email, mobile, collegeName } = data

        if (Object.keys(data).length != 0) { //check the key are enter our not
            if (data.name === undefined) {
                return res.status(400).send({ status: false, msg: "Name MISSING!!" });
            }
            if (data.email === undefined) {
                return res.status(400).send({ status: false, msg: "Email MISSING!!" });
            }
            if (data.mobile === undefined) {
                return res.status(400).send({ status: false, msg: "Moblie MISSSING!!" });
            }
            if (data.collegeName === undefined) {
                return res.status(400).send({ status: false, msg: "CollageId MISSING!!!" });
            }
        }
        else {
            return res.status(400).send({ msg: "Mandatory field Missing!!" });
        }
        // check the values of name
        if (Object.values(name.trim()).length <= 0) {
            return res.status(400).send({status:false, msg:"Name is Required!!"});
        }
        // check the validation of name
        if(!(/^[A-Za-z . ]+$/.test(name) )){ return res.status(400).send({ msg: "name is not valid!!" })}

            //check the email value
        if (Object.values(email.trim()).length <= 0) {
            return res.status(400).send("The email is required");
        }
        //check the validation of email
        if(!validateEmail.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })
        //check the email are unique
        let internship = await InternshipModel.findOne({email:email,isDeleted:false})
        if(internship){
            return res.status(400).send({status:false,msg:"This email is already exists"});
        }
        //check the validation of mobile
        let mob = /^[0-9]+$/
        if (!mob.test(mobile.trim())) {
            return res.status(400).send({ status: false, msg: "Mobile number should have digits only" });
        }

        if (Object.values(mobile).length < 10 || Object.values(mobile).length > 10) {
            return res.status(400).send({status:false,msg:"Enter the vailid mobile number"});
        }
        // check the mobile are unique
        let mobileU = await InternshipModel.findOne({mobile:mobile,isDeleted:false});
        if(mobileU){
            return res.status(400).send({status:false,msg:"Mobile number is already exists"})
        }
        if (Object.values(collegeName.trim()).length <= 0) {
            return res.status(400).send({status:false, msg:"CollegeName id is Required!!"});
        }
        if (collegeName.length < 24) {
            return res.status(400).send({status:false,msg:"Invlid CollageName Id"})
        }
        //check the valid the coolege id
        let collageid = await collageModel.findOne({_id:collegeName,isDeleted:false})
        if (!collageid) {
            return res.status(400).send({status:false,msg:'Enter a valid CollageName id!!'});
        } else {
            next()  //all procces done go on next function
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.validateInternship = validateInternship;
