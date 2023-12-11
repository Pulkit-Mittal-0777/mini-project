const express=require('express');
const router=express.Router();
const Student=require('../models/Student');
const User=require('../models/User');
const {isAuthor}=require('../middleware');

router.get('/students/new',async(req,res)=>{
    res.render('students/new')
});

router.post('/students',async(req,res)=>{
    const {name,img,address,course,year,branch,coding_link,core_skills,certifications,cpi,team_work,problem_solving,communication,time_management}=req.body;
    await Student.create({name,img,address,course,year,branch,coding_link,core_skills,certifications,cpi,team_work,problem_solving,communication,time_management,Author:req.user._id});
    req.flash('success','you registered successfully')
    res.redirect('/students');
})
router.get('/students',async(req,res)=>{
    const students=await  Student.find({});
     
    res.render('students/student',{students})
})

router.get('/students/:id',async(req,res)=>{
    const {id}=req.params;
    const student= await Student.findById(id);
    res.render('students/show',{student});

})

router.get('/students/:id/edit',isAuthor,async(req,res)=>{
    const {id}=req.params;
    const student=await Student.findById(id);
    res.render('students/edit',{student})
})
router.patch('/students/:id',async(req,res)=>{
    const {id}=req.params;
    const {name,img,address,course,year,branch,coding_link,core_skills,certifications,cpi}=req.body
    const student= await Student.findByIdAndUpdate(id,{name,img,address,course,year,branch,coding_link,core_skills,certifications,cpi}); 
    res.redirect(`/students/${id}`);
})
router.delete('/students/:id',async(req,res)=>{
   
        const {id}=req.params;
        const sid=req.user._id;
        await User.findByIdAndDelete(sid)
        await Student.findByIdAndDelete(id);

        res.redirect('/login');
});

 
module.exports=router;