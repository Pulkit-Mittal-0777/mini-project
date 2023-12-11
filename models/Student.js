const mongoose = require('mongoose');

const studentSchema=new mongoose.Schema({
    img:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    address:{
        type:String,
        trim:true
    },
    course:{
        type:String,
        trim:true
    },
    
    year:{
        type:Number,
        min:0,
        required:true
    },
    branch:{
        type:String,
        trim:true
    },
    cpi:{
        type:Number,

    },
    core_skills:{
        type:String

    },
    coding_link:{
        type:String

    },
    certifications:{
        type:String

    },
    Author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'    
    },
    team_work:{
        type:Number,
        min:0,
        required:true

    },
    problem_solving:{
        type:Number,
        min:0,
        required:true

    },
    communication:{
        type:Number,
        min:0,
        required:true

    },
    time_management:{
        type:Number,
        min:0,
        required:true

    },

})
const Student=mongoose.model('Student',studentSchema);
module.exports=Student