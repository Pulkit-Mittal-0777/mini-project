const Student =require('./models/Student');
module.exports.isAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const student=await Student.findById(id);
    if(!student.Author.equals(req.user._id)){
        return res.redirect(`/students/${id}`);
    }
    next();

}
