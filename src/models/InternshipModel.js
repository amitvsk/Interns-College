
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const internshipSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type:String,
            unique:true,
            required:true,
            lowercase:true
        },
        mobile:{
            type:Number,
            required:true,
            unique:true
        },
        collegeId:{
            type:ObjectId,
            ref:"Collage",
            required:true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
       
    }, { timestamps: true })

module.exports = mongoose.model('internship', internshipSchema);