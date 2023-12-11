const express=require('express');
const router=express.Router();
const User=require('../models/User');
const passport=require('passport');
const Student=require('../models/Student')
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body;
    const user=new User({username,email});
    const newuser=await User.register(user,password);
    req.login(newuser, function(err) {
        if (err) { 
            return next(err); 
        }  ////  req.login this method provide facility to login the user just after register ni wait to login again after signup
        return res.redirect('/students/new');
    });
    
})
router.get('/login',(req,res)=>{
    res.render('auth/login')
})

// it is a middleware of passport it just take user details and send it 
// / to app.js file on passport.use(new LocalStrategy(User.authenticate()))
// // theck it will check and compare user with data base
// / if it is true then redirect it to product and if fail then redirect to login page again

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login',failureFlash:true}),  
  
  (req,res)=>{
    // console.log(req.user);
    // not working bcoz of incomplete flash section
    req.flash('success',`welcome ${req.user.username}`)
    res.redirect('/students');
  }
);

router.get('/logout', (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','Good-Bye see you again')
        res.redirect('/login');
    });
    
});
router.get('/user/:id',async(req,res)=>{
    const {id}=req.params;
    const student=await Student.findOne({Author:id});
    
    res.render('students/show',{student});
    
    
})
module.exports=router

