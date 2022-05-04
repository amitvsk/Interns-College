const collageModel = require("../models/collageModel");


const createCollage =async function(req,res){
    try{
        let data = req.body;
    let collage = await collageModel.create(data);
    return res.status(201).send({status:true,msg:collage})
}
catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
}
};

module.exports.createCollage = createCollage
