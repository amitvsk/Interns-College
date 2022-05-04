const InternshipModel = require('../models/InternshipModel');

const createInternship =async function(req,res){
    try{
        let data = req.body;
    let internship = await InternshipModel.create(data);
    return res.status(201).send({status:true,msg:internship})
}
catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}
};

module.exports.createInternship = createInternship
